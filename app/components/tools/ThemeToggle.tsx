// components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

/**
 * @module ThemeToggle
 */

/**
 * ThemeToggle Component - A button that toggles between light and dark themes
 * @component
 * @description
 * Renders a button that allows users to toggle between light and dark themes.
 * Uses the useTheme hook from ThemeContext to access and modify the current theme.
 * Displays different icons (sun/moon) based on the current theme state.
 * 
 * @example
 * ```jsx
 * <ThemeToggle />
 * ```
 * 
 * @returns {JSX.Element} A button element with theme toggle functionality
 */
const ThemeToggle = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative rounded-md p-2  transition-colors text-dark-text-primary bg-gradient-to-r ${
        theme === 'light' ? 'from-light-primary to-light-secondary' : 'from-dark-primary to-dark-secondary'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

export default ThemeToggle;
