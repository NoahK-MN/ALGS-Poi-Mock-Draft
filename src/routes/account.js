const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
require('../public/strategies/local');

router.get('/login', (req, res) =>{
    const errorMessage = req.session.messages;
    req.session.messages = undefined; 
    renderLoginPage(res, new User(), errorMessage);
});

router.post('/login', passport.authenticate('local', 
    {failureRedirect: '/account/login', failureMessage:true}), (req,res) =>{
    res.redirect('/');
})

router.get('/signup', (req, res) =>{
    res.render('signup');
});

router.post('/signup', async(req, res) =>{
    const {username, password} = req.body;
    let findUser;
    try {
        findUser = await User.findOne({username});
    }
    catch {
        console.log('error finding User');
        res.sendStatus(404);
    }
    if (findUser){
        renderLoginPage(res, {username, password}, 'That username already exists login instead?');
        return;
    } 
    try {
        let newUser = new User({username, password});
        await newUser.save();
        renderLoginPage(res, newUser, 'Account created you may now login');
    } catch {
        res.send('Error Saving User Try Again Later');
    }
});

router.post('/logout', (req,res,next)=>{
    req.logout((err) =>{
        if (err) next(err)
        res.redirect('/');
    })
})

function renderLoginPage(res, user, message){
    const params = {
        username: user.username,
        password: user.password,
        message,
    }
    res.render('login', params);
}

router.get('/status', (req, res) =>{
    let user = req.user ? req.user : {_id : null, username: null, password: null};
    res.send(user);
});

module.exports = router; 