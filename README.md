# Luxury Hotel — Full-Stack Student Project

Upgrade of the original static HTML/CSS/JS hotel site into a real full-stack
app:

- **Frontend:** React 18 + Vite + React Router (`/frontend`)
- **Backend / API / Database:** Strapi v4 headless CMS (`/backend`)
- **Auth:** Strapi's built-in Users & Permissions plugin
  (register, login, forgot/reset password, JWT)
- **CRUD:** a `Room` content-type in Strapi (stands in for "services /
  products" — a hotel's product is its rooms), managed either from
  Strapi's own admin panel or from the custom **Admin Dashboard** page
  built inside the React app.

```
luxury-hotel-fullstack/
├── frontend/          React app (public site + auth + admin dashboard)
└── backend/           Strapi setup guide + content-type schema to import
```

## How the two pieces fit together

Strapi is not just a database — it's a full backend: it gives you a REST
API, a database (SQLite by default, no setup needed), an admin GUI, and
authentication out of the box. The React app is a pure frontend client
that talks to Strapi over HTTP.

```
React (Vite, :5173)  ── axios/fetch ──►  Strapi API (:1337/api/...)
                                              │
                                        SQLite / Postgres
```

## 1. Set up the backend (Strapi)

Strapi can't be scaffolded inside this sandbox (no network access here),
so run this on your own machine:

```bash
npx create-strapi-app@latest backend --quickstart
cd backend
npm run develop
```

This opens `http://localhost:1337/admin` — create your first Strapi admin
user there (this is Strapi's own CMS admin, separate from your app's
"Admin Dashboard" role).

Then follow **`backend/README.md`** to:
1. Create the `Room` content-type (fields listed there, or import
   `backend/content-types/room/schema.json`).
2. Turn on public read permissions so the website can list rooms.
3. Create an `Admin` role so only certain registered users can
   create/edit/delete rooms.

## 2. Set up the frontend (React)

```bash
cd frontend
npm install
cp .env.example .env      # point it at your Strapi URL
npm run dev
```

Visit `http://localhost:5173`.

## Pages included

**Public site**
- `/` Home
- `/about` About
- `/rooms` Rooms & Services (pulled live from Strapi)
- `/contact` Contact

**Auth** (all call Strapi's `/api/auth/*` endpoints)
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

**Admin dashboard** (protected route, requires login)
- `/admin` — overview
- `/admin/rooms` — full CRUD table (create, edit, delete rooms/services)

See `frontend/README.md` (inside the frontend folder, in `src/`) and
`backend/README.md` for the details of each side.
