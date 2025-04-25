import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Meet <span className="text-violet-400">AIZOKU</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          A powerful, offline AI chat platform. Built for privacy, performance, and creativity — all on your machine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition">
            Start New Discussion
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          Made with 💜 using Next.js 15, Ollama, and Tailwind CSS.
        </div>
      </div>
    </main>
  );
}
