# Railway Deployment Guide

## Egyszerű Telepítés (Ajánlott) - Minden egy helyen

Ez az egyszerűbb módszer: a backend kiszolgálja a frontend-et is.

### 1. Railway Project létrehozása

1. Menj a [Railway.app](https://railway.app) oldalra
2. "New Project" → "Deploy from GitHub repo"
3. Válaszd ki a Terko repository-t
4. Railway automatikusan észleli a projektet

### 2. Environment változók beállítása

Railway dashboard → Variables:
```
OPENROUTER_API_KEY=your-api-key-here
PORT=8080
```

### 3. Build és Deploy beállítások

Railway automatikusan használja a `railway.toml` file-t, de ha nem:

**Build Command:**
```bash
./build.sh
```

**Start Command:**
```bash
cd server && python -m uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 4. Deploy

1. Push to GitHub → Railway automatikusan build-eli és deploy-olja
2. Kapsz egy URL-t: `https://your-app.railway.app`
3. Ez az egy URL szolgálja ki a frontend-et ÉS a backend API-t is!

## Lokális fejlesztés

### Backend indítása:
```bash
cd server
source venv/bin/activate
python main.py
```

### Frontend indítása:
```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:8080` (FastAPI)
- A Vite proxy automatikusan továbbítja az API hívásokat

## Hogyan működik?

**Production (Railway):**
```
https://your-app.railway.app/          → Frontend (index.html)
https://your-app.railway.app/reconstruct → Backend API
https://your-app.railway.app/health     → Backend health check
```

**Development (Local):**
```
http://localhost:5173/           → Vite dev server
http://localhost:5173/reconstruct → Vite proxy → http://localhost:8080/reconstruct
http://localhost:8080/health     → FastAPI backend
```

## Alternatív: Külön Frontend és Backend (Komplikáltabb)

Ha külön szeretnéd őket:

### Backend:
- Root directory: `/`
- Start command: `cd server && python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
- Env: `OPENROUTER_API_KEY`

### Frontend:
- Root directory: `/frontend`
- Env: `VITE_API_URL=https://your-backend.railway.app`
- Build: `npm run build`
- Start: `npm run preview`

De ez bonyolultabb és drágább (2 service helyett 1).
