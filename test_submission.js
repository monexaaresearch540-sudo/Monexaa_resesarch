const http = require('http');

const data = JSON.stringify({
  clientName: "Test User AI",
  fatherName: "Test Father",
  mobile: "9999999999",
  email: "durgesh.test@example.com",
  dob: "1995-01-01",
  pan: "ABCDE1234F",
  aadhaar: "222233334444",
  address: "123 Test Street, Digital India",
  clientId: "TEST_AI_001"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/client-information',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log("Sending test request to server...");

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let responseBody = '';
  
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', responseBody);
  });
});

req.on('error', (error) => {
  console.error('Error making request:', error);
});

req.write(data);
req.end();
