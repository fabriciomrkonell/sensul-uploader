'use strict';

var fs = require('fs'),
    readline = require('readline'),
    Upload = require('../models/upload'),
    google = require('googleapis'),
    googleAuth = require('google-auth-library'),
    google_secret = './credentials/sensul-uploader-secret.json',
    google_app = './credentials/sensul-uploader-app.json';

function authorize(credentials, callback) {
  var auth = new googleAuth(),
      oauth2Client = new auth.OAuth2(
        credentials.installed.client_id,
        credentials.installed.client_secret,
        credentials.installed.redirect_uris[0]
      );

  fs.readFile(google_app, function(err, token) {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
  });
};

exports.authenticate = function(callback){
  fs.readFile(google_secret, function processClientSecrets(err, content) {
    if (err) {
      console.log('Google: error.');
      return;
    }
    authorize(JSON.parse(content), callback);
  });
};

exports.refresh = function(auth){
  var service = google.drive('v3');

  Upload.find({ backup: false }).exec(function(err, data) {
    data.forEach(function(item){
      service.files.create({
        auth: auth,
        resource: {
          'name': item._id,
          'mimeType': 'application/vnd.google-apps.spreadsheet',
          parents: ['0B0ppDK6BvhqUNU5vQTNGUFVwWEE']
        },
        media: {
          mimeType: 'text/csv',
          body: fs.createReadStream(item.path)
        },
        fields: 'id'
      }, function(err, file){
        if(err) return false;
        item.backup = true;
        item.save();
      });
    });
  });
}