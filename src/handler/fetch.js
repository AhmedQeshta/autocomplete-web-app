const https = require('https');

const fetchHandler = (link, response) => {
  https
    .get(link, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        response.writeHead(200, { 'content-type': 'application/json' });

        response.end(data);
      });
    })
    .on('error', () => {});
};

module.exports = fetchHandler;
