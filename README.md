# Darshan Kumar J — Developer Portfolio

Personal engineering portfolio, project case-study library, and technical storytelling platform for **Darshan Kumar J** (Python Full-Stack Developer, Bengaluru).

## Architecture Overview

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, React Router, Motion, React Flow (`@xyflow/react`), Lucide Icons, Zod.
- **Backend (`server.ts`)**: Express server running Vite middleware in development and serving compiled `dist/` assets in production, plus:
  - `POST /api/contact`: Zod-validated inquiry handler with IP rate limiting, honeypot spam protection, JSON submission logging (`data/contact-submissions.json`), and optional `CONTACT_WEBHOOK_URL` forwarding.
  - `GET /api/resume.pdf`: On-the-fly PDF resume generator built directly from verified resume details.
- **Centralized Content**: All factual profile details, skills, projects, experience, education, certifications, and technical stories live in `src/data/portfolio.ts` and `src/data/stories.ts`.

## Personal Photograph & Social Links

1. The uploaded personal portrait (`public/assets/aistudio/IMG_1253_3a27f634.jpg`) is integrated directly in the Hero and About portrait frames via `src/data/portfolio.ts` (`PORTFOLIO_PROFILE.portraitPath`).
2. Add verified LinkedIn or GitHub URLs in `src/data/portfolio.ts` under `PORTFOLIO_PROFILE.socialLinks`.

## Local Development

```bash
npm install
npm run dev
```

The server listens on `http://localhost:3000`.

## Production Build & Start

```bash
npm run build
NODE_ENV=production npm start
```
