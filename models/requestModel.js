const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  // Add other request-related fields here
});

module.exports = mongoose.model('Request', requestSchema);
