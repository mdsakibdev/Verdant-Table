"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gentle scroll parallax: shifts children vertically (±`offset` px)
 * based on how far the element is from the viewport center. The
 * wrapper's inline transform does not conflict with the float/entrance
 * animations, which live on the child. No-op under
 * prefers-reduced-motion. Positioning utilities (e.g. `absolute
 * -bottom-6`) belong on `className` here so the transform composes
 * with them.
 *
 * @param {{ children: React.ReactNode, className?: string, offset?: number }} props
 */
export default function Parallax({
  children,
  className = "",
  offset = 24,
}) {
  const ref = useRef(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 when the element is a viewport below center, +1 when a viewport above.
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;
      setY(Math.max(-1, Math.min(1, progress)) * offset);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // rAF (not a direct call) so no state is set synchronously in the effect body.
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [offset]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${y}px, 0)` }}
    >
      {children}
    </div>
  );
}
