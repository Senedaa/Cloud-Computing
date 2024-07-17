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

function currenttime() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // Months are zero-based
    date: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes()
  };
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const time = new Date(parsedUrl.query.iso);
  let result;

  if (parsedUrl.pathname === '/api/parsetime') {
    result = parsetime(time);
  } else if (parsedUrl.pathname === '/api/unixtime') {
    result = unixtime(time);
  } else if (parsedUrl.pathname === '/api/currenttime') {
    result = currenttime();
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = Number(process.argv[2]) || 8000;

function startServer(port) {
  server.listen(port, () => {
    console.log('Node server running on http://localhost:' + port);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.log(`Server error: ${err}`);
    }
  });
}

startServer(port);
