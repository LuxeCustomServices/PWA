# Repo guidance for AI coding agents

This repository is a small PWA-focused invoicing app. Below are concise, repo-specific details an AI agent needs to be immediately productive.

Summary
- Purpose: business invoicing PWA (React) with a lightweight Express server that serves the built frontend.
- Architecture: frontend React app lives under `public/client/` and is built into `public/client/build/`. The Express server (root `server.js`) serves files from that `build` folder and falls back to `index.html` for client-side routing.

Key files and why they matter
- `server.js`: Express static server. Serves `public/client/build` and sends the SPA `index.html` for all routes.
- `package.json` (root): small; `start` runs `node server.js`. Use this for serving a production build.
- `public/client/package.json`: React app. Use `npm start` (dev) or `npm run build` (production build). The server expects the build output at `public/client/build`.
- `public/client/src/App.js`: React Router v6 configuration and main route list (`/`, `/invoices`, `/quotes`, `/payments`, `/schedule`).
- `public/sw.js`: service worker that implements a simple cache-first strategy for PWA offline support.
- `sw.js` (repo root): appears to contain unrelated Java code — treat as a stray/misplaced file.

Developer workflows (concrete commands)
- Run frontend in dev mode (hot reload):

```bash
cd public/client
npm install
npm start
```

- Produce a production build and run the Node server:

```bash
cd public/client
npm install
npm run build
cd ../..    # back to repo root
npm install
npm start   # runs `node server.js`, serves build at http://localhost:3000
```

- Run the server only (assumes `public/client/build` exists):

```bash
npm start
# or: node server.js
```

Project-specific conventions & gotchas
- Frontend location: unlike many projects, the React app lives under `public/client/` (not a top-level `client/`). The Express server statically serves `public/client/build` — do not move the build output without updating `server.js`.
- SPA routing: `server.js` returns `index.html` for all routes; changes to client routes should keep this server behavior in mind.
- Service worker: `public/sw.js` caches a small set of root-level files. If you update build filenames, update `public/sw.js` accordingly.
- Dependency mismatch: root `package.json` depends on `react@^19` whereas the React app uses `react@^18` in `public/client/package.json`. Be cautious when upgrading shared dependencies; keep installs scoped to each package.json.
- Stray files: `sw.js` at repo root appears to be accidental Java code. Verify before editing or deleting.

Patterns to follow (examples)
- Routing: See `public/client/src/App.js` for how routes map to `public/client/src/pages/*` components.
- Page components: `public/client/src/pages/*.js` are simple functional components — prefer small, focused components that match existing style.
- Build & serve: always build the React app into `public/client/build` and run the root `npm start` to serve it.

What not to change without confirmation
- `server.js` routing/serve path and `public/client/package.json` scripts — these are central to local dev and production hosting.
- `public/sw.js` behavior — changing caching strategy affects offline behavior and existing users.

If you need to make a PR
- Keep changes minimal and focused. Provide a short description explaining why you moved files (for example, if you relocate the client app) and update `server.js` paths accordingly.

Questions for the maintainer
- Is `sw.js` at the repo root intentionally present? (It looks like misplaced Java.)
- Are there preferred deployment targets (Heroku, Vercel, Docker)? If so, include deploy details to extend these instructions.

If anything above is unclear or you want different detail (CI, Dockerfile, or deploy steps), tell me which area to expand.
