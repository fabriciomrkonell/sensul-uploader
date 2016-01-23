'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserGreenHouse = mongoose.model('UserGreenHouse', new Schema({
  greenhouse: { type: Schema.ObjectId, ref: 'GreenHouse'},
  user: { type: Schema.ObjectId, ref: 'User' },
  created_at: Date,
  updated_at: Date
}));

module.exports = UserGreenHouse;