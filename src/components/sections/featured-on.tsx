
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
  { name: "Magnolia", width: 180, height: 40, dataAiHint: "magnolia logo" },
  { name: "Food Network", width: 120, height: 60, dataAiHint: "food network logo" },
  { name: "The Washington Post", width: 220, height: 40, dataAiHint: "washington post logo" },
  { name: "HGTV", width: 120, height: 60, dataAiHint: "hgtv logo" },
  { name: "Robb Report", width: 200, height: 40, dataAiHint: "robb report logo" },
  { name: "RV Pro", width: 150, height: 50, dataAiHint: "rv pro logo" },
  { name: "The Kitchn", width: 160, height: 40, dataAiHint: "the kitchn logo" },
  { name: "Azure", width: 160, height: 40, dataAiHint: "azure logo" },
];

export function FeaturedOn() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
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
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {logos.map((logo) => (
                    <CarouselItem key={logo.name} className="basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center justify-center">
                        <Image
                            src={`https://placehold.co/${logo.width}x${logo.height}.png`}
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
