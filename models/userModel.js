const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['tenant', 'landlord'], required: true }, // New role field
  // Add other user-related fields here
});

module.exports = mongoose.model('User', userSchema);
