import {
  FaCakeCandles,
  FaChampagneGlasses,
  FaLeaf,
  FaMartiniGlass,
} from "react-icons/fa6";
import {
  MdBusinessCenter,
  MdDeliveryDining,
  MdLocalFireDepartment,
  MdRestaurantMenu,
} from "react-icons/md";

/**
 * @typedef {Object} Service
 * @property {string} id - Unique slug.
 * @property {React.ComponentType<{ className?: string, "aria-hidden"?: boolean | "true" }>} icon - Card icon.
 * @property {string} title - Card heading.
 * @property {string} description - Short supporting copy.
 */

/** @type {Service[]} Eight catering services shown in the features grid. */
export const services = [
  {
    id: "corporate-events",
    icon: MdBusinessCenter,
    title: "Corporate Events",
    description:
      "Board lunches, conferences, and company galas served with polished, on-time delivery.",
  },
  {
    id: "wedding-catering",
    icon: FaChampagneGlasses,
    title: "Wedding Catering",
    description:
      "Custom tasting menus and attentive staff for ceremonies of ten or a thousand guests.",
  },
  {
    id: "cocktail-receptions",
    icon: FaMartiniGlass,
    title: "Cocktail Receptions",
    description:
      "Grazing boards, canapés, and crafted drinks that keep the room mingling.",
  },
  {
    id: "buffet-platters",
    icon: MdRestaurantMenu,
    title: "Buffet & Platters",
    description:
      "Generous, beautifully styled buffets with balanced seasonal menus.",
  },
  {
    id: "live-cooking",
    icon: MdLocalFireDepartment,
    title: "Live Cooking Stations",
    description:
      "Chefs prepare dishes in front of your guests for a memorable centerpiece.",
  },
  {
    id: "seasonal-menus",
    icon: FaLeaf,
    title: "Seasonal Menus",
    description:
      "Fresh, locally sourced ingredients that rotate with the seasons and your taste.",
  },
  {
    id: "desserts-pastry",
    icon: FaCakeCandles,
    title: "Desserts & Pastry",
    description:
      "Signature cakes, tarts, and petits fours finished to order in our kitchen.",
  },
  {
    id: "delivery-setup",
    icon: MdDeliveryDining,
    title: "Delivery & Setup",
    description:
      "We transport, style, and clean up — you simply enjoy the celebration.",
  },
];
