/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        'pixel-dark': '#0f0f17',
        'pixel-secondary': '#1a1a2e',
        'pixel-tertiary': '#16213e',
        'pixel-elevated': '#252542',
        
        // Accent colors
        'pixel-cyan': '#00d9ff',
        'pixel-purple': '#7c3aed',
        'pixel-emerald': '#10b981',
        'pixel-amber': '#f59e0b',
        'pixel-pink': '#ec4899',
        
        // Text colors
        'pixel-text': '#e2e8f0',
        'pixel-text-secondary': '#94a3b8',
        'pixel-text-muted': '#64748b',
      },
      fontFamily: {
        'pixel': ['"Silkscreen"', 'cursive'],
        'pixel-body': ['"VT323"', 'monospace'],
        'pixel-mono': ['"JetBrains Mono"', 'monospace'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0 0 #0a0a12',
        'pixel-md': '4px 4px 0 0 #0a0a12',
        'pixel-lg': '6px 6px 0 0 #0a0a12',
        'pixel-xl': '8px 8px 0 0 #0a0a12',
        'glow-cyan': '0 0 15px rgba(0, 217, 255, 0.4), 0 0 30px rgba(0, 217, 255, 0.2)',
        'glow-purple': '0 0 15px rgba(124, 58, 237, 0.4), 0 0 30px rgba(124, 58, 237, 0.2)',
        'glow-emerald': '0 0 15px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(0, 217, 255, 0.1)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 217, 255, 0.4), 0 0 10px rgba(0, 217, 255, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pixel-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-arrow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'typewriter': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pixel-in': 'pixel-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'bounce-arrow': 'bounce-arrow 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(20) forwards',
        'blink': 'blink 1s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'pixel-grid': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
