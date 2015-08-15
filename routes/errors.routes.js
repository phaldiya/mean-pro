'use strict';

module.exports = function (app) {

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.name = 'NotFoundError';
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);

        console.error('error at %s\n', req.url, err);
        res.send({
          message: err.message,
          name: err.name
        });
    });
};
