'use strict';
var request = require('supertest')(process.env.SITE_URL);
var dbinit = require('../resources/utils/_dbinit');
var data = require('./data/user.json.js');
var stringify = require('json-stable-stringify');

describe('User Routes', function () {

  beforeEach(function(done) {
    dbinit.seedData('user', data, done);
  });

  it("should be able to get list of users", function(done){
    request.get('/api/user/')
      .expect(200)
      .end(verifyResponse);

    function verifyResponse(err, res) {
      if (err) throw err;

      expect(res.body.length).toBe(4);
      expect(stringify(res.body)).toEqual(stringify(data));
      done();
    }
  });

  it("should be able to find user by id", function(done){
    var id = '55b79b32f55df61f0e058c27';

    request.get('/api/user/' + id)
      .expect(200)
      .end(verifyResponse);

    function verifyResponse(err, res) {
      if (err) throw err;

      expect(stringify(res.body)).toEqual(stringify(data[2]));
      done();
    }
  });

  it("should be able to save user", function(done){
    var data = {
      "_id" : "55b7e9d3fd6a29c7215d0c00",
      "name" : "Pradeep Haldiya",
      "email" : "ph@gmail.com",
      "address" : "1640 F Street APT 3",
      "zip" : 95616,
      "phone" : 5301234567,
      "dateOfBirth" : "2010-01-01T08:00:00.000Z",
      "dateCreated" : "2015-07-28T20:45:07.962Z",
      "roles" : [ ]
    };

    request.post('/api/user/')
      .send(data)
      .expect(200)
      .end(verifyResponse);

    function verifyResponse(err, res) {
      if (err) throw err;

      expect(stringify(res.body)).toEqual(stringify(data));
      done();
    }
  });
});
