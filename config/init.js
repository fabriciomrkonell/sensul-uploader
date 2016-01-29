'use strict';

var User = require('../models/user'),
    UserGreenHouse = require('../models/usergreenhouse'),
    GreenHouse = require('../models/greenhouse'),
    Grower = require('../models/grower'),
    Sensor = require('../models/sensor'),
    Upload = require('../models/upload'),
    Collect = require('../models/collect');

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

  //User.remove().exec();
  //UserGreenHouse.remove().exec();
  //GreenHouse.remove().exec();
  //Grower.remove().exec();
  //Sensor.remove().exec();
  //Upload.remove().exec();
  //Collect.remove().exec();
}