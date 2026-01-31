# Railway Deployment Guide

## Backend Deployment

1. Create a new Railway project for the backend
2. Connect your GitHub repository
3. Set the root directory to `/` (project root)
4. Set the start command: `cd server && python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables in Railway dashboard:
   ```
   OPENROUTER_API_KEY=your-api-key-here
   PORT=8080
   ```
6. Deploy and note your backend URL (e.g., `https://your-backend.railway.app`)

## Frontend Deployment

1. Create a new Railway project for the frontend
2. Connect your GitHub repository
3. Set the root directory to `/frontend`
4. Add environment variable in Railway dashboard:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
5. Set the build command: `npm run build`
6. Set the start command: `npm run preview` or use a static hosting service

## Local Development

For local development, no environment variables needed:
- Backend runs on `http://localhost:8080`
- Frontend runs on `http://localhost:5173` with Vite proxy
- The proxy automatically forwards `/reconstruct` requests to the backend

## Environment Variables

### Backend (.env in project root)
```
OPENROUTER_API_KEY=your-api-key-here
```

### Frontend (frontend/.env.local for local, Railway env vars for production)
```
VITE_API_URL=https://your-backend.railway.app
```

Leave `VITE_API_URL` empty for local development.
