const {
  fileRead,
  handleEndPoint,
  handleChunk,
  handleFilter,
} = require('./handler/publicHandler');
const countries = require('./countries.json');
const fetchHandler = require('./handler/fetch');

const router = (request, response) => {
  const { url } = request;
  const { method } = request;

  const contentType = {
    '.json': 'application/json',
    '.txt': 'text/plain',
  };

  if (url === '/') {
    fileRead(response, 'index.html');
  } else if (url.includes('css') || url.includes('js')) {
    fileRead(response, url);
  } else if (url === '/favicon.ico') {
    fileRead(response, url);
  } else if (url === '/api/country/data' && method === 'POST') {
    handleChunk(request, (data) => {
      fetchHandler(
        `https://restcountries.com/v3.1/name/${JSON.stringify(
          JSON.parse(data)
        )}`,
        response
      );
    });
  } else if (url === '/api/country/filtered' && method === 'POST') {
    const cloneCountries = JSON.parse(JSON.stringify(Object.keys(countries)));

    handleChunk(request, (data) => {
      const filteredArr = handleFilter(cloneCountries, data);

      handleEndPoint(
        response,
        200,
        JSON.stringify(filteredArr),
        'application/json'
      );
    });
  } else {
    handleEndPoint(response, 404, '404 | Page Not Found', contentType['.txt']);
  }
};

module.exports = router;
