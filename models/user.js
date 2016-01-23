'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  name: String,
  email: String,
  password: String,
  type: Number,
  // 1 - Administrator
  created_at: Date,
  updated_at: Date
}));

module.exports = User;