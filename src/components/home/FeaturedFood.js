import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FoodCard from "@/components/home/FoodCard";
import { featuredDishes } from "@/data/foods";

export default function FeaturedFood() {
  return (
    <section id="featured" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured menu"
          title="Dishes our guests ask for again"
          description="A taste of the seasonal menu — every plate can be tailored to your event and dietary needs."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredDishes.map((dish, index) => (
            <Reveal
              key={dish.title}
              delay={Math.min(index, 6) * 110}
              className="h-full"
            >
              <FoodCard dish={dish} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={330} className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-8 py-4 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <FaStore aria-hidden="true" />
            View All Products
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
