"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Wifi,
  Zap,
  Layers,
  CircleDollarSign,
  Sun,
  BatteryCharging,
  Ruler,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const productData = {
  "invisacook-burners": {
    title: "InvisaCook Burners",
    description:
      "The core of the InvisaCook system. These powerful induction elements mount directly beneath your countertop, creating a completely invisible and versatile cooking surface. Experience the magic of cooking directly on your porcelain or granite countertop.",
    image: "https://placehold.co/800x600.png",
    aiHint: "kitchen countertop",
    features: [
      { icon: Flame, text: "Available in 1 to 4 burner configurations" },
      { icon: Zap, text: "Power Boost feature for rapid heating" },
      { icon: Wifi, text: "Full control via the InvisaCook mobile app" },
    ],
    specs: [
      { label: "Compatibility", value: "12mm Porcelain or Granite" },
      { label: "Power Source", value: "220V Hardwired" },
      { label: "Control", value: "Digital Touch Controls & Wi-Fi App" },
      { label: "Safety", value: "Auto-Shutoff, Pan Detection, Child Lock" },
    ],
  },
  "invisacookware-sets": {
    title: "InvisaCookware Sets",
    description:
      "Engineered for maximum performance and to protect your valuable countertop. Our 5-ply copper core cookware ensures even heat distribution, while the proprietary riser system elevates the pan just enough to prevent scorching and optimize induction transfer.",
    image: "https://placehold.co/800x600.png",
    aiHint: "cookware set",
    features: [
      { icon: Layers, text: "5-Ply Copper Core construction for even heating" },
      {
        icon: CircleDollarSign,
        text: "Sets starting at $499, individual pieces available",
      },
    ],
    specs: [
      { label: "Material", value: "Stainless Steel with Copper Core" },
      { label: "Pieces", value: "Available in 5-piece and 10-piece sets" },
      { label: "Compatibility", value: "All induction cooktops" },
      { label: "Special Feature", value: "Integrated Countertop Riser" },
    ],
  },
  invisamat: {
    title: "InvisaMat",
    description:
      "The essential accessory for your InvisaCook system. This proprietary silicone mat ensures proper heat diffusion, protects the countertop surface from scratches, and helps indicate the active cooking zone. It's the perfect blend of safety and functionality.",
    image: "https://placehold.co/800x600.png",
    aiHint: "silicone mat",
    features: [
      { icon: Sun, text: "Optimizes heat transfer for efficient cooking" },
      { text: "Protects countertop from scratches and minor spills" },
      { text: "Dishwasher safe for easy cleanup" },
    ],
    specs: [
      { label: "Material", value: "High-Grade, Food-Safe Silicone" },
      { label: "Heat Resistance", value: "Up to 450°F (232°C)" },
      { label: "Dimensions", value: "Available for each burner size" },
    ],
  },
  invisacharge: {
    title: "InvisaCharge",
    description:
      "Declutter your kitchen with our through-surface wireless charger. Like the InvisaCook, the InvisaCharge mounts invisibly under your countertop, providing a powerful Qi charging station that works through up to 5cm of stone.",
    image: "https://placehold.co/800x600.png",
    aiHint: "wireless charger",
    features: [
      {
        icon: BatteryCharging,
        text: "Delivers up to 15W of fast wireless power",
      },
      { text: "Completely invisible installation" },
      { text: "Works with all Qi-compatible devices" },
    ],
    specs: [
      { label: "Technology", value: "Qi-Certified Wireless Charging" },
      { label: "Max Thickness", value: "5cm (2 inches) of non-metallic material" },
      { label: "Power Output", value: "5W, 7.5W, 10W, 15W" },
    ],
  },
  invisarail: {
    title: "InvisaRail",
    description:
      "The backbone of your InvisaCook installation. This precision-engineered rail system provides the essential support structure for your undermount burners, ensuring a perfectly level and secure fit within your cabinetry.",
    image: "https://placehold.co/800x600.png",
    aiHint: "metal rail",
    features: [
      { icon: Ruler, text: "Supports cabinet widths up to 96 inches" },
      { text: "Ensures level and secure burner installation" },
      { text: "Made from high-strength anodized aluminum" },
    ],
    specs: [
      { label: "Material", value: "Anodized Aluminum" },
      { label: "Compatibility", value: "All InvisaCook burner models" },
      { label: "Includes", value: "All necessary mounting hardware" },
    ],
  },
};

type Product = (typeof productData)[keyof typeof productData];

const getProductBySlug = (slug: string): Product | undefined => {
  return productData[slug as keyof typeof productData];
};

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary/20">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/#products">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="rounded-lg shadow-2xl aspect-square object-cover"
                data-ai-hint={product.aiHint}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary">{params.slug.split('-')[0]}</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {product.title}
                </h1>
                <p className="text-muted-foreground md:text-lg">
                  {product.description}
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.icon && (
                          <feature.icon className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                        )}
                        {!feature.icon && <div className="h-5 w-5 flex-shrink-0" />}
                        <span>{feature.text}</span>
                      </li>
                    ))}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(productData).map((slug) => ({
    slug,
  }));
}
