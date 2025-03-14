// File: routes/securityRoutes.js

const express = require('express');
const { loginSecurityOfficer } = require('../controllers/securityController.js'); // Import login function
const router = express.Router();

// Update the route to match frontend call
router.post('/api/Security', async (req, res) => {
  const { roll_number, password } = req.body;
  
  try {
    const result = await loginSecurityOfficer(roll_number, password);
    if (result.success) {
      res.status(200).json({ token: result.token, role: 'security' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).send('Error logging in security officer');
  }
});

module.exports = router;
