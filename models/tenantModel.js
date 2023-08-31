const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true },
  aadharNumber: { type: String },
  aadharPhoto: { type: String }, // URL to Aadhar photo
  passportPhoto: { type: String }, // URL to passport photo
  password: { type: String, required: true },
  rentedRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' } // Reference to the rented room
  // Add other tenant-related fields here
});

module.exports = mongoose.model('Tenant', tenantSchema);
