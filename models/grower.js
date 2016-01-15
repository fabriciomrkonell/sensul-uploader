'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Grower = mongoose.model('Grower', new Schema({
  name: String,
  city: String,
  greenhouses: [{ type: Schema.ObjectId, ref: 'GreenHouse' }],
  created_at: Date,
  updated_at: Date
}));

module.exports = Grower;