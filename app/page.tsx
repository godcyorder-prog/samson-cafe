"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";

export default function HomePage() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-butter-400 to-toast-500 shadow-glow-lg">
          <span className="text-5xl">☕</span>
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-cream-50 sm:text-5xl lg:text-6xl">
          Samson Cafe
        </h1>
        <p className="mb-8 max-w-xl text-lg text-toast-300">
          Artisan espresso, fresh pastries, and mindful breakfasts handcrafted daily.
        </p>
        <Link href="/menu" className="btn-primary mb-12 text-lg">
          View Menu
        </Link>

        {categories.length > 0 && (
          <div className="w-full">
            <h2 className="mb-6 text-xl font-bold text-cream-100">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/menu?category=${encodeURIComponent(cat)}`}
                  className="rounded-full border-2 border-toast-500/60 bg-espresso-800/60 px-6 py-3 font-semibold text-toast-300 transition-all hover:border-butter-400 hover:bg-espresso-700 hover:text-butter-400"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
