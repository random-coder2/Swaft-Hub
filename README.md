<div align="center">

  <h1>SwaftHub</h1>
  <p>A modern internet hub for apps, games, and private browsing</p>
  <br />

</div>

# SwaftHub

A versatile "internet hub" - the point of this project is to eliminate the need to search multiple websites for different things by packing together tools, apps, entertainment, and private browsing, all in one place.

## Features

- **Apps & Games Library** - Browse and play directly in your browser
- **Private Browsing** - Built-in proxy support for private access
- **Game Caching** - Download and cache games for offline play
- **Light/Dark Themes** - Multiple theme options including light mode
- **Tab Cloaking** - Hide the site with custom tab titles and icons
- **Responsive UI** - Modern, clean interface that works on all devices

## Light Mode

SwaftHub includes full light mode support! Go to **Settings > Customize > Site Theme** and select either "Light" or "Paper" theme.

## Game Caching

### Cache Individual Games
Click on any game card to play - games are automatically cached for offline access.

### Cache All Games
Use the "Cache All Games" feature on the games page to download all available games at once.

Cached games are stored locally and persist for 3 days of inactivity.

---

### Development & Building

SwaftHub can be easily deployed as a web application. Use the commands below to run it for production, or for developing.

> [!WARNING]
> This project will **not work on Vercel**. SwaftHub runs a custom Node server while Vercel only supports serverless functions & does not allow persistent Node servers.

#### Production:
```bash
git clone https://github.com/random-coder2/Swaft-Hub.git
cd Swaft-Hub
npm i
npm run build
node server.js
```

#### Development:

```bash
git clone https://github.com/random-coder2/Swaft-Hub.git
cd Swaft-Hub
npm i
npm run dev
```

#### Environment Variables

Copy `copy.env` to `.env` and configure:
- `ASSETS_CDN` - Your assets CDN URL (default: https://swafthub-assets.pages.dev)
- `APPS_JSON_URL` - Your apps/games data source URL
- `PORT` - Server port (default: 2345)

---

#### Deploying with Docker:

```bash
docker run -d \
  --name swafthub \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  ghcr.io/random-coder2/swafthub:latest
```

> [!NOTE]
> If accessing over a network instead of localhost, you will need to provide a valid SSL certificate (e.g., using a reverse proxy like Nginx or Caddy). This is required for the built-in service worker to function properly.




Thanks to these libraries for making the project possible:

- [MercuryWorkshop/wisp-server-node](https://github.com/MercuryWorkshop/wisp-server-node)
- [MercuryWorkshop/scramjet](https://github.com/MercuryWorkshop/scramjet)
- [titaniumnetwork-dev/Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet)
- [lucide-icons/lucide](https://github.com/lucide-icons/lucide)
- [pmndrs/zustand](https://github.com/pmndrs/zustand)
- [Stuk/jszip](https://github.com/Stuk/jszip)
  
## License

This project is licensed under the **AGPLv3** license.
See the [LICENSE](LICENSE) file for more details.
