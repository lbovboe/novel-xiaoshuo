'use client';

import React, { ReactNode } from 'react';
import { m } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className = '',
}: FadeInProps) => {
  // Set initial and animate properties based on direction
  let initial = { opacity: 0 };
  if (direction === 'up') initial = { ...initial, y: 30 };
  if (direction === 'down') initial = { ...initial, y: -30 };
  if (direction === 'left') initial = { ...initial, x: 30 };
  if (direction === 'right') initial = { ...initial, x: -30 };

  return (
    <m.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export default FadeIn; 