'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';
import { FaBook, FaTools, FaCogs, FaCode, FaTimes, FaBars } from 'react-icons/fa';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: 'Overview', href: '/docs', icon: <FaBook className="text-light-primary dark:text-dark-primary" /> },
  {
    label: 'User Guide',
    href: '/docs/user-guide',
    icon: <FaTools className="text-light-primary dark:text-dark-primary" />,
  },
  {
    label: 'Features',
    href: '/docs/features',
    icon: <FaCogs className="text-light-primary dark:text-dark-primary" />,
  },
  {
    label: 'UI Components',
    href: '/docs/components',
    icon: <FaCode className="text-light-primary dark:text-dark-primary" />,
  },
  {
    label: 'Development',
    href: '/docs/development',
    icon: <FaCode className="text-light-primary dark:text-dark-primary" />,
  },
];

export default function DocSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-light-primary text-white shadow-lg transition-all hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-24 overflow-y-auto pr-4">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-light-text-primary/50 dark:text-dark-text-primary/50">
            Documentation
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary'
                    : 'text-light-text-primary hover:bg-light-paper dark:text-dark-text-primary dark:hover:bg-dark-paper'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <m.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-40 w-64 bg-light-background p-4 shadow-xl dark:bg-dark-background md:hidden"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text-primary/50 dark:text-dark-text-primary/50">
            Documentation
          </h3>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-full p-2 text-light-text-primary hover:bg-light-paper dark:text-dark-text-primary dark:hover:bg-dark-paper"
            aria-label="Close menu"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary'
                  : 'text-light-text-primary hover:bg-light-paper dark:text-dark-text-primary dark:hover:bg-dark-paper'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </m.div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
