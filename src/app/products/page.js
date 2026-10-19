import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export const metadata = {
  title: "All Products | Verdant Table Catering",
  description:
    "Browse every catering package and signature dish — buffets, grazing tables, weddings, corporate lunches, cocktails, and desserts.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Shop"
          title="All catering packages"
          description="Every menu item and package we offer, ready to add to your event. Prices are base rates — final quotes are tailored to your guest count."
        />

        <div className="mt-14">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}
