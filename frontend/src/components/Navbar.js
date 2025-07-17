import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import VizstraLogo from "./VizstraLogo";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();

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
          <VizstraLogo size={28} showText={true} />
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

        {/* Right side controls */}
        <div className="navbar-controls">
          {/* Theme toggle button */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <div className="theme-toggle-track">
              <div className={`theme-toggle-thumb ${isDark ? 'dark' : 'light'}`}>
                <div className="theme-icon">
                  {isDark ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </button>

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
      </div>
    </nav>
  );
};

export default Navbar;
