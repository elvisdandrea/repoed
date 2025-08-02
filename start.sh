#!/bin/bash

set -e

REQUIRED_NODE_MAJOR=20

install_node() {
  echo "Installing Node.js 20 using nvm..."

  if ! command -v nvm &> /dev/null; then
    echo "nvm not found. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  fi

  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  nvm install 20
  nvm use 20
}

# Ensure Node 20 is installed
if command -v node &> /dev/null; then
  NODE_MAJOR=$(node -v | sed 's/v\([0-9]*\).*/\1/')
  if [ "$NODE_MAJOR" -ne "$REQUIRED_NODE_MAJOR" ]; then
    echo "Node.js version is not $REQUIRED_NODE_MAJOR.x (found $(node -v))"
    install_node
  else
    echo "Node.js $REQUIRED_NODE_MAJOR is already installed."
  fi
else
  echo "Node.js is not installed."
  install_node
fi

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

# Create .env file for backend if missing
if [ ! -f "./backend/.env" ]; then
  echo ""
  echo "Backend .env is not set. Please inform the FRONTEND URL host (without http:// or port):"
  read -rp "Frontend host: " FRONTEND_HOST
  echo "FRONTEND_URL=http://$FRONTEND_HOST:5173" > ./backend/.env
  echo "Created ./backend/.env with FRONTEND_URL=http://$FRONTEND_HOST:5173"
fi

# Create .env file for frontend if missing
if [ ! -f "./frontend/.env" ]; then
  echo ""
  echo "Frontend .env is not set. Please inform the BACKEND URL host (without http:// or port):"
  read -rp "Backend host: " BACKEND_HOST
  echo "VITE_API_URL=\"http://$BACKEND_HOST:3000/\"" > ./frontend/.env
  echo "Created ./frontend/.env with VITE_API_URL=http://$BACKEND_HOST:3000/"
fi

# Start backend and frontend
echo ""
echo "Starting backend and frontend..."
(cd backend && npm run start:dev) & 
(cd frontend && npm run dev) &

wait