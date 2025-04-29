'use client';

import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';

type TocItem = {
  id: string;
  title: string;
  level: number;
};

type DocTableOfContentsProps = {
  titleSelector?: string;
};

export default function DocTableOfContents({ titleSelector = 'h2, h3' }: DocTableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const titles = document.querySelectorAll(titleSelector);
    const tocItems: TocItem[] = [];

    titles.forEach((title) => {
      const id = title.id || title.textContent?.toLowerCase().replace(/\s+/g, '-') || '';

      if (!title.id) {
        title.id = id;
      }

      tocItems.push({
        id,
        title: title.textContent || '',
        level: title.tagName === 'H2' ? 1 : 2,
      });
    });

    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    titles.forEach((title) => observer.observe(title));

    return () => {
      titles.forEach((title) => observer.unobserve(title));
    };
  }, [titleSelector]);

  if (toc.length < 2) return null;

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 hidden max-h-[calc(100vh-6rem)] overflow-auto border-l border-light-border py-4 pl-6 dark:border-dark-border lg:block lg:w-64 lg:flex-shrink-0"
    >
      <h4 className="text-light-text/70 dark:text-dark-text/70 mb-4 text-sm font-semibold uppercase">On this page</h4>
      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id} className={`pl-${(item.level - 1) * 4}`}>
              <a
                href={`#${item.id}`}
                className={`block py-1 text-sm transition-colors ${
                  activeId === item.id
                    ? 'font-medium text-light-primary dark:text-dark-primary'
                    : 'text-light-text/70 dark:text-dark-text/70 hover:text-light-primary dark:hover:text-dark-primary'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </m.div>
  );
}
