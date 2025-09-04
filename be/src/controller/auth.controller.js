const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authController = {};
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const User = require('../models/User');
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
        let user = await User.findOne({email});
        if (!user) {
            const randomPassword = ''+Math.floor(Math.random() * 100000000);
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(randomPassword, salt);
            user = new User({
                name,
                email,
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
        req.userId = decoded._id;
        next();
    } catch(error) {
        res.status(400).json({status:'fail', error: 'Invalid token.'});
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