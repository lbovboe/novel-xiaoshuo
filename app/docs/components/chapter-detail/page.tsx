'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocList from '@/app/components/docs/DocList';
import DocCodeBlock from '@/app/components/docs/DocCodeBlock';
import { useLanguage } from '@/app/components/docs/LanguageContext';

// Type for DocList items with optional codeBlock
type DocItem = { description: React.ReactNode; codeBlock?: React.ReactNode };

export default function ComponentsPage() {
  const { language } = useLanguage();

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'ChapterDetail Component' : '章节详情组件',
    description:
      language === 'en'
        ? 'Displays the content and navigation for a single book chapter, with advanced reading features.'
        : '用于展示单个书籍章节内容和导航，包含高级阅读功能。',
    sections: {
      overview: {
        title: language === 'en' ? 'Overview' : '概述',
        description:
          language === 'en'
            ? 'The ChapterDetail component is responsible for rendering the content of a single chapter in a book, providing navigation between chapters, formatting, and user experience enhancements such as auto-next and persistent reading progress.'
            : 'ChapterDetail 组件用于渲染书籍的单个章节内容，提供章节间导航、内容格式化，以及如自动翻页和阅读进度持久化等用户体验增强功能。',
      },
      props: {
        title: language === 'en' ? 'Props' : '属性',
        items: [
          {
            description:
              language === 'en' ? (
                <>
                  <strong>bookId</strong>: <code>string</code> — The unique identifier for the book.
                </>
              ) : (
                <>
                  <strong>bookId</strong>: <code>string</code> — 书籍的唯一标识符。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>chapter</strong>: <code>ChapterData</code> — The data object for the current chapter (title,
                  content, etc.).
                </>
              ) : (
                <>
                  <strong>chapter</strong>: <code>ChapterData</code> — 当前章节的数据对象（标题、内容等）。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>prevChapterExists</strong>: <code>boolean</code> — Whether a previous chapter exists for
                  navigation.
                </>
              ) : (
                <>
                  <strong>prevChapterExists</strong>: <code>boolean</code> — 是否存在上一章节用于导航。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>nextChapterExists</strong>: <code>boolean</code> — Whether a next chapter exists for
                  navigation and auto-next.
                </>
              ) : (
                <>
                  <strong>nextChapterExists</strong>: <code>boolean</code> — 是否存在下一章节用于导航和自动翻页。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>chapterIndex</strong>: <code>number</code> — The index of the current chapter (for navigation
                  and storage).
                </>
              ) : (
                <>
                  <strong>chapterIndex</strong>: <code>number</code> — 当前章节的索引（用于导航和存储）。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>bookData</strong>: <code>Book | null</code> — The book data object, used for chapter list and
                  metadata.
                </>
              ) : (
                <>
                  <strong>bookData</strong>: <code>Book | null</code> — 书籍数据对象，用于章节列表和元数据。
                </>
              ),
          },
        ] as DocItem[],
      },
      features: {
        title: language === 'en' ? 'Key Features' : '主要功能',
        items: [
          {
            description:
              language === 'en'
                ? 'Content Formatting: Splits chapter content into paragraphs and applies user-selected font size and text conversion (e.g., simplified/traditional Chinese).'
                : '内容格式化: 将章节内容分段，并应用用户选择的字体大小和文本转换（如简繁体）。',
            codeBlock: (
              <DocCodeBlock
                code={`function formatContent(content: string, fontSize: string, convertText: (text: string) => string) {
  const paragraphs = content.split('\\n').filter((p) => p.trim().length > 0);
  let fontSizeClass = 'text-lg';
  if (fontSize === 'small') fontSizeClass = 'text-base';
  if (fontSize === 'large') fontSizeClass = 'text-xl';
  if (fontSize === 'x-large') fontSizeClass = 'text-2xl';
  return paragraphs.map((paragraph, index) => (
    <p key={index} className={"mb-4 " + fontSizeClass + " leading-relaxed text-light-text-primary dark:text-dark-text-primary"}>
      {convertText(paragraph)}
    </p>
  ));
}`}
              />
            ),
          },
          {
            description:
              language === 'en'
                ? 'Navigation: Provides previous/next chapter navigation and a link back to the chapter list.'
                : '章节导航: 提供上一章/下一章导航和返回章节列表的链接。',
            codeBlock: (
              <DocCodeBlock
                code={`<div ref={footerRef} className="mt-8 flex justify-between">
  {prevChapterExists && (
    <Link href={\`/book/\${bookId}/chapter/\${chapterIndex - 1}\`}>{convertText('← 上一章')}</Link>
  )}
  <div className="flex-grow"></div>
  {nextChapterExists && (
    <Link href={\`/book/\${bookId}/chapter/\${chapterIndex + 1}\`}>{convertText('下一章 →')}</Link>
  )}
</div>`}
              />
            ),
          },
          {
            description:
              language === 'en'
                ? `Persistent Progress: Saves the user's current chapter and reading progress in localStorage, with logic to handle storage quota and cleanup.`
                : '进度持久化: 使用 localStorage 保存用户当前章节和阅读进度，并包含存储空间管理逻辑。',
            codeBlock: (
              <DocCodeBlock
                code={`useEffect(() => {
  try {
    const storageKey = \`book_data_\${bookId}\`;
    const existingData = localStorage.getItem(storageKey);
    // ... update or create bookData ...
    localStorage.setItem(storageKey, JSON.stringify(bookData));
  } catch (e) {
    // handle error
  }
}, [bookId, chapterIndex, chapter, bookData]);`}
              />
            ),
          },
          {
            description:
              language === 'en'
                ? 'Auto-Next: Optionally auto-navigates to the next chapter when the user scrolls to the bottom, with a visible countdown.'
                : '自动翻页: 当用户滚动到底部时可自动跳转到下一章，并显示倒计时提示。',
            codeBlock: (
              <DocCodeBlock
                code={`useEffect(() => {
  if (!autoNext || !nextChapterExists) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const timer = setTimeout(() => {
          router.push(\`/book/\${bookId}/chapter/\${chapterIndex + 1}\`);
        }, 2000);
        return () => clearTimeout(timer);
      }
    });
  }, { threshold: 0.5 });
  if (footerRef.current) observer.observe(footerRef.current);
  return () => { if (footerRef.current) observer.unobserve(footerRef.current); };
}, [autoNext, nextChapterExists, bookId, chapterIndex, router]);`}
              />
            ),
          },
          {
            description:
              language === 'en'
                ? 'Responsive & Animated UI: Uses animated transitions and adapts to light/dark themes for a modern reading experience.'
                : '响应式与动画界面: 使用动画过渡并适配明暗主题，提升阅读体验。',
            codeBlock: (
              <DocCodeBlock
                code={`return (
  <div className="container ...">
    <NavBar />
    <FadeIn direction="left">
      <Link href={\`/book/\${bookId}\`}>
        {convertText('返回章节列表')}
      </Link>
    </FadeIn>
    <FadeIn>
      <h1>{convertText(chapter.title)}</h1>
    </FadeIn>
    <div onClick={handleShowNavBar}>
      <div>{formatContent(chapter.content, fontSize, convertText)}</div>
    </div>
    {/* Navigation and auto-next UI ... */}
  </div>
);`}
              />
            ),
          },
        ],
      },
      notes: {
        title: language === 'en' ? 'Notes' : '注意事项',
        items: [
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Settings Integration</strong>: Relies on <code>useSettings</code> context for font size, text
                  conversion, and auto-next preferences.
                </>
              ) : (
                <>
                  <strong>设置集成</strong>: 依赖 <code>useSettings</code> 上下文获取字体、文本转换和自动翻页偏好。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>localStorage Quota</strong>: Handles quota exceeded errors by removing the oldest book data
                  entries.
                </>
              ) : (
                <>
                  <strong>localStorage 空间</strong>: 超出存储空间时会自动清理最旧的书籍数据。
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>SSR/CSR</strong>: This is a client-only component and should not be used on the server.
                </>
              ) : (
                <>
                  <strong>仅客户端</strong>: 该组件仅适用于客户端渲染，不应在服务端使用。
                </>
              ),
          },
        ] as DocItem[],
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.overview.title} delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.overview.description}
          </p>
        </DocSection>

        <DocSection title={content.sections.props.title} delay={1}>
          <DocList
            items={content.sections.props.items.map((item) => (
              <>
                {item.description}
                {item.codeBlock ? item.codeBlock : null}
              </>
            ))}
          />
        </DocSection>

        <DocSection title={content.sections.features.title} delay={2}>
          <DocList
            type="number"
            items={content.sections.features.items.map((item, idx) => (
              <>
                <div className="mb-2">{item.description}</div>
                {item.codeBlock && item.codeBlock}
              </>
            ))}
          />
        </DocSection>

        <DocSection title={content.sections.notes.title} delay={3}>
          <DocList
            items={content.sections.notes.items.map((item) => (
              <>
                {item.description}
                {item.codeBlock ? item.codeBlock : null}
              </>
            ))}
          />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
