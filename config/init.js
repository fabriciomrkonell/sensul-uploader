'use strict';

var User = require('../models/user');

exports.initialize = function() {
  User.find({
    email: 'sensul@sensul.com'
  }, function(err, user) {
    if(user.length === 0){
      user = new User();
      user.name = 'Administrador';
      user.email = 'sensul@sensul.com';
      user.password = 'sensul';
      user.type = 1;
      user.created_at = new Date();
      user.update_at = new Date();
      user.save();
    }
  });
}