var express = require('express');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function(app) {
    // app.use(express.logger('dev'));
    app.use(morgan(process.env.NODE_ENV || 'dev'));

    // this is good enough for now but you'll
    // want to use connect-mongo or similar
    // for persistant sessions
    app.use(cookieParser());
    app.use(session({ resave: true, saveUninitialized: false, secret: 'building a app'}));

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    // expose session to views
    app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
    });
};
