"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Wifi, Zap, Layers, CircleDollarSign, Sun, BatteryCharging, Ruler, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const products = [
  {
    slug: "invisacook-burners",
    title: "InvisaCook Burners",
    description: "Undermount induction elements for a truly invisible cooktop. Available in 1-4 burner models.",
    image: "https://placehold.co/500x300.png",
    aiHint: "kitchen countertop",
    features: [
      { icon: Flame, text: "Up to 4 elements" },
      { icon: Zap, text: "Power Boost" },
      { icon: Wifi, text: "Wi-Fi/App Control" },
    ],
  },
  {
    slug: "invisacookware-sets",
    title: "InvisaCookware Sets",
    description: "Engineered for performance with a riser system to protect your countertop.",
    image: "https://placehold.co/500x300.png",
    aiHint: "cookware set",
    features: [
      { icon: Layers, text: "5-Ply Copper Core" },
      { icon: CircleDollarSign, text: "Starting at $499" },
    ],
  },
  {
    slug: "invisamat",
    title: "InvisaMat",
    description: "A proprietary silicone mat that ensures proper heat diffusion and compatibility.",
    image: "https://placehold.co/500x300.png",
    aiHint: "silicone mat",
    features: [
      { icon: Sun, text: "Optimizes Heat" },
    ],
  },
  {
    slug: "invisacharge",
    title: "InvisaCharge",
    description: "Qi wireless charging that works through countertops up to 5cm thick.",
    image: "https://placehold.co/500x300.png",
    aiHint: "wireless charger",
    features: [
        { icon: BatteryCharging, text: "Through-Surface Power" },
    ],
  },
  {
    slug: "invisarail",
    title: "InvisaRail",
    description: "The support structure for your burners, ensuring a secure and level installation.",
    image: "https://placehold.co/500x300.png",
    aiHint: "metal rail",
    features: [
        { icon: Ruler, text: "Supports up to 96\" cabinets" },
    ],
  },
];

export function ProductsOverview() {
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = (slug: string) => {
    // In a real app, you'd also dispatch an action to update the cart state
    setAddingToCart(slug);
    setTimeout(() => {
      setAddingToCart(null);
    }, 1200); // Animation duration + delay
  };

  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Product Ecosystem</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Discover the components that make invisible cooking a reality.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={300}
                    className="h-auto w-full object-cover"
                    data-ai-hint={product.aiHint}
                  />
                </div>
              </Link>
              <CardHeader>
                <Link href={`/products/${product.slug}`} className="block">
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </Link>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <feature.icon className="h-4 w-4 text-accent" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                 <div className="mt-6 flex gap-2 relative">
                    <Button className="flex-1" onClick={() => handleAddToCart(product.slug)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                    <Button asChild className="flex-1" variant="outline">
                        <Link href={`/products/${product.slug}`}>
                           Details
                        </Link>
                    </Button>
                     <div className={cn(
                        "absolute -top-3 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center transition-all duration-1000 ease-out",
                        addingToCart === product.slug ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-50"
                     )}>
                        +1
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
