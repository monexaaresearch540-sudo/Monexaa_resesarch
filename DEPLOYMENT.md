# Server Deployment Guide

## Local Development
```bash
cd server
npm install
node server.js
```

## Production Deployment Options

### 1. **Render.com** (Recommended - Free Tier Available)
1. Create account on [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: monexaa-api
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `PORT` = 5000
   - `DIGIO_API_URL` = https://api.digio.in/v2/client/template/multi_templates/create_sign_request
   - `DIGIO_AUTH_TOKEN` = Your Digio token
   - `DIGIO_TEMPLATE_KEY` = Your template key
   - `ALLOWED_ORIGINS` = https://yourdomain.com
   - `FIREBASE_DATABASE_URL` = https://monexaa-research-default-rtdb.asia-southeast1.firebasedatabase.app
   - `FIREBASE_SERVICE_ACCOUNT_JSON` = (Paste the entire content of your `serviceAccountKey.json` file here)
6. Deploy

### 2. **Railway.app**
1. Visit [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Railway will auto-detect Node.js and deploy

### 3. **Heroku**
```bash
# Install Heroku CLI
heroku login
cd server
heroku create monexaa-api
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Set environment variables
heroku config:set DIGIO_API_URL=your_url
heroku config:set DIGIO_AUTH_TOKEN=your_token
heroku config:set DIGIO_TEMPLATE_KEY=your_key
heroku config:set ALLOWED_ORIGINS=https://yourdomain.com
```

### 4. **DigitalOcean / AWS / VPS**
```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone your-repo
cd server
npm install

# Use PM2 for process management
sudo npm install -g pm2
pm2 start server.js --name monexaa-api
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/api.monexaa.com
```

Nginx config:
```nginx
server {
    listen 80;
    server_name api.monexaa.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/api.monexaa.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.monexaa.com
```

### 5. **Vercel** (Serverless)
Create `vercel.json` in server folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

Deploy:
```bash
npm install -g vercel
cd server
vercel
```

## Important Notes for Production

1. **Environment Variables**: Never commit `.env` file to Git
2. **CORS**: Update `ALLOWED_ORIGINS` with your production frontend URL
3. **SSL**: Always use HTTPS in production
4. **Firewall**: Only allow ports 80, 443, and 22
5. **Monitoring**: Use PM2 or similar for auto-restart
6. **Logs**: Set up proper logging for debugging

## Testing Deployment
```bash
# Test health endpoint
curl https://your-api-url.com/api/health

# Should return: {"status":"ok","message":"Server is running"}
```

## Frontend Environment Update
After deployment, update frontend `.env`:
```
REACT_APP_API_URL=https://your-api-url.com
```
