import ProductCard from "@/components/products/ProductCard";
import Reveal from "@/components/ui/Reveal";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <Reveal
          key={product.slug}
          delay={(index % 3) * 110}
          className="h-full"
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
