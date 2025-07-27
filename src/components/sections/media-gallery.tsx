

"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle as CardTitlePrimitive, CardDescription } from "@/components/ui/card";


const allMediaItems = [
    {
        type: "press",
        title: "RV Pro Magazine Article",
        description: "InvisaCook's innovative technology gets featured in RV Pro Magazine, highlighting its space-saving benefits for mobile living.",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_0655053bda5a445e9902ab317a75239d~mv2.png/v1/fill/w_451,h_339,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_0655053bda5a445e9902ab317a75239d~mv2.webp",
        link: "https://www.invisacook.com/post/rv-pro-magazine-article",
        aiHint: "magazine article",
    },
    {
        type: "press",
        title: "Robb Report",
        description: "The Robb Report features InvisaCook as a must-have for luxury homes, focusing on its seamless design and high-end appeal.",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_dc3ec42acc574ff2acddbf9e2d656ade~mv2.webp/v1/fill/w_451,h_339,al_c,q_90,enc_avif,quality_auto/7ef896_dc3ec42acc574ff2acddbf9e2d656ade~mv2.webp",
        link: "https://www.invisacook.com/post/robb-report",
        aiHint: "luxury publication",
    },
    {
        type: "press",
        title: "AZURE Magazine",
        description: "AZURE showcases InvisaCook in its spec sheets, detailing the technical innovations for architects and designers.",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_80d5e3855dc342858922bbbbfd37bec4~mv2.png/v1/fill/w_392,h_339,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_80d5e3855dc342858922bbbbfd37bec4~mv2.webp",
        link: "https://www.invisacook.com/post/azure-magazine",
        aiHint: "design magazine",
    },
    {
        type: "press",
        title: "The Kitchen Magazine",
        description: "The Kitchn explores the rise of invisible cooktops, with InvisaCook leading the charge in minimalist kitchen design.",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_477d2e13098a42f89cbf61d5e1db18ef~mv2.jpg/v1/fill/w_451,h_339,fp_0.50_0.50,q_90,enc_avif,quality_auto/7ef896_477d2e13098a42f89cbf61d5e1db18ef~mv2.webp",
        link: "https://www.invisacook.com/post/the-kitchen-magazine",
        aiHint: "kitchen magazine",
    },
    {
        type: "press",
        title: "Washington Post Article",
        description: "The Washington Post mentions InvisaCook as a healthier and more efficient alternative to traditional gas stoves.",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_acd77ae3f87e4b5f952b40cfae230679~mv2.png/v1/fill/w_259,h_64,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_acd77ae3f87e4b5f952b40cfae230679~mv2.webp",
        link: "https://www.invisacook.com/post/article-washington-post-mentions-invisacook-in-the-article",
        aiHint: "news article",
    },
    {
        type: "video",
        title: "HGTV Holmes Family Rescue",
        description: "The Holmes family uses InvisaCook to create a stunning and functional kitchen in their latest rescue project.",
        category: "Video",
        videoId: "1WQ37YLOcu4",
        link: "https://www.invisacook.com/post/hgtv-holmes-family-rescue",
        aiHint: "home renovation show",
    },
    {
        type: "video",
        title: "Cityline News – Karen Sealy Kitchen Reno",
        description: "Designer Karen Sealy integrates InvisaCook into a modern farmhouse kitchen renovation, showcased on Cityline.",
        category: "Video",
        videoId: "1UXtyUUBh1I",
        link: "https://www.invisacook.com/post/cityline-news-karen-sealy-kitchen-reno",
        aiHint: "kitchen renovation",
    },
    {
        type: "video",
        title: "Morning Show Live",
        description: "InvisaCook is featured live on the morning show, demonstrating its quick, safe, and invisible cooking capabilities.",
        category: "Video",
        videoId: "fy9tLF16exE",
        link: "https://www.invisacook.com/post/morning-show-live",
        aiHint: "morning show",
    },
    {
        type: "press",
        title: "Stone Update Magazine",
        description: "A deep dive into how InvisaCook technology is changing the countertop and stone fabrication industry.",
        category: "Press",
        image: "https://static.wixstatic.com/media/7ef896_8c087ffc584449d0b02f70bd2716f5d8~mv2.png/v1/fill/w_451,h_339,fp_0.50_0.50,q_95,enc_avif,quality_auto/7ef896_8c087ffc584449d0b02f70bd2716f5d8~mv2.webp",
        link: "https://www.invisacook.com/post/stone-update-magazine",
        aiHint: "stone industry magazine",
    },
    {
        type: "video",
        title: "HGTV’s Jonathan Scott talks Invisacook!",
        description: "Jonathan Scott of the Property Brothers discusses the benefits of InvisaCook for modern, smart homes.",
        category: "Video",
        videoId: "UlfCKPNOsM0",
        link: "https://www.invisacook.com/post/hgtv-s-jonathan-scott-talks-invisacook",
        aiHint: "celebrity endorsement",
    },
];

type MediaItem = (typeof allMediaItems)[0];

const MediaItemCard = ({ item, onVideoSelect }: { item: MediaItem, onVideoSelect: (video: MediaItem) => void }) => {
    const isVideo = item.type === 'video';
    const imageUrl = isVideo && item.videoId
        ? `https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`
        : item.image;

    const Wrapper = ({children}: {children: React.ReactNode}) => isVideo ? 
        <button onClick={() => onVideoSelect(item)} className="block w-full text-left h-full">{children}</button> : 
        <Link href={item.link || '#'} target="_blank" className="block h-full">{children}</Link>;

    return (
        <Card className="h-full flex flex-col group overflow-hidden">
            <CardHeader className="p-0">
                 <Wrapper>
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
                </Wrapper>
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
                <CardTitlePrimitive className="text-lg font-semibold">{item.title}</CardTitlePrimitive>
                <CardDescription className="mt-2 text-sm text-muted-foreground flex-grow">
                    {item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export function MediaGallery({ isPage = false }: { isPage?: boolean }) {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const itemsToShow = isPage ? allMediaItems : allMediaItems.slice(0, 3);

  return (
    <section id="media" className={cn("w-full py-12 md:py-24", isPage ? "bg-background" : "bg-secondary/50")}>
       <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Media & Features</h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Watch product demos, installation tutorials, and see what the press is saying about InvisaCook.
            </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {itemsToShow.map((item) => <MediaItemCard key={item.title} item={item} onVideoSelect={setSelectedVideo} />)}
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
        {selectedVideo && selectedVideo.type === 'video' && (
            <DialogContent className="max-w-4xl h-auto p-0 border-0">
                <DialogTitle className="sr-only">{selectedVideo.title}</DialogTitle>
                <div className="aspect-video">
                <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
                </div>
            </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
