# Orbit Dashboard — No-Backend Beginner Project

A simple multi-page dashboard built with React, JavaScript, Vite, Tailwind CSS v4, React Router, Context API, Fetch API, and Lucide icons. **There is no custom backend and no database.**

## Run it

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Demo account

- **Email:** `HarshaBasati@gmail.com`
- **Password:** `Harsha@123`
- **Profile:** Harsha Vardhan Basati, Admin, Hyderabad, Telangana

On the login screen, click **Explore dashboard without credentials** to enter the dashboard directly.

## Manually add or edit user details

Edit `src/data/users.json`. Each object represents one local demo user:

```json
{
  "id": 1,
  "name": "Harsha Vardhan Basati",
  "email": "HarshaBasati@gmail.com",
  "password": "Harsha@123",
  "role": "Admin",
  "city": "Hyderabad, Telangana",
  "phone": "+91 98765 43210",
  "isDemo": true
}
```

- `email` and `password` are used by the demo login form.
- Set `isDemo` to `true` for the profile opened by the demo button.
- Keep the JSON syntax valid (double quotes and commas). After changing the file, Vite usually reloads automatically; otherwise restart `npm run dev`.
- The Register page is intentionally omitted to keep the project easy to explain. Add users by editing the JSON file.

## How authentication works (frontend demo only)

1. `LoginPage.jsx` reads the form values.
2. `AuthContext.jsx` checks them against the imported `users.json` list.
3. A matching profile is stored in browser `localStorage` (without the password).
4. `ProtectedRoute.jsx` checks whether a profile is signed in before showing dashboard pages.
5. The Demo button selects the user with `isDemo: true` and skips entering credentials.
6. Logout removes the saved profile from `localStorage`.

**Important security limitation:** JSON bundled into a browser app is public to anyone who can load the website. These passwords are for a local classroom/demo project only, not real accounts. A real app must verify credentials on a server and store password hashes securely.

## Pages

- `/login`
- `/dashboard`
- `/projects`
- `/projects/:projectId`
- `/analytics`
- `/settings`

## Theme

Choose **Light** or **Dark** in Settings → Appearance. The selected theme is applied across the dashboard and login page and saved in browser `localStorage`, so it remains selected when you return.

## Data and API

Projects are local sample data. The activity/team widgets use the public JSONPlaceholder API through `src/services/api.js`; that is an external API, not a backend created for this project. You can remove those fetches too if you want the whole dashboard to work offline.

## Tailwind

This project uses Tailwind CSS v4 with `@tailwindcss/vite`. Page, component, responsive, and dark-theme styles are built with Tailwind utility classes; `src/index.css` only loads Tailwind and defines the base body styles and class-based dark variant. It does not require `postcss.config.js` or `tailwindcss init -p`.

The website icon is the SVG at `public/favicon.svg`, linked from `index.html`.


## JavaScript-only version

This project uses JavaScript and JSX only. There are no TypeScript files or TypeScript build step. User demo profiles are stored in `src/data/users.json`. This is frontend-only demo authentication; do not use real passwords.
