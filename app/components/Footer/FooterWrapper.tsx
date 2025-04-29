'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const FooterWrapper = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';

  if (isHomePage) {
    return <Footer />;
  }

  return null;
};

export default FooterWrapper;
