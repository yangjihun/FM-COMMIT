const mongoose = require('mongoose');

const BlockedUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  reason: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('BlockedUser', BlockedUserSchema);
