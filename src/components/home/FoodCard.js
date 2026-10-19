import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function FoodCard({ dish }) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(10,46,23,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
          {dish.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-ink">{dish.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          {dish.description}
        </p>
        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
          {dish.meta.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.value} className="flex items-center gap-1.5">
                <Icon aria-hidden="true" className="text-brand-600" />
                <span>{item.value}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex gap-3 border-t border-black/5 pt-5">
          <Link
            href={`/products/${dish.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand-200 px-5 py-3 text-xs font-semibold text-brand-800 transition-colors hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            View Details
            <FaArrowRight aria-hidden="true" />
          </Link>
          <AddToCartButton
            slug={dish.slug}
            name={dish.title}
            compact
            className="flex-1"
          />
        </div>
      </div>
    </article>
  );
}
