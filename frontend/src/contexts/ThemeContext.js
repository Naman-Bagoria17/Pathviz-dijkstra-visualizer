import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('vizstra-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('vizstra-theme', theme);

    // Apply theme to document root and body
    const root = document.documentElement;
    const body = document.body;

    // Set data attribute for CSS targeting
    body.setAttribute('data-theme', theme);

    if (theme === 'light') {
      // Light theme CSS variables - Professional and cohesive palette
      root.style.setProperty('--bg-primary', '#fafbfc');
      root.style.setProperty('--bg-secondary', '#f1f5f9');
      root.style.setProperty('--bg-tertiary', '#e2e8f0');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--accent-primary', '#3b82f6');
      root.style.setProperty('--accent-secondary', '#f43f5e');
      root.style.setProperty('--accent-tertiary', '#06b6d4');
      root.style.setProperty('--glass-bg', 'rgba(248, 250, 252, 0.85)');
      root.style.setProperty('--glass-border', 'rgba(148, 163, 184, 0.25)');
      root.style.setProperty('--shadow-primary', '0 8px 32px rgba(15, 23, 42, 0.08)');
      root.style.setProperty('--shadow-secondary', '0 4px 16px rgba(15, 23, 42, 0.06)');
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)');
      root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)');
      root.style.setProperty('--gradient-tertiary', 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)');
    } else {
      // Dark theme CSS variables (default)
      root.style.setProperty('--bg-primary', '#0a0a0a');
      root.style.setProperty('--bg-secondary', '#1a1a1a');
      root.style.setProperty('--bg-tertiary', '#2a2a2a');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b0b0b0');
      root.style.setProperty('--accent-primary', '#00d4ff');
      root.style.setProperty('--accent-secondary', '#ff6b6b');
      root.style.setProperty('--accent-tertiary', '#4ecdc4');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
      root.style.setProperty('--shadow-primary', '0 8px 32px rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--shadow-secondary', '0 4px 16px rgba(0, 0, 0, 0.2)');
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
      root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)');
      root.style.setProperty('--gradient-tertiary', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
