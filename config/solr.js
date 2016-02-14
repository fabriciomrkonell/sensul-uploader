var solr = require('solr-client'),
    client = solr.createClient({
    	host: process.env.DEVELOPMENT === undefined ? '127.0.0.1' : '162.243.226.161',
      port: 8984,
      core: 'sensul-uploader'
    });

client.basicAuth('admin','admin');
client.autoCommit = true;

module.exports = client;
