const mongoose = require('mongoose');

const InfoCardSchema = new mongoose.Schema({
  icon: String,
  title: String,
  content: String
}, { _id: false });

const StudyContentSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String
}, { _id: false });

const WeeklyStudySchema = new mongoose.Schema({
  week: Number,
  date: String,
  href: String
}, { _id: false });

const StatsSchema = new mongoose.Schema({
  totalSessions: String,
  basicTrack: {
    label: String,
    current: String
  },
  advancedTrack: {
    label: String,
    current: String
  }
}, { _id: false });

const StudySchema = new mongoose.Schema({
  header: {
    title: String,
    description: String,
    icon: String
  },
  description: String,
  infoCards: { type: [InfoCardSchema], default: [] },
  studyContent: { type: [StudyContentSchema], default: [] },
  weeklyStudies: { type: [WeeklyStudySchema], default: [] },
  stats: StatsSchema
}, { timestamps: true });

module.exports = mongoose.model('Study', StudySchema);
