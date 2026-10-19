import Image from "next/image";
import { FaArrowRight, FaLeaf, FaStar } from "react-icons/fa6";
import Parallax from "@/components/ui/Parallax";
import { socialLinks } from "@/data/site";

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 [animation-delay:80ms]">
            <FaLeaf aria-hidden="true" />
            Fresh, seasonal catering
          </span>

          <h1 className="mt-6 animate-fade-up text-4xl font-extrabold leading-[1.08] tracking-tight text-ink [animation-delay:200ms] sm:text-5xl xl:text-6xl">
            Catering that turns gatherings into{" "}
            <span className="text-brand-700">great occasions</span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-8 text-muted [animation-delay:320ms]">
            From intimate dinners to grand celebrations, our chefs craft
            seasonal menus around your guests, your venue, and your story —
            delivered, styled, and served with care.
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-4 [animation-delay:440ms] sm:flex-row sm:items-center">
            <a
              href="#featured"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Explore the Menu
              <FaArrowRight aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-200 bg-white px-7 py-4 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-400 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Plan Your Event
            </a>
          </div>

          <div className="mt-10 flex animate-fade-up items-center gap-5 [animation-delay:560ms]">
            <span className="text-sm font-semibold text-muted">
              Follow us
            </span>
            <ul className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] animate-scale-in overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm [animation-delay:250ms] lg:aspect-[5/4]">
            <Image
              src="/images/hero.jpg"
              alt="Luxurious catering buffet with smoked salmon, fresh fruit, and cheese platters"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <Parallax
            offset={-22}
            className="absolute -bottom-6 left-4 hidden animate-fade-in [animation-delay:750ms] sm:block md:-left-6"
          >
            <div className="animate-float flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-lg">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                <FaStar aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-extrabold text-ink">
                  4.9 / 5 rating
                </span>
                <span className="block text-xs text-muted">
                  1,200+ delighted hosts
                </span>
              </span>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
