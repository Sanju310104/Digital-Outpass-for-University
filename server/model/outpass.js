const mongoose = require('mongoose');

const outpassSchema = new mongoose.Schema({
  roll_number: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  random_key: {  // Field to store the generated QR key
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp when the document is created
  },
}, { timestamps: true }); // Adds both createdAt and updatedAt timestamps

module.exports = mongoose.model('Outpass', outpassSchema);
