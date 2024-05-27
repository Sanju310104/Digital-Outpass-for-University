const mongoose = require('mongoose');

const outpassSchema = new mongoose.Schema({
  name: String,
  reason: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Outpass', outpassSchema);
