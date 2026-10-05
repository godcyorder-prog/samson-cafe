"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Customer } from "@/lib/api";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  customer: Customer;
  addItem: (id: string, name: string, price: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  setCustomer: (c: Customer) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "samson-cafe-cart";
const CUSTOMER_KEY = "samson-cafe-customer";

const defaultCustomer: Customer = {
  name: "",
  phone: "",
  orderType: "Dine-in",
  address: "",
  notes: "",
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomerState] = useState<Customer>(defaultCustomer);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    try {
      const savedCustomer = localStorage.getItem(CUSTOMER_KEY);
      if (savedCustomer) setCustomerState(JSON.parse(savedCustomer));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    } catch {}
  }, [customer, hydrated]);

  const addItem = useCallback((id: string, name: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, name, price, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const setCustomer = useCallback((c: Customer) => {
    setCustomerState(c);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        customer,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        setCustomer,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
