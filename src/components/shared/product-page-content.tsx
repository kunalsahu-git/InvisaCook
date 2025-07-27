
"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductGallery } from "@/components/shared/product-gallery";
import { ProductWithSlug } from "@/app/products/[slug]/page";
import {
  ChevronLeft,
  ShoppingCart,
  Plus,
  Minus,
  Flame,
  Wifi,
  Zap,
  Layers,
  CircleDollarSign,
  Sun,
  BatteryCharging,
  Ruler,
  PlayCircle
} from "lucide-react";
import Image from "next/image";

// A map to render icons based on the 'icon' string from product data
const iconMap: { [key: string]: React.ElementType } = {
  Flame,
  Wifi,
  Zap,
  Layers,
  CircleDollarSign,
  Sun,
  BatteryCharging,
  Ruler,
};

function ProductVideos({ videos }: { videos: ProductWithSlug['videos'] }) {
    if (!videos || videos.length === 0) {
        return null;
    }

    return (
        <div className="py-8">
             <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                    Watch product demos, feature showcases, and installation guides.
                </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {videos.map((video) => (
                    <Card key={video.id} className="group overflow-hidden">
                        <CardContent className="p-0">
                            <Link href="#" className="block relative">
                                <Image
                                    src={video.thumbnail}
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
                            </Link>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{video.title}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function ProductPageContent({ product }: { product: ProductWithSlug }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/#products">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductGallery images={product.images} />

        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary">{product.slug.split("-")[0]}</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {product.title}
            </h1>
            <p className="text-muted-foreground md:text-lg">
              {product.description}
            </p>
            <div className="text-4xl font-bold">${product.price.toFixed(2)}</div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" variant="outline" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            <Button size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.features.map((feature, index) => {
                  const Icon = feature.icon ? iconMap[feature.icon] : null;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      {Icon ? (
                        <Icon className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 flex-shrink-0" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 gap-4 py-3"
                  >
                    <span className="font-medium text-muted-foreground">
                      {spec.label}
                    </span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
       <ProductVideos videos={product.videos} />
    </div>
  );
}
