#!/bin/bash

# Exit script on error
set -e

# Required Node version
REQUIRED_NODE_MAJOR=20

# Function to install Node 20 via nvm
install_node() {
  echo "Installing Node.js 20 using nvm..."

  # Install nvm if not installed
  if ! command -v nvm &> /dev/null; then
    echo "nvm not found. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  else
    echo "nvm is already installed."
  fi

  # Load nvm (in case it's not loaded)
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  nvm install 20
  nvm use 20
}

# Check for Node.js and its version
if command -v node &> /dev/null; then
  NODE_MAJOR=$(node -v | sed 's/v\([0-9]*\).*/\1/')
  if [ "$NODE_MAJOR" -ne "$REQUIRED_NODE_MAJOR" ]; then
    echo "Node.js version is not $REQUIRED_NODE_MAJOR.x. Current version: $(node -v)"
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

# Start backend and frontend in parallel
echo "Starting backend and frontend..."
(cd backend && npm run start:dev) & 
(cd frontend && npm run dev) &

wait