const http = require('http');
const router = require('./router');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer(router).listen(PORT, HOST, ()=> {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});


