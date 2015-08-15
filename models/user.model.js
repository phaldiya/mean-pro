"use strict";

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Role = require('./role.model');

var userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  zip: {type: Number},
  phone: {type: Number},
  dateOfBirth: {type: Date, required: true},
  roles:[{ type: Schema.Types.ObjectId, ref:"Role" }],
  dateCreated : { type: Date, required: true, default: Date.now}
}, { collection: 'user', versionKey: false });

userSchema.statics = {
  findById: function (id, callback) {
    return this.findOne({_id: id}).populate('roles').exec(function(err, user) {
      callback(err, user);
    });
  },
  findByName: function (name, callback) {
    return this.find({name: new RegExp(name, 'i')}).populate('roles').exec(function(err, user) {
      callback(err, user);
    });
  },
  getAll: function (callback) {
    return this.find({}).populate('roles').exec(function(err, user) {
      callback(err, user);
    });
  },
  save: function(formUser, callback) {
    this.save(callback);
  }
};

var User = mongoose.model('User', userSchema);
module.exports = User;
