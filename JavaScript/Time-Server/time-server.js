const http = require('http');
const url = require('url');

function parsetime(time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  };
}

function unixtime(time) {
  return { unixtime: time.getTime() };
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const time = new Date(parsedUrl.query.iso);
  let result;

  if (parsedUrl.pathname === '/api/parsetime') {
    result = parsetime(time);
  } else if (parsedUrl.pathname === '/api/unixtime') {
    result = unixtime(time);
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(Number(process.argv[2]), () => {
  console.log('Node server running on http://localhost:' + process.argv[2]);
});