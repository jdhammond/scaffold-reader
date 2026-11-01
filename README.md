# Scaffold Reader

A small React + TypeScript app that renders a reading passage with the scaffolds (glossary definitions, home-language translations, simplified rewordings) appropriate to a selected student.

See [NOTES.md](NOTES.md) for data issues, design decisions, and next steps.

## Requirements

- Node.js 22.13+ or 24+ (the strictest of the `engines` ranges declared by Vite, Vitest, and ESLint)

## Getting started

```sh
git clone <repo-url>
cd scaffold-reader
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm test`        | Run unit tests (Vitest, watch mode)  |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Project layout

- `data-source/scaffold-reader-data.json` — the raw passage, students, and scaffolds
- `src/helpers/` — the data layer: filtering scaffolds for a student, resolving anchors and overlaps, and splitting the passage into segments
- `src/TextSegment.tsx` — renders a passage segment and its scaffold tooltip
- `src/StudentSelector.tsx` — the student picker
