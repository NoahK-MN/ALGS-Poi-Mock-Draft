const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./src/routes/index');
const draftRouter = require('./src/routes/draft');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.use(express.static('./src/public')); 

app.use('/', indexRouter);
app.use('/draft', draftRouter);


app.listen(3000);




