 'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Collect = mongoose.model('Collect', new Schema({
  value: String,
  type: Number,
  // 1 - String
  // 2 - Double
  sensor: { type: Schema.ObjectId, ref: 'Sensor'},
  upload: { type: Schema.ObjectId, ref: 'Upload'},
 	greenhouse: { type: Schema.ObjectId, ref: 'GreenHouse'},
  created_at: Date
}));

module.exports = Collect;