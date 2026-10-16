# Orbit Dashboard

A beginner-friendly, responsive dashboard built with **React,
JavaScript, Vite, Tailwind CSS v4, React Router, Context API, and Lucide
icons**.

This project is designed for learning and demonstrations. It does not
include a custom backend or database. Demo account details are stored in
a JSON file, and authentication is handled on the frontend.

## Features

-   Login page with email and password fields
-   One-click **Demo Login** button
-   Demo user details stored in `src/data/users.json`
-   React Router navigation between dashboard pages
-   Context API for shared authentication and dashboard state
-   Protected dashboard routes
-   Dashboard overview, projects, project details, analytics, and
    settings pages
-   Responsive styling with Tailwind CSS v4
-   Lucide icons
-   Sample data fetching through the Fetch API

## Tech Stack

-   **React** --- UI components
-   **JavaScript (JS/JSX)** --- application logic; no TypeScript
-   **Vite** --- development server and build tool
-   **Tailwind CSS v4** --- styling
-   **React Router** --- client-side routing
-   **Context API** --- shared application state
-   **Lucide React** --- icons
-   **Fetch API** --- retrieves sample external data

## Getting Started

### 1. Install Node.js

Install a current LTS version of Node.js from <https://nodejs.org/>.

Check that Node.js and npm are installed:

``` bash
node -v
npm -v
```

### 2. Extract and open the project

Extract the project ZIP, then open the `react-dashboard-no-backend`
project folder in VS Code.

### 3. Install dependencies

Open the terminal in the project folder and run:

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Vite will print a local URL in the terminal, usually
`http://localhost:5173/`. Open that URL in your browser.

### 5. Create a production build

``` bash
npm run build
```

To preview the production build locally:

``` bash
npm run preview
```

## Demo Login

Open the login page and select **Demo Login** to explore the dashboard
without typing credentials.

For regular demo sign-in, use the email and password defined in:

``` text
src/data/users.json
```

The exact demo credentials can be read or edited in that file.

The current demo account is **Harsha Vardhan Basati** (`HarshaBasati@gmail.com`).
Use the credentials in `src/data/users.json`, or select the demo login button.

## Theme

Choose **Light** or **Dark** in Settings → Appearance or use the navbar theme
button. The selected theme is applied across the dashboard and login page and
saved in browser `localStorage`.

## Data and API

Projects are local sample data. The activity and team widgets use the public
JSONPlaceholder API through `src/services/api.js`; it is an external API, not a
backend created for this project.

## Editing Demo User Details

Open `src/data/users.json`. A user record follows this general
structure:

``` json
[
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
]
```

You can change the sample user's name, email, password, role, city, and
phone number. Keep the JSON syntax valid: use double quotes around keys
and string values, and do not add a comma after the final property.

Set `"isDemo": true` on the account you want the Demo Login button to
select.

This project uses Tailwind CSS v4 with `@tailwindcss/vite`. Page, component,
responsive, and dark-theme styles use Tailwind utility classes; `src/index.css`
loads Tailwind and defines the base styles and class-based dark variant. The
website icon is `public/favicon.svg`, linked from `index.html`.

> **Important:** This is a frontend demonstration only. JSON files
> included in a Vite app are delivered to the browser and can be
> inspected by users. The password is not secure, and frontend checks
> can be bypassed. Never use real passwords or personal data here. Real
> authentication requires a secure backend or authentication provider.

## Project Structure

``` text
src/
├── components/
│   ├── AppLayout.jsx
│   ├── ProtectedRoute.jsx
│   ├── ProjectCard.jsx
│   └── StatCard.jsx
├── context/
│   ├── AuthContext.jsx
│   └── DashboardContext.jsx
├── data/
│   ├── projects.js
│   └── users.json
├── hooks/
│   ├── useAuth.js
│   └── useDashboard.js
├── pages/
│   ├── AnalyticsPage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   ├── ProjectDetailsPage.jsx
│   ├── ProjectsPage.jsx
│   ├── RegisterPage.jsx
│   └── SettingsPage.jsx
├── services/
│   └── api.js
├── App.jsx
├── index.css
├── main.jsx
└── types.js
```

The exact filenames may vary slightly depending on the version of the
project you have extracted.

## How the Application Works

1.  **Login page:** the user chooses regular demo sign-in or Demo Login.
2.  **Auth context:** shared authentication state is updated in the
    browser.
3.  **Browser storage:** the demo session may be retained in
    `localStorage` so refreshing the page does not immediately sign the
    user out.
4.  **Protected routes:** unauthenticated visitors are redirected to the
    login page.
5.  **Dashboard pages:** the user navigates through the dashboard,
    projects, analytics, and settings using React Router.
6.  **Sample API data:** the API service uses the Fetch API to request
    sample data from an external service where configured.

## Learning Guide

Suggested order for understanding the code:

1.  `src/main.jsx` --- application entry point
2.  `src/App.jsx` --- routes and page setup
3.  `src/pages/LoginPage.jsx` --- login interface and demo button
4.  `src/context/AuthContext.jsx` --- authentication state and actions
5.  `src/components/ProtectedRoute.jsx` --- route protection
6.  `src/components/AppLayout.jsx` --- shared dashboard layout
7.  `src/pages/DashboardPage.jsx` --- dashboard overview
8.  `src/data/users.json` --- editable demo user records
9.  `src/services/api.js` --- external sample-data requests
10. `src/context/DashboardContext.jsx` --- shared dashboard state

## Troubleshooting

### `npm` is not recognized

Install Node.js, close and reopen the terminal, and run `npm -v` again.

### The page is blank

Check the terminal and browser developer console for errors. Confirm
dependencies were installed with `npm install`.

### Changes to JSON do not appear

Save `src/data/users.json`, refresh the page, and verify that the JSON
syntax is valid. If the app keeps an existing session in `localStorage`,
log out and sign in again.

### API data fails to load

The sample API requires an internet connection. The dashboard's local
sample content may still work even if external data is unavailable,
depending on the page.

## Project Limitations

-   No custom backend
-   No database
-   Demo-only frontend authentication
-   Credentials in JSON are visible to browser users
-   Any external sample API requires internet access
-   Not suitable for production accounts or sensitive data

## License

This project is intended for learning and demonstration. Add a license
if you plan to publish or distribute it publicly.
