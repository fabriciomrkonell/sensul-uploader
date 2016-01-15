'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Grower = mongoose.model('Grower', new Schema({
  name: String,
  city: String,
  created_at: Date,
  updated_at: Date
}));

module.exports = Grower;