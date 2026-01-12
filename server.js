/* Security headers middleware is moved below where `app` is initialized */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const admin = require('firebase-admin');
const path = require('path');
// Load env from server folder or root folder
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config(); // also check local .env if exists

const rateLimiter = require('./rateLimiter');
const app = express();
const PORT = process.env.PORT || 5000;

console.log("RECAPTCHA_SECRET on server:", process.env.RECAPTCHA_SECRET);

// Security headers middleware
app.use((req, res, next) => {
    // Content Security Policy (CSP)
    res.setHeader('Content-Security-Policy', "default-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://www.google.com; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://www.google.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com");
    // HTTP Strict Transport Security (HSTS)
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    // X-Frame-Options (Clickjacking protection)
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // X-Content-Type-Options (MIME sniffing protection)
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Initialize Firebase Admin
try {
    let serviceAccount;
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';
    const fs = require('fs');

    // Priority 1: Environment Variable (Best for Render/Railway)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
            console.log("Loaded Firebase credentials from environment variable");
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON", e);
        }
    } 
    // Priority 2: File System (Best for Local Dev)
    else if (fs.existsSync(serviceAccountPath)) {
        serviceAccount = require(serviceAccountPath);
        console.log("Loaded Firebase credentials from file:", serviceAccountPath);
    }

    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        console.log("Firebase Admin initialized successfully");
    } else {
        console.warn("Firebase credentials not found. Set FIREBASE_SERVICE_ACCOUNT_JSON env var or provide serviceAccountKey.json");
        console.warn("Data will not be saved to Firebase from server until configured.");
    }
} catch (error) {
    console.warn("Firebase Admin initialization failed:", error.message);
}

// Middleware
// CORS configuration - Update allowed origins for production
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
// Use express.json() instead of bodyParser.json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiter to all POST requests (including contact form)
app.use('/api/', (req, res, next) => {
    if (req.method === 'POST') {
        return rateLimiter(req, res, next);
    }
    next();
});

