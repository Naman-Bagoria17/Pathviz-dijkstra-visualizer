import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import VisualizerPage from "./components/VisualizerPage";
import CodePlayground from "./components/CodePlayground";
import ParticleBackground from "./components/ParticleBackground";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 className="loading-text">Vizstra</h2>
          <p className="loading-subtitle">Initializing Dijkstra's Algorithm Visualizer...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visualizer" element={<VisualizerPage />} />
            <Route path="/playground" element={<CodePlayground />} />
          </Routes>
        </main>

        <footer className="modern-footer">
          <div className="footer-content">
            <p>&copy; 2025 Vizstra - Advanced Shortest Path Visualization</p>
            <div className="footer-links">
              <span>Built with React & Modern Web Technologies</span>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
