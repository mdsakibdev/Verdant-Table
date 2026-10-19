"use client";

import { useState } from "react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import QuantityStepper from "@/components/cart/QuantityStepper";

/** Quantity selector + Add to Cart for the product detail page. */
export default function PurchasePanel({ slug, name, unit }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantityStepper
        value={qty}
        onChange={setQty}
        label={`Number of ${unit}${qty === 1 ? "" : "s"}`}
      />
      <AddToCartButton
        slug={slug}
        name={name}
        qty={qty}
        className="flex-1 sm:flex-none"
      />
    </div>
  );
}
