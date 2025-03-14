const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll_number: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: true }, // Plain text password (not recommended)

}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
