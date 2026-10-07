# agrimjaimini.github.io

Personal site of Agrim Jaimini. Built with Next.js (static export) and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static site is written to `out/`. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

## Where things live

- `src/data/portfolioData.ts`: experience, projects, education, and the "Now" section
- `content/writing/*.mdx`: posts (see `content/writing/README.md`)
- `src/components/IsingField.tsx`: Fig. 1, an Ising model sampled with Metropolis–Hastings
- `src/app/fonts/`: self-hosted Switzer (Fontshare); Geist Mono comes from `next/font/google`
- Analytics: Umami, loaded in production builds only (`src/app/layout.tsx`)
