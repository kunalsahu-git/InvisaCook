
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const allMediaItems = [
  {
    type: "video",
    videoId: "g8ZeLjVzrOM",
    title: "Invisicook 2023 Installation Tutorial",
    description: "Complete installation tutorial for the Invisicook system.",
    category: "Tutorial",
    image: "https://i.ytimg.com/vi/g8ZeLjVzrOM/maxresdefault.jpg",
    aiHint: "installation tutorial",
    duration: "04:59",
  },
  {
    type: "video",
    videoId: "_4sZuzEfBig",
    title: "Invisacook Tutorial",
    description: "How to Video, on the Ends and Out of how to Properly use your Invisacook Induction Unit.",
    category: "Tutorial",
    image: "https://i.ytimg.com/vi/_4sZuzEfBig/maxresdefault.jpg",
    aiHint: "how to video",
    duration: "10:28",
  },
  {
    type: "video",
    videoId: "ImjA1KTw7KA",
    title: "InvisaCharge Installation Video",
    description: "This video shows how to install the InvisaCharge with the booster sticker when using any material that is thicker then 2cm (20mm) thick.",
    category: "Tutorial",
    image: "https://i.ytimg.com/vi/ImjA1KTw7KA/maxresdefault.jpg",
    aiHint: "invisacharge installation",
    duration: "01:04",
  },
  {
    type: "video",
    videoId: "Y_QNejVtWH0",
    title: "5-Piece Copper-Core Pan Set!",
    description: "A look at our 5-piece copper-core pan set.",
    category: "Product Demo",
    image: "https://i.ytimg.com/vi/Y_QNejVtWH0/maxresdefault.jpg",
    aiHint: "cookware set",
    duration: "01:09",
  },
  {
    type: "video",
    videoId: "UlfCKPNOsM0",
    title: "HGTV's Jonathan Scott talks Invisacook!!",
    description: "Check out HGTV’s Jonathan Scott as he describes why InvisaCook is the cooktop of the future!",
    category: "Product Demo",
    image: "https://i.ytimg.com/vi/UlfCKPNOsM0/sddefault.jpg",
    aiHint: "celebrity endorsement",
    duration: "00:54",
  },
  {
    type: "video",
    videoId: "oMSqqLojkr8",
    title: "Pan Pizza | COOKING ON COUNTERTOPS",
    description: "Chef Ryan & friends make an easy pan pizza - in a cast iron pan!",
    category: "Recipe",
    image: "https://i.ytimg.com/vi/oMSqqLojkr8/maxresdefault.jpg",
    aiHint: "cooking pizza",
    duration: "05:33",
  },
   {
    type: "video",
    videoId: "QR9MocWyF6Y",
    title: "Mongolian Beef & Broccoli | COOKING ON COUNTERTOPS",
    description: "It's Day 2 at our awesome northeast distributor, as Ryan whips up some beefy stir fry!",
    category: "Recipe",
    image: "https://i.ytimg.com/vi/QR9MocWyF6Y/maxresdefault.jpg",
    aiHint: "cooking stir fry",
    duration: "04:32",
  },
];

type MediaItem = typeof allMediaItems[0];


const MediaCard = ({ item, onVideoSelect }: { item: MediaItem; onVideoSelect: (video: MediaItem) => void }) => (
    <Card key={item.title} className="group overflow-hidden flex flex-col">
        <CardContent className="p-0 flex-grow flex flex-col">
            <button onClick={() => onVideoSelect(item)} className="block relative w-full text-left">
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
                    <PlayCircle className="h-16 w-16 text-white" />
                </div>
                    <Badge variant="secondary" className="absolute top-3 right-3">{item.category}</Badge>
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                        {item.duration}
                    </div>
                </div>
            </button>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">{item.description}</p>
            </div>
        </CardContent>
    </Card>
);

export function VideoLibrary() {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  const groupedMedia = useMemo(() => {
    return allMediaItems.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, typeof allMediaItems>);
  }, []);
  
  const categories = useMemo(() => Object.keys(groupedMedia), [groupedMedia]);

  return (
    <section id="media" className="w-full py-12 md:py-24 bg-secondary/50">
        <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
            <div className="container mx-auto max-w-7xl px-4 md:px-6 space-y-16">
                {categories.map(category => (
                    <div key={category}>
                    <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">{category}</h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {groupedMedia[category].map((item) => <MediaCard key={item.title} item={item} onVideoSelect={setSelectedVideo} />)}
                    </div>
                    </div>
                ))}
            </div>
             {selectedVideo && (
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
  )
}

    