'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-gray-400 mb-6">An unexpected error occurred.</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
