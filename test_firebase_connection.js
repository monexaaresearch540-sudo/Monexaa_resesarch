const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
require('dotenv').config();

console.log("Testing Firebase Connection...");
console.log("Project ID from key:", serviceAccount.project_id);
console.log("Database URL from env:", process.env.FIREBASE_DATABASE_URL);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });

    console.log("Firebase Admin initialized.");

    const db = admin.database();
    const ref = db.ref('server_connection_test');

    console.log("Attempting to write to database...");
    
    ref.set({
        status: "connected",
        timestamp: Date.now(),
        message: "Hello from server test script"
    })
    .then(() => {
        console.log("✅ SUCCESS: Data written to Firebase successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ ERROR: Failed to write to Firebase:", error);
        process.exit(1);
    });

} catch (error) {
    console.error("❌ CRITICAL ERROR:", error);
}
