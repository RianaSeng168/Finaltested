# Frontend — React + Vite

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

`VITE_STRAPI_URL` in `.env` must point at your running Strapi instance
(default `http://localhost:1337`).

## Structure

```
src/
├── lib/api.js              axios instance + every Strapi call (auth + rooms CRUD)
├── context/AuthContext.jsx JWT/user state, exposes useAuth()
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx  route guard (login required / admin required)
├── pages/
│   ├── Home.jsx, About.jsx, Contact.jsx, Rooms.jsx, NotFound.jsx
│   ├── auth/Login.jsx, Register.jsx, ForgotPassword.jsx, ResetPassword.jsx
│   └── admin/AdminLayout.jsx, AdminDashboard.jsx, AdminRooms.jsx
└── styles/                 main.css + responsive.css are the original site's
                             design system, reused as-is; auth.css and
                             admin.css are new for the pages above
```

## How auth works here

1. `Register.jsx` / `Login.jsx` call Strapi's `/api/auth/local/register` and
   `/api/auth/local`, which return `{ jwt, user }`.
2. The JWT is stored in `localStorage` and attached to every future request
   by an axios interceptor in `lib/api.js`.
3. `AuthContext` calls `/api/users/me` on page load to re-validate that
   token and restore the session.
4. `ProtectedRoute` redirects to `/login` if there's no user, or to `/` if
   `adminOnly` is set and the user's Strapi role isn't named `Admin`.

## How the admin CRUD works

`pages/admin/AdminRooms.jsx` is a plain create/edit/delete form + table
that calls `getRooms / createRoom / updateRoom / deleteRoom` from
`lib/api.js`, which hit Strapi's auto-generated REST routes for the
`Room` content-type (`/api/rooms`). Strapi enforces who's allowed to do
what — see `../backend/README.md`.

## Deploying it live (not just localhost)

### Option A — GitHub Pages

GitHub Pages only serves files that already exist as built output — it
has no server to fall back to `index.html` for a route like `/rooms`,
which is why a raw source repo (or a direct link to `/rooms`) 404s.
Two changes here already handle that:

- **`vite.config.js`** sets `base: "/Finaltest/"` so every asset URL in
  the build points at the right sub-path
  (`https://<your-username>.github.io/Finaltest/`). **If your repo name
  isn't `Finaltest`, change this line first.**
- **`src/main.jsx`** uses `HashRouter` instead of `BrowserRouter`, so
  routes look like `.../Finaltest/#/rooms` — the `#` part is never sent
  to the server, so GitHub Pages never needs to know `/rooms` exists.

To deploy:

```bash
cd frontend
npm install
npm run deploy
```

That builds the app and pushes `dist/` to a `gh-pages` branch (via the
`gh-pages` package, already added to `package.json`). Then in your repo
on GitHub: **Settings → Pages → Build and deployment → Source** → set
branch to `gh-pages`, folder `/ (root)`. Give it a minute, then visit
`https://<your-username>.github.io/Finaltest/`.

Every time you change the code, re-run `npm run deploy` to push a new
build.

> Root-cause reminder: this only fixes the **frontend**. GitHub Pages
> still can't run Strapi — you need Option B's backend step (or the one
> in `../backend/README.md`) regardless of which frontend host you pick.

### Option B — Vercel or Netlify (recommended once the backend is live)

Handles environment variables and routing with zero config, so you can
go back to `BrowserRouter`/clean URLs if you switch to this later.

1. **Deploy the backend first** (see `../backend/README.md` → "Deploying
   it live") so you have a live Strapi URL to point at.
2. **Import the repo into Vercel** (or Netlify) at vercel.com. Set the
   project's root directory to `/frontend`. Vercel auto-detects Vite:
   build command `npm run build`, output directory `dist`.
3. **Add the environment variable** `VITE_STRAPI_URL` in the project's
   settings, set to your live Strapi URL (e.g.
   `https://your-backend.onrender.com`). This is the production
   equivalent of your local `.env` file — Vite bakes it into the build,
   so you must redeploy after changing it.
4. **Redeploy**, then open the Vercel URL and check `/rooms` loads real
   data, and that Register/Login/`/admin` all work end to end.
5. If requests fail with a CORS error in the browser console, it means
   your live frontend's URL isn't yet in the backend's
   `config/middlewares.js` CORS `origin` list — add it there and
   redeploy the backend.
