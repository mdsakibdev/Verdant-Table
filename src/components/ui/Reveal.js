"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper. Renders its children (which may be server
 * components) inside an element that starts hidden via `data-reveal`
 * and flips to `.is-visible` the first time it enters the viewport.
 *
 * Variants: "up" (default) | "left" | "right" | "scale".
 * `delay` (ms) staggers siblings in a grid — keep it capped (~600ms).
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // Reveal once the element is ~60px into the viewport; threshold 0
      // so elements taller than the viewport still trigger.
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={visible ? `is-visible ${className}` : className}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
