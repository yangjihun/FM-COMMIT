const fs = require('fs');
const path = require('path');

const dataController = {};

// 프로젝트 데이터 관리
dataController.getProjects = async(req, res) => {
    try {
        const filePath = path.join(__dirname, '../../fe/src/data/projects.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.status(200).json({status: 'success', data: data.projects});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateProjects = async(req, res) => {
    try {
        const {projects} = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/projects.json');
        
        const data = {projects};
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Projects updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.addProject = async(req, res) => {
    try {
        const newProject = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/projects.json');
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.projects.push(newProject);
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Project added successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateProject = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedProject = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/projects.json');
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const projectIndex = data.projects.findIndex(project => project.id === id);
        
        if (projectIndex === -1) {
            return res.status(404).json({status: 'fail', error: 'Project not found'});
        }
        
        data.projects[projectIndex] = {...data.projects[projectIndex], ...updatedProject};
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Project updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.deleteProject = async(req, res) => {
    try {
        const {id} = req.params;
        const filePath = path.join(__dirname, '../../fe/src/data/projects.json');
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.projects = data.projects.filter(project => project.id !== id);
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Project deleted successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

// 스터디 데이터 관리
dataController.getStudy = async(req, res) => {
    try {
        const filePath = path.join(__dirname, '../../fe/src/data/study.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.status(200).json({status: 'success', data});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateStudy = async(req, res) => {
    try {
        const updatedData = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/study.json');
        
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        
        res.status(200).json({status: 'success', message: 'Study data updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

// 정기 스터디 데이터 관리
dataController.getRegularStudy = async(req, res) => {
    try {
        const filePath = path.join(__dirname, '../../fe/src/data/regularStudy.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.status(200).json({status: 'success', data: data.projects});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateRegularStudy = async(req, res) => {
    try {
        const {projects} = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/regularStudy.json');
        
        const data = {projects};
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Regular study data updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.addRegularStudy = async(req, res) => {
    try {
        const newStudy = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/regularStudy.json');
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.projects.push(newStudy);
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Regular study added successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.updateRegularStudyItem = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedStudy = req.body;
        const filePath = path.join(__dirname, '../../fe/src/data/regularStudy.json');
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const studyIndex = data.projects.findIndex(study => study.id === id);
        
        if (studyIndex === -1) {
            return res.status(404).json({status: 'fail', error: 'Study not found'});
        }
        
        data.projects[studyIndex] = {...data.projects[studyIndex], ...updatedStudy};
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Regular study updated successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

dataController.deleteRegularStudy = async(req, res) => {
    try {
        const {id} = req.params;
        const filePath = path.join(__dirname, '../../fe/src/data/regularStudy.json');
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.projects = data.projects.filter(study => study.id !== id);
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.status(200).json({status: 'success', message: 'Regular study deleted successfully'});
    } catch(error) {
        res.status(500).json({status: 'fail', error: error.message});
    }
}

module.exports = dataController;
