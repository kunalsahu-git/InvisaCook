
"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

    if (!videos || videos.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-background">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                 <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                        Watch product demos, feature showcases, and installation guides.
                    </p>
                </div>
                <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
                    <div className="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        {videos.map((video) => (
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
                     {selectedVideo && (
                        <DialogContent className="max-w-4xl h-auto p-0 border-0">
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
            </div>
        </section>
    );
}
