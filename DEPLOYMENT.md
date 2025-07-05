# Dijkstra Visualizer - Deployment Guide

## 🚨 Fixed Issues

The following issues have been resolved:

1. **Removed duplicate `ajv` dependency** - Was causing module resolution conflicts
2. **Removed circular dependencies** - `dijkstra_algo` file references were causing issues
3. **Cleaned up package.json files** - Removed unnecessary dependencies
4. **Added proper deployment configuration** - Created render.yaml for Render deployment
5. **Fixed build scripts** - Simplified and improved build process

## 🚀 Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` file and deploy both services:
   - Frontend (Static Site)
   - Backend (Web Service)

### Option 2: Manual Setup

#### Frontend Deployment:
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set build command: `npm run install-deps && npm run build`
4. Set publish directory: `frontend/build`

#### Backend Deployment:
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend/baceknd && npm install`
4. Set start command: `cd backend/baceknd && npm start`

## 🛠️ Local Development

### Quick Setup:
```bash
# On Windows
deploy-prep.bat

# On Linux/Mac
chmod +x deploy-prep.sh
./deploy-prep.sh
```

### Manual Setup:
```bash
# Install dependencies
npm run install-deps

# Build frontend
npm run build

# Start backend (in separate terminal)
npm start
```

## 📋 Environment Variables

For production deployment, you may need to set:
- `NODE_ENV=production`
- Any API keys or database URLs your app requires

## 🔧 Troubleshooting

### Common Issues:

1. **Module not found errors**: Run the deployment preparation script to clean and reinstall dependencies
2. **Build failures**: Ensure Node.js version 18+ is being used (check .nvmrc file)
3. **CORS issues**: Update the backend CORS configuration for your production domain

### If you still get ajv errors:
1. Delete all node_modules folders
2. Delete all package-lock.json files
3. Run `npm run install-deps`
4. Run `npm run build`

## 📁 Project Structure

```
Dijkstra-s_visualizer/
├── frontend/          # React frontend
├── backend/baceknd/   # Express backend
├── render.yaml        # Render deployment config
├── deploy-prep.sh     # Deployment preparation script
└── package.json       # Root package.json with build scripts
```
