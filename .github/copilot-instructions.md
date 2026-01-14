## Purpose

This file gives actionable, project-specific guidance to AI coding agents working in this repository. Focus on immediate, discoverable patterns and commands so contributors can be productive quickly.

**Big Picture**
- **Monorepo split:** backend is in `kernel` (Express + Mongoose + JWT), frontend is in `klein` (Create React App + TypeScript + React Router).
- **Responsibilities:** `kernel` serves API endpoints and exports the Express app from `kernel/src/app.js`; `klein` is a client app with routes defined in `klein/src/routes/AppRoutes.tsx` and pages/components under `klein/src/pages` and `klein/src/components`.

**How to run (local dev)**
- **Backend:** open a terminal in `kernel` and run `npm run dev` (uses `nodemon`) or `npm start` to run without watcher. Entry: `kernel/server.js` which imports `kernel/src/app.js`.
- **Frontend:** open a terminal in `klein` and run `npm start` (Create React App dev server on port 3000 by default).
- **Run both:** start backend (port 5000 default) and frontend in separate terminals.

**Environment & ports**
- Backend reads `.env` via `dotenv` and defaults to `PORT=5000` in `kernel/server.js`.
- Frontend default port is 3000 (CRA). There is no project-level proxy field in `klein/package.json`—look for frontend API base URLs in the source if calls are failing.

**Key patterns & conventions**
- **Exports:** the Express app is exported from `kernel/src/app.js` (useful for unit tests or serverless wrappers).
- **Routing (frontend):** routes centralized in `klein/src/routes/AppRoutes.tsx` — add new pages under `klein/src/pages` and wire them in `AppRoutes`.
- **Imports:** `klein/tsconfig.json` sets `baseUrl: "src"` and `paths: {"@/*": ["*"]}` — prefer absolute imports using the repo `src` base or the `@/` alias.
- **Styling:** Tailwind and PostCSS are present; `tailwind.config.js` and `postcss.config.js` live at repo root.
- **Backend middleware:** `cors()` and `express.json()` are applied globally in `kernel/src/app.js` — follow this pattern when adding routes/middlewares.

**Files to inspect first (examples)**
- `kernel/server.js` — server entry and default port.
- `kernel/src/app.js` — express app, middlewares, test route `/`.
- `kernel/package.json` — backend scripts (`dev`, `start`) and dependencies.
- `klein/package.json` — CRA scripts (`start`, `build`, `test`).
- `klein/tsconfig.json` — import alias and compiler options.
- `klein/src/routes/AppRoutes.tsx` — how pages are wired.

**Developer workflows & debugging tips**
- To test backend changes quickly, use `npm run dev` in `kernel` and watch logs; the app prints a startup message in `server.js`.
- For frontend routing issues, check `AppRoutes.tsx` and the individual `pages` components.
- If the frontend cannot reach APIs, search the codebase for `fetch(` or `axios` to find the API base URL; add a `proxy` entry in `klein/package.json` or set the API base via environment variables as needed.

**What NOT to change without approval**
- Do not eject CRA from `klein` (`npm run eject`) unless the team explicitly asks — it is irreversible.

If anything here is unclear or you want more detail (example API endpoints, common error patterns, or where to add new models/routes), tell me which area to expand.
