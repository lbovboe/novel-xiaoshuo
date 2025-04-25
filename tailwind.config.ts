import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          // === Light Mode Color Scheme - Sky Blue Theme ===
          background: {
            DEFAULT: '#f8fafc', // Slate-50 (fallback)
            gradient: {
              start: '#f0f9ff', // Sky-50
              via: '#e0f2fe',   // Sky-100
              end: '#bae6fd'    // Sky-200
            }
          },
          // Usage: bg-gradient-to-br from-light-background-gradient-start 
          // via-light-background-gradient-via to-light-background-gradient-end

          paper: '#bae6fd', // White
          // Light mode elevated surface - clean white
          // Usage: bg-light-paper

          primary: '#0ea5e9',    // Sky-500
          // Light mode primary actions - vibrant sky blue
          // Usage: bg-light-primary, text-light-primary

          secondary: '#14b8a6', // Teal-500
          // Light mode secondary actions - lighter sky blue
          // Usage: bg-light-secondary, text-light-secondary

          text: {
            primary: '#0f172a', // Slate-900
            // Light mode main text - deep slate for contrast
            // Usage: text-light-text-primary

            secondary: '#475569', // Slate-600
            // Light mode secondary text - balanced slate
            // Usage: text-light-text-secondary

            disabled: '#94a3b8', // Slate-400
            // Light mode disabled text - subtle slate
            // Usage: text-light-text-disabled
          },

          border: '#e2e8f0', // Slate-200
          // Light mode borders - subtle boundaries
          // Usage: border-light-border
        },
        dark: {
          // === Dark Mode Color Scheme - Cosmic Purple Theme ===
          background: {
            DEFAULT: '#1e1b4b', // Fallback color (Indigo-950)
            gradient: {
              start: '#312e81', // Indigo-900
              via: '#6b21a8',   // Purple-800
              end: '#4c1d95'    // Purple-900
            }
          },
          // Usage: dark:bg-gradient-to-br from-dark-background-gradient-start 
          // via-dark-background-gradient-via to-dark-background-gradient-end

          paper: '#312e81', // Indigo-900
          // Dark mode elevated surface - cosmic purple
          // Usage: dark:bg-dark-paper

          primary: '#a78bfa', // Violet-400 for a bright stellar glow
          // Dark mode primary actions - bright star
          // Usage: dark:bg-dark-primary, dark:text-dark-primary

          secondary: '#e879f9', // Pink-400 for cosmic accent
          // Dark mode secondary actions - cosmic energy
          // Usage: dark:bg-dark-secondary, dark:text-dark-secondary

          text: {
            primary: '#faf5ff', // Purple-50 with max brightness
            // Dark mode main text - starlight
            // Usage: dark:text-dark-text-primary

            secondary: '#c4b5fd', // Violet-300 for subtle cosmic dust
            // Dark mode secondary text - cosmic dust
            // Usage: dark:text-dark-text-secondary

            disabled: '#7c3aed', // Violet-600 for distant elements
            // Dark mode disabled text - distant matter
            // Usage: dark:text-dark-text-disabled
          },

          border: '#4c1d95', // Purple-900 for cosmic boundaries
          // Dark mode borders - space boundaries
          // Usage: dark:border-dark-border
        }
      },
    },
  },
  plugins: [],
};
export default config;
