# JSDelivr Setup Guide for SwaftHub

## Quick Start

### Option 1: Direct HTML File (Easiest)

1. **Upload this file to any static host** (GitHub Pages, Netlify, etc.):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SwaftHub</title>
    
    <!-- Your backend server -->
    <script>
      window.BACKEND_URL = 'https://scramjet.swaft.org';
    </script>
    
    <!-- Load SwaftHub from JSDelivr -->
    <script type="module">
      // Dynamically load the latest built JS
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/gh/random-coder2/Swaft-Hub@main/dist/app.js';
      document.head.appendChild(script);
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Option 2: NPM + JSDelivr

If you publish SwaftHub to npm:

```html
<script src="https://cdn.jsdelivr.net/npm/swafthub@latest/dist/app.js"></script>
```

### Option 3: GitHub Releases

1. Create a release on GitHub with the built `dist/` folder
2. Users can access via:
   ```
   https://cdn.jsdelivr.net/gh/random-coder2/Swaft-Hub@latest/dist/index.html
   ```

## Your Backend Server Setup

On your server (`scramjet.swaft.org`), you need:

1. **Node.js installed**
2. **Clone and run the backend:**

```bash
git clone https://github.com/random-coder2/Swaft-Hub.git
cd Swaft-Hub
npm install
npm run build

# Set environment variables
export PORT=2345
export ASSETS_CDN="https://swafthub-assets.pages.dev"
export APPS_JSON_URL="https://swafthub-apps.pages.dev/apps.json"

# Run the server
node server.js
```

3. **Use PM2 for production:**

```bash
npm install -g pm2
pm2 start server.js --name swafthub
pm2 save
pm2 startup
```

4. **Nginx reverse proxy** (for SSL):

```nginx
server {
    listen 443 ssl http2;
    server_name scramjet.swaft.org;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:2345;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## CORS Configuration

Make sure your backend allows requests from JSDelivr domains. The `server.js` already has basic CORS support, but you may need to add:

```javascript
// In server.js, add to your Fastify instance
app.register(cors, {
  origin: ['https://cdn.jsdelivr.net', 'https://jsdelivr.net', 'https://*.github.io'],
  credentials: true
});
```

## Testing

1. Start your backend server
2. Open the HTML file in a browser
3. Go to **Settings > Advanced > Backend Server** to verify it points to your server
4. Try browsing - it should proxy through your backend

## Troubleshooting

- **CORS errors**: Check that your backend allows the JSDelivr origin
- **WebSocket failures**: Ensure Wisp server is running on your backend
- **Bare server errors**: Verify `/seal/` endpoint is accessible
- **Service Worker issues**: JSDelivr may cache SW files - add cache-busting query params

## Alternative: GitHub Pages + Your Backend

1. Enable GitHub Pages on your repo (Settings > Pages)
2. Set source to `gh-pages` branch or `/docs` folder
3. Users access: `https://random-coder2.github.io/Swaft-Hub`
4. Backend still runs on your server

This gives you a clean URL while keeping the backend separate.
