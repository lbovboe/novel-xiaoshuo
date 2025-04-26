'use client';

import Link from 'next/link';
import ThemeToggle from '../tools/ThemeToggle';
import Image from 'next/image';
const Navbar = () => {
  return (
    <nav className="w-full border-b bg-light-paper/30 px-6 py-4 dark:bg-dark-paper/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/icon1.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
            style={{ objectFit: 'contain' }}
          />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
