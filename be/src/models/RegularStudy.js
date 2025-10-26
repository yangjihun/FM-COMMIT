const mongoose = require('mongoose');

const RegularStudySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: '모집중' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: [String], default: [] },
  link: { type: String, default: '' },
  team: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('RegularStudy', RegularStudySchema);
