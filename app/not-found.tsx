import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-8xl font-black text-gray-800 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-gray-400 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
