'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { useEffect } from 'react';

/**
 * Component that dynamically updates the status bar color and body background based on theme
 */
export default function ThemeMetadata() {
  const { theme } = useTheme();

  useEffect(() => {
    // Get the meta tag for theme-color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // If it doesn't exist, create it
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    // Update the color based on theme
    const themeColor = theme === 'dark' ? '#1a1a1a' : '#f8f5f1';
    metaThemeColor.setAttribute('content', themeColor);

    // Update Apple-specific status bar style
    let statusBarStyle = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!statusBarStyle) {
      statusBarStyle = document.createElement('meta');
      statusBarStyle.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(statusBarStyle);
    }

    // Use black-translucent for both themes, as it will show the underlying app content
    statusBarStyle.setAttribute('content', 'black-translucent');

    // Override body background color based on theme
    // This will take precedence over the reset.css styles
    document.body.style.background = theme === 'dark' ? '#1a1a1a' : '#f8f5f1';
  }, [theme]);

  return null; // This component doesn't render anything
}
