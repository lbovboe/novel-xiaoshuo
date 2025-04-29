'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

type Feature = {
  title: string;
  description: string;
};

type KeyFeaturesProps = {
  features: Feature[];
  delay?: number;
};

export default function KeyFeatures({ features, delay = 0 }: KeyFeaturesProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay * 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const iconColors = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-purple-500',
    'from-indigo-500 to-blue-500',
  ];

  return (
    <m.div className="space-y-5" initial="hidden" animate="visible" variants={containerVariants}>
      {features.map((feature, index) => {
        const gradientColor = iconColors[index % iconColors.length];
        const number = index + 1;

        return (
          <m.div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:bg-black/20"
            variants={itemVariants}
          >
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-br ${gradientColor} opacity-75 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md`}
                ></div>
                <div className="bg-doc_bg-light dark:bg-doc_bg-dark relative flex h-12 w-12 items-center justify-center rounded-full">
                  <div className="relative">
                    <FaCircle
                      size={28}
                      className={`bg-gradient-to-br bg-clip-text text-transparent ${gradientColor}`}
                    />
                    <div className="text-doc_text-heading_light dark:text-doc_text-heading_dark absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {number}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-1 text-lg font-bold">
                  {feature.title}
                </h4>
                <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark">{feature.description}</p>
              </div>
            </div>
          </m.div>
        );
      })}
    </m.div>
  );
}
