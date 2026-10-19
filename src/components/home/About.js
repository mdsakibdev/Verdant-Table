import Image from "next/image";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import Parallax from "@/components/ui/Parallax";

const highlights = [
  "Complimentary menu tasting",
  "Dietary-friendly options",
  "Full setup & cleanup",
  "Uniformed service staff",
];

const stats = [
  { value: "12+", label: "Years of service" },
  { value: "500+", label: "Events catered" },
  { value: "40+", label: "Seasonal dishes" },
];

export default function About() {
  return (
    <section id="about" className="bg-mist py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Our story
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Food that brings people together
          </h2>

          <p className="mt-5 text-base leading-7 text-muted">
            Verdant Table began as a two-person kitchen with one belief: event
            food should be as memorable as the occasion itself. Twelve years
            later, our chefs still shop the farmers’ market every morning and
            cook every plate from scratch.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            From the first tasting to the last dish cleared, one dedicated team
            plans, cooks, and serves — so your only job is to enjoy the room.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
                  <FaCheck aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatCounter
                    value={stat.value}
                    className="block text-3xl font-extrabold text-brand-700"
                  />
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Plan Your Event
            <FaArrowRight aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal variant="scale" delay={150} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
            <Image
              src="/images/about.jpg"
              alt="Caterer arranging fresh fruit and snacks on a table for a food service event"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <Parallax
            offset={-18}
            className="absolute -right-2 -top-4 hidden animate-fade-in [animation-delay:500ms] sm:block md:-right-6"
          >
            <div className="animate-float rounded-2xl bg-brand-900 px-5 py-4 text-white shadow-lg">
              <p className="text-2xl font-extrabold leading-none">100%</p>
              <p className="mt-1 text-xs text-brand-200">
                Fresh, locally sourced
              </p>
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
