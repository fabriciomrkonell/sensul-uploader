'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  name: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date
}));

User.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = User;