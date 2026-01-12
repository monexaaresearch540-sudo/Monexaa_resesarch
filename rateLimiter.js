// Simple in-memory rate limiter middleware for Express
// Allows max X requests per Y minutes per IP


const rateLimitMap = new Map();
// Simple in-memory blacklist (add IPs to this array to block them)
const BLACKLISTED_IPS = [
  // '123.123.123.123', // Example: Add suspicious IPs here
];

const RATE_LIMIT = 5; // max submissions
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes


function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;

  // Check if IP is blacklisted
  if (BLACKLISTED_IPS.includes(ip)) {
    return res.status(403).json({
      success: false,
      message: 'Your IP has been blocked due to suspicious activity.'
    });
  }

  const now = Date.now();
  let entry = rateLimitMap.get(ip);

  if (!entry) {
    entry = { count: 1, start: now };
    rateLimitMap.set(ip, entry);
    return next();
  }

  if (now - entry.start > WINDOW_MS) {
    // Reset window
    entry.count = 1;
    entry.start = now;
    return next();
  }

  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({
      success: false,
      message: `Too many submissions from this IP. Please try again after 10 minutes.`
    });
  }

  entry.count++;
  next();
}

module.exports = rateLimiter;
