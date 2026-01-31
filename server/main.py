from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import shutil
import uuid
import sys

# Add parent directory to path to import the execution script
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
from execution.nano_banana_pro import generate_reconstruction

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(BASE_DIR, ".tmp", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the frontend dist directory
# In production (Docker), the dist is in /app/frontend/dist
# In local dev, it might be in ../frontend/dist
FRONTEND_DIST = os.path.join(BASE_DIR, "frontend", "dist")

if os.path.exists(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

@app.get("/")
async def read_index():
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": f"Frontend not found at {FRONTEND_DIST}"}

# Catch-all route for SPA (must be last)
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Don't intercept API routes
    if full_path.startswith("reconstruct") or full_path.startswith("health"):
        return {"error": "Not found"}

    # Serve index.html for all other routes (SPA routing)
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": f"Frontend not found at {FRONTEND_DIST}"}

@app.post("/reconstruct")
async def reconstruct(
    image_a: UploadFile = File(None),
    pavement_url: str = Form(None),
    image_b: UploadFile = File(...),
):
    try:
        id = str(uuid.uuid4())
        a_path = os.path.join(UPLOAD_DIR, f"{id}_a.jpg")
        b_path = os.path.join(UPLOAD_DIR, f"{id}_b.jpg")

        # Handle Image A (Pavement)
        if image_a:
            with open(a_path, "wb") as buffer:
                shutil.copyfileobj(image_a.file, buffer)
        elif pavement_url:
            import requests
            response = requests.get(pavement_url, stream=True)
            response.raise_for_status()
            with open(a_path, "wb") as buffer:
                shutil.copyfileobj(response.raw, buffer)
        else:
            raise HTTPException(status_code=400, detail="Either image_a or pavement_url must be provided")

        # Handle Image B (Scene)
        with open(b_path, "wb") as buffer:
            shutil.copyfileobj(image_b.file, buffer)

        result = generate_reconstruction(a_path, b_path)
        
        if result:
            return {"status": "success", "result": result}
        else:
            raise HTTPException(status_code=500, detail="Reconstruction failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
