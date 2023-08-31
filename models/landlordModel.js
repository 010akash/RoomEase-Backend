const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  profilePhoto: { type: String }, // URL to profile photo
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] // References to rooms owned by the landlord
  // Add other landlord-related fields here
});

module.exports = mongoose.model('Landlord', landlordSchema);
