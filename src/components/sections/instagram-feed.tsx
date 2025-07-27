

"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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


const socialPosts = [
    {
        platform: "Instagram",
        user: { name: "design.addict", handle: "@design.addict", image: "https://i.pravatar.cc/150?img=5" },
        image: "https://placehold.co/600x600.png",
        aiHint: "minimalist kitchen",
        caption: "Absolutely in love with my new minimalist kitchen featuring the @InvisaCook cooktop. It's a game-changer! ✨ #invisacook #minimalistkitchen #design"
    },
     {
        platform: "Facebook",
        user: { name: "Home Renovations", handle: "", image: "https://i.pravatar.cc/150?img=6" },
        image: "https://placehold.co/600x400.png",
        aiHint: "modern kitchen",
        caption: "Check out this incredible kitchen transformation! We installed an InvisaCook system, and the results are stunning. The seamless countertop is the definition of modern luxury."
    },
    {
        platform: "Instagram",
        user: { name: "Chef Laura", handle: "@cheflaura", image: "https://i.pravatar.cc/150?img=7" },
        video: true,
        image: "https://placehold.co/600x600.png",
        aiHint: "cooking video",
        caption: "Whipping up a quick stir-fry directly on my countertop. The heat control on the InvisaCook is just perfect. Full recipe video coming soon! #invisacook #homecooking #recipes"
    }
]

export function InstagramFeed() {
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">#InvisaCook on Social</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            See how our customers are revolutionizing their kitchens. Share your space with #InvisaCook.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {socialPosts.map((post, i) => (
            <Card key={i} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage src={post.user.image} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <div>
                        <CardTitle className="text-base">{post.user.name}</CardTitle>
                        {post.user.handle && <p className="text-sm text-muted-foreground">{post.user.handle}</p>}
                    </div>
                     <div className="ml-auto">
                        {post.platform === 'Instagram' && <Instagram className="h-6 w-6 text-pink-500" />}
                        {post.platform === 'Facebook' && <Facebook className="h-6 w-6 text-blue-600" />}
                    </div>
                </CardHeader>
              <CardContent className="p-0">
                <div className="relative group">
                    <Image
                        src={post.image}
                        alt="Social media post"
                        width={600}
                        height={600}
                        className="w-full h-auto object-cover"
                        data-ai-hint={post.aiHint}
                    />
                    {post.video && (
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <PlayCircle className="h-16 w-16 text-white" />
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <p className="text-sm">{post.caption}</p>
                </div>
              </CardContent>
            </Card>
          ))}
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
