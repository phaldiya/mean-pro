'use strict';
var errors = require('./errors.routes');
var user = require('./user.routes');
var role = require('./role.routes');

module.exports = function (app) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'mean-pro' });
  });

  // user CRUD operations
  user(app);

  // role CRUD operations
  role(app);

  // error handlers
  errors(app);
};
