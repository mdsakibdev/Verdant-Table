"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "verdant-cart-v1";

/**
 * Cart state stored as lightweight {slug, qty} lines; product details are
 * resolved from src/data/products.js at render time.
 */
function isValidLines(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (line) =>
        typeof line?.slug === "string" &&
        typeof line?.qty === "number" &&
        Number.isFinite(line.qty) &&
        line.qty > 0,
    )
  );
}

/** Read the persisted cart once per client render (returns [] on the server). */
function readStoredLines() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return isValidLines(parsed) ? parsed : [];
  } catch {
    return []; /* corrupted storage — start with an empty cart */
  }
}

// Client-only "hydrated" flag: during SSR/hydration render this is false so
// the HTML matches the server output; React then re-renders with true on the
// client — no setState-in-effect needed.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readStoredLines);
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // Persist on every change; storage writes are external-system side effects.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full or unavailable — cart still works in-memory */
    }
  }, [lines, hydrated]);

  const value = useMemo(() => {
    const addItem = (slug, qty = 1) =>
      setLines((prev) => {
        const existing = prev.find((line) => line.slug === slug);
        if (existing) {
          return prev.map((line) =>
            line.slug === slug ? { ...line, qty: line.qty + qty } : line,
          );
        }
        return [...prev, { slug, qty }];
      });

    const updateQty = (slug, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((line) => line.slug !== slug)
          : prev.map((line) => (line.slug === slug ? { ...line, qty } : line)),
      );

    const removeItem = (slug) =>
      setLines((prev) => prev.filter((line) => line.slug !== slug));

    const clearCart = () => setLines([]);

    const count = lines.reduce((total, line) => total + line.qty, 0);

    return {
      lines,
      hydrated,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      count,
    };
  }, [lines, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Access the cart. Must be used inside <CartProvider>. */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
