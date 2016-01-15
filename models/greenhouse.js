'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GreenHouse = mongoose.model('GreenHouse', new Schema({
  description: String,
  created_at: Date,
  updated_at: Date
}));

module.exports = GreenHouse;