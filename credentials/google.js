'use strict';

var fs = require('fs'),
    readline = require('readline'),
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

exports.search = function(callback){
  fs.readFile(google_secret, function processClientSecrets(err, content) {
    if (err) {
      console.log('Google: error.');
      return;
    }
    authorize(JSON.parse(content), callback);
  });
};

exports.listAllFiles = function(auth, req, res, next) {
  var service = google.drive('v3');
  service.files.list({
    q: "'0B0ppDK6BvhqUNU5vQTNGUFVwWEE' in parents",
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    if (err) throw res.send({ error: true, message: 'Google: error.', data: err });
    res.send({ error: false, message: 'Google: success.', data: response.files });
  });
};

function createFile(auth){
  var service = google.drive('v3');
  var fileMetadata = {
    'name': 'My Report',
    'mimeType': 'application/vnd.google-apps.spreadsheet',
    parents: ['0B0ppDK6BvhqUNU5vQTNGUFVwWEE']
  };
  var media = {
    mimeType: 'text/csv',
    body: fs.createReadStream(google_app)
  };
  service.files.create({
     auth: auth,
     resource: fileMetadata,
     media: media,
     fields: 'id'
  }, function(err, file) {
    if(err) {
      // Handle error
      console.log(err);
    } else {
      console.log('File Id:' , file.id);
    }
  });
}