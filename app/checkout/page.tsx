"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Customer } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { customer, setCustomer, items, totalPrice } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isDelivery = customer.orderType === "Delivery";
  const isDineIn = customer.orderType === "Dine-in";

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = "Please enter your name";
    if (!/^\d{10}$/.test(customer.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (isDelivery && !customer.address.trim()) newErrors.address = "Please enter your delivery address";
    if (isDineIn && !customer.address.trim()) newErrors.address = "Please enter your table number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    router.push("/payment");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-cream-50">Your cart is empty</h2>
        <Link href="/menu" className="btn-primary">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-black tracking-tight text-cream-50">Customer Details</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold text-cream-100">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="input-field"
            placeholder="Your name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-bold text-cream-100">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="input-field"
            placeholder="10-digit mobile number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-cream-100">Order Type</label>
          <div className="flex gap-3">
            {(["Dine-in", "Takeaway", "Delivery"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setCustomer({ ...customer, orderType: type })}
                className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${
                  customer.orderType === type
                    ? "border-butter-400 bg-espresso-700 text-butter-400"
                    : "border-toast-500/40 bg-espresso-800/50 text-toast-300 hover:border-toast-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {(isDelivery || isDineIn) && (
          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-bold text-cream-100">
              {isDelivery ? "Delivery Address" : "Table Number"}
            </label>
            <input
              id="address"
              type="text"
              className="input-field"
              placeholder={isDelivery ? "Full address with landmark" : "e.g. Table 5"}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            />
            {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
          </div>
        )}

        <div>
          <label htmlFor="notes" className="mb-2 block text-sm font-bold text-cream-100">
            Special Instructions <span className="font-normal text-cream-500">(optional)</span>
          </label>
          <textarea
            id="notes"
            className="input-field min-h-[80px] resize-y"
            placeholder="Any allergies or preferences?"
            value={customer.notes}
            onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
          />
        </div>

        <div className="card-surface p-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cream-100">Order Total</span>
            <span className="text-xl font-black text-butter-400">₹{totalPrice}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/cart" className="btn-secondary flex-1">
            Back
          </Link>
          <button type="submit" className="btn-primary flex-1">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
