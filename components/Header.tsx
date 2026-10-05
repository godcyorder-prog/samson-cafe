"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/cart", label: "My Cart" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-butter-400/20 bg-espresso-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-butter-400 to-toast-500 text-xl shadow-glow-sm">
            ☕
          </div>
          <span className="text-xl font-extrabold tracking-tight text-cream-50">
            Samson Cafe
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                pathname === link.href
                  ? "bg-espresso-700 text-butter-400"
                  : "text-cream-200 hover:bg-espresso-800 hover:text-cream-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative ml-2 flex items-center gap-2 rounded-full bg-espresso-700 px-4 py-2 text-sm font-bold text-butter-400 transition-colors hover:bg-espresso-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-butter-400 text-xs font-black text-espresso-900">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
