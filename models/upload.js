'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Upload = mongoose.model('Upload', new Schema({
  name: String,
  path: String,
  status: Number,
  // 1 - Upload
  // 2 - Processando
  // 3 - Finalizado
  backup: Boolean,
  greenhouse: { type: Schema.ObjectId, ref: 'GreenHouse'},
  created_at: Date
}));

module.exports = Upload;