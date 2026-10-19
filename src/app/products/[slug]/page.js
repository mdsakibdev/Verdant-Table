import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { getProduct, products } from "@/data/products";
import Reveal from "@/components/ui/Reveal";
import PurchasePanel from "@/components/cart/PurchasePanel";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product not found | Verdant Table Catering" };
  }
  return {
    title: `${product.name} | Verdant Table Catering`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="flex-1 bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand-700"
        >
          <FaArrowLeft aria-hidden="true" />
          All products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal
            variant="left"
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm lg:sticky lg:top-28 lg:self-start"
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-brand-800 shadow-sm">
              {product.category}
            </span>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-extrabold text-brand-700">
              {product.priceLabel}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-black/5 py-5 text-sm font-semibold text-muted">
              {product.meta.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.value} className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="text-brand-600" />
                    {item.value}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              {product.longDescription.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-brand-100 bg-mist p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800">
                Add to your event
              </h2>
              <p className="mt-2 text-xs leading-5 text-muted">
                Choose your {product.unit} count — we’ll confirm availability
                and finalize the quote by email.
              </p>
              <div className="mt-5">
                <PurchasePanel
                  slug={product.slug}
                  name={product.name}
                  unit={product.unit}
                />
              </div>
              <ul className="mt-5 space-y-2 text-xs text-muted">
                {[
                  "Free menu tasting before you confirm",
                  "Delivery, setup, and cleanup included",
                  "Dietary accommodations handled per guest",
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <FaCheck
                      aria-hidden="true"
                      className="shrink-0 text-brand-600"
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
