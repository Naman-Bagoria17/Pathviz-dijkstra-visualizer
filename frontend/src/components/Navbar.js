import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/visualizer", label: "Visualizer" },
    { path: "/playground", label: "Code" },
  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        {/* brand */}
        <Link to="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
          <span className="brand-text">PathViz</span>
        </Link>

        {/* links – desktop AND the slide‑down on mobile */}
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`navbar-item ${location.pathname === path ? "active" : ""
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* hamburger */}
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
