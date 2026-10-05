"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getMenu, getCategories } from "@/lib/api";
import type { MenuItem } from "@/lib/api";
import MenuCard from "@/components/MenuCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import { useCart } from "@/context/CartContext";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { totalItems, totalPrice } = useCart();

  const loadMenu = useCallback(async () => {
    try {
      setError(null);
      const [menuItems, cats] = await Promise.all([getMenu(), getCategories()]);
      setItems(menuItems);
      setCategories(["All", ...cats]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load menu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();
    const interval = setInterval(loadMenu, 60000);
    return () => clearInterval(interval);
  }, [loadMenu]);

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-cream-50 sm:text-4xl">
          Cafe Menu
        </h1>
        <p className="text-toast-400">Fresh & made to order</p>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              activeCategory === cat
                ? "bg-espresso-700 text-butter-400 shadow-glow-sm"
                : "border border-toast-500/50 bg-espresso-800/50 text-toast-300 hover:border-butter-400 hover:text-butter-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={loadMenu} />
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-toast-400">No items in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-butter-400/30 bg-espresso-950/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <span className="text-base font-black text-cream-50">
                {totalItems} item{totalItems !== 1 ? "s" : ""} · Total:{" "}
                <span className="text-butter-400">₹{totalPrice}</span>
              </span>
            </div>
            <Link href="/cart" className="btn-primary shrink-0">
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <MenuContent />
    </Suspense>
  );
}
