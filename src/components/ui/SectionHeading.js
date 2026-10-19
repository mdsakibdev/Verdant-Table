import Reveal from "@/components/ui/Reveal";

/**
 * Centered eyebrow + heading + optional description used by page sections.
 * Pass `as="h1"` on standalone pages where this is the page's main heading.
 * The whole block scroll-reveals as one unit.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
        {eyebrow}
      </span>
      <Heading className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {/* {description} */}
        </p>
      ) : null}
    </Reveal>
  );
}
