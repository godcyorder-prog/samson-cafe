"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "N/A";
  const total = searchParams.get("total") || "0";
  const { items } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-900/40 text-4xl">
        ✓
      </div>
      <h1 className="mb-2 text-3xl font-black tracking-tight text-cream-50">
        Order Confirmed!
      </h1>
      <p className="mb-8 text-toast-400">
        Thank you for ordering from Samson Cafe. We&apos;ll have it ready soon.
      </p>

      <div className="card-surface mb-8 p-6 text-left">
        <div className="mb-4 flex items-center justify-between border-b border-butter-400/20 pb-4">
          <div>
            <p className="text-sm text-toast-400">Order Number</p>
            <p className="text-xl font-black text-butter-400">{orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-toast-400">Total Paid</p>
            <p className="text-xl font-black text-butter-400">₹{total}</p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-cream-100">Items Ordered:</p>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-cream-200">
                  {item.name} × {item.qty}
                </span>
                <span className="font-bold text-cream-50">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/menu" className="btn-primary">
        Back to Menu
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
