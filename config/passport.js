'use strict';

var User = require('../models/user');

exports.findById = function(id, cb) {
  process.nextTick(function() {
    User.findById(id).exec(function(err, user) {
      if(user === null){
        return cb(new Error('Usuário não existe!'));
      }else{
        return cb(null, user);
      }
    });
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    User.find({
      email: username
    }).exec(function(err, users) {
      if(users.length === 0){
        return cb(null, null);
      }else{
        return cb(null, users[0]);
      }
    });
  });
}