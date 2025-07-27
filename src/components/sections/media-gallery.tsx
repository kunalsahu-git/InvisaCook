import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const mediaItems = [
  {
    title: "InvisaCook Live Demo: Seamless Cooking",
    category: "Product Demo",
    image: "https://placehold.co/600x400.png",
    aiHint: "cooking video",
  },
  {
    title: "Step-by-Step Installation Tutorial",
    category: "Tutorial",
    image: "https://placehold.co/600x400.png",
    aiHint: "countertop installation"
  },
  {
    title: "HGTV's Smart Home 2024 Features InvisaCook",
    category: "Press",
    image: "https://placehold.co/600x400.png",
    aiHint: "home design",
    press: "HGTV"
  },
  {
    title: "Countertop Cooking: Pan-Seared Scallops",
    category: "Recipe",
    image: "https://placehold.co/600x400.png",
    aiHint: "gourmet food"
  },
  {
    title: "Robb Report: The Ultimate Luxury Kitchen Gadget",
    category: "Press",
    image: "https://placehold.co/600x400.png",
    aiHint: "luxury lifestyle",
    press: "Robb Report"
  },
  {
    title: "Cleaning and Maintenance Guide",
    category: "Tutorial",
    image: "https://placehold.co/600x400.png",
    aiHint: "kitchen cleaning"
  },
];

export function MediaGallery({ isPage = false }: { isPage?: boolean }) {
  const items = isPage ? mediaItems : mediaItems.slice(0, 6);
  return (
    <section id="media" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Media & Recipes</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Watch product demos, installation tutorials, and see what the press is saying about InvisaCook.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item.aiHint}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                   <Badge variant="secondary" className="absolute top-3 right-3">{item.category}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.press && <p className="text-sm text-muted-foreground mt-1">Featured on <span className="font-medium text-accent">{item.press}</span></p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!isPage && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/media">
                View All Media <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
