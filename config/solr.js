var solr = require('solr-client'),
    client = solr.createClient({
    	host: process.env.DEVELOPMENT === 'PRODUCTION' ? '162.243.226.161' : '127.0.0.1',
      port: 8984,
      core: 'sensul-uploader'
    });

client.basicAuth('admin','admin');
client.autoCommit = true;

module.exports = client;
