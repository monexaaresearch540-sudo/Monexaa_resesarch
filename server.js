const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const admin = require('firebase-admin');
require('dotenv').config();
const path = require('path');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable gzip/deflate compression for responses
app.use(compression());

// Serve frontend build (if present) with long cache lifetimes for fingerprinted assets
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath, {
    maxAge: '1y',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            // HTML should not be aggressively cached
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
    }
}));

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
