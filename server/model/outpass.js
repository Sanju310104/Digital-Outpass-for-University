const mongoose = require('mongoose');

const outpassSchema = new mongoose.Schema({
  name: String,
  reason: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp when the document is created
  },
});

module.exports = mongoose.model('Outpass', outpassSchema);

