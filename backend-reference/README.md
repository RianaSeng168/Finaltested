# Backend — Strapi

Strapi gives you the database, the REST API, authentication, and an admin
GUI, all in one. You don't write backend code for the "basic" scope of
this project — you configure it through Strapi's admin panel.

## 1. Create the project

Run this on your own machine (this sandbox has no network access, so it
can't be scaffolded here):

```bash
npx create-strapi-app@latest backend --quickstart
```

`--quickstart` sets it up with SQLite so there's zero database
configuration. When it finishes it opens `http://localhost:1337/admin` —
create your first **Strapi admin** account there (this is the CMS admin
login, not a "site user").

## 2. Create the `Room` content-type

In the Strapi admin: **Content-Type Builder → Create new collection type**
→ name it `Room`, then add these fields (also saved as
`content-types/room/schema.json` in this folder if you'd rather copy the
file straight into `backend/src/api/room/content-types/room/schema.json`
and restart Strapi):

| Field         | Type    | Notes                                   |
|---------------|---------|------------------------------------------|
| `name`        | Text    | required                                 |
| `category`    | Text    | e.g. "Deluxe Room", "Executive Suite"    |
| `price`       | Number (decimal) | required                       |
| `description` | Rich/Long text | required                          |
| `amenities`   | Text    | comma-separated, e.g. `King Bed, Wi-Fi`  |
| `image`       | Text    | image URL (or swap for a Media field)    |

Save — Strapi auto-generates REST routes:
`GET/POST /api/rooms`, `GET/PUT/DELETE /api/rooms/:id`.

## 3. Open up public **read** access

By default nobody outside Strapi can call the API. Go to:

**Settings → Users & Permissions Plugin → Roles → Public**

Under **Room**, check `find` and `findOne`, then Save. Now the public
Rooms page in the React app can list rooms without logging in.

## 4. Create an `Admin` role for the dashboard

**Settings → Users & Permissions Plugin → Roles → Add new role**

- Name it `Admin`.
- Under **Room**, check `find`, `findOne`, `create`, `update`, `delete`.
- Under **Users-Permissions → User**, you can leave defaults.
- Save.

Then give that role to whichever account should see the Admin Dashboard:
**Content Manager → User** (or **Users-Permissions plugin's users list**)
→ open the user → set **Role** to `Admin` → Save.

> The frontend checks `user.role.name === "Admin"` (see
> `frontend/src/context/AuthContext.jsx`) to decide whether to show the
> `/admin` link and let the route render — but the *real* security is
> this permission matrix on the Strapi side, since that's what actually
> blocks the API calls.

## 5. Auth emails (forgot / reset password)

By default Strapi's forgot-password email is only logged to the console
in development, not actually sent. To really send it:

**Settings → Email** — configure a provider (e.g. `strapi-provider-email-sendgrid`,
or a plain SMTP provider) and set:

**Settings → Users & Permissions Plugin → Advanced Settings → Reset
password page** to `http://localhost:5173/reset-password` — that's the
frontend route that reads the `?code=` from the emailed link.

## 6. CORS

If the React dev server (`http://localhost:5173`) gets CORS errors
calling Strapi, add it to `backend/config/middlewares.js`:

```js
module.exports = [
  // ...
  {
    name: "strapi::cors",
    config: {
      origin: ["http://localhost:5173"],
    },
  },
  // ...
];
```

## 7. Deploying it live (not just localhost)

Strapi is a real Node server, so it needs a host that keeps a process
running — this is different from a static file host like GitHub Pages,
which can't run Strapi at all.

1. **Pick a host.** Render.com or Railway.app both have free tiers.
   Create a new Web Service from your GitHub repo, set the root directory
   to `/backend`, build command `npm run build`, start command
   `npm run start`. You'll get a public URL like
   `https://your-backend.onrender.com`.
2. **Switch off SQLite for production.** Free hosts wipe local disk on
   restart, which would silently delete your rooms/users. Add a free
   Postgres database from the same host and set `DATABASE_CLIENT=postgres`
   plus the connection env vars (host, port, user, password, database)
   Strapi needs — see the [Strapi database config docs](https://docs.strapi.io/dev-docs/configurations/database).
3. **Redo your setup on the live instance.** A fresh deploy is a fresh
   Strapi install: log into `https://your-backend.onrender.com/admin`,
   create your admin account again, re-add the `Room` content-type (or
   drop in `content-types/room/schema.json`), and repeat steps 3 and 4
   above (public read access + the `Admin` role) on the live site.
4. **Update CORS for your live frontend's URL** — not just
   `localhost:5173` — in `config/middlewares.js`:

   ```js
   {
     name: "strapi::cors",
     config: {
       origin: ["http://localhost:5173", "https://your-site.vercel.app"],
     },
   },
   ```

5. Once it's live, point the frontend at it — see
   `frontend/README.md` → "Deploying it live."

## Extending this

- Add a `Service` content-type the same way if you want spa/dining
  "services" separate from `Room`.
- Add a `Message` content-type + wire `frontend/src/pages/Contact.jsx` to
  POST to it, so contact submissions are stored in Strapi too.
- Add a `Booking` content-type for the booking form, linked to the
  logged-in `User` via a relation field, so each user can see "my
  bookings."
