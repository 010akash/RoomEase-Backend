const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'single', 'sharing', 'apartment'
  photos: [{ type: String }], // Array of photo URLs
  address: { type: String, required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' }
  // Add other room-related fields here
});

module.exports = mongoose.model('Room', roomSchema);
