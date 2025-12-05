# Firebase Server-Side Setup Guide

To allow the server to save data to Firebase Realtime Database, you need to set up a Service Account.

## 1. Generate Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Click on the **Gear icon** (Settings) > **Project settings**.
4. Go to the **Service accounts** tab.
5. Click **Generate new private key**.
6. Click **Generate key** to download the JSON file.

## 2. Configure Server

1. Rename the downloaded JSON file to `serviceAccountKey.json`.
2. Place this file in the `server/` directory of your project.
   - *Note: This file contains sensitive credentials. Do not commit it to public repositories.*

## 3. Update Environment Variables (Optional)

If you want to use a different path or database URL, update your `.env` file in the `server/` directory:

```dotenv
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

## 4. Restart Server

After adding the key, restart your server:

```bash
cd server
npm start
```

The server will now automatically save client submissions to the `client_information_submissions` node in your Firebase Realtime Database.
