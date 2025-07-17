import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VizstraLogo from './VizstraLogo';
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
            <div className="hero-logo">
              <VizstraLogo size={64} showText={false} />
            </div>
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
          <div className="dijkstra-content">
            {/* Left side - Algorithm explanation */}
            <div className="algorithm-explanation">
              <h3>About Dijkstra's Algorithm</h3>
              <p>
                Dijkstra's algorithm is a graph traversal algorithm that finds the shortest path
                between nodes in a weighted graph. Developed by Edsger W. Dijkstra in 1956,
                it uses a greedy approach to systematically explore nodes, always choosing
                the unvisited node with the smallest known distance from the source.
              </p>
              <p>
                The algorithm maintains a priority queue of nodes and continuously selects
                the node with minimum distance, updating the distances to its neighbors.
                This process guarantees finding the optimal shortest path in graphs with
                non-negative edge weights.
              </p>

              <div className="algorithm-steps">
                <h4>Key Steps:</h4>
                <ol>
                  <li>Initialize distances: set source to 0, all others to infinity</li>
                  <li>Add all vertices to a priority queue</li>
                  <li>While queue is not empty, extract vertex with minimum distance</li>
                  <li>Update distances to all adjacent vertices</li>
                  <li>Repeat until destination is reached or queue is empty</li>
                </ol>
              </div>
            </div>

            {/* Right side - Key features */}
            <div className="algorithm-features">
              <h3>Key Features</h3>
              <div className="features-list">
                {dijkstraFeatures.map((feature, index) => (
                  <div key={feature.name} className="feature-item">
                    <div className="feature-header">
                      <h4 style={{ color: feature.color }}>{feature.name}</h4>
                      <span className="feature-complexity">{feature.complexity}</span>
                    </div>
                    <p className="feature-desc">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
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
