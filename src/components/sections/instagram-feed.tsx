"use client";

import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const instagramPosts = [
  { id: 1, img: "https://placehold.co/500x500.png", aiHint: "modern kitchen", likes: 1204, comments: 88 },
  { id: 2, img: "https://placehold.co/500x500.png", aiHint: "food preparation", likes: 2345, comments: 156 },
  { id: 3, img: "https://placehold.co/500x500.png", aiHint: "sleek design", likes: 987, comments: 45 },
  { id: 4, img: "https://placehold.co/500x500.png", aiHint: "family dinner", likes: 1753, comments: 112 },
  { id: 5, img: "https://placehold.co/500x500.png", aiHint: "minimalist interior", likes: 3123, comments: 231 },
  { id: 6, img: "https://placehold.co/500x500.png", aiHint: "gourmet cooking", likes: 2541, comments: 189 },
];


export function InstagramFeed() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">#InvisaCook on Instagram</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            See how our customers are revolutionizing their kitchens. Share your space with #InvisaCook.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4">
          {instagramPosts.map((post) => (
            <Card key={post.id} className="group relative block w-full overflow-hidden">
                <Image
                  src={post.img}
                  alt="Instagram post featuring InvisaCook"
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={post.aiHint}
                />
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Heart className="h-6 w-6" />
                      <span className="font-bold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-6 w-6" />
                       <span className="font-bold">{post.comments}</span>
                    </div>
                  </div>
                </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
