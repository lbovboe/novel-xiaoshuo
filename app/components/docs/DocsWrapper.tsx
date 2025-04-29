'use client';

import React from 'react';
import DocSidebar from './DocSidebar';
import { m } from 'framer-motion';

type DocsWrapperProps = {
  children: React.ReactNode;
};

export default function DocsWrapper({ children }: DocsWrapperProps) {
  return (
    <div className="">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl p-4"
      >
        <div className="flex flex-col gap-8 md:flex-row">
          <DocSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </m.div>
    </div>
  );
}
