#!/bin/bash

# Exit script on error
set -e

# Check and install backend dependencies
if [ ! -d "./backend/node_modules" ]; then
  echo "Installing backend dependencies..."
  cd backend
  npm install
  cd ..
else
  echo "Backend dependencies already installed."
fi

# Check and install frontend dependencies
if [ ! -d "./frontend/node_modules" ]; then
  echo "Installing frontend dependencies..."
  cd frontend
  npm install
  cd ..
else
  echo "Frontend dependencies already installed."
fi

# Start both frontend and backend in parallel
echo "Starting backend and frontend..."

# Run in subshells and redirect output
(cd backend && npm run start:dev) & 
(cd frontend && npm run dev) &

# Wait for both to keep script running (optional)
wait