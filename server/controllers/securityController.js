const jwt = require('jsonwebtoken'); // For generating tokens
const Security = require('../model/Security'); // Your model

const loginSecurityOfficer = async (roll_number, password) => {
  // Find the officer by roll number
  const officer = await Security.findOne({ roll_number });
  if (!officer) {
    return { success: false, message: 'Officer not found' };
  }

  // Compare plain text password
  if (password !== officer.password) {
    return { success: false, message: 'Invalid password' };
  }

  // Generate a token if credentials are correct
  const token = jwt.sign({ roll_number: officer.roll_number, role: 'security' }, 'your_jwt_secret', {
    expiresIn: '1h', // Token expiration time
  });

  return { success: true, token };
};

module.exports = { loginSecurityOfficer };
