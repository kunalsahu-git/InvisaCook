import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsOverview } from "@/components/sections/products-overview";
import { TechnologySection } from "@/components/sections/technology-section";
import { MediaGallery } from "@/components/sections/media-gallery";
import { FaqSupport } from "@/components/sections/faq-support";
import { DealerFinder } from "@/components/sections/dealer-finder";
import { FeaturedOn } from "@/components/sections/featured-on";
import { BecomeADealer } from "@/components/sections/become-a-dealer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedOn />
        <ProductsOverview />
        <TechnologySection />
        <DealerFinder />
        <MediaGallery />
        <FaqSupport />
      </main>
      <Footer />
    </div>
  );
}
