# Compliance Platform — Frontend

A React + Vite frontend for the Compliance Platform, featuring JWT-based authentication and a polished dashboard UI.

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
cd frontend
npm install
```

## Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Running with the Backend

Start the backend via Docker (see root README), then start the frontend:

```bash
# Terminal 1 — backend
docker compose up

# Terminal 2 — frontend
cd frontend
npm run dev
```

Default credentials: `admin` / `admin123`.

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

| Variable        | Default                    | Description         |
|-----------------|----------------------------|---------------------|
| `VITE_API_URL`  | `http://localhost:8000`    | Backend API base URL |

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## Usage

1. Navigate to `/login` and enter your credentials.
2. On success you are redirected to the dashboard (`/`).
3. The JWT token is stored in `sessionStorage` under the key `access_token`.
4. Click **Sign out** to clear the session and return to the login page.
