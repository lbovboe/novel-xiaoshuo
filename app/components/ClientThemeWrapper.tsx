'use client';

import dynamic from 'next/dynamic';

// Dynamically import ThemeMetadata to avoid SSR issues with window/document
const ThemeMetadata = dynamic(() => import('@/app/components/ThemeMetadata'), {
  ssr: false,
});

export default function ClientThemeWrapper() {
  return <ThemeMetadata />;
}
