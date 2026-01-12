// Example server-side reCAPTCHA v3 verification (Node.js)
// Place your secret in an environment variable on the server (RECAPTCHA_SECRET)
// Do NOT commit your secret to source control.

const fetch = require('node-fetch'); // or use global fetch in newer Node

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) throw new Error('RECAPTCHA_SECRET not set in environment');

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params
  });

  const data = await res.json();
  // data: { success, score, action, challenge_ts, hostname, 'error-codes': [...] }
  return data;
}

module.exports = { verifyRecaptcha };

// Example usage in an Express route:
// const express = require('express');
// const app = express();
// const { verifyRecaptcha } = require('./recaptcha_verify_example');
// app.post('/api/submit-contact', async (req, res) => {
//   const token = req.body.recaptchaToken;
//   if (!token) return res.status(400).json({ success: false, message: 'No token' });
//   const result = await verifyRecaptcha(token);
//   if (!result.success || (result.score !== undefined && result.score < 0.5)) {
//     return res.status(403).json({ success: false, message: 'reCAPTCHA verification failed', result });
//   }
//   // proceed with saving form data
//   res.json({ success: true });
// });
