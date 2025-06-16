'use client';
import React from 'react';
import FadeIn from './tools/Animation/FadeIn';
import BookCard from './Book/BookCard';

// Type definition for book data
export type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapterCount: number;
};

interface HomeClientProps {
  books: Book[];
}

const HomeClient: React.FC<HomeClientProps> = ({ books }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute right-10 top-40 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mix-blend-multiply blur-xl filter delay-1000"></div>
        <div className="absolute -bottom-8 left-20 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-red-500 mix-blend-multiply blur-xl filter delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen flex justify-center items-center">
        <div className="container relative mx-auto px-4 md:px-8 translate-y-[-40px]">
          <FadeIn direction="down">
            <div className="mb-16 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-5xl font-black text-transparent dark:from-white dark:via-purple-200 dark:to-white md:text-7xl">
                最爱小说网
              </h1>
              <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl">
                探索无限想象的世界，沉浸在精彩纷呈的故事中
              </p>
              <div className="mt-8 flex justify-center">
                <div className="h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </div>
              {/* Modern Button to scroll to books section */}
              <div className="mt-10 flex justify-center">
                <a
                  href="#books-section"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('books-section');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                >
                  浏览热门小说
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Stats Section */}
          <FadeIn direction="up" delay={0.1}>
            <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-white/20 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/60">
                <div className="mb-2 text-3xl font-bold text-purple-600 dark:text-purple-400">{books.length}</div>
                <div className="text-slate-600 dark:text-slate-300">精选小说</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/60">
                <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {books.reduce((total, book) => total + book.chapterCount, 0)}
                </div>
                <div className="text-slate-600 dark:text-slate-300">总章节数</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/60">
                <div className="mb-2 text-3xl font-bold text-pink-600 dark:text-pink-400">∞</div>
                <div className="text-slate-600 dark:text-slate-300">无限精彩</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Books Section */}
      <div className="container mx-auto min-h-screen px-4 pb-20 md:px-8" id="books-section">
        <FadeIn direction="up" delay={0.2}>
          <div className="mb-12">
            <h2 className="mb-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-white dark:via-purple-200 dark:to-white md:text-4xl">
              热门小说推荐
            </h2>
            <p className="mx-auto max-w-2xl text-center text-slate-600 dark:text-slate-300">
              精心挑选的优质小说，每一部都是值得品味的佳作
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {books.map((book, index) => (
              <div key={book.id} style={{ animationDelay: `${index * 100}ms` }}>
                <BookCard
                  id={book.id}
                  title={book.title}
                  description={book.description}
                  coverImage={book.coverImage}
                  chapterCount={book.chapterCount}
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Empty State */}
        {books.length === 0 && (
          <FadeIn direction="up" delay={0.3}>
            <div className="py-20 text-center">
              <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <svg
                  className="h-16 w-16 text-purple-500 dark:text-purple-400"
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
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-slate-800 dark:text-white">暂无小说</h3>
              <p className="mx-auto max-w-md text-slate-600 dark:text-slate-300">
                精彩的故事正在路上，敬请期待更多优质内容的到来
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default HomeClient;
