const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./src/routes/index');
const draftRouter = require('./src/routes/draft');
const accountRouter = require('./src/routes/account');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public/images/', express.static('./public/images'));
app.use(express.static('./src/public')); 

mongoose.connect('mongodb://localhost/apex_db')
    .then(()=> console.log("Connected to Mongo"));

app.use(session({
    secret: "noah",
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 60000 * 60
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/apex_db'
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/draft', draftRouter);
app.use('/account', accountRouter);

app.listen(3000);




