const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');
const RegularStudy = require('../models/RegularStudy');
const Study = require('../models/Study');

const readJSON = (fileName) => {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Failed to parse ${fileName}`, error);
    return null;
  }
};

const seedProjects = async () => {
  const count = await Project.countDocuments();
  if (count > 0) return;

  const data = readJSON('projects.json');
  if (data?.projects?.length) {
    await Project.insertMany(data.projects);
    console.log('Seeded projects collection');
  }
};

const seedRegularStudy = async () => {
  const count = await RegularStudy.countDocuments();
  if (count > 0) return;

  const data = readJSON('regularStudy.json');
  if (data?.projects?.length) {
    await RegularStudy.insertMany(data.projects);
    console.log('Seeded regular study collection');
  }
};

const seedStudy = async () => {
  const count = await Study.countDocuments();
  if (count > 0) return;

  const data = readJSON('study.json');
  if (data) {
    await Study.create(data);
    console.log('Seeded study collection');
  }
};

const seedData = async () => {
  await Promise.all([
    seedProjects(),
    seedRegularStudy(),
    seedStudy()
  ]);
};

module.exports = seedData;
