'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ChapterCard from '@/components/ChapterCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Chapter } from '@/lib/quran-api';

export default function Home() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChapters() {
      try {
        setLoading(true);
        const response = await fetch('/api/chapters');
        if (!response.ok) {
          throw new Error('Failed to fetch chapters');
        }
        const data = await response.json();
        setChapters(data.chapters);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary-900 dark:text-primary-50 mb-4 tracking-tight">
            Chapters of the Quran
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            Select a chapter to begin reading
          </p>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Error:</p>
            <p className="mb-2 text-sm">{error}</p>
            <p className="text-xs opacity-90">
              Please make sure you have set QURAN_CLIENT_ID and QURAN_CLIENT_SECRET in your .env.local file
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

