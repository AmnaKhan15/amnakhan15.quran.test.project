'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary-200 dark:border-primary-800">
      <div className="container mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link 
            href="/" 
            className="group"
          >
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-primary-900 dark:text-primary-50 tracking-tight">
              Quran Foundation
            </h1>
          </Link>
          
          <form 
            onSubmit={handleSearch} 
            className="flex-1 max-w-md w-full"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verses..."
                className="w-full px-4 py-2.5 pl-11 pr-4 rounded-lg text-primary-900 dark:text-primary-50 bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all placeholder:text-primary-400 dark:placeholder:text-primary-500"
              />
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400 w-4 h-4 pointer-events-none" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

