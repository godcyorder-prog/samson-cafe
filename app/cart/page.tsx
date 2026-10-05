"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQty, removeItem, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-espresso-800 text-4xl">
            🛒
          </div>
          <h2 className="mb-2 text-2xl font-bold text-cream-50">Your cart is empty</h2>
          <p className="mb-8 max-w-md text-toast-400">
            Looks like you haven&apos;t added anything yet. Check out our freshly baked pastries and hand-brewed coffees!
          </p>
          <Link href="/menu" className="btn-primary">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-black tracking-tight text-cream-50">My Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="card-surface flex items-center gap-4 p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-espresso-800 text-2xl font-black text-butter-400/60">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-cream-50">{item.name}</h3>
                  <p className="text-sm text-toast-400">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-butter-400/30 bg-espresso-900 p-1">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-700 text-lg font-black text-butter-400 transition-all hover:bg-espresso-600 active:scale-95"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-base font-black text-cream-50">{item.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-700 text-lg font-black text-butter-400 transition-all hover:bg-espresso-600 active:scale-95"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="w-16 text-right font-black text-butter-400">
                    ₹{item.price * item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-900/40 text-red-400 transition-all hover:bg-red-900/60"
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-toast-300 transition-colors hover:text-butter-400"
          >
            ← Add more items
          </Link>
        </div>

        <div className="lg:col-span-5 lg:col-span-4">
          <div className="card-surface sticky top-24 p-6">
            <h2 className="mb-4 text-xl font-bold text-cream-50">Order Bill Summary</h2>
            <div className="mb-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-cream-200">
                <span>Item Subtotal</span>
                <span className="font-bold text-cream-50">₹{totalPrice}</span>
              </div>
            </div>
            <div className="mb-6 border-t border-butter-400/20 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-cream-50">Total</span>
                <span className="text-2xl font-black text-butter-400">₹{totalPrice}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full">
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
