
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { PlayCircle, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/lib/products";

function getThumbnailUrl(video: Product['videos'][0]) {
    if (video.videoSrc) {
        // Use a placeholder for local videos, or you could implement a thumbnail generation strategy
        return "https://placehold.co/600x400.png?text=Video";
    }
    return `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
}

export function ProductVideos({ videos }: { videos: Product['videos'] }) {
    const [selectedVideo, setSelectedVideo] = useState<Product['videos'][0] | null>(null);

    const groupedVideos = useMemo(() => {
        return videos.reduce((acc, video) => {
            (acc[video.category] = acc[video.category] || []).push(video);
            return acc;
        }, {} as Record<string, typeof videos>);
    }, [videos]);
    
    const categories = useMemo(() => Object.keys(groupedVideos), [groupedVideos]);

    if (!videos || videos.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 border-t bg-background">
            <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
                <div className="container mx-auto max-w-6xl px-4 md:px-6 space-y-12">
                    {categories.map(category => (
                        <div key={category}>
                             <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{category}</h2>
                             </div>
                            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                {groupedVideos[category].map((video) => (
                                    <Card key={video.id} className="group overflow-hidden">
                                        <CardContent className="p-0">
                                            <button onClick={() => setSelectedVideo(video)} className="block relative w-full text-left">
                                                <Image
                                                    src={getThumbnailUrl(video)}
                                                    alt={video.title}
                                                    width={600}
                                                    height={400}
                                                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    data-ai-hint={video.aiHint}
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <PlayCircle className="h-16 w-16 text-white" />
                                                </div>
                                                <div className="absolute top-3 left-3 bg-background/80 text-foreground p-2 rounded-full">
                                                    <Video className="h-5 w-5" />
                                                </div>
                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                                                    {video.duration}
                                                </div>
                                            </button>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg">{video.title}</h3>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                 {selectedVideo && (
                    <DialogContent className="max-w-4xl h-auto p-0 border-0">
                        <DialogTitle className="sr-only">{selectedVideo.title}</DialogTitle>
                        <div className="aspect-video">
                            {selectedVideo.videoSrc ? (
                                    <video
                                    src={selectedVideo.videoSrc}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            )}
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </section>
    );
}
