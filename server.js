// app dependencies.
var express = require('express');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var routes = require('./routes/index.routes');
var middleware = require('./middleware/app-middleware');
var path = require('path');
var config = require('./config/app-config');
//var debug = require('debug')(config.appTitle + ':server');

// add mongoose query and promise support to express
require('express-mongoose');
mongoose.set('debug', true);

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('port', normalizePort(config.serverPort));
app.use(favicon(path.join(__dirname, 'public/img/favicon.ico')));
middleware(app);
routes(app);

// Create the database connection
mongoose.connect(config.dbUrl);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.dbUrl);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) { return val; } // named pipe
  if (port >= 0) { return port; } // port number
  return false;
}
