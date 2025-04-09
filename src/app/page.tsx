import { AboutSection } from "@/components/sections/home/about";
import { CTASection } from "@/components/sections/home/cta";
import { Hero } from "@/components/sections/home/hero";
import { PortfolioSection } from "@/components/sections/home/portfolio";
import { ServicesSection } from "@/components/sections/home/services";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <CTASection />
    </main>
  );
};
export default HomePage;
