const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

// eslint-disable-next-line no-unused-vars
router.get('/', isLoggedIn, (req, res, _next) => {
    return res.render('home',{pageTitle: 'home',user: req.session.user});
});

// eslint-disable-next-line no-unused-vars
router.get('/login',isLoggedOut, (_req, res, _next) => {
    return res.render('login',{pageTitle:'login'});
});

// eslint-disable-next-line no-unused-vars
router.get('/register',isLoggedOut, (_req, res, _next) => {
    return res.render('register',{pageTitle:'register'});
});

router.get('*', (_req, _res, next) => {
    next({status: 404, message: 'Not Found'});
});

module.exports = router;