// Client Information Form API
app.post('/api/client-information', async (req, res) => {
    try {
        const {
            clientName,
            clientId,
            fatherName,
            mobile,
            altMobile,
            dob,
            address,
            pan,
            aadhaar,
            email
        } = req.body;

        // Validate required fields
        if (!clientName || !fatherName || !mobile || !dob || !address || !pan || !aadhaar || !email) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled'
            });
        }

        // Validate Indian mobile number (10 digits starting with 6-9)
        if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid mobile number. Must be 10 digits starting with 6-9'
            });
        }

        // Validate PAN format (5 letters + 4 digits + 1 letter)
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid PAN format. Example: ABCDE1234F'
            });
        }

        // Validate Aadhaar (12 digits starting with 2-9)
        const aadhaarDigits = aadhaar.replace(/\s/g, '');
        if (!/^[2-9][0-9]{11}$/.test(aadhaarDigits)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Aadhaar number. Must be 12 digits'
            });
        }

        // Prepare API request payload
        const postData = {
            signers: [
                {
                    identifier: email,
                    name: clientName,
                    sign_type: "aadhaar"
                }
            ],
            expire_in_days: 10,
            send_sign_link: true,
            notify_signers: true,
            will_self_sign: false,
            display_on_page: "custom",
            file_name: `${clientName}.pdf`,
            templates: [
                {
                    template_key: process.env.DIGIO_TEMPLATE_KEY,
                    template_values: {
                        "client full name": clientName,
                        "clientId": clientId || "NA",
                        "address": address,
                        "dob": dob,
                        "pan": pan,
                        "aadhaar": aadhaarDigits,
                        "mobile": mobile,
                        "father_name": fatherName
                    }
                }
            ]
        };

        // Make API call to Digio using https module
        const url = new URL(process.env.DIGIO_API_URL);
        const postDataStr = JSON.stringify(postData);
        
        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.DIGIO_AUTH_TOKEN,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postDataStr)
            }
        };

        const apiResponse = await new Promise((resolve, reject) => {
            const req = https.request(options, (apiRes) => {
                let data = '';
                
                apiRes.on('data', (chunk) => {
                    data += chunk;
                });
                
                apiRes.on('end', () => {
                    try {
                        const responseData = JSON.parse(data);
                        resolve({ statusCode: apiRes.statusCode, data: responseData });
                    } catch (err) {
                        reject(new Error('Failed to parse API response'));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.write(postDataStr);
            req.end();
        });

        if (apiResponse.statusCode === 200) {
            
            // Save to Firebase Realtime Database (Server-side)
            try {
                if (admin.apps.length > 0) {
                    const db = admin.database();
                    const submissionsRef = db.ref('client_information_submissions');
                    
                    await submissionsRef.push({
                        clientName,
                        clientId: clientId || '',
                        fatherName,
                        mobile,
                        email,
                        dob,
                        pan,
                        aadhaar: aadhaarDigits,
                        address,
                        digioId: apiResponse.data.id,
                        agreementStatus: apiResponse.data.agreement_status || 'pending',
                        fileName: apiResponse.data.file_name,
                        timestamp: Date.now(),
                        submittedAt: new Date().toISOString(),
                        status: 'pending'
                    });
                    console.log('Data saved to Firebase via Server for:', clientName);
                }
            } catch (fbError) {
                console.error('Error saving to Firebase from server:', fbError);
                // We don't block the response if Firebase save fails, but we log it
            }

            return res.status(200).json({
                success: true,
                message: '✅ Please check your mail for e-signature link',
                data: apiResponse.data
            });
        } else {
            return res.status(apiResponse.statusCode).json({
                success: false,
                code: apiResponse.data.code || 'UNKNOWN_ERROR',
                message: apiResponse.data.message || 'An unknown error occurred',
                details: apiResponse.data.details || ''
            });
        }

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all documents from Digio - Note: This returns empty as Digio doesn't have a simple list API
// The actual documents are fetched individually from Firebase submissions using their digioId
app.get('/api/digio/documents', async (req, res) => {
    try {
        // Digio doesn't provide a simple GET endpoint to list all documents
        // Documents are tracked in Firebase and their status is fetched individually
        return res.status(200).json({
            success: true,
            message: 'Digio documents are fetched individually based on Firebase submissions',
            data: [],
            total: 0,
            page: 1,
            totalPages: 0
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get specific document details from Digio
app.get('/api/digio/document/:documentId', async (req, res) => {
    try {
        const { documentId } = req.params;
        
        const url = new URL(`https://api.digio.in/v2/client/document/${documentId}`);
        
        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.DIGIO_AUTH_TOKEN
            }
        };

        const apiResponse = await new Promise((resolve, reject) => {
            const req = https.request(options, (apiRes) => {
                let data = '';
                
                apiRes.on('data', (chunk) => {
                    data += chunk;
                });
                
                apiRes.on('end', () => {
                    try {
                        const responseData = JSON.parse(data);
                        resolve({ statusCode: apiRes.statusCode, data: responseData });
                    } catch (err) {
                        reject(new Error('Failed to parse API response'));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.end();
        });

        if (apiResponse.statusCode === 200) {
            return res.status(200).json({
                success: true,
                data: apiResponse.data
            });
        } else {
            return res.status(apiResponse.statusCode).json({
                success: false,
                message: apiResponse.data.message || 'Failed to fetch document',
                error: apiResponse.data
            });
        }

    } catch (error) {
        console.error('Error fetching document:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Contact form submission with reCAPTCHA verification
app.post('/api/submit-contact', async (req, res) => {
    try {
        const { fullName, mobile, email, serviceType, message, agreeToTerms, website, recaptchaToken } = req.body;

        // Honeypot
        if (website && website.trim() !== '') {
            return res.status(400).json({ success: false, message: 'Bot detected' });
        }

        // Basic validation (server-side)
        if (!fullName || !mobile || !email || !serviceType || !agreeToTerms) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            return res.status(400).json({ success: false, message: 'Invalid mobile number' });
        }

        // Verify reCAPTCHA
        const secret = process.env.RECAPTCHA_SECRET;
        if (!secret) {
            console.warn('RECAPTCHA_SECRET not configured; rejecting submission');
            return res.status(500).json({ success: false, message: 'Server misconfiguration' });
        }

        // For local testing, if secret is placeholder, skip verification
        if (secret === 'TEST_SECRET_DISABLE_VERIFICATION') {
            console.warn('reCAPTCHA verification skipped for local testing');
        } else {
            if (!recaptchaToken) {
                return res.status(400).json({ success: false, message: 'Missing reCAPTCHA token' });
            }

            const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(recaptchaToken)}`;

            const verification = await new Promise((resolve, reject) => {
                const httpsReq = https.request(verificationUrl, { method: 'POST' }, (verRes) => {
                    let data = '';
                    verRes.on('data', (chunk) => data += chunk);
                    verRes.on('end', () => {
                        try {
                            resolve(JSON.parse(data));
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                httpsReq.on('error', reject);
                httpsReq.end();
            });

            if (!verification.success || (verification.score && verification.score < 0.4)) {
                return res.status(403).json({ success: false, message: 'reCAPTCHA verification failed' });
            }
        }

        // Generate a transaction id for tracking
        const transactionId = `tx-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;

        // Save to Firebase (server-side) if admin initialized
        if (admin.apps.length > 0) {
            try {
                const db = admin.database();
                const submissionsRef = db.ref('contact_inquiries');
                await submissionsRef.push({ fullName, mobile, email, serviceType, message, agreeToTerms, submittedAt: new Date().toISOString(), source: 'Contact Us Page (server)', transactionId });
            } catch (err) {
                console.error('Error saving contact submission to Firebase:', err.message || err);
            }
        } else {
            console.warn('Firebase Admin not initialized; contact not saved to server DB');
        }

        return res.status(200).json({ success: true, message: 'Submission received', transactionId });
    } catch (error) {
        console.error('Error in /api/submit-contact:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});