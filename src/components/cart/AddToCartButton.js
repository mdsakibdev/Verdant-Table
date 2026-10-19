"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  slug,
  name,
  qty = 1,
  className = "",
  compact = false,
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = () => {
    addItem(slug, qty);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? `${name} added to cart` : `Add ${name} to cart`}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
        added ? "bg-brand-800" : "bg-brand-600 hover:bg-brand-700"
      } ${compact ? "px-5 py-3 text-xs" : "px-6 py-3.5 text-sm"} ${className}`}
    >
      {added ? (
        <>
          <FaCheck aria-hidden="true" />
          Added
        </>
      ) : (
        <>
          <FaCartShopping aria-hidden="true" />
          Add to Cart
        </>
      )}
    </button>
  );
}
