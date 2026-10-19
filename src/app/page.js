import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import MarqueeBand from "@/components/home/MarqueeBand";
import FeaturedFood from "@/components/home/FeaturedFood";
import About from "@/components/home/About";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <MarqueeBand />
      <FeaturedFood />
      <About />
    </main>
  );
}
