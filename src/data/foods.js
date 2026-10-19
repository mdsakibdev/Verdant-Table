import { FaClock, FaTag, FaUserGroup } from "react-icons/fa6";

/**
 * @typedef {Object} FoodMeta
 * @property {React.ComponentType<{ className?: string, "aria-hidden"?: boolean | "true" }>} icon
 * @property {string} value
 *
 * @typedef {Object} Dish
 * @property {string} slug - Matches the product entry in src/data/products.js.
 * @property {string} image - Local path under /public.
 * @property {string} imageAlt - Descriptive alt text matching the photo.
 * @property {string} category - Small category label chip.
 * @property {string} title - Dish name.
 * @property {string} description - Short menu description.
 * @property {FoodMeta[]} meta - Serves / prep / price row.
 */

/** @type {Dish[]} Featured dishes for the home showcase; each links to /products/[slug]. */
export const featuredDishes = [
  {
    slug: "citrus-glazed-shrimp",
    image: "/images/dish-appetizer.jpg",
    imageAlt:
      "Gourmet shrimp appetizer plated with colorful vegetables and citrus sauce",
    category: "Starters",
    title: "Citrus-Glazed Shrimp",
    description:
      "Seared shrimp with charred peppers, micro herbs, and a bright citrus reduction — a light, elegant opening course.",
    meta: [
      { icon: FaUserGroup, value: "Serves 2 – 4" },
      { icon: FaClock, value: "20 min prep" },
      { icon: FaTag, value: "From $12 pp" },
    ],
  },
  {
    slug: "herb-crusted-filet",
    image: "/images/dish-main.jpg",
    imageAlt:
      "Plated gourmet meat portion with potatoes, greens, and dark sauce",
    category: "Mains",
    title: "Herb-Crusted Filet",
    description:
      "Prime cut finished with rosemary butter, pommes purée, seasonal greens, and a slow-reduced red wine jus.",
    meta: [
      { icon: FaUserGroup, value: "Serves 4 – 6" },
      { icon: FaClock, value: "45 min prep" },
      { icon: FaTag, value: "From $18 pp" },
    ],
  },
  {
    slug: "wild-berry-dessert-plate",
    image: "/images/dish-dessert.jpg",
    imageAlt: "Gourmet dessert with fresh berries, coulis, and mint on a plate",
    category: "Desserts",
    title: "Wild Berry Dessert Plate",
    description:
      "A delicate seasonal dessert crowned with fresh berries, silky coulis, and garden mint.",
    meta: [
      { icon: FaUserGroup, value: "Serves 1 – 2" },
      { icon: FaClock, value: "15 min prep" },
      { icon: FaTag, value: "From $8 pp" },
    ],
  },
];
