const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authController = {};
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const User = require('../models/User');
const BlockedUser = require('../models/BlockedUser');
const bcrypt = require('bcryptjs');

authController.loginWithGoogle = async(req,res) => {
    try{
        const {token} = req.body;
        
        const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const {email, name} = ticket.getPayload();
        if (!email.endsWith('@gachon.ac.kr')) {
            throw new Error('gachon email이 아닙니다');
        }
        const normalizedEmail = email.toLowerCase();
        const blockedEntry = await BlockedUser.findOne({email: normalizedEmail});
        if (blockedEntry) {
            throw new Error('차단된 사용자입니다. 관리자에게 문의하세요.');
        }
        let user = await User.findOne({email: normalizedEmail});
        if (user && user.isBlocked) {
            throw new Error('차단된 사용자입니다. 관리자에게 문의하세요.');
        }
        if (!user) {
            const randomPassword = ''+Math.floor(Math.random() * 100000000);
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(randomPassword, salt);
            user = new User({
                name,
                email: normalizedEmail,
                password: newPassword
            });
            await user.save();
        }
        const sessionToken = await user.generateToken();
        res.status(200).json({status:'success', user, token: sessionToken});
    } catch(error) {
        res.status(400).json({status:'fail', error: error.message});
    }
}


authController.authenticate = async(req, res, next) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({status:'fail', error: 'Access denied. No token provided.'});
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({status:'fail', error: 'Invalid token.'});
        }
        if (user.isBlocked) {
            return res.status(403).json({status:'fail', error: 'Blocked user'});
        }
        req.userId = decoded._id;
        next();
    } catch(error) {
        res.status(400).json({status:'fail', error: 'Invalid token.'});
    }
}

authController.loginAdmin = async(req, res) => {
    try{
        const {email, password} = req.body;
        
        // .env에서 admin 계정 정보 확인
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (email !== adminEmail || password !== adminPassword) {
            throw new Error('Invalid admin credentials');
        }
        
        // admin 계정이 DB에 없으면 생성
        let adminUser = await User.findOne({email: adminEmail});
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);
            adminUser = new User({
                name: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                level: 'admin'
            });
            await adminUser.save();
        }
        
        const sessionToken = await adminUser.generateToken();
        res.status(200).json({status:'success', user: adminUser, token: sessionToken});
    } catch(error) {
        res.status(400).json({status:'fail', error: error.message});
    }
}

// 기존 유저를 admin으로 승격시키는 함수
authController.promoteToAdmin = async(req, res) => {
    try{
        const {userId} = req;
        const {targetEmail} = req.body;
        
        // 현재 사용자가 admin인지 확인
        const currentUser = await User.findById(userId);
        if (!currentUser || currentUser.level !== 'admin') {
            return res.status(403).json({status:'fail', error: 'Admin permission required'});
        }
        
        // 대상 유저 찾기
        const targetUser = await User.findOne({email: targetEmail?.toLowerCase()});
        if (!targetUser) {
            return res.status(404).json({status:'fail', error: 'User not found'});
        }
        
        // 이미 admin인지 확인
        if (targetUser.level === 'admin') {
            return res.status(400).json({status:'fail', error: 'User is already an admin'});
        }
        
        // admin으로 승격
        targetUser.level = 'admin';
        await targetUser.save();
        
        res.status(200).json({status:'success', message: 'User promoted to admin successfully', user: targetUser});
    } catch(error) {
        res.status(500).json({status:'fail', error: error.message});
    }
}

// admin 권한을 제거하는 함수
authController.demoteFromAdmin = async(req, res) => {
    try{
        const {userId} = req;
        const {targetEmail} = req.body;
        
        // 현재 사용자가 admin인지 확인
        const currentUser = await User.findById(userId);
        if (!currentUser || currentUser.level !== 'admin') {
            return res.status(403).json({status:'fail', error: 'Admin permission required'});
        }
        
        // 대상 유저 찾기
        const targetUser = await User.findOne({email: targetEmail?.toLowerCase()});
        if (!targetUser) {
            return res.status(404).json({status:'fail', error: 'User not found'});
        }
        
        // 본인은 권한을 제거할 수 없음
        if (targetUser.email === currentUser.email) {
            return res.status(400).json({status:'fail', error: 'Cannot demote yourself'});
        }
        
        // admin 권한 제거
        targetUser.level = 'customer';
        await targetUser.save();
        
        res.status(200).json({status:'success', message: 'User demoted from admin successfully', user: targetUser});
    } catch(error) {
        res.status(500).json({status:'fail', error: error.message});
    }
}

authController.checkAdminPermission = async(req, res, next) => {
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({status:'fail', error: 'User not found'});
        }
        if (user.level !== 'admin') {
            return res.status(403).json({status:'fail', error: 'Admin permission required'});
        }
        next();
    } catch(error) {
        res.status(500).json({status:'fail', error: error.message});
    }
}

module.exports = authController;
