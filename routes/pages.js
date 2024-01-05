const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

router.get('/', isLoggedIn, (req, res, next) => {
    return res.render('home',{pageTitle: 'home',user: req.session.user});
});

router.get('/login',isLoggedOut, (req, res, next) => {
    return res.render('login',{pageTitle:'login'});
});

router.get('/register',isLoggedOut, (req, res, next) => {
    return res.render('register',{pageTitle:'register'});
});

router.get('*', (req, res, next) => {
    next({status: 404, message: 'Not Found'});
});

module.exports = router;