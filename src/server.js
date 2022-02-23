const http = require('http');
const router = require('./router');

// const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

http.createServer(router).listen(process.env.PORT || 3000, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://${HOST}:${process.env.PORT || 3000}`);
});
