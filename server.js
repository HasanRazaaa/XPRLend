const http = require('http');
const corslite = require('corslite');

http.createServer(function (req, res) {
  corslite(req.url, function (err, response) {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error fetching data');
    } else {
      res.writeHead(response.status, response.headers);
      res.end(response.body);
    }
  });
}).listen(8080);

console.log('Server running at http://localhost:8080/');