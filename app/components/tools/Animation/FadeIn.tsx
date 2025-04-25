'use client';

import React, { ReactNode } from 'react';
import { m, Variants } from 'framer-motion';

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
  // Create variants based on direction
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={variants}
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