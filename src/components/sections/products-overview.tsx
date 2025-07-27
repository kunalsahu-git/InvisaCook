

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Wifi, Zap, Layers, CircleDollarSign, Sun, BatteryCharging, Ruler, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllProducts } from "@/lib/products";

const products = getAllProducts().filter(p => p.featured).slice(0, 3);


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
    <section id="products" className="w-full py-12 md:py-24">
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
                    src={product.images[0].src}
                    alt={product.title}
                    width={500}
                    height={300}
                    className="h-auto w-full object-cover"
                    data-ai-hint={product.images[0].aiHint}
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
                    {product.features.map((feature, index) => {
                      const Icon = feature.icon ? ({
                          Flame, Wifi, Zap, Layers, CircleDollarSign, Sun, BatteryCharging, Ruler
                      }[feature.icon]) : null;
                      return (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                       {Icon && <Icon className="h-4 w-4 text-accent" />}
                        <span>{feature.text}</span>
                      </li>
                    )})}
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

        <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/all-products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>

      </div>
    </section>
  );
}
