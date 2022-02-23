const http = require('http');
const router = require('./router');

// const PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST || 'localhost';

http.createServer(router).listen(process.env.PORT || 3000);
