'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import VerseCard from '@/components/VerseCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Verse, Chapter } from '@/lib/quran-api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = parseInt(params.id as string);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    per_page: 10,
    current_page: 1,
    next_page: null as number | null,
    total_pages: 1,
    total_records: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch chapter info
        const chaptersResponse = await fetch('/api/chapters');
        if (!chaptersResponse.ok) throw new Error('Failed to fetch chapter');
        const chaptersData = await chaptersResponse.json();
        const foundChapter = chaptersData.chapters.find((c: Chapter) => c.id === chapterId);
        if (!foundChapter) throw new Error('Chapter not found');
        setChapter(foundChapter);

        // Fetch verses
        const versesResponse = await fetch(
          `/api/chapters/${chapterId}/verses?page=${currentPage}&per_page=10&translations=85`
        );
        if (!versesResponse.ok) throw new Error('Failed to fetch verses');
        const versesData = await versesResponse.json();
        setVerses(versesData.verses);
        setPagination(versesData.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (chapterId) {
      fetchData();
    }
  }, [chapterId, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page) {
      setCurrentPage(pagination.next_page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && !chapter) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-6 py-4 rounded-lg">
            <p className="font-semibold mb-2">Error:</p>
            <p className="text-sm">{error || 'Chapter not found'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <button
          onClick={() => router.push('/')}
          className="mb-12 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Chapters
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-primary-200 dark:border-primary-800 p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary-100 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 mb-6">
              <span className="text-2xl font-serif font-semibold text-primary-700 dark:text-primary-300">
                {chapter.id}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary-900 dark:text-primary-50 mb-3 tracking-tight">
              {chapter.name_simple}
            </h1>
            <p className="text-xl text-primary-600 dark:text-primary-400 mb-6">
              {chapter.translated_name.name}
            </p>
            <p className="text-4xl md:text-5xl font-arabic text-primary-900 dark:text-primary-50 arabic-text mb-8">
              {chapter.name_arabic}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1.5 rounded-md bg-primary-50 dark:bg-primary-900/50 text-xs font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 capitalize">
                {chapter.revelation_place}
              </span>
              <span className="px-3 py-1.5 rounded-md bg-accent-50 dark:bg-accent-900/20 text-xs font-medium text-accent-700 dark:text-accent-400 border border-accent-200 dark:border-accent-800">
                {chapter.verses_count} verses
              </span>
              <span className="px-3 py-1.5 rounded-md bg-primary-50 dark:bg-primary-900/50 text-xs font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                Pages {chapter.pages[0]}-{chapter.pages[1]}
              </span>
            </div>
          </div>

          {chapter.bismillah_pre && (
            <div className="text-center py-8 border-t border-b border-primary-200 dark:border-primary-800">
              <p className="text-3xl md:text-4xl font-arabic text-primary-900 dark:text-primary-50 arabic-text">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}
        </div>

        {loading && <LoadingSpinner />}

        {!loading && verses.length > 0 && (
          <>
            <div className="mb-8">
              {verses.map((verse, index) => (
                <VerseCard key={verse.id} verse={verse} index={index} />
              ))}
            </div>

            <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-lg border border-primary-200 dark:border-primary-800 p-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                Page {currentPage} of {pagination.total_pages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={!pagination.next_page}
                className="flex items-center gap-2 px-4 py-2 text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

