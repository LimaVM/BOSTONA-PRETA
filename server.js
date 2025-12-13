const fs = require('node:fs');
const http = require('node:http');
const https = require('node:https');
const { parse } = require('node:url');
const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT) || 3000;
const redirectPort = Number(process.env.HTTP_REDIRECT_PORT) || 80;

const sslKeyPath = process.env.SSL_KEY_PATH;
const sslCertPath = process.env.SSL_CERT_PATH;
const sslCaPath = process.env.SSL_CA_PATH;

const allowedHosts = (process.env.ALLOWED_HOSTS || '')
  .split(',')
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);

const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 120;
const rateLimitStore = new Map();

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function isHostAllowed(hostHeader) {
  if (!allowedHosts.length || !hostHeader) return true;
  const [incomingHost] = hostHeader.toLowerCase().split(':');
  return allowedHosts.includes(incomingHost);
}

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return current.count > rateLimitMax;
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (Array.isArray(xff)) return xff[0];
  if (typeof xff === 'string') return xff.split(',')[0].trim();
  return req.socket.remoteAddress;
}

async function start() {
  await app.prepare();

  const requestHandler = (req, res) => {
    if (!isHostAllowed(req.headers.host)) {
      res.statusCode = 400;
      res.end('Invalid Host header.');
      console.warn('Blocked request with invalid host:', req.headers.host);
      return;
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      res.statusCode = 429;
      res.setHeader('Retry-After', Math.ceil(rateLimitWindowMs / 1000));
      res.end('Too many requests.');
      console.warn('Rate limited request from IP:', clientIp);
      return;
    }

    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  };

  if (sslKeyPath && sslCertPath) {
    const httpsOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath),
      ca: sslCaPath ? fs.readFileSync(sslCaPath) : undefined,
      minVersion: 'TLSv1.2',
    };

    https
      .createServer(httpsOptions, requestHandler)
      .listen(port, hostname, () => {
        console.log(`> Ready on https://${hostname}:${port} (certs from env)`);
      });

    // Optional HTTP -> HTTPS redirect for stray requests.
    http
      .createServer((req, res) => {
        const host = req.headers.host || '';
        const redirectHost = host.includes(':') ? host.split(':')[0] : host;
        res.statusCode = 301;
        res.setHeader('Location', `https://${redirectHost}:${port}${req.url}`);
        res.end();
      })
      .listen(redirectPort, hostname, () => {
        console.log(`> Redirecting http://${hostname}:${redirectPort} -> https://${hostname}:${port}`);
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
