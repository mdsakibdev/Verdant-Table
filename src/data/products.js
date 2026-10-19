import { FaClock, FaTag, FaUserGroup } from "react-icons/fa6";

/**
 * @typedef {Object} ProductMeta
 * @property {React.ComponentType<{ className?: string, "aria-hidden"?: boolean | "true" }>} icon
 * @property {string} value
 *
 * @typedef {Object} Product
 * @property {string} slug - URL segment for /products/[slug].
 * @property {string} name - Display name.
 * @property {string} category - Category chip.
 * @property {number} price - Numeric base price for cart math (USD).
 * @property {string} priceLabel - Display label, e.g. "From $45 / guest".
 * @property {string} unit - Billing unit: "guest", "serving", or "event".
 * @property {string} image - Local path under /public.
 * @property {string} imageAlt - Description matching the actual photo.
 * @property {string} shortDescription - One-line card copy.
 * @property {string[]} longDescription - Detail-page paragraphs.
 * @property {ProductMeta[]} meta - Serves / prep / category facts.
 * @property {boolean} featured - Show on the home showcase.
 */

/** @type {Product[]} Nine purchasable items: three signature dishes + six catering packages. */
export const products = [
  /* — Signature dishes (also shown on the home page) — */
  {
    slug: "citrus-glazed-shrimp",
    name: "Citrus-Glazed Shrimp",
    category: "Starters",
    price: 12,
    priceLabel: "From $12 / serving",
    unit: "serving",
    image: "/images/dish-appetizer.jpg",
    imageAlt:
      "Gourmet shrimp appetizer plated with colorful vegetables and citrus sauce",
    shortDescription:
      "Seared shrimp with charred peppers, micro herbs, and a bright citrus reduction.",
    longDescription: [
      "Our most-requested opener: wild-caught shrimp seared hot and fast, then glazed with fresh citrus, charred peppers, and a whisper of chili.",
      "Plated as canapés or served family-style, it travels well, holds beautifully on a buffet, and disappears even faster.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Serves 2 – 4" },
      { icon: FaClock, value: "20 min prep" },
      { icon: FaTag, value: "Starters" },
    ],
    featured: true,
  },
  {
    slug: "herb-crusted-filet",
    name: "Herb-Crusted Filet",
    category: "Mains",
    price: 18,
    priceLabel: "From $18 / serving",
    unit: "serving",
    image: "/images/dish-main.jpg",
    imageAlt:
      "Plated gourmet meat portion with potatoes, greens, and dark sauce",
    shortDescription:
      "Prime cut with rosemary butter, pommes purée, greens, and red wine jus.",
    longDescription: [
      "The centerpiece of our main-course menu: a prime cut crusted with garden herbs, finished with rosemary butter, and served over silky pommes purée.",
      "Each plate is dressed to order with seasonal greens and a slow-reduced red wine jus — restaurant plating, catering scale.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Serves 4 – 6" },
      { icon: FaClock, value: "45 min prep" },
      { icon: FaTag, value: "Mains" },
    ],
    featured: true,
  },
  {
    slug: "wild-berry-dessert-plate",
    name: "Wild Berry Dessert Plate",
    category: "Desserts",
    price: 8,
    priceLabel: "From $8 / serving",
    unit: "serving",
    image: "/images/dish-dessert.jpg",
    imageAlt: "Gourmet dessert with fresh berries, coulis, and mint on a plate",
    shortDescription:
      "A delicate seasonal dessert crowned with fresh berries and silky coulis.",
    longDescription: [
      "A light, not-too-sweet finish: a delicate seasonal dessert base topped with hand-picked berries, silky coulis, and garden mint.",
      "Individual plating keeps service flowing, or it can be scaled up as a composed dessert for shared tables.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Serves 1 – 2" },
      { icon: FaClock, value: "15 min prep" },
      { icon: FaTag, value: "Desserts" },
    ],
    featured: true,
  },

  /* — Catering packages — */
  {
    slug: "classic-buffet-package",
    name: "Classic Buffet Package",
    category: "Buffets",
    price: 45,
    priceLabel: "From $45 / guest",
    unit: "guest",
    image: "/images/pkg-buffet.jpg",
    imageAlt:
      "Appetizing buffet spread featuring various dishes at an outdoor event",
    shortDescription:
      "A generous two-main buffet with sides, salads, and warm bread service.",
    longDescription: [
      "Our signature buffet: two seasonal mains, three sides, a composed salad, warm bread, and condiments — styled on mismatched stoneware for a relaxed, abundant look.",
      "Includes chafing setup, serving utensils, and a full cleanup pass. Chef-attended upgrades available for live carving or pasta finishing.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Min. 20 guests" },
      { icon: FaClock, value: "3-hour service" },
      { icon: FaTag, value: "Buffets" },
    ],
    featured: false,
  },
  {
    slug: "grazing-table-package",
    name: "Grazing Table Package",
    category: "Grazing Tables",
    price: 350,
    priceLabel: "From $350 / event",
    unit: "event",
    image: "/images/pkg-grazing.jpg",
    imageAlt:
      "Grazing table with cheeses, cold meats, fruits, crackers, and bread",
    shortDescription:
      "An abundant cheese, charcuterie, fruit, and cracker display for 40+ guests.",
    longDescription: [
      "A generous, sculptural spread built on site: artisan cheeses, cured meats, seasonal fruit, crackers, nuts, and house-made preserves arranged across rustic boards.",
      "Designed for 40+ guests as a cocktail-hour centerpiece and styled to match your venue's palette. Vegetarian and vegan boards available on request.",
    ],
    meta: [
      { icon: FaUserGroup, value: "40+ guests" },
      { icon: FaClock, value: "90 min setup" },
      { icon: FaTag, value: "Grazing Tables" },
    ],
    featured: false,
  },
  {
    slug: "wedding-reception-package",
    name: "Wedding Reception Package",
    category: "Weddings",
    price: 65,
    priceLabel: "From $65 / guest",
    unit: "guest",
    image: "/images/pkg-wedding.jpg",
    imageAlt:
      "Gourmet appetizers at a stylish indoor wedding event with guests in formal attire",
    shortDescription:
      "Cocktail hour, plated dinner, and dessert service with a uniformed team.",
    longDescription: [
      "End-to-end reception service: a passed-canapé cocktail hour, a choice of plated or family-style mains, and dessert — coordinated with your planner from tasting to last dance.",
      "Includes menu design, two tastings, uniformed service staff, china and glassware rental coordination, and full setup and cleanup.",
    ],
    meta: [
      { icon: FaUserGroup, value: "50 – 300 guests" },
      { icon: FaClock, value: "Full evening" },
      { icon: FaTag, value: "Weddings" },
    ],
    featured: false,
  },
  {
    slug: "corporate-lunch-package",
    name: "Corporate Lunch Package",
    category: "Corporate",
    price: 28,
    priceLabel: "From $28 / guest",
    unit: "guest",
    image: "/images/pkg-corporate.jpg",
    imageAlt:
      "Assorted dishes and glasses of wine on a wooden table in a modern restaurant",
    shortDescription:
      "Individually boxed or shared-platter lunches delivered on schedule.",
    longDescription: [
      "Meeting-ready food that arrives hot, labeled, and on time: individual boxes with a protein, grain, and salad, or shared platters for team-style tables.",
      "Dietary requirements are labeled per box. Delivery, setup, and same-day cleanup included across the metro area.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Min. 10 guests" },
      { icon: FaClock, value: "On-time delivery" },
      { icon: FaTag, value: "Corporate" },
    ],
    featured: false,
  },
  {
    slug: "cocktail-reception-package",
    name: "Cocktail Reception Package",
    category: "Cocktails",
    price: 38,
    priceLabel: "From $38 / guest",
    unit: "guest",
    image: "/images/pkg-cocktail.jpg",
    imageAlt:
      "Elegant catering presentation with gourmet appetizers on a tray at a social event",
    shortDescription:
      "Eight passed canapés, a styled bar, and bartenders for cocktail hour.",
    longDescription: [
      "A flowing cocktail hour: eight seasonal canapés passed on linen trays, plus a styled bar with two signature drinks, beer, and wine options.",
      "Bartenders, glassware, ice, and garnish prep are included. Zero-proof pairings available for every menu.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Min. 25 guests" },
      { icon: FaClock, value: "2-hour service" },
      { icon: FaTag, value: "Cocktails" },
    ],
    featured: false,
  },
  {
    slug: "dessert-table-package",
    name: "Dessert Table Package",
    category: "Desserts",
    price: 300,
    priceLabel: "From $300 / event",
    unit: "event",
    image: "/images/pkg-dessert-table.jpg",
    imageAlt: "Assorted baked pastries displayed on catering buffet trays",
    shortDescription:
      "A styled table of pastries, tarts, and small sweets for any celebration.",
    longDescription: [
      "A generous sweet finish: seasonal tarts, layered cakes by the slice, choux, cookies, and fruit — tiered, labeled, and styled to match your event.",
      "Serves approximately 40 guests as part of a wider menu. Custom colors and signature-flavor cakes available with two weeks' notice.",
    ],
    meta: [
      { icon: FaUserGroup, value: "Serves 40+" },
      { icon: FaClock, value: "60 min setup" },
      { icon: FaTag, value: "Desserts" },
    ],
    featured: false,
  },
];

/**
 * Look up a product by its URL slug.
 * @param {string} slug
 * @returns {Product | undefined}
 */
export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
