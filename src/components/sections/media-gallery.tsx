
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PlayCircle, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const allMediaItems = [
    {
        type: "press",
        title: "RV Pro Magazine Article",
        description: "",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_0655053bda5a445e9902ab317a75239d~mv2.png/v1/fill/w_451,h_339,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_0655053bda5a445e9902ab317a75239d~mv2.webp",
        link: "https://www.invisacook.com/post/rv-pro-magazine-article",
        aiHint: "magazine article",
    },
    {
        type: "press",
        title: "Robb Report",
        description: "https://robbreport.com/shelter/home-design/home-design-experts-backyard-bliss-1234603085/",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_dc3ec42acc574ff2acddbf9e2d656ade~mv2.webp/v1/fill/w_451,h_339,al_c,q_90,enc_avif,quality_auto/7ef896_dc3ec42acc574ff2acddbf9e2d656ade~mv2.webp",
        link: "https://www.invisacook.com/post/robb-report",
        aiHint: "luxury publication",
    },
    {
        type: "press",
        title: "AZURE Magazine",
        description: "https://www.azuremagazine.com/spec-sheets/invisacook/",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_80d5e3855dc342858922bbbbfd37bec4~mv2.png/v1/fill/w_392,h_339,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_80d5e3855dc342858922bbbbfd37bec4~mv2.webp",
        link: "https://www.invisacook.com/post/azure-magazine",
        aiHint: "design magazine",
    },
    {
        type: "press",
        title: "The Kitchen Magazine",
        description: "https://www.thekitchn.com/invisible-cooktops-induction-23214298",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_477d2e13098a42f89cbf61d5e1db18ef~mv2.jpg/v1/fill/w_451,h_339,fp_0.50_0.50,q_90,enc_avif,quality_auto/7ef896_477d2e13098a42f89cbf61d5e1db18ef~mv2.webp",
        link: "https://www.invisacook.com/post/the-kitchen-magazine",
        aiHint: "kitchen magazine",
    },
    {
        type: "press",
        title: "Article “Washington Post” (Mentions Invisacook in the Article)",
        description: "https://www.washingtonpost.com/home/2022/02/17/induction-cooktops-healthier-alternative-to-gas-stove/",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_acd77ae3f87e4b5f952b40cfae230679~mv2.png/v1/fill/w_259,h_64,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_acd77ae3f87e4b5f952b40cfae230679~mv2.webp",
        link: "https://www.invisacook.com/post/article-washington-post-mentions-invisacook-in-the-article",
        aiHint: "news article",
    },
    {
        type: "video",
        title: "HGTV Holmes Family Rescue",
        description: "https://www.youtube.com/watch?v=1WQ37YLOcu4",
        category: "Video",
        videoId: "1WQ37YLOcu4",
        link: "https://www.invisacook.com/post/hgtv-holmes-family-rescue",
        aiHint: "home renovation show",
    },
    {
        type: "video",
        title: "Cityline News – Karen Sealy Kitchen Reno",
        description: "https://www.youtube.com/watch?v=1UXtyUUBh1I",
        category: "Video",
        videoId: "1UXtyUUBh1I",
        link: "https://www.invisacook.com/post/cityline-news-karen-sealy-kitchen-reno",
        aiHint: "kitchen renovation",
    },
    {
        type: "video",
        title: "Morning Show Live",
        description: "https://www.youtube.com/watch?v=fy9tLF16exE",
        category: "Video",
        videoId: "fy9tLF16exE",
        link: "https://www.invisacook.com/post/morning-show-live",
        aiHint: "morning show",
    },
    {
        type: "press",
        title: "Stone Update Magazine",
        description: "https://magazine.stonemag.com/july-august-2022/cooking-countertops",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_8c087ffc584449d0b02f70bd2716f5d8~mv2.png/v1/fill/w_451,h_339,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_8c087ffc584449d0b02f70bd2716f5d8~mv2.webp",
        link: "https://www.invisacook.com/post/stone-update-magazine",
        aiHint: "stone industry magazine",
    },
    {
        type: "video",
        title: "HGT   V’s Jonathan Scott talks Invisacook!!",
        description: "https://www.youtube.com/watch?v=UlfCKPNOsM0",
        category: "Video",
        videoId: "UlfCKPNOsM0",
        link: "https://www.invisacook.com/post/hgtv-s-jonathan-scott-talks-invisacook",
        aiHint: "celebrity endorsement",
    },
];

const MediaItemCard = ({ item }: { item: (typeof allMediaItems)[0] }) => {
    const isVideo = item.type === 'video';
    const imageUrl = isVideo 
        ? `https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`
        : item.image;

    return (
        <Card className="group overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-grow flex flex-col">
            <Link href={item.link || '#'} target="_blank" className="block">
                <div className="relative">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="h-auto w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={item.aiHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isVideo ? (
                    <PlayCircle className="h-16 w-16 text-white" />
                    ) : (
                    <LinkIcon className="h-16 w-16 text-white" />
                    )}
                </div>
                </div>
            </Link>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">{item.description}</p>
            </div>
            </CardContent>
        </Card>
    )
}

export function MediaGallery({ isPage = false }: { isPage?: boolean }) {
  const itemsToShow = isPage ? allMediaItems : allMediaItems.slice(0, 3);

  return (
    <section id="media" className={cn("w-full py-12 md:py-24", isPage ? "bg-background" : "bg-secondary/50")}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Media & Features</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Watch product demos, installation tutorials, and see what the press is saying about InvisaCook.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {itemsToShow.map((item) => <MediaItemCard key={item.title} item={item} />)}
        </div>
        {!isPage && allMediaItems.length > 3 && (
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
