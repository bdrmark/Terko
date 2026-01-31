#!/bin/bash
set -e

# Get port from environment or use default
PORT=${PORT:-8080}

echo "Starting server on port $PORT..."

# Start uvicorn
exec uvicorn server.main:app --host 0.0.0.0 --port "$PORT"
