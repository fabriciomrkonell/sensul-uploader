'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  name: String,
  email: { type: String, index: { unique: true } },
  password: String,
  type: Number,
  // 1 - Administrator
  // 2 - Epagri
  created_at: Date,
  updated_at: Date
}));

module.exports = User;