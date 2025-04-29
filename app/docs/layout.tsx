'use client';

import React from 'react';
import { LanguageProvider } from '../components/docs/LanguageContext';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
