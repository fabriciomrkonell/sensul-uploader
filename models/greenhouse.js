'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GreenHouse = mongoose.model('GreenHouse', new Schema({
  name: String,
  grower: { type: Schema.ObjectId, ref: 'Grower'},
  uploads: [{ type: Schema.ObjectId, ref: 'Upload' }],
  created_at: Date,
  updated_at: Date
}));

module.exports = GreenHouse;