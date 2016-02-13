var solr = require('solr-client'),
    client = solr.createClient({
      port: 8984,
      core: 'sensul-uploader'
    });

client.basicAuth('admin','admin');
client.autoCommit = true;

module.exports = client;
