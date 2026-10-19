import { FaLeaf } from "react-icons/fa6";

/**
 * Infinite CSS marquee. The item list is rendered twice inside a
 * `w-max` track that translates -50% (exactly one copy), so the loop
 * is seamless. Pure CSS — no JS. Decorative: hidden from screen
 * readers so the duplicated copy is never announced twice.
 *
 * @param {{ items: string[], className?: string, duration?: string }} props
 */
export default function Marquee({
  items,
  className = "",
  duration = "40s",
}) {
  const track = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10">
          <span className="whitespace-nowrap">{item}</span>
          <FaLeaf aria-hidden="true" className="shrink-0 text-brand-400" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: duration }}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
