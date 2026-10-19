"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up stat. The server (and first client render) always render the
 * final value, so hydration matches and screen readers get the real
 * number via `sr-only`; once scrolled into view the visible figure
 * animates 0 → target with an ease-out curve. Static under
 * prefers-reduced-motion.
 *
 * @param {{ value: string, className?: string }} props - `value` like "12+".
 */
export default function StatCounter({ value, className = "" }) {
  const match = /^(\d+)(\D*)$/.exec(value);
  const target = match ? Number.parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || target <= 0) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const duration = 1400;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(target * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <>
      <span ref={ref} className={className} aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
