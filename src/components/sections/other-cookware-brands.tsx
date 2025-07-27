
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Hexclad",
    imageUrl: "https://placehold.co/300x300.png",
    aiHint: "cookware set",
    link: "#",
  },
  {
    name: "Made In Cookware",
    imageUrl: "https://placehold.co/300x300.png",
    aiHint: "stainless steel cookware",
    link: "#",
  },
  {
    name: "Duxtop Whole",
    imageUrl: "https://placehold.co/300x300.png",
    aiHint: "induction pots",
    link: "#",
  },
  {
    name: "Heritage Steel",
    imageUrl: "https://placehold.co/300x300.png",
    aiHint: "steel pans",
    link: "#",
  },
  {
    name: "Zwilling Spirit",
    imageUrl: "https://placehold.co/300x300.png",
    aiHint: "ceramic pans",
    link: "#",
  },
  {
    name: "AVACraft",
    imageUrl: "https://placehold.co/300x300.png",
    aiHint: "cooking pans",
    link: "#",
  },
];

export function OtherCookwareBrands() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className="text-accent">Other</span> tested and approved
            cookware brands for Invisacook® technology
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <div key={brand.name} className="text-center">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    width={300}
                    height={300}
                    className="h-auto w-full object-cover aspect-square"
                    data-ai-hint={brand.aiHint}
                  />
                </CardContent>
              </Card>
              <h3 className="mt-4 text-lg font-semibold">{brand.name}</h3>
              <div className="mt-4">
                <Button asChild>
                  <Link href={brand.link} target="_blank">View Manufacturer</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
