'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sensor = mongoose.model('Sensor', new Schema({
  name: { type: String, index: { unique: true } },
  description: String,
  created_at: Date,
  updated_at: Date
}));

module.exports = Sensor;