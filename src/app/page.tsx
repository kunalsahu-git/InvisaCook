import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsOverview } from "@/components/sections/products-overview";
import { TechnologySection } from "@/components/sections/technology-section";
import { ResourceLibrary } from "@/components/sections/resource-library";
import { MediaGallery } from "@/components/sections/media-gallery";
import { DealerFinder } from "@/components/sections/dealer-finder";
import { FaqSupport } from "@/components/sections/faq-support";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductsOverview />
        <TechnologySection />
        <ResourceLibrary />
        <MediaGallery />
        <DealerFinder />
        <FaqSupport />
      </main>
      <Footer />
    </div>
  );
}
