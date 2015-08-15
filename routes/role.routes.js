'use strict';

var Role = require('../models/role.model');
require('express-namespace');

module.exports = function (app) {
  app.namespace('/api/role', function() {

    // get by id
    app.get('/:id', function (req, res, next) {
      Role.findById(req.params.id, function (err, result) {
        if (err) { return next(err); }
        console.log(result);
        res.send(result);
      });
    });

    // save user role
    app.post('/', function (req, res, next) {
      var role = new Role(req.body);
      role.save(function (err, result) {
        if (err) { return next(err); }
        res.send(result);
      });
    });
  });
};
