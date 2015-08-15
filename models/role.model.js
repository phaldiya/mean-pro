"use strict";

var mongoose = require('mongoose'),
  relationship = require("mongoose-relationship"),
  Schema = mongoose.Schema;

var RoleEnum = {
  values: ['ADMIN', 'USER'],
  message: 'role enum validator failed for path `{PATH}` with value `{VALUE}`'
};

var roleSchema = new Schema({
  name: { type: String, required: true, trim: true , enum: RoleEnum },
  active: { type: Boolean, default: true },
  user: { type:Schema.Types.ObjectId, ref:"User", childPath:"roles" },
  dateCreated : { type: Date, required: true, default: Date.now }
}, { collection: 'role', versionKey: false });

roleSchema.plugin(relationship, { relationshipPathName:'user' });

roleSchema.statics = {
  findById: function (id, callback) {
    return this.findOne({_id: id}).populate('user').exec(function(err, role) {
      callback(err, role);
    });
  },
  save: function(userRole, callback) {
    this.save(callback);
  }
};

var Role = mongoose.model('Role', roleSchema);
module.exports = Role;
