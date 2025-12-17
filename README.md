# Weather App

Responsive weather app built with Next.js and MUI. The UI is based on the
Frontend Mentor design challenge.

## Features
- Search by city using Open-Meteo geocoding.
- Current weather, hourly forecast, and 7-day forecast.
- Unit switching (temperature, wind, precipitation).
- Static export ready for GitHub Pages.

## Tech Stack
- Next.js (App Router)
- React
- MUI
- Open-Meteo API

## Getting Started
Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build (static export via Next.js):

```bash
npm run build
```

## Deployment (GitHub Pages)
This project is configured for GitHub Pages with a static export.

- Workflow: `.github/workflows/deploy.yml`
- Output: `out/`
- Base path and asset prefix are set in `next.config.mjs`.

## Credits
Design by [Frontend Mentor](https://www.frontendmentor.io/).

## License
MIT
