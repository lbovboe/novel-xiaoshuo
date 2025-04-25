'use client';

import { ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

interface MotionConfigProps {
  children: ReactNode;
}

// This component properly configures Framer Motion for the Next.js app
// By using LazyMotion with domAnimation, we avoid the issue with
// "export *" in client boundaries
export default function MotionConfig({ children }: MotionConfigProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
} 