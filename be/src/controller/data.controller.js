const { Types } = require('mongoose');
const Project = require('../models/Project');
const RegularStudy = require('../models/RegularStudy');
const Study = require('../models/Study');

const dataController = {};
const ensureProjectId = (payload = {}) => payload.id || new Types.ObjectId().toString();

// 프로젝트 데이터 관리
dataController.getProjects = async(req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({status: 'success', data: projects});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateProjects = async(req, res) => {
    try {
        const {projects} = req.body;
        if (!Array.isArray(projects)) {
            return res.status(400).json({status: 'fail', error: 'projects payload must be an array'});
        }

        await Project.deleteMany({});
        const normalizedProjects = projects.map(project => ({
            ...project,
            id: ensureProjectId(project)
        }));
        await Project.insertMany(normalizedProjects);
        
        res.status(200).json({status: 'success', message: 'Projects updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.addProject = async(req, res) => {
    try {
        const payload = {...req.body, id: ensureProjectId(req.body)};
        const project = await Project.create(payload);
        
        res.status(200).json({status: 'success', message: 'Project added successfully', data: project});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateProject = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedProject = req.body;
        const project = await Project.findOneAndUpdate({id}, updatedProject, {new: true});
        
        if (!project) {
            return res.status(404).json({status: 'fail', error: 'Project not found'});
        }
        
        res.status(200).json({status: 'success', message: 'Project updated successfully', data: project});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.deleteProject = async(req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findOneAndDelete({id});
        
        if (!project) {
            return res.status(404).json({status: 'fail', error: 'Project not found'});
        }
        
        res.status(200).json({status: 'success', message: 'Project deleted successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

// 스터디 데이터 관리
dataController.getStudy = async(req, res) => {
    try {
        const study = await Study.findOne({});
        res.status(200).json({status: 'success', data: study});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateStudy = async(req, res) => {
    try {
        const updatedData = req.body;
        await Study.findOneAndUpdate({}, updatedData, {upsert: true, new: true});
        
        res.status(200).json({status: 'success', message: 'Study data updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

// 정기 스터디 데이터 관리
dataController.getRegularStudy = async(req, res) => {
    try {
        const studies = await RegularStudy.find({});
        res.status(200).json({status: 'success', data: studies});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateRegularStudy = async(req, res) => {
    try {
        const {projects} = req.body;
        if (!Array.isArray(projects)) {
            return res.status(400).json({status: 'fail', error: 'projects payload must be an array'});
        }
        
        await RegularStudy.deleteMany({});
        const normalized = projects.map(study => ({
            ...study,
            id: ensureProjectId(study)
        }));
        await RegularStudy.insertMany(normalized);
        
        res.status(200).json({status: 'success', message: 'Regular study data updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.addRegularStudy = async(req, res) => {
    try {
        const payload = {...req.body, id: ensureProjectId(req.body)};
        const study = await RegularStudy.create(payload);
        
        res.status(200).json({status: 'success', message: 'Regular study added successfully', data: study});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateRegularStudyItem = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedStudy = req.body;
        const study = await RegularStudy.findOneAndUpdate({id}, updatedStudy, {new: true});
        
        if (!study) {
            return res.status(404).json({status: 'fail', error: 'Study not found'});
        }
        
        res.status(200).json({status: 'success', message: 'Regular study updated successfully', data: study});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.deleteRegularStudy = async(req, res) => {
    try {
        const {id} = req.params;
        const study = await RegularStudy.findOneAndDelete({id});
        
        if (!study) {
            return res.status(404).json({status: 'fail', error: 'Study not found'});
        }
        
        res.status(200).json({status: 'success', message: 'Regular study deleted successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

module.exports = dataController;
