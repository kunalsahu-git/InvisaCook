import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsOverview } from "@/components/sections/products-overview";
import { TechnologySection } from "@/components/sections/technology-section";
import { MediaGallery } from "@/components/sections/media-gallery";
import { FaqSupport } from "@/components/sections/faq-support";
import { DealerFinder } from "@/components/sections/dealer-finder";
import { FeaturedOn } from "@/components/sections/featured-on";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function BecomeADealer() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50 border-t">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Become a Dealer</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
          Interested in joining our network of authorized dealers? We partner with premium countertop fabricators and kitchen showrooms who share our passion for innovation and design excellence.
        </p>
        <div className="mt-8">
            <Button asChild size="lg">
                <Link href="/dealer-application">
                    Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  )
}

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
        <BecomeADealer />
        <MediaGallery />
        <FaqSupport />
      </main>
      <Footer />
    </div>
  );
}
