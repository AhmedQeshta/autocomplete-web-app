const {fileRead, handleEndPoint} = require('./handler/publicHandler');
const countries = require('./countries.json');


const router = (req, res)=> {
    const url = req.url;
    const method = req.method;

    const contentType = {
        ".json": "application/json",
        ".txt": "text/plain",
    };


    if (url === "/") {
            fileRead(res, "index.html");
        } else if (url.includes("css") || url.includes("js")) {
            fileRead(res, url);
        }  else {
            handleEndPoint(res, 404, "404 | Page Not Found", contentType[".txt"]);
        }

}

module.exports = router;