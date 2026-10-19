import CartView from "@/components/cart/CartView";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Your Cart | Verdant Table Catering",
  description: "Review the packages and dishes in your catering cart.",
};

export default function CartPage() {
  return (
    <main className="flex-1 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Your order
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Shopping cart
          </h1>
        </Reveal>

        <div className="mt-12">
          <CartView />
        </div>
      </div>
    </main>
  );
}
