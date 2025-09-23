# 🎬 SCENARIO

**What do I watch tonight?!**  
Scenario is a modern web client powered by the [TMDB API](https://www.themoviedb.org/documentation/api) to help you discover, track, and organize movies & TV shows.

## 📊 Badges

<p align="left">
  <a href="https://github.com/LightQv/scenario-web-client/stargazers">
    <img src="https://img.shields.io/github/stars/LightQv/scenario-web-client?style=for-the-badge&logo=github" alt="GitHub stars"/>
  </a>
  <a href="https://github.com/LightQv/scenario-web-client/issues">
    <img src="https://img.shields.io/github/issues/LightQv/scenario-web-client?style=for-the-badge&logo=github" alt="GitHub issues"/>
  </a>
  <a href="https://github.com/LightQv/scenario-web-client/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/LightQv/scenario-web-client?style=for-the-badge" alt="License"/>
  </a>
  <a href="https://github.com/LightQv/scenario-web-client/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/LightQv/scenario-web-client/.github/workflows/prod-web-client-docker.yaml?style=for-the-badge&logo=github" alt="CI Status"/>
  </a>
</p>

## ✨ Features

- 🔍 Search for movies, TV shows, actors, or directors
- 🌟 Browse **Top Rated** and **Discover** pages for new ideas
- 🎞️ Watch trailers directly on YouTube
- 📺 Check streaming availability in your country (EN-UK, EN-US, FR supported for now)
- 👤 Create an account and customize your profile (banner + username)
- ✅ Mark movies/TV shows as _watched_
- 📂 Build your own **watchlist**
- 📊 Get personalized stats: total time spent, number of episodes watched, etc.

## 🛠️ Languages & Tools

![Vite](https://img.shields.io/badge/Vite-%236646FF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-%2325C65B.svg?style=for-the-badge&logo=nginx&logoColor=white)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/LightQv/scenario-web-client.git
   cd scenario-web-client

   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Copy `.env.sample` into `.env` and fill in your values.
   You will need at least:

   - A **TMDB API key**
   - A running [Scenario API backend](https://github.com/LightQv/scenario-api) with PostgreSQL

## 🚀 Usage

Run in development mode:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

You can either:

- Use the default credentials provided in the API repo
- Or create your own account

## 🐳 Deployment

The project includes everything for production:

- `Dockerfile` and `Dockerfile.prod`
- `docker-compose.prod.yaml`
- `nginx.conf`

Build for production:

```bash
npm run build
```

Then serve the static files with **nginx** or any other static file server.

## 🔗 About

- **API Repository**: [Scenario API](https://github.com/LightQv/scenario-api)

## 📜 License

This project is released under the **MIT License**.
