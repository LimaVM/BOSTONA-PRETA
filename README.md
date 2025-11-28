# Vegan Network clone

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/denilzalimalopes-7571s-projects/v0-vegan-network-clone)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/tMyFyOn68MX)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/denilzalimalopes-7571s-projects/v0-vegan-network-clone](https://vercel.com/denilzalimalopes-7571s-projects/v0-vegan-network-clone)**

## Self-hosting on Ubuntu 24 + Node.js 22 with HTTPS (vegaconsultoria.com)

Use these steps to run the site on your own VPS with Node.js 22 and Certbot-managed SSL:

1. **Point DNS to the VPS**
   - Create an `A` record for `vegaconsultoria.com` (and `www` if desired) pointing to your VPS public IP.

2. **Install system dependencies**
   - `sudo apt update && sudo apt install -y nginx git ufw`
   - Install Node.js 22 from NodeSource:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
   - Install `pnpm` globally for faster installs:
     ```bash
     sudo corepack enable
     corepack prepare pnpm@latest --activate
     ```

3. **Clone and build the app**
   ```bash
   git clone https://github.com/<your-account>/BOSTONA-PRETA.git /var/www/vegaconsultoria
   cd /var/www/vegaconsultoria
   pnpm install --frozen-lockfile
   pnpm build
   ```

4. **Run the app as a service (Node.js server on port 3000)**
   - Create a systemd service at `/etc/systemd/system/vegaconsultoria.service`:
     ```ini
     [Unit]
     Description=Vegaconsultoria Next.js app
     After=network.target

     [Service]
     Type=simple
     WorkingDirectory=/var/www/vegaconsultoria
     ExecStart=/usr/bin/pnpm start
     Restart=always
     Environment=NODE_ENV=production

     [Install]
     WantedBy=multi-user.target
     ```
   - Enable and start: `sudo systemctl enable --now vegaconsultoria`.

5. **Configure Nginx reverse proxy**
   - Create `/etc/nginx/sites-available/vegaconsultoria.com`:
     ```nginx
     server {
       server_name vegaconsultoria.com www.vegaconsultoria.com;

       location / {
         proxy_pass http://127.0.0.1:3000;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;
       }
     }
     ```
   - Enable and test: `sudo ln -s /etc/nginx/sites-available/vegaconsultoria.com /etc/nginx/sites-enabled/` then `sudo nginx -t` and `sudo systemctl reload nginx`.

6. **Obtain and renew SSL certificates with Certbot**
   - Install Certbot for Nginx: `sudo apt install -y certbot python3-certbot-nginx`.
   - Issue certificates: `sudo certbot --nginx -d vegaconsultoria.com -d www.vegaconsultoria.com` (follow prompts for redirects).
   - Auto-renew is configured by Certbot’s systemd timer; verify with `sudo systemctl status certbot.timer`.

7. **Firewall hardening (optional)**
   - Allow SSH/HTTP/HTTPS: `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`.

## Build your app

Continue building your app on:

**[https://v0.app/chat/tMyFyOn68MX](https://v0.app/chat/tMyFyOn68MX)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
