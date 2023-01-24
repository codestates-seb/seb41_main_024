const og = require('open-graph');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const cors = require('cors');

app.use(cors());

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 3443;

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      if (parsedUrl.pathname === '/api/fetch-og-data') {
        const url = parsedUrl.query.url;
          og(url, (err, meta) => {
              if (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err }));
                  console.log(err)
                  return;
              }
              res.statusCode = 200;
              res.end(JSON.stringify(meta));
              console.log(meta)
          });
      } 
      else {
        handle(req, res, parsedUrl);
      }
  }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${port}`);
  });
});
