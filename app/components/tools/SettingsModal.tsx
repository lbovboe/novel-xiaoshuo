'use client';

import { useSettings } from '@/app/context/SettingsContext';
import { FontSizeOption, LanguageOption } from '@/app/types/settings';
import { useEffect, useRef } from 'react';
import { m } from 'framer-motion';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { fontSize, language, setFontSize, setLanguage } = useSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleFontSizeChange = (size: FontSizeOption) => {
    setFontSize(size);
  };

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <m.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-md rounded-xl border border-light-border bg-light-paper p-6 shadow-2xl dark:border-dark-border dark:bg-dark-paper"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">阅读设置</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-light-text-secondary transition-colors hover:bg-light-background/80 hover:text-light-primary dark:text-dark-text-secondary dark:hover:bg-dark-background/80 dark:hover:text-dark-primary"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 font-medium text-light-text-primary dark:text-dark-text-primary">字体大小</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
            {['small', 'medium', 'large', 'x-large'].map((size) => (
              <m.button
                key={size}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleFontSizeChange(size as FontSizeOption)}
                className={`rounded-lg px-4 py-2.5 transition-all duration-200 ${
                  fontSize === size
                    ? 'bg-light-primary text-white shadow-md dark:bg-dark-primary'
                    : 'bg-light-background/80 text-light-text-primary hover:bg-light-background dark:bg-dark-background/80 dark:text-dark-text-primary dark:hover:bg-dark-background'
                }`}
              >
                {size === 'small' && '小'}
                {size === 'medium' && '中'}
                {size === 'large' && '大'}
                {size === 'x-large' && '特大'}
              </m.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium text-light-text-primary dark:text-dark-text-primary">字体语言</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <m.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLanguageChange('simplified')}
              className={`rounded-lg px-4 py-2.5 transition-all duration-200 ${
                language === 'simplified'
                  ? 'bg-light-primary text-white shadow-md dark:bg-dark-primary'
                  : 'bg-light-background/80 text-light-text-primary hover:bg-light-background dark:bg-dark-background/80 dark:text-dark-text-primary dark:hover:bg-dark-background'
              }`}
            >
              简体中文
            </m.button>
            <m.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLanguageChange('traditional')}
              className={`rounded-lg px-4 py-2.5 transition-all duration-200 ${
                language === 'traditional'
                  ? 'bg-light-primary text-white shadow-md dark:bg-dark-primary'
                  : 'bg-light-background/80 text-light-text-primary hover:bg-light-background dark:bg-dark-background/80 dark:text-dark-text-primary dark:hover:bg-dark-background'
              }`}
            >
              繁體中文
            </m.button>
          </div>
        </div>
      </m.div>
    </m.div>
  );
};

export default SettingsModal;
