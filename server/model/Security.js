const mongoose = require('mongoose');

const SecuritySchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true, // Assuming employee ID is unique for each security officer
  },
  password: {
    type: String,
    required: true,
  },
  // Other security officer fields (e.g., name, contact, etc.)
});

const Security = mongoose.model('Security', SecuritySchema);

module.exports = Security;
