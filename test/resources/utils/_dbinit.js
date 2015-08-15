'use strict';

var data = require('./../data/user.json.js');
var db = require('./mongo');

exports.seedData = function(collectionName, data, callback) {
  if (db.dbConnection) {
    db.dbConnection.dropDatabase(initializeSeedData);
  } else {
    db.connect(process.env.MONGODB, function(err, dbConnection) {
      db.dbConnection.dropDatabase(initializeSeedData);
    });
  }

  function initializeSeedData() {
    db.collection(collectionName).insert(data, callback);
  }
};


beforeAll(function(done) {
  db.connect(process.env.MONGODB, done);
});


afterAll(function(done) {
  db.close();
  done();
});
