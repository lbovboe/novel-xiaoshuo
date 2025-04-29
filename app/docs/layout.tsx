'use client';

import { LanguageProvider } from '../components/docs/LanguageContext';
import { Metadata } from 'next';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
