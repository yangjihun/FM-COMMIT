const express = require('express');
const router = express.Router();
const dataController = require('../controller/data.controller');
const authController = require('../controller/auth.controller');

// 모든 데이터 관리 라우트는 admin 권한 필요
router.use(authController.authenticate);
router.use(authController.checkAdminPermission);

// 프로젝트 관리
router.get('/projects', dataController.getProjects);
router.put('/projects', dataController.updateProjects);
router.post('/projects', dataController.addProject);
router.put('/projects/:id', dataController.updateProject);
router.delete('/projects/:id', dataController.deleteProject);

// 스터디 관리
router.get('/study', dataController.getStudy);
router.put('/study', dataController.updateStudy);

// 정기 스터디 관리
router.get('/regular-study', dataController.getRegularStudy);
router.put('/regular-study', dataController.updateRegularStudy);
router.post('/regular-study', dataController.addRegularStudy);
router.put('/regular-study/:id', dataController.updateRegularStudyItem);
router.delete('/regular-study/:id', dataController.deleteRegularStudy);

module.exports = router;
