'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="loading-spinner"></div>
      <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-6">
        Loading...
      </p>
    </div>
  );
}
