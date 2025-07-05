import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState('Dijkstra');

  const dijkstraFeatures = [
    {
      name: 'Shortest Path Guarantee',
      description: 'Always finds the optimal shortest path between nodes',
      complexity: 'O((V + E) log V)',
      color: 'var(--accent-primary)'
    },
    {
      name: 'Weighted Graph Support',
      description: 'Handles graphs with different edge weights efficiently',
      complexity: 'Priority Queue Based',
      color: 'var(--accent-secondary)'
    },
    {
      name: 'Greedy Approach',
      description: 'Uses greedy strategy to explore nearest unvisited nodes',
      complexity: 'Optimal Substructure',
      color: 'var(--accent-tertiary)'
    },
    {
      name: 'Real-world Applications',
      description: 'Used in GPS navigation, network routing, and more',
      complexity: 'Industry Standard',
      color: '#ff9500'
    }
  ];

  const features = [
    {
      title: 'Interactive Visualization',
      description: 'Watch Dijkstra\'s algorithm find shortest paths in real-time'
    },
    {
      title: 'Step-by-Step Animation',
      description: 'See how the algorithm explores nodes and builds the shortest path'
    },
    {
      title: 'Code Playground',
      description: 'Write and execute your own Dijkstra implementations'
    },
    {
      title: 'Performance Analytics',
      description: 'Track nodes visited, path length, and execution time'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Dijkstra's Algorithm
              <span className="gradient-text"> Visualizer</span>
            </h1>
            <p className="hero-subtitle">
              Explore, learn, and master Dijkstra's shortest path algorithm with interactive visualization
            </p>
            <div className="hero-actions">
              <Link to="/visualizer" className="modern-btn primary">
                Start Visualizing
              </Link>
              <Link to="/playground" className="modern-btn secondary">
                Code Playground
              </Link>
            </div>
          </div>
        </section>



        {/* Dijkstra Features Section */}
        <section className="algorithms-section">
          <h2 className="section-title">Dijkstra's Algorithm Features</h2>
          <div className="algorithms-grid">
            {dijkstraFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`algorithm-card glass-card ${currentAlgorithm === feature.name ? 'active' : ''}`}
                onClick={() => setCurrentAlgorithm(feature.name)}
              >
                <h3 className="algorithm-name" style={{ color: feature.color }}>{feature.name}</h3>
                <p className="algorithm-description">{feature.description}</p>
                <div className="algorithm-complexity">
                  <span>Key Aspect: </span>
                  <code>{feature.complexity}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card glass-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
