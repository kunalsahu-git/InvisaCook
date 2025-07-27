"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const instagramPosts = [
  { id: 1, img: "https://placehold.co/500x500.png", aiHint: "modern kitchen" },
  { id: 2, img: "https://placehold.co/500x500.png", aiHint: "food preparation" },
  { id: 3, img: "https://placehold.co/500x500.png", aiHint: "sleek design" },
  { id: 4, img: "https://placehold.co/500x500.png", aiHint: "family dinner" },
  { id: 5, img: "https://placehold.co/500x500.png", aiHint: "minimalist interior" },
  { id: 6, img: "https://placehold.co/500x500.png", aiHint: "gourmet cooking" },
];

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.528 8.004h-2.17V14.4s-1.88-1.72-4.352-1.72V9.37s2.44.09 4.351-1.637Z" />
      <path d="M12.528 8.004s.732-5.523 6.472-5.523v3.31s-3.95.2-3.95 4.053h3.95v3.21h-3.95s.31 4.72 4.35 4.72v3.31s-6.87-.23-6.87-7.483Z" />
    </svg>
  );

export function InstagramFeed() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">#InvisaCook on Social</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            See how our customers are revolutionizing their kitchens. Share your space with #InvisaCook.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Instagram Feed */}
            <div className="lg:col-span-2 border rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border">
                             <AvatarImage src="https://placehold.co/100x100.png" alt="Invisacook Logo" data-ai-hint="company logo"/>
                             <AvatarFallback>IC</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">invisa.cook</p>
                            <p className="text-sm text-muted-foreground">Invisacook</p>
                            <div className="flex gap-4 text-sm mt-1">
                                <span><span className="font-bold">141</span> posts</span>
                                <span><span className="font-bold">7,001</span> followers</span>
                            </div>
                        </div>
                    </div>
                    <Instagram className="h-8 w-8 text-pink-500" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {instagramPosts.map((post) => (
                        <div key={post.id} className="group relative block w-full overflow-hidden aspect-square">
                            <Image
                                src={post.img}
                                alt="Instagram post featuring InvisaCook"
                                width={300}
                                height={300}
                                className="w-full h-full object-cover"
                                data-ai-hint={post.aiHint}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Facebook Embed */}
            <div className="border rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-200 rounded-md p-2">
                         <Avatar className="h-10 w-10 border">
                             <AvatarImage src="https://placehold.co/100x100.png" alt="Invisacook Logo" data-ai-hint="company logo"/>
                             <AvatarFallback>IC</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <p className="font-semibold">InvisaCook</p>
                        <p className="text-xs text-muted-foreground">3,386 followers</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1" variant="outline"><Facebook className="mr-2 h-4 w-4" /> Follow Page</Button>
                    <Button className="flex-1" variant="secondary">Share</Button>
                </div>
                 <div className="aspect-w-9 aspect-h-16 w-full overflow-hidden rounded-lg relative">
                    <Image
                        src="https://placehold.co/400x711.png"
                        alt="Facebook video"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="cooking video"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-4">
                            <PlayCircle className="h-12 w-12 text-gray-800" />
                        </div>
                    </div>
                 </div>
            </div>
        </div>

         <div className="mt-16 flex justify-center items-center gap-6">
            <Link href="#" aria-label="Instagram">
                <Instagram className="h-8 w-8 text-primary/80 hover:text-accent transition-colors"/>
            </Link>
             <Link href="#" aria-label="YouTube">
                <Youtube className="h-8 w-8 text-primary/80 hover:text-accent transition-colors"/>
            </Link>
             <Link href="#" aria-label="Facebook">
                <Facebook className="h-8 w-8 text-primary/80 hover:text-accent transition-colors"/>
            </Link>
            <Link href="#" aria-label="TikTok">
                <TikTokIcon className="h-8 w-8 text-primary/80 hover:text-accent transition-colors"/>
            </Link>
         </div>

      </div>
    </section>
  )
}
