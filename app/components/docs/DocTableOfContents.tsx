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
      className="border-doc_border-light dark:border-doc_border-dark sticky top-24 hidden max-h-[calc(100vh-6rem)] overflow-auto border-l py-4 pl-6 lg:block lg:w-64 lg:flex-shrink-0"
    >
      <h4 className="text-doc_text-muted_light dark:text-doc_text-muted_dark mb-4 text-sm font-semibold uppercase">
        On this page
      </h4>
      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id} className={`pl-${(item.level - 1) * 4}`}>
              <a
                href={`#${item.id}`}
                className={`block py-1 text-sm transition-colors ${
                  activeId === item.id
                    ? 'text-doc_text-link_light dark:text-doc_text-link_dark font-medium'
                    : 'text-doc_text-muted_light dark:text-doc_text-muted_dark hover:text-doc_text-link_light dark:hover:text-doc_text-link_dark'
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
