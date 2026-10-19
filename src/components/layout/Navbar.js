"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaPhone, FaUtensils, FaXmark } from "react-icons/fa6";
import { brand, contactInfo, navLinks } from "@/data/site";
import CartBadge from "@/components/cart/CartBadge";
import AuthControls from "@/components/layout/AuthControls";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          aria-label={`${brand.name} ${brand.tagline} — back to top`}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
            <FaUtensils aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-ink">
              {brand.name}
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              {brand.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-muted transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CartBadge className="md:hidden" />
          <AuthControls />
          <CartBadge className="hidden md:inline-flex" />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink transition-colors hover:border-brand-600 hover:text-brand-700 md:hidden"
        >
          {open ? (
            <FaXmark aria-hidden="true" />
          ) : (
            <FaBars aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`grid border-t border-black/5 bg-white transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto min-h-0 w-full max-w-7xl overflow-hidden px-4 pb-6 pt-3 sm:px-6"
        >
          <div className="mb-4 border-b border-black/5 pb-4">
            <AuthControls
              variant="drawer"
              onNavigate={() => setOpen(false)}
            />
          </div>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get a Quote
          </Link>
          <p className="mt-5 flex items-center gap-3 border-t border-black/5 px-4 pt-5 text-sm text-muted">
            <FaPhone aria-hidden="true" className="text-brand-600" />
            <a href={contactInfo.phoneHref} className="hover:text-brand-700">
              {contactInfo.phone}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
