const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function for JWT authentication
const authenticateMobileJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_MOBILE_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateMobileJWT;
