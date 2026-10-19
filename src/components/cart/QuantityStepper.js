"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  label = "Quantity",
}) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-black/10 bg-white"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center rounded-l-full text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-black/30 disabled:hover:bg-white"
      >
        <FaMinus aria-hidden="true" className="text-xs" />
      </button>
      <span
        aria-live="polite"
        className="min-w-10 text-center text-sm font-bold text-ink"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center rounded-r-full text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-black/30 disabled:hover:bg-white"
      >
        <FaPlus aria-hidden="true" className="text-xs" />
      </button>
    </div>
  );
}
