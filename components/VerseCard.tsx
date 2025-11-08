'use client';

import { Verse } from '@/lib/quran-api';
import { motion } from 'framer-motion';

interface VerseCardProps {
  verse: Verse;
  index?: number;
}

export default function VerseCard({ verse, index = 0 }: VerseCardProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-900 rounded-lg border border-primary-200 dark:border-primary-800 p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center border border-primary-200 dark:border-primary-800">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            {verse.verse_number}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-2xl font-arabic text-primary-900 dark:text-primary-50 mb-5 arabic-text leading-relaxed">
            {verse.text_uthmani || verse.text_simple}
          </div>
          
          {verse.translations && verse.translations.length > 0 && (
            <div className="mt-5 pt-5 border-t border-primary-200 dark:border-primary-800">
              {verse.translations.map((translation, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 border border-accent-200 dark:border-accent-800">
                      {translation.resource_name}
                    </span>
                    <span className="text-xs text-primary-500 dark:text-primary-500">
                      {translation.resource_language_name}
                    </span>
                  </div>
                  <p className="text-primary-700 dark:text-primary-300 leading-relaxed text-base">
                    {translation.text}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-5 pt-4 border-t border-primary-200 dark:border-primary-800 flex flex-wrap items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/50 text-xs font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
              Juz {verse.juz_number}
            </span>
            <span className="px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/50 text-xs font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
              Hizb {verse.hizb_number}
            </span>
            <span className="px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/50 text-xs font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
              Page {verse.page_number}
            </span>
            {verse.sajdah_type && (
              <span className="px-2 py-1 rounded-md bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-xs font-semibold border border-accent-200 dark:border-accent-800">
                Sajdah
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
