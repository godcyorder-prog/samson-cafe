"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/api";
import type { OrderResponse } from "@/lib/api";

const PAYMENT_METHODS = ["Cash", "UPI", "Card"] as const;
type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export default function PaymentPage() {
  const router = useRouter();
  const { items, customer, totalPrice, clearCart, setCustomer } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    const notes = `Payment: ${method}${customer.notes ? ` | ${customer.notes}` : ""}`;

    try {
      const order = await placeOrder({
        customer: { ...customer, notes },
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
      });

      if (order.success && order.orderId) {
        clearCart();
        router.push(
          `/confirmation?orderId=${order.orderId}&total=${order.total || totalPrice}`
        );
      } else {
        setError(order.message || "Failed to place order. Please try again.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-cream-50">No items to pay for</h2>
        <Link href="/menu" className="btn-primary">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-black tracking-tight text-cream-50">Payment</h1>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-cream-100">Select Payment Method</h2>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`rounded-xl border-2 px-4 py-4 text-center font-bold transition-all ${
                method === m
                  ? "border-butter-400 bg-espresso-700 text-butter-400 shadow-glow-sm"
                  : "border-toast-500/40 bg-espresso-800/50 text-toast-300 hover:border-toast-500"
              }`}
            >
              <div className="mb-1 text-2xl">
                {m === "Cash" ? "💵" : m === "UPI" ? "📱" : "💳"}
              </div>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="card-surface mb-8 p-6">
        <h2 className="mb-4 text-lg font-bold text-cream-100">Order Summary</h2>
        <div className="mb-4 flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-cream-200">
                {item.name} × {item.qty}
              </span>
              <span className="font-bold text-cream-50">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-butter-400/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-cream-50">Total</span>
            <span className="text-2xl font-black text-butter-400">₹{totalPrice}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/50 bg-red-900/30 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Link href="/checkout" className="btn-secondary flex-1">
          Back
        </Link>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={loading}
          className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
