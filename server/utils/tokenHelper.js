const jwt = require('jsonwebtoken');

function generateToken(userId, role) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };
