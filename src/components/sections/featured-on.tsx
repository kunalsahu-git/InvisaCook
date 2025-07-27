"use client"

import Image from "next/image";

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
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">As Seen On</h2>
        </div>
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 md:gap-x-12 lg:gap-x-16">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center">
                <Image
                  src={`https://placehold.co/${logo.width}x${logo.height}.png`}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-auto w-auto object-contain grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
                  data-ai-hint={logo.dataAiHint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
