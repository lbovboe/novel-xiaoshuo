'use client';

import Link from 'next/link';
import ThemeToggle from '../tools/ThemeToggle';
import SettingsToggle from '../tools/SettingsToggle';
import BookMenuToggle from '../tools/BookMenuToggle';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <nav className="w-full px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary"
        >
          {!imageError && mounted ? (
            <Image
              src="/icons/icon-72x72.png"
              alt="小说网站"
              width={40}
              height={40}
              className="rounded-full"
              style={{ objectFit: 'contain' }}
              onError={handleImageError}
            />
          ) : (
            <span className="text-xl font-bold text-white">书</span>
          )}
        </Link>
        <div className="flex items-center gap-2">
          <BookMenuToggle />
          <SettingsToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
