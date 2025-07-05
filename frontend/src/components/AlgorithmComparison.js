import React from 'react';
import './AlgorithmComparison.css';

const AlgorithmComparison = () => {
  return (
    <div className="comparison-page">
      <div className="comparison-container">
        <div className="hero-section">
          <h1 className="page-title">Algorithm Comparison</h1>
          <p className="page-subtitle">Compare different pathfinding algorithms side by side</p>
        </div>
        
        <div className="comparison-content glass-card">
          <div className="coming-soon">
            <div className="coming-soon-icon">🚧</div>
            <h2>Coming Soon!</h2>
            <p>Algorithm comparison feature is under development.</p>
            <p>This will allow you to compare multiple algorithms simultaneously.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmComparison;
