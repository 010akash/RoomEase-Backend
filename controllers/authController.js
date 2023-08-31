const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in headers
    const decodedToken = jwt.verify(token, '123456789'); // Replace with your actual JWT secret key
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
