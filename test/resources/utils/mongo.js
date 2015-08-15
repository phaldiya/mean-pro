'use strict';
var MongoClient = require('mongodb').MongoClient;

var db = {
  dbConnection: null,
  connect: function(url, cb) {
    MongoClient.connect(url, function(err, _db) {
      if (err) {
        throw new Error('Could not connect: ' + err);
      }

      db.dbConnection = _db;

      if (cb) {
        cb(null, db.dbConnection);
      }
    });
  },
  collection: function(name) {
    return db.dbConnection.collection(name);
  },
  close: function() {
    return db.dbConnection.close();
  }
};

module.exports = db;
