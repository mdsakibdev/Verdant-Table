"use client";

import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

export default function CartBadge({ className = "" }) {
  const { count, hydrated } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`View cart, ${hydrated ? count : 0} item${count === 1 ? "" : "s"}`}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${className}`}
    >
      <FaCartShopping aria-hidden="true" />
      {hydrated && count > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
