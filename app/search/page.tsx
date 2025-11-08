'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import VerseCard from '@/components/VerseCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Verse } from '@/lib/quran-api';
import { Search as SearchIcon } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&language=en`);
      if (!response.ok) {
        throw new Error('Failed to search verses');
      }
      const data = await response.json();
      setVerses(data.verses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setVerses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary-900 dark:text-primary-50 mb-6 tracking-tight">
            Search the Quran
          </h2>
          
          <form 
            onSubmit={handleSearch} 
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for verses..."
                className="w-full px-4 py-3 pl-11 pr-4 rounded-lg text-primary-900 dark:text-primary-50 bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all placeholder:text-primary-400 dark:placeholder:text-primary-500"
              />
              <SearchIcon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400 w-4 h-4 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2.5 bg-primary-900 dark:bg-primary-50 text-primary-50 dark:text-primary-900 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-100 transition-colors font-medium text-sm"
            >
              Search
            </button>
          </form>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && hasSearched && (
          <>
            {verses.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-primary-200 dark:border-primary-800 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center border border-primary-200 dark:border-primary-800">
                  <SearchIcon className="w-8 h-8 text-primary-400" />
                </div>
                <p className="text-primary-700 dark:text-primary-300 text-lg font-semibold mb-2">
                  No verses found for &quot;{query}&quot;
                </p>
                <p className="text-primary-500 dark:text-primary-500 text-sm">
                  Try a different search term
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    Found <span className="font-semibold text-primary-900 dark:text-primary-50">{verses.length}</span> result{verses.length !== 1 ? 's' : ''} for &quot;<span className="font-semibold">{query}</span>&quot;
                  </p>
                </div>
                <div>
                  {verses.map((verse, index) => (
                    <VerseCard key={verse.id} verse={verse} index={index} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {!hasSearched && !loading && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-primary-200 dark:border-primary-800 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center border border-primary-200 dark:border-primary-800">
              <SearchIcon className="w-10 h-10 text-primary-500 dark:text-primary-400" />
            </div>
            <p className="text-primary-700 dark:text-primary-300 text-lg font-semibold">
              Enter a search term to find verses
            </p>
            <p className="text-primary-500 dark:text-primary-500 text-sm mt-2">
              Search across all translations and verses
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <main className="container mx-auto px-6 py-16">
          <LoadingSpinner />
        </main>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

