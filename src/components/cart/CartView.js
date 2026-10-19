"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";
import QuantityStepper from "@/components/cart/QuantityStepper";

const money = (amount) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function CartView() {
  const { lines, updateQty, removeItem, clearCart, hydrated } = useCart();
  const [status, setStatus] = useState("");

  // Resolve each line against the catalog; drop anything no longer sold.
  const items = lines
    .map((line) => ({ line, product: getProduct(line.slug) }))
    .filter((item) => item.product);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.line.qty,
    0,
  );

  if (!hydrated) {
    return (
      <div className="animate-fade-in py-20 text-center text-muted">
        Loading your cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="animate-fade-up rounded-3xl border border-dashed border-brand-200 bg-mist px-6 py-16 text-center">
        <p className="text-lg font-bold text-ink">Your cart is empty</p>
        <p className="mt-2 text-sm text-muted">
          Browse the catalog and add a package to get started.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
      <ul className="space-y-5">
        {items.map(({ line, product }) => (
          <li
            key={product.slug}
            className="flex animate-fade-up flex-col gap-5 rounded-3xl border border-black/5 bg-white p-5 sm:flex-row sm:items-center"
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative h-24 w-full shrink-0 overflow-hidden rounded-2xl sm:w-32"
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 640px) 128px, 100vw"
                className="object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                {product.category}
              </p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-1 block text-base font-bold text-ink hover:text-brand-700"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-muted">
                {money(product.price)} / {product.unit}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <QuantityStepper
                value={line.qty}
                onChange={(qty) => updateQty(product.slug, qty)}
                label={`Quantity of ${product.name}`}
              />
              <p className="w-24 text-right text-sm font-extrabold text-ink">
                {money(product.price * line.qty)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(product.slug)}
                aria-label={`Remove ${product.name} from cart`}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <FaTrash aria-hidden="true" className="text-sm" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="animate-fade-up rounded-3xl border border-black/5 bg-mist p-6 [animation-delay:150ms] lg:sticky lg:top-28">
        <h2 className="text-base font-extrabold text-ink">Order summary</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted">Items</dt>
            <dd className="font-semibold text-ink">{items.length}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-black/5 pt-3">
            <dt className="text-muted">Subtotal</dt>
            <dd className="text-lg font-extrabold text-ink">
              {money(subtotal)}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-5 text-muted">
          Estimates use base pricing. Final quotes account for guest count,
          menu changes, and service time.
        </p>

        <button
          type="button"
          onClick={() =>
            setStatus(
              "Thanks! This is a demo store — no payment was taken. Email us for a real quote.",
            )
          }
          className="mt-5 w-full rounded-full bg-brand-600 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Proceed to Checkout
        </button>
        {status ? (
          <p
            role="status"
            className="mt-3 animate-fade-up rounded-xl bg-brand-100 px-4 py-3 text-xs leading-5 text-brand-800"
          >
            {status}
          </p>
        ) : null}

        <button
          type="button"
          onClick={clearCart}
          className="mt-4 w-full text-xs font-semibold text-muted underline underline-offset-4 transition-colors hover:text-brand-700"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}
