'use client';

import { useSettings } from '@/app/context/SettingsContext';
import { FontSizeOption, LanguageOption } from '@/app/types/settings';
import { useEffect, useRef } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="w-full max-w-md rounded-lg bg-light-paper p-6 shadow-xl dark:bg-dark-paper">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">阅读设置</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 font-medium text-light-text-primary dark:text-dark-text-primary">字体大小</h3>
          <div className="flex space-x-2">
            {['small', 'medium', 'large', 'x-large'].map((size) => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size as FontSizeOption)}
                className={`rounded-md px-3 py-2 ${
                  fontSize === size
                    ? 'bg-light-primary text-white dark:bg-dark-primary'
                    : 'bg-light-background text-light-text-primary dark:bg-dark-background dark:text-dark-text-primary'
                }`}
              >
                {size === 'small' && '小'}
                {size === 'medium' && '中'}
                {size === 'large' && '大'}
                {size === 'x-large' && '特大'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-light-text-primary dark:text-dark-text-primary">字体语言</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleLanguageChange('simplified')}
              className={`rounded-md px-3 py-2 ${
                language === 'simplified'
                  ? 'bg-light-primary text-white dark:bg-dark-primary'
                  : 'bg-light-background text-light-text-primary dark:bg-dark-background dark:text-dark-text-primary'
              }`}
            >
              简体中文
            </button>
            <button
              onClick={() => handleLanguageChange('traditional')}
              className={`rounded-md px-3 py-2 ${
                language === 'traditional'
                  ? 'bg-light-primary text-white dark:bg-dark-primary'
                  : 'bg-light-background text-light-text-primary dark:bg-dark-background dark:text-dark-text-primary'
              }`}
            >
              繁體中文
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
