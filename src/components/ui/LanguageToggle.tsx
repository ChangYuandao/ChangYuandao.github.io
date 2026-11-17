'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface LanguageToggleProps {
  i18n: I18nRuntimeConfig;
}

export default function LanguageToggle({ i18n }: LanguageToggleProps) {
  const { locale, setLocale } = useLocaleStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!i18n.enabled || !i18n.switcher || i18n.locales.length <= 1) {
    return null;
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-14 h-10 rounded-lg border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] bg-background dark:bg-neutral-800">
        <div className="w-6 h-4 rounded bg-neutral-300 animate-pulse" />
      </div>
    );
  }

  const currentLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  const nextLocale = i18n.locales[(i18n.locales.indexOf(currentLocale) + 1) % i18n.locales.length];
  const nextLabel = i18n.labels[nextLocale] || nextLocale;
  const switchLabel = currentLocale === 'zh' ? `切换到${nextLabel}` : `Switch to ${nextLabel}`;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      onClick={() => setLocale(nextLocale)}
      className={cn(
        'flex items-center justify-center gap-1 px-2 h-10 rounded-lg',
        'border border-neutral-200 bg-background hover:bg-neutral-50',
        'dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-800 dark:hover:bg-neutral-700',
        'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        'text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-white'
      )}
      title={switchLabel}
      aria-label={switchLabel}
    >
      <LanguageIcon className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-medium">{nextLabel}</span>
    </motion.button>
  );
}
