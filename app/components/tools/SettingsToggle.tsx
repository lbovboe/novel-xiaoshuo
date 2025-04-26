'use client';

import { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from '@/app/components/tools/SettingsModal';

const SettingsToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (!mounted) {
    return (
      <button
        className="relative rounded-md bg-gradient-to-r from-light-secondary to-light-primary p-2 text-dark-text-primary transition-colors dark:from-dark-secondary dark:to-dark-primary"
        aria-label="Open settings"
      >
        <span className="h-5 w-5"></span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={openModal}
        className="relative rounded-md bg-gradient-to-r from-light-secondary to-light-primary p-2 text-dark-text-primary transition-colors dark:from-dark-secondary dark:to-dark-primary"
        aria-label="Open settings"
      >
        <FiSettings size={20} />
      </button>

      {isOpen && <SettingsModal onClose={closeModal} />}
    </>
  );
};

export default SettingsToggle;
