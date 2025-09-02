const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authController = {};
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

authController.loginWithGoogle = async(req,res) => {
    try{
        const {token} = req.body;
        const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const {email, name} = ticket.getPayload();
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
        res.status(200).json({status:'success', user, toekn: sessionToken});
    } catch(error) {
        res.status(400).json({status:'fail', error: error.message});
    }
}

authController.checkAdminPermission = async(req, res, next) => {
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if (user.level !== 'admin') throw new Error('no permission');
        next();
    } catch(error){
        res.status(400).json({status:'fail', error:error.message});
    }
}

authController.authenticate = async(req,res,next) => {
    try{
        const tokenString=  req.headers.authorization;
        if(!tokenString){
            throw new Error('Token not found');
        }
        const token = tokenString.replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                throw new Error('invalid token');
            }
            req.userId = payload._id;
        });
        next();
    } catch(error){
        res.status(400).json({status:'fail', error:error.message});
    }
}

module.exports = authController;