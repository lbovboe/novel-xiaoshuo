'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { FaCopy, FaCheck } from 'react-icons/fa';

type DocCodeBlockProps = {
  code: string;
  language?: string;
};

export default function DocCodeBlock({ code, language = 'bash' }: DocCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-doc_text-body_light dark:text-doc_text-body_dark relative my-4"
    >
      <pre className="relative overflow-x-auto rounded-md bg-gray-100 p-4 text-sm dark:bg-black/20">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        >
          {copied ? <FaCheck /> : <FaCopy />}
        </button>
        <code className="font-mono">{code}</code>
      </pre>
    </m.div>
  );
}
