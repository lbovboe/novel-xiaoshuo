'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';
import { FaBook, FaTools, FaCogs, FaCode, FaTimes, FaBars, FaGlobe } from 'react-icons/fa';
import { useLanguage } from './LanguageContext';

type NavItem = {
  label: {
    en: string;
    zh: string;
  };
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: {
      en: 'Overview',
      zh: '概述',
    },
    href: '/docs',
    icon: <FaBook className="text-doc_icon-light dark:text-doc_icon-dark" />,
  },
  {
    label: {
      en: 'User Guide',
      zh: '用户指南',
    },
    href: '/docs/user-guide',
    icon: <FaTools className="text-doc_icon-light dark:text-doc_icon-dark" />,
  },
  {
    label: {
      en: 'Features',
      zh: '功能特性',
    },
    href: '/docs/features',
    icon: <FaCogs className="text-doc_icon-light dark:text-doc_icon-dark" />,
  },
  {
    label: {
      en: 'UI Components',
      zh: 'UI 组件',
    },
    href: '/docs/components',
    icon: <FaCode className="text-doc_icon-light dark:text-doc_icon-dark" />,
  },
  {
    label: {
      en: 'Development',
      zh: '开发指南',
    },
    href: '/docs/development',
    icon: <FaCode className="text-doc_icon-light dark:text-doc_icon-dark" />,
  },
];

export default function DocSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering the correct language content after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Before client-side hydration, always show English content to match the server
  const docLabel = mounted ? (language === 'en' ? 'Documentation' : '文档') : 'Documentation';
  const toggleLabel = mounted ? (language === 'en' ? '中文' : 'English') : '中文';

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-doc_icon-light hover:bg-doc_icon-accent_light dark:bg-doc_icon-dark dark:hover:bg-doc_icon-accent_dark flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-24 overflow-y-auto pr-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-doc_text-muted_light dark:text-doc_text-muted_dark text-sm font-semibold uppercase tracking-wider">
              {docLabel}
            </h3>
            <button
              onClick={toggleLanguage}
              className="text-doc_icon-light hover:text-doc_icon-accent_light dark:text-doc_icon-dark dark:hover:text-doc_icon-accent_dark flex items-center text-sm font-medium"
              aria-label="Toggle language"
            >
              <FaGlobe size={16} className="mr-1" />
              <span>{toggleLabel}</span>
            </button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-doc_bg-accent_light text-doc_text-link_light dark:bg-doc_bg-accent_dark dark:text-doc_text-link_dark'
                    : 'text-doc_text-body_light hover:bg-doc_bg-paper_light dark:text-doc_text-body_dark dark:hover:bg-doc_bg-paper_dark'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {mounted ? (language === 'en' ? item.label.en : item.label.zh) : item.label.en}
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
        className="bg-doc_bg-light dark:bg-doc_bg-dark fixed inset-y-0 right-0 z-40 w-64 p-4 shadow-xl md:hidden"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-doc_text-muted_light dark:text-doc_text-muted_dark text-sm font-semibold uppercase tracking-wider">
            {docLabel}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="text-doc_icon-light hover:text-doc_icon-accent_light dark:text-doc_icon-dark dark:hover:text-doc_icon-accent_dark flex items-center rounded-full p-2 text-sm font-medium"
              aria-label="Toggle language"
            >
              <FaGlobe size={16} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-doc_text-body_light hover:bg-doc_bg-paper_light dark:text-doc_text-body_dark dark:hover:bg-doc_bg-paper_dark rounded-full p-2"
              aria-label="Close menu"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-doc_bg-accent_light text-doc_text-link_light dark:bg-doc_bg-accent_dark dark:text-doc_text-link_dark'
                  : 'text-doc_text-body_light hover:bg-doc_bg-paper_light dark:text-doc_text-body_dark dark:hover:bg-doc_bg-paper_dark'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {mounted ? (language === 'en' ? item.label.en : item.label.zh) : item.label.en}
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
