
"use client"

import * as React from "react"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"


const logos = [
  { name: "Magnolia", width: 180, height: 40, dataAiHint: "magnolia logo", logo: "/images/featured/magnolia_logo.webp" },
  { name: "Food Network", width: 120, height: 60, dataAiHint: "food network logo" , logo: "/images/featured/foodnetwork.png" },
  { name: "The Washington Post", width: 220, height: 40, dataAiHint: "washington post logo" , logo: "/images/featured/washington.png" },
  { name: "HGTV", width: 120, height: 60, dataAiHint: "hgtv logo", logo: "/images/featured/HGTV_logo.png" },
  { name: "Robb Report", width: 200, height: 40, dataAiHint: "robb report logo", logo: "/images/featured/robb.png" },
  { name: "RV Pro", width: 150, height: 50, dataAiHint: "rv pro logo", logo: "/images/featured/magnolia_logo.webp" },
  { name: "The Kitchn", width: 160, height: 40, dataAiHint: "the kitchn logo", logo: "/images/featured/kitchnlogo.png" },
  // { name: "Azure", width: 160, height: 40, dataAiHint: "azure logo", logo: "/images/featured/k.webp" },
];

export function FeaturedOn() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">As Seen On</h2>
        </div>
        <div className="mt-12">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {logos.map((logo) => (
                    <CarouselItem key={logo.name} className="basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center justify-center">
                        <Image
                            src={logo.logo}
                            alt={logo.name}
                            width={logo.width}
                            height={logo.height}
                            className="h-auto w-auto object-contain grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
                            data-ai-hint={logo.dataAiHint}
                        />
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </div>
    </section>
  );
}
