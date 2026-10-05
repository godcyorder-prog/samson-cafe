"use client";
import TiltCard from "./TiltCard";
import { useState } from "react";
import type { MenuItem } from "@/lib/api";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
}

function MenuCardInner({ item }: MenuCardProps) {
  const { addItem } = useCart();
  const isSoldOut = !item.available;
  const isLowStock = item.stock > 0 && item.stock <= 5;

  const handleAdd = () => {
  addItem(item.id, item.name, item.price);
};
  const isVeg = item.category.toLowerCase().includes("veg") || item.name.toLowerCase().includes("veg");

  if (isSoldOut) {
    return (
      <div className=" flex flex-col items-center p-6 opacity-50">
        <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-espresso-800 text-5xl font-black text-cream-500/40">
          {item.name.charAt(0)}
        </div>
        <h3 className="mb-1 text-lg font-bold text-cream-500/50 line-through">{item.name}</h3>
        <span className="rounded-full bg-espresso-800 px-4 py-1 text-sm font-bold text-cream-500/50">
          Sold out
        </span>
      </div>
    );
  }

  return (
    <div className=" group flex flex-col items-center p-5 transition-all duration-200">
      <div className="float-img relative mb-2 flex h-56 w-56 items-center justify-center">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-5xl font-black text-butter-400/60">
            {item.name.charAt(0)}
          </span>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-espresso-950/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-butter-400">
          {item.category}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-sm border-2 ${
            isVeg ? "border-emerald-400 bg-emerald-950/70" : "border-red-500 bg-red-950/70"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isVeg ? "bg-emerald-400" : "bg-red-500"}`} />
        </span>
        <span className={`text-[10px] font-black uppercase tracking-wider ${isVeg ? "text-emerald-400" : "text-red-400"}`}>
          {isVeg ? "Pure Veg" : "Non-Veg"}
        </span>
      </div>

      <h3 className="mb-1 text-center text-lg font-bold text-cream-50">{item.name}</h3>

      <div className="mb-3 text-2xl font-black text-butter-400">₹{item.price}</div>

      {isLowStock && (
        <span className="mb-2 rounded-full bg-red-900/50 px-3 py-1 text-xs font-bold text-red-300">
          Only {item.stock} left
        </span>
      )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="btn-primary px-8 py-3 text-sm font-black uppercase tracking-wider"
          >
            Add
          </button>
        </div>
      </div>
    );
}
export default function MenuCard(props: MenuCardProps) {
  return (
    <TiltCard>
      <MenuCardInner {...props} />
    </TiltCard>
  );
}
