import Marquee from "@/components/ui/Marquee";
import { marqueeItems } from "@/data/site";

/** Full-bleed brand-green ticker that separates the home sections. */
export default function MarqueeBand() {
  return (
    <div className="border-y border-brand-800 bg-brand-900 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
      <Marquee items={marqueeItems} />
    </div>
  );
}
