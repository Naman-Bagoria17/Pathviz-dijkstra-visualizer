const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://pathviz-frontend.onrender.com',
    /\.onrender\.com$/
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Health check endpoint (only for development)
app.get('/api/health', (req, res) => {
  res.json({ message: 'Dijkstra Visualizer Backend is running!' });
});

// C++ code execution endpoint
app.post('/api/cpp', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      status: 'error',
      message: 'No code provided'
    });
  }

  // Create a unique filename for this request
  const timestamp = Date.now();
  const filename = `temp_${timestamp}`;
  const cppFile = `${filename}.cpp`;
  const exeFile = `${filename}.exe`;

  try {
    // Write the C++ code to a temporary file
    fs.writeFileSync(cppFile, code);

    // Compile the C++ code
    exec(`g++ -o ${exeFile} ${cppFile}`, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        // Clean up the cpp file
        try { fs.unlinkSync(cppFile); } catch (e) { }

        return res.json({
          status: 'error',
          message: 'Compilation failed',
          stderr: compileStderr
        });
      }

      // Execute the compiled program (Windows compatible)
      const runCommand = process.platform === 'win32' ? `${exeFile}` : `./${exeFile}`;
      exec(runCommand, { timeout: 5000 }, (runError, runStdout, runStderr) => {
        // Clean up temporary files
        try {
          fs.unlinkSync(cppFile);
          fs.unlinkSync(exeFile);
        } catch (e) { }

        if (runError) {
          if (runError.killed) {
            return res.json({
              status: 'error',
              message: 'Program execution timed out',
              stderr: 'Execution timed out after 5 seconds'
            });
          }

          return res.json({
            status: 'error',
            message: 'Runtime error',
            stderr: runStderr || runError.message
          });
        }

        res.json({
          status: 'success',
          stdout: runStdout,
          stderr: runStderr
        });
      });
    });

  } catch (error) {
    // Clean up any files that might have been created
    try {
      fs.unlinkSync(cppFile);
      fs.unlinkSync(exeFile);
    } catch (e) { }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      stderr: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Serve static files from React build
const frontendBuildPath = path.join(__dirname, '../../frontend/build');
console.log('Looking for frontend build at:', frontendBuildPath);

// Check if build directory exists
if (fs.existsSync(frontendBuildPath)) {
  console.log('✅ Frontend build directory found');
  app.use(express.static(frontendBuildPath));

  // Serve React app for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      console.log('Serving React app for path:', req.path);
      res.sendFile(path.join(frontendBuildPath, 'index.html'));
    } else {
      res.status(404).json({
        status: 'error',
        message: 'API endpoint not found'
      });
    }
  });
} else {
  console.log('❌ Frontend build directory not found at:', frontendBuildPath);

  // Fallback route when no build directory
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.json({
        message: 'Frontend build not found. Please run: npm run build',
        buildPath: frontendBuildPath,
        exists: fs.existsSync(frontendBuildPath)
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'API endpoint not found'
      });
    }
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend served at http://localhost:${PORT}/`);
  }
});
