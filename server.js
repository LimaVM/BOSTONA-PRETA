const fs = require('node:fs');
const http = require('node:http');
const https = require('node:https');
const { parse } = require('node:url');
const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT) || 3000;

const sslKeyPath = process.env.SSL_KEY_PATH;
const sslCertPath = process.env.SSL_CERT_PATH;
const sslCaPath = process.env.SSL_CA_PATH;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function start() {
  await app.prepare();

  const requestHandler = (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  };

  if (sslKeyPath && sslCertPath) {
    const httpsOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath),
      ca: sslCaPath ? fs.readFileSync(sslCaPath) : undefined,
    };

    https
      .createServer(httpsOptions, requestHandler)
      .listen(port, hostname, () => {
        console.log(`> Ready on https://${hostname}:${port} (certs from env)`);
      });
  } else {
    http.createServer(requestHandler).listen(port, hostname, () => {
      console.warn('> SSL paths missing; falling back to HTTP.');
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  }
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
