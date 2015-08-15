'use strict';

var User = require('../models/user.model');
require('express-namespace');

module.exports = function (app) {
  app.namespace('/api/user', function() {

    // get all users
    app.get('/', function (req, res, next) {
      User.getAll(function (err, result) {
        if (err) { return next(err); }
        res.send(result);
      });
    });

    // get by id
    app.get('/:id', function (req, res, next) {
      User.findById(req.params.id, function (err, result) {
        if (err) { return next(err); }
        res.send(result);
      });
    });

    // save user
    app.post('/', function (req, res, next) {
      var user = new User(req.body);
      user.save(function (err, result) {
        if (err) { return next(err); }
        res.send(result);
      });
    });
  });
};

