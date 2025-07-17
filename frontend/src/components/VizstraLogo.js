import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const VizstraLogo = ({ size = 32, showText = true, className = '' }) => {
  const { isDark } = useTheme();
  
  const logoColor = isDark ? '#00d4ff' : '#3b82f6';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const accentColor = isDark ? '#4ecdc4' : '#06b6d4';
  
  return (
    <div className={`vizstra-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {/* Logo Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Background Circle */}
        <circle 
          cx="20" 
          cy="20" 
          r="18" 
          fill={`url(#gradient-${isDark ? 'dark' : 'light'})`}
          stroke={logoColor}
          strokeWidth="2"
        />
        
        {/* Network/Graph Pattern */}
        {/* Nodes */}
        <circle cx="12" cy="12" r="2.5" fill={textColor} />
        <circle cx="28" cy="12" r="2.5" fill={textColor} />
        <circle cx="20" cy="20" r="3" fill={accentColor} />
        <circle cx="12" cy="28" r="2.5" fill={textColor} />
        <circle cx="28" cy="28" r="2.5" fill={textColor} />
        
        {/* Connections */}
        <line x1="12" y1="12" x2="20" y2="20" stroke={logoColor} strokeWidth="2" opacity="0.8" />
        <line x1="28" y1="12" x2="20" y2="20" stroke={logoColor} strokeWidth="2" opacity="0.8" />
        <line x1="20" y1="20" x2="12" y2="28" stroke={logoColor} strokeWidth="2" opacity="0.8" />
        <line x1="20" y1="20" x2="28" y2="28" stroke={logoColor} strokeWidth="2" opacity="0.8" />
        <line x1="12" y1="12" x2="28" y2="12" stroke={logoColor} strokeWidth="1.5" opacity="0.6" />
        <line x1="12" y1="28" x2="28" y2="28" stroke={logoColor} strokeWidth="1.5" opacity="0.6" />
        
        {/* Path highlight (shortest path) */}
        <line x1="12" y1="12" x2="20" y2="20" stroke={accentColor} strokeWidth="3" opacity="0.9" />
        <line x1="20" y1="20" x2="28" y2="28" stroke={accentColor} strokeWidth="3" opacity="0.9" />
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(78, 205, 196, 0.1)" />
          </linearGradient>
          <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Logo Text */}
      {showText && (
        <span 
          style={{ 
            fontSize: size * 0.6,
            fontWeight: '700',
            color: textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          Vizstra
        </span>
      )}
    </div>
  );
};

export default VizstraLogo;
