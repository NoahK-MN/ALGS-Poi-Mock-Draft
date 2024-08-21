const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../public/strategies/local');
router.get('/login', (req, res) =>{
    res.render('login');
});

router.post('/login', passport.authenticate('local'), (req,res) =>{
    res.redirect('/');
})

router.get('/signup', (req, res) =>{
    res.render('signup');
});

router.post('/logout', (req,res,next)=>{
    req.logout((err) =>{
        if (err) next(err)
        res.redirect('/');
    })
})

module.exports = router; 