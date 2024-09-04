/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 0, 0, 1), 0 0 30px rgba(255, 0, 0, 0.8)' },
        },
        glowBlue: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 0, 255, 0.8), 0 0 20px rgba(0, 0, 255, 0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 0, 255, 1), 0 0 30px rgba(0, 0, 255, 0.8)' },
        },
      },
      animation: {
        glow: 'glow 2s infinite alternate',
        glowBlue: 'glowBlue 2s infinite alternate',
      },
      fontFamily: {
        'jersey': ['"Jersey 10"', 'sans-serif'],
        'pixelify-sans': ['"Pixelify Sans"', 'system-ui'],
        'silkscreen-regular': ['"Silkscreen"', 'sans-serif'],
        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'pixel-pattern': `
          linear-gradient(to right,  transparent 5px),
          linear-gradient(to bottom, transparent 4px)
          `,
        
      },
      backgroundSize: {
        'pixel': '8px 8px',
        
      },
      boxShadow: {
        'custom-red': '0 4px 6px rgba(255, 0, 0.5)',
        'custom-blue': '0 4px 6px rgba(0, 0, 255, 0.5)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
 
};
