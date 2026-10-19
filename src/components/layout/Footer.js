import Link from "next/link";
import {
  FaClock,
  FaEnvelope,
  FaMapLocationDot,
  FaPhone,
  FaUtensils,
} from "react-icons/fa6";
import { brand, contactInfo, navLinks, siteMeta, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-950 text-brand-100/75">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
                <FaUtensils aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold tracking-tight text-white">
                  {brand.name}
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                  {brand.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6">{brand.blurb}</p>
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand-100/85 transition-colors hover:border-brand-500 hover:bg-brand-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaPhone
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-400"
                />
                <a
                  href={contactInfo.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-400"
                />
                <a
                  href={contactInfo.emailHref}
                  className="break-all transition-colors hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapLocationDot
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-400"
                />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Opening Hours
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {contactInfo.hours.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <FaClock
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand-400"
                  />
                  <span>{line}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <FaUtensils
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-400"
                />
                <span>Tastings by appointment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteMeta.copyrightYear} {brand.name} {brand.tagline}. All
            rights reserved.
          </p>
          <p>Seasonal menus · Locally sourced · Full-service events</p>
        </div>
      </div>
    </footer>
  );
}
