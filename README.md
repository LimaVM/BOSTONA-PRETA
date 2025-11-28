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

Use these steps to run the site directly with a Node.js HTTPS server (no Nginx):

1. **Point DNS to the VPS**
   - Create an `A` record for `vegaconsultoria.com` (and `www` if desired) pointing to your VPS public IP.

2. **Install system dependencies**
   - `sudo apt update && sudo apt install -y git ufw certbot`
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

4. **Obtain SSL certificates with Certbot (standalone)**
   - Stop any service using port 80 before issuing certificates.
   - Issue certificates for both roots: `sudo certbot certonly --standalone -d vegaconsultoria.com -d www.vegaconsultoria.com`
   - Certificates will be placed under `/etc/letsencrypt/live/vegaconsultoria.com/`.
   - Auto-renew is handled by Certbot’s timer. You can test renewal with:
     ```bash
     sudo systemctl status certbot.timer
     sudo certbot renew --dry-run
     ```

5. **Create your environment file for HTTPS**
   - Copy the sample: `cp .env.example .env`
   - Ensure the certificate paths match the Certbot output (defaults in the sample use `/etc/letsencrypt/live/vegaconsultoria.com/`).
   - Set `PORT=443` if you want to listen directly on HTTPS; set `HOST=0.0.0.0` to listen on all interfaces.

6. **Allow Node.js to bind to port 443 (once)**
   ```bash
   sudo setcap 'cap_net_bind_service=+ep' $(which node)
   ```

7. **Run the app as a systemd service (HTTPS via server.js)**
   - Create `/etc/systemd/system/vegaconsultoria.service`:
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
     EnvironmentFile=/var/www/vegaconsultoria/.env

     [Install]
     WantedBy=multi-user.target
     ```
   - Enable and start: `sudo systemctl enable --now vegaconsultoria`.

8. **Firewall hardening (optional)**
   - Allow SSH/HTTP/HTTPS: `sudo ufw allow OpenSSH && sudo ufw allow 80 && sudo ufw allow 443 && sudo ufw enable`.

## Build your app

Continue building your app on:

**[https://v0.app/chat/tMyFyOn68MX](https://v0.app/chat/tMyFyOn68MX)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
