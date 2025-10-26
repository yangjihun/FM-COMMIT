const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: '진행중' },
  progress: { type: Number, default: 0 },
  team: { type: [String], default: [] },
  techStack: { type: [String], default: [] },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: [String], default: [] },
  difficulty: { type: String, default: '' },
  detailDescription: { type: [String], default: [] },
  features: { type: [String], default: [] },
  challenges: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
