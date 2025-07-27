
"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
        
        <div className="mt-12 max-w-4xl mx-auto">
             <Card>
                <CardHeader className="text-center">
                    <Instagram className="h-12 w-12 mx-auto text-pink-500" />
                    <CardTitle className="mt-4">Live Instagram Feed</CardTitle>
                    <CardDescription>
                    Embed your live Instagram feed here to keep your content fresh and engaging.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>
                    To add a live feed, you can use a third-party service like Elfsight or Juicer.
                    These services will provide you with a code snippet to paste here.
                    </p>
                    <div className="mt-4 p-4 border-dashed border-2 rounded-lg bg-secondary">
                    <p className="font-mono text-xs text-left">
                        &lt;!-- Example Embed Code from Elfsight --&gt;<br />
                        &lt;script src="https://apps.elfsight.com/p/platform.js" defer&gt;&lt;/script&gt;<br />
                        &lt;div class="elfsight-app-a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6"&gt;&lt;/div&gt;
                    </p>
                    </div>
                    <p className="mt-4">
                    Simply replace the code in this component with the snippet from your chosen provider.
                    </p>
                </CardContent>
            </Card>
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
