# Stage 1: Build the frontend
FROM node:18-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the Python server
FROM python:3.9-slim
WORKDIR /app

# Install system dependencies if any
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the server and execution code
COPY server/ ./server/
COPY execution/ ./execution/

# Copy the built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose the port (Railway provides this via environment variable)
EXPOSE 8080

# Copy .env file for local testing (Railway uses env vars)
COPY .env* ./

# Copy startup script
COPY start.sh ./
RUN chmod +x start.sh

# Run the server using startup script
CMD ["./start.sh"]
