const { fileRead, handleEndPoint } = require('./handler/publicHandler');
const countries = require('./countries.json');
const fetchHandler = require('./handler/fetch');

const router = (req, res) => {
  const { url } = req;
  const { method } = req;

  const contentType = {
    '.json': 'application/json',
    '.txt': 'text/plain',
  };

  if (url === '/') {
    fileRead(res, 'index.html');
  } else if (url.includes('css') || url.includes('js')) {
    fileRead(res, url);
  } else if (url === '/api/country/data' && method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      fetchHandler(
        `https://restcountries.com/v3.1/name/${JSON.stringify(
          JSON.parse(data)
        )}`,
        res
      );
    });
  } else if (url === '/api/country/filtered' && method === 'POST') {
    const cloneCountries = JSON.parse(JSON.stringify(Object.keys(countries)));

    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const filteredArr = cloneCountries.filter((country) => {
        const countryLowerCase = country.toLowerCase();
        const dataLowerCase = JSON.parse(data).toLowerCase();
        return countryLowerCase.startsWith(dataLowerCase);
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(filteredArr)); // newData
    });
  } else {
    handleEndPoint(res, 404, '404 | Page Not Found', contentType['.txt']);
  }
};

module.exports = router;
