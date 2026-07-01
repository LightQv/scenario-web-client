<div align="center">

<img src="https://raw.githubusercontent.com/LightQv/scenario-expo/main/assets/images/icon.png" alt="Scenario icon" width="96" height="96" />

# SCENARIO WEB

React web client for discovering, tracking, and organizing movies and TV shows.

[About](#about) · [Setup](#setup) · [Development](#development) · [Configuration](#configuration) · [Deployment](#deployment) · [Related Projects](#related-projects) · [License](#license)

</div>

---

## About

Scenario Web is the browser client for the Scenario movie and TV tracking application.

It integrates with TMDB for media discovery and with Scenario API for authenticated user data. The client supports search, discovery, top-rated browsing, details pages, watchlists, viewing history, profile customization, and viewing statistics.

Core components:

- React application built with Vite
- Tailwind CSS styling
- React Router route structure with protected routes
- Context-based state for authentication, themes, genres, and views
- Axios service instances for backend and TMDB API calls
- Formik and Yup for form handling and validation

---

## Setup

Clone the repository:

```bash
git clone https://github.com/LightQv/scenario-web-client.git
cd scenario-web-client
```

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.sample .env
```

---

## Development

Run the development server:

```bash
npm run dev
```

The Vite server runs at:

```text
http://localhost:5173
```

Run linting:

```bash
npm run lint
```

Build the production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Start the preview server on `0.0.0.0:5173`:

```bash
npm run start
```

---

## Configuration

Configuration is loaded through Vite environment variables.

Required variables:

- `VITE_API_URL`: Scenario API base URL
- `VITE_TMDB_API_KEY`: TMDB API key
- `VITE_TMDB_API_TOKEN`: TMDB API bearer token

The backend must be available and configured for cookie-based authentication.

---

## Deployment

The repository includes Docker and nginx configuration for production deployments:

- `Dockerfile`
- `Dockerfile.prod`
- `docker-compose.prod.yaml`
- `nginx.conf`

Build static assets before serving them with nginx or another static file server:

```bash
npm run build
```

---

## Project Structure

```text
src/
├── components/   # Reusable UI, navigation, auth, result, and toast components
├── contexts/     # Global React context providers
├── pages/        # Route-level page components
└── services/     # API clients, i18n, validators, data helpers, utilities
```

---

## Related Projects

- [Scenario API](https://github.com/LightQv/scenario-fast-api)
- [Scenario Expo](https://github.com/LightQv/scenario-expo)

---

## License

Scenario Web is licensed under the MIT License. See [LICENSE](LICENSE).
