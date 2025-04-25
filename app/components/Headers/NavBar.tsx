'use client';
import { useState } from 'react';
import Chip from '../tools/Animation/Chip';
import Link from 'next/link';
import ThemeToggle from '../tools/ThemeToggle';
import Image from 'next/image';
/**
 * @module Navbar
 */

/**
 * Navigation items configuration
 * @type {Array<{text: string, href: string}>}
 */
const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Search', href: '/search' },
  { text: 'About', href: '/about' },
  { text: 'FAQ', href: '/faq' },
];

/**
 * Navbar Component - Main navigation bar for the application
 * @component
 * @description
 * Renders a responsive navigation bar that includes:
 * - A logo
 * - Navigation links displayed as interactive chips
 * - A theme toggle button
 * The component maintains a selected state for the navigation items and
 * supports both light and dark themes.
 * 
 * @example
 * ```jsx
 * <Navbar />
 * ```
 * 
 * @returns {JSX.Element} A navigation bar component with logo, navigation links, and theme toggle
 */
const Navbar = (): JSX.Element => {
/** 
 * useState hook for selected nav item
 * @type {Array<string|Function>}
 */
  const [selected, setSelected] = useState(navItems[0].text);

  return (
    <nav className="w-full border-b  bg-light-paper/30 px-6 py-4  dark:bg-dark-paper/30 ">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
       
        <Image
          src="/icon1.png"
          alt="Logo"
          width={40}
          height={40}
        />
        {/* Navigation chips */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.text}>
              <Chip text={item.text} selected={selected === item.text} onClick={() => setSelected(item.text)} />
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
