const User = require('../models/User');
const BlockedUser = require('../models/BlockedUser');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async(req,res) => {
    try{
        let {email, name, password, level} = req.body;
        if (!email.endsWith('@gachon.ac.kr')) {
            throw new Error('gachon email이 아닙니다');
        }
        const normalizedEmail = email.toLowerCase();
        const blockedEntry = await BlockedUser.findOne({email: normalizedEmail});
        if (blockedEntry) {
            throw new Error('차단된 이메일입니다. 관리자에게 문의하세요.');
        }
        const user = await User.findOne({email: normalizedEmail});
        if (user) {
            throw new Error('이미 가입된 유저입니다');
        }
        const salt = await bcrypt.genSaltSync(10);
        password = await bcrypt.hash(password, salt);
        const newUser = new User({email: normalizedEmail, password, name, level:level?level:'customer'});
        await newUser.save();
        return res.status(200).json({status:'success'});
    } catch(error){
        res.status(400).json({status:'fail', error:error.message});
    }
}

userController.getUser = async(req,res) => {
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if (user) {
            return res.status(200).json({status:'success', user});
        }
        throw new Error('Invalid token');
    } catch(error) {
        res.status(400).json({status:'fail', error:error.message});
    }
}

userController.getAllUsers = async(req,res) => {
    try{
        const users = await User.find({}, 'name email level createdAt isBlocked');
        return res.status(200).json({status:'success', users});
    } catch(error) {
        res.status(500).json({status:'fail', error:error.message});
    }
}

userController.updateUserLevel = async(req,res) => {
    try{
        const {userId} = req;
        const {targetUserId, level} = req.body;
        
        // 현재 사용자가 admin인지 확인
        const currentUser = await User.findById(userId);
        if (!currentUser || currentUser.level !== 'admin') {
            return res.status(403).json({status:'fail', error: 'Admin permission required'});
        }
        
        // 대상 유저 찾기
        const targetUser = await User.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({status:'fail', error: 'User not found'});
        }
        
        // 본인은 권한을 변경할 수 없음
        if (targetUser._id.toString() === userId) {
            return res.status(400).json({status:'fail', error: 'Cannot change your own level'});
        }
        
        // 권한 업데이트
        targetUser.level = level;
        await targetUser.save();
        
        res.status(200).json({status:'success', message: 'User level updated successfully', user: targetUser});
    } catch(error) {
        res.status(500).json({status:'fail', error:error.message});
    }
}

userController.blockUser = async(req, res) => {
    try{
        const {email, reason} = req.body;
        if (!email) {
            return res.status(400).json({status:'fail', error: 'Email is required'});
        }
        const normalizedEmail = email.toLowerCase();
        const blockedUser = await BlockedUser.findOneAndUpdate(
            {email: normalizedEmail},
            {email: normalizedEmail, reason},
            {upsert: true, new: true, setDefaultsOnInsert: true}
        );
        await User.updateMany({email: normalizedEmail}, {isBlocked: true});
        return res.status(200).json({status:'success', data: blockedUser});
    } catch(error) {
        res.status(500).json({status:'fail', error:error.message});
    }
}

userController.unblockUser = async(req, res) => {
    try{
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({status:'fail', error: 'Email is required'});
        }
        const normalizedEmail = email.toLowerCase();
        await BlockedUser.findOneAndDelete({email: normalizedEmail});
        await User.updateMany({email: normalizedEmail}, {isBlocked: false});
        return res.status(200).json({status:'success', message: 'User unblocked successfully'});
    } catch(error) {
        res.status(500).json({status:'fail', error:error.message});
    }
}

userController.getBlockedUsers = async(req, res) => {
    try{
        const blockedUsers = await BlockedUser.find({});
        return res.status(200).json({status:'success', data: blockedUsers});
    } catch(error) {
        res.status(500).json({status:'fail', error:error.message});
    }
}

module.exports = userController;
