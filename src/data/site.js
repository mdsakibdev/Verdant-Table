import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

/**
 * @typedef {Object} NavLink
 * @property {string} label - Visible link text.
 * @property {string} href - In-page anchor target.
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} label - Accessible name of the social network.
 * @property {string} href - Profile or page URL.
 * @property {React.ComponentType<{ className?: string, "aria-hidden"?: boolean | "true" }>} icon - Rendered icon component.
 */

/** @type {{ name: string, tagline: string, blurb: string }} */
export const brand = {
  name: "Verdant Table",
  tagline: "Catering",
  blurb:
    "Seasonal, chef-driven catering for weddings, corporate events, and private celebrations across the Pacific Northwest.",
};

/** @type {NavLink[]} Hash links work from every route (`/#section` scrolls after navigation). */
export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/products" },
  { label: "Services", href: "/#services" },
  { label: "Menu", href: "/#featured" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/** @type {SocialLink[]} */
export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
  { label: "X (Twitter)", href: "https://x.com/", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FaLinkedinIn },
];

/** @type {string[]} Copy for the scrolling marquee band between home sections. */
export const marqueeItems = [
  "Seasonal tasting menus",
  "Grazing tables",
  "Live cooking stations",
  "Citrus-glazed shrimp",
  "Wedding catering",
  "Herb-crusted filet",
  "Corporate lunches",
  "Wild berry desserts",
  "Delivery, setup & cleanup",
];

/**
 * Static site metadata. `copyrightYear` is a plain constant on purpose —
 * `new Date()` is not allowed during static prerendering (Next.js Cache
 * Components), so update it manually each January.
 */
export const siteMeta = {
  copyrightYear: 2026,
};

/** @type {{ phone: string, phoneHref: string, email: string, emailHref: string, address: string, hours: string[] }} */
export const contactInfo = {
  phone: "+1 (555) 012-3456",
  phoneHref: "tel:+15550123456",
  email: "hello@verdanttable.com",
  emailHref: "mailto:hello@verdanttable.com",
  address: "128 Garden Row, Portland, OR 97205",
  hours: ["Mon – Fri: 8:00 AM – 8:00 PM", "Sat: 9:00 AM – 6:00 PM"],
};
