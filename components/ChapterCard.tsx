'use client';

import Link from 'next/link';
import { Chapter } from '@/lib/quran-api';
import { motion } from 'framer-motion';

interface ChapterCardProps {
  chapter: Chapter;
  index?: number;
}

export default function ChapterCard({ chapter, index = 0 }: ChapterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.03,
        ease: "easeOut"
      }}
    >
      <Link
        href={`/chapters/${chapter.id}`}
        className="group block bg-white dark:bg-slate-900 rounded-lg border border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-200 p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center border border-primary-200 dark:border-primary-800 group-hover:bg-accent-100 dark:group-hover:bg-accent-900/30 transition-colors">
            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
              {chapter.id}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-1 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
              {chapter.name_simple}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
              {chapter.translated_name.name}
            </p>
            
            <p className="text-xl font-arabic text-primary-800 dark:text-primary-200 mb-4 arabic-text">
              {chapter.name_arabic}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 capitalize">
                {chapter.revelation_place}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 border border-accent-200 dark:border-accent-800">
                {chapter.verses_count} verses
              </span>
              <span className="px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                Pages {chapter.pages[0]}-{chapter.pages[1]}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
