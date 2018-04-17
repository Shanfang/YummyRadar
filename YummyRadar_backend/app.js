var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

var appRouter = require('./routes/app');
var businessRouter = require('./routes/business');
var reviewRouter = require('./routes/review');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send.status(200);
    }
    next();
});


app.use('/v1/business', businessRouter);
app.use('/v1/review', reviewRouter);
app.use('/', appRouter);



// error handler
app.use(function (err, req, res, next) {
    return res.render('index');
});


module.exports = app;
