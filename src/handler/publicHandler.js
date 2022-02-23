const {readFile} = require('fs');
const path = require('path');


const handleEndPoint = (response, statusCode, data, contentType) => {
    response.writeHead(statusCode, { "Content-Type": contentType });
    response.end(data);
};

const fileRead = (response, url) => {
    const filePath = path.join(__dirname, "..", "..", "public", url);
    const extension = path.extname(filePath);

    const contentType = {
        ".js": "text/javascript",
        ".css": "text/css",
        ".html": "text/html",
        ".jpg": "text/jpg",
        ".png": "text/png",
        ".json": "application/json",
        ".txt": "text/plain",
        ".ico": "image/x-icon",
    };

    readFile(filePath, "utf8", (err, file) => {
        /* istanbul ignore if */
        if (err) {
            handleEndPoint(response, 500, "server error", contentType[".txt"]);
        } else {
            handleEndPoint(response, 200, file, contentType[extension]);
        }
    });
};

module.exports = {
    fileRead,
    handleEndPoint
}