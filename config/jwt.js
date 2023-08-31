const jwt = require('jsonwebtoken');

const jwtSecret = '123456789'; // Replace with your actual JWT secret key

// Generate JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  return token;
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
