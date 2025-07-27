"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlayCircle, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const allMediaItems = [
  {
    type: "video",
    title: "InvisaCook Live Demo: Seamless Cooking",
    description: "See the magic of our invisible cooktop in this live demonstration. Perfect for modern kitchens.",
    category: "Product Demo",
    image: "https://placehold.co/600x400.png",
    aiHint: "cooking video",
  },
  {
    type: "video",
    title: "Step-by-Step Installation Tutorial",
    description: "A comprehensive guide for certified installers on setting up the InvisaCook system.",
    category: "Tutorial",
    image: "https://placehold.co/600x400.png",
    aiHint: "countertop installation"
  },
  {
    type: "press",
    title: "HGTV's Smart Home 2024 Features InvisaCook",
    description: "We are thrilled to be featured in HGTV's vision for the future of smart homes. Discover why.",
    category: "Press",
    image: "https://placehold.co/600x400.png",
    aiHint: "home design",
    press: "HGTV"
  },
  {
    type: "video",
    title: "Countertop Cooking: Pan-Seared Scallops",
    description: "Chef Anna shows you how to achieve a perfect sear on scallops using the InvisaCook.",
    category: "Recipe",
    image: "https://placehold.co/600x400.png",
    aiHint: "gourmet food"
  },
  {
    type: "press",
    title: "Robb Report: The Ultimate Luxury Kitchen Gadget",
    description: "The Robb Report calls InvisaCook 'a must-have for the discerning minimalist'.",
    category: "Press",
    image: "https://placehold.co/600x400.png",
    aiHint: "luxury lifestyle",
    press: "Robb Report"
  },
  {
    type: "video",
    title: "Cleaning and Maintenance Guide",
    description: "Keeping your InvisaCook system pristine is simple. This guide shows you how.",
    category: "Tutorial",
    image: "https://placehold.co/600x400.png",
    aiHint: "kitchen cleaning"
  },
  {
    type: "image",
    title: "Minimalist Kitchen Inspiration",
    description: "A stunning kitchen design from one of our customers, showcasing a 4-burner setup.",
    category: "Gallery",
    image: "https://placehold.co/600x400.png",
    aiHint: "minimalist kitchen"
  },
  {
    type: "press",
    title: "Architectural Digest: The Invisible Kitchen",
    description: "Explore how top designers are integrating InvisaCook to create seamless kitchen spaces.",
    category: "Press",
    image: "https://placehold.co/600x400.png",
    aiHint: "architectural design",
    press: "Architectural Digest"
  }
];

const ITEMS_PER_PAGE = 6;

export function MediaGallery({ isPage = false }: { isPage?: boolean }) {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  const itemsToShow = isPage ? allMediaItems.slice(0, visibleItems) : allMediaItems.slice(0, 3);
  const canLoadMore = visibleItems < allMediaItems.length;

  return (
    <section id="media" className={cn("w-full py-12 md:py-24 lg:py-32", isPage ? "bg-background" : "bg-secondary/50")}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Media & Features</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Watch product demos, installation tutorials, and see what the press is saying about InvisaCook.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itemsToShow.map((item) => (
            <Card key={item.title} className="group overflow-hidden flex flex-col">
              <CardContent className="p-0 flex-grow flex flex-col">
                <Link href="#" className="block">
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={item.aiHint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.type === "video" ? (
                        <PlayCircle className="h-16 w-16 text-white" />
                      ) : (
                        <LinkIcon className="h-16 w-16 text-white" />
                      )}
                    </div>
                     <Badge variant="secondary" className="absolute top-3 right-3">{item.category}</Badge>
                  </div>
                </Link>
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-grow">{item.description}</p>
                    {item.press && <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">Featured on <span className="font-medium text-accent">{item.press}</span></p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!isPage && !isPage && allMediaItems.length > 3 && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/media">
                View All Media <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
        {isPage && canLoadMore && (
           <div className="mt-12 text-center">
             <Button onClick={handleLoadMore}>
               Load More
             </Button>
           </div>
         )}
      </div>
    </section>
  );
}
