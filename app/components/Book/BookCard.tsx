'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';

type BookCardProps = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapterCount: number;
};

const BookCard = ({ id, title, description, coverImage, chapterCount }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <m.div
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group cursor-pointer"
    >
      <Link href={`/book/${encodeURIComponent(id)}`} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-slate-700/50 dark:bg-slate-800/80 dark:shadow-black/20 dark:hover:shadow-purple-500/20">
          {/* Cover Image Container */}
          <div className="relative w-full overflow-hidden rounded-t-3xl pb-[140%]">
            {!imageError ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
                <div className="p-6 text-center text-white">
                  <svg
                    className="mx-auto mb-4 h-16 w-16 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <p className="text-lg font-medium opacity-90">{title}</p>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Floating Action Button */}
            <m.div
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-slate-800/90"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-5 w-5 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </m.div>

            {/* Chapter Count Badge */}
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 backdrop-blur-md">
              <span className="text-sm font-medium text-white">{chapterCount} 章节</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 p-6">
            {/* Title */}
            <div>
              <h3 className="mb-2 line-clamp-2 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                {title}
              </h3>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between pt-2">
              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">完结</span>
              </div>

              {/* Read Button */}
              <m.div
                className="flex items-center space-x-2 text-sm font-medium text-purple-600 transition-colors duration-300 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300"
                whileHover={{ x: 4 }}
              >
                <span>立即阅读</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </m.div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5" />
        </div>
      </Link>
    </m.div>
  );
};

export default BookCard;
