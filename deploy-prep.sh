#!/bin/bash

echo "🚀 Preparing Dijkstra Visualizer for deployment..."

# Clean up any existing node_modules and lock files
echo "🧹 Cleaning up existing dependencies..."
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/baceknd/node_modules backend/baceknd/package-lock.json

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend/baceknd
npm install
cd ../..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build the frontend
echo "🔨 Building frontend..."
cd frontend
npm run build
cd ..

echo "✅ Deployment preparation complete!"
echo "📁 Frontend build is ready in: frontend/build"
echo "🖥️  Backend is ready to start with: cd backend/baceknd && npm start"
