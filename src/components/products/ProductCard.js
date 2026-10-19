import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(10,46,23,0.35)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
          {product.shortDescription}
        </p>

        <p className="mt-4 text-xl font-extrabold text-brand-800">
          {product.priceLabel}
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand-200 px-5 py-3 text-xs font-semibold text-brand-800 transition-colors hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            View Details
            <FaArrowRight aria-hidden="true" />
          </Link>
          <AddToCartButton
            slug={product.slug}
            name={product.name}
            compact
            className="flex-1"
          />
        </div>
      </div>
    </article>
  );
}
