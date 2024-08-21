const express = require('express');
const passport = require('passport');
const localStrat = require('passport-local');
let users = [{username: 'noah', password: 123}]; //replace users array w/ database


passport.serializeUser((user, done) =>{
    return done(null,user);
});

passport.deserializeUser((user,done) =>{
    return done(null,user);
})



module.exports = passport.use(new localStrat((username, password, done)=>{
    let user = users.find(user => user.username === username);
    if (user) return done(null,user);
    return done(null,null);
})
);