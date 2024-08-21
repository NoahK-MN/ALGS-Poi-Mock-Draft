const express = require('express');
const passport = require('passport');
const localStrat = require('passport-local');
const User = require('../../models/user');


passport.serializeUser((user, done) =>{
    return done(null,user);
});

passport.deserializeUser( async(user, done) =>{
    try {
        const findUser = await User.findOne(user);
        if (!findUser) throw new Error('User Not Found');
        return done(null, findUser);
    }
    catch (err){
        return done(err,null);
    }
})



module.exports = passport.use(new localStrat( async(username, password, done)=>{
    try {
        const findUser = await User.findOne({username});
        if (!findUser) return done(null,null, {message: 'Username Not found'});
        if(findUser.password !== password) return done(null,null, {message: 'Incorrect Password'});
        return done(null,findUser);
    } catch (err){
        return done(err, null);
    }
})
);