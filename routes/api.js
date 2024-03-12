const express = require('express');
const router = express.Router();

const { addNewUser,loginUser } = require('../services/user');

router.post('/register', async(req, res,next) => {
    try{
        await addNewUser(req.body);
        res.status(200).json({success: true, message: 'User registered successfully'});
    }catch(err){
        req.isApiError = true;
        next(err);
    }
});

router.post('/login', async(req, res,next) => {
    try{
        const userData = await loginUser(req.body);
        req.session.user = userData;
        res.status(200).json({success: true, message: 'User logged in successfully'});
    }catch(err){
        req.isApiError = true;
        next(err);
    }
});

router.get('/logout', async(req, res,next) => {
    try{
        req.session.destroy();
        res.status(200).json({success: true, message: 'User logged out successfully'});
    }catch(err){
        req.isApiError = true;
        next(err);
    }
});

router.all('*', (req, res, next) => {
    req.isApiError = true;
    next({status: 404, message: 'Api Route Not Found'});
});

module.exports = router;