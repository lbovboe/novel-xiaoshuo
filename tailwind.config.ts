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
          // === Light Mode Color Scheme - Classic Book Theme ===
          background: {
            DEFAULT: '#f8f5f1', // Warm cream paper
            gradient: {
              start: '#f8f5f1', // Cream paper
              via: '#f3e9d9', // Aged parchment
              end: '#e8d9bf', // Vintage page color
            },
          },
          // Usage: bg-gradient-to-br from-light-background-gradient-start
          // via-light-background-gradient-via to-light-background-gradient-end

          paper: '#fff8eb', // Soft ivory paper
          // Light mode elevated surface - classic book page
          // Usage: bg-light-paper

          primary: '#8c7851', // Leather bookmark brown
          // Light mode primary actions - classic book binding color
          // Usage: bg-light-primary, text-light-primary

          secondary: '#b5651d', // Aged leather accent
          // Light mode secondary actions - book spine color
          // Usage: bg-light-secondary, text-light-secondary

          text: {
            primary: '#2d2926', // Dark espresso ink
            // Light mode main text - classic book text
            // Usage: text-light-text-primary

            secondary: '#594a42', // Sepia tone
            // Light mode secondary text - aged ink color
            // Usage: text-light-text-secondary

            disabled: '#a89b91', // Faded text
            // Light mode disabled text - subtle faded ink
            // Usage: text-light-text-disabled
          },

          border: '#d3c7b9', // Vintage page edge
          // Light mode borders - subtle boundaries like page edges
          // Usage: border-light-border
        },
        dark: {
          // === Dark Mode Color Scheme - Eye-Friendly Reading Theme ===
          background: {
            DEFAULT: '#1a1a1a', // Soft black
            gradient: {
              start: '#1a1a1a', // Soft black
              via: '#232323', // Dark charcoal
              end: '#2c2c2c', // Medium charcoal
            },
          },
          // Usage: dark:bg-gradient-to-br from-dark-background-gradient-start
          // via-dark-background-gradient-via to-dark-background-gradient-end

          paper: '#2c2c2c', // Dark charcoal
          // Dark mode elevated surface - soft on eyes
          // Usage: dark:bg-dark-paper

          primary: '#a8937e', // Muted amber
          // Dark mode primary actions - low blue light amber
          // Usage: dark:bg-dark-primary, dark:text-dark-primary

          secondary: '#7e8d9a', // Muted slate blue
          // Dark mode secondary actions - low intensity
          // Usage: dark:bg-dark-secondary, dark:text-dark-secondary

          text: {
            primary: '#e8e6e3', // Off-white text
            // Dark mode main text - not harsh white
            // Usage: dark:text-dark-text-primary

            secondary: '#b2ada7', // Muted gray
            // Dark mode secondary text - reduced contrast
            // Usage: dark:text-dark-text-secondary

            disabled: '#6c6c6c', // Dark gray
            // Dark mode disabled text - further reduced contrast
            // Usage: dark:text-dark-text-disabled
          },

          border: '#3d3d3d', // Dark gray
          // Dark mode borders - subtle boundaries
          // Usage: dark:border-dark-border
        },

        // === Documentation-specific color utilities ===
        // All prefixed with 'doc_' for portability
        doc_bg: {
          // Background colors for documentation
          light: '#f8f5f1', // Light mode docs background
          dark: '#1a1a1a', // Dark mode docs background
          paper_light: '#fff8eb', // Light mode elevated surface
          paper_dark: '#2c2c2c', // Dark mode elevated surface
          card_light: 'rgba(255, 255, 255, 0.5)', // Light mode card with transparency
          card_dark: '#3d3d3d', // Dark mode card
          accent_light: 'rgba(140, 120, 81, 0.1)', // Light mode accent background (10% primary)
          accent_dark: 'rgba(168, 147, 126, 0.2)', // Dark mode accent background (20% primary)
        },
        doc_text: {
          // Text colors for documentation
          heading_light: '#2d2926', // Light mode headings
          heading_dark: '#e8e6e3', // Dark mode headings
          body_light: '#2d2926', // Light mode body text
          body_dark: '#e8e6e3', // Dark mode body text
          secondary_light: 'rgba(45, 41, 38, 0.8)', // Light mode secondary text (80% opacity)
          secondary_dark: 'rgba(232, 230, 227, 0.8)', // Dark mode secondary text (80% opacity)
          muted_light: 'rgba(45, 41, 38, 0.5)', // Light mode muted text (50% opacity)
          muted_dark: 'rgba(232, 230, 227, 0.5)', // Dark mode muted text (50% opacity)
          link_light: '#8c7851', // Light mode links
          link_dark: '#a8937e', // Dark mode links
        },
        doc_border: {
          // Border colors for documentation
          light: '#d3c7b9', // Light mode border
          dark: '#3d3d3d', // Dark mode border
          accent_light: '#8c7851', // Light mode accent border
          accent_dark: '#a8937e', // Dark mode accent border
        },
        doc_icon: {
          // Icon colors for documentation
          light: '#8c7851', // Light mode icon
          dark: '#a8937e', // Dark mode icon
          accent_light: '#b5651d', // Light mode accent icon
          accent_dark: '#7e8d9a', // Dark mode accent icon
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
