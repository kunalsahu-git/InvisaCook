
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Flame, Wifi, Zap, Layers, CircleDollarSign, Sun, BatteryCharging, Ruler, PlayCircle, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CustomerReviews } from "@/components/sections/customer-reviews";
import { RelatedProducts } from "@/components/sections/related-products";
import Image from "next/image";
import { ProductPageContent } from "@/components/shared/product-page-content";
import { Button } from "@/components/ui/button";


const productData = {
  "invisacook-burners": {
    title: "InvisaCook Burners",
    price: 1799.0,
    description:
      "The core of the InvisaCook system. These powerful induction elements mount directly beneath your countertop, creating a completely invisible and versatile cooking surface. Experience the magic of cooking directly on your porcelain or granite countertop.",
    images: [
      { src: "https://placehold.co/800x800.png", alt: "InvisaCook Burners on a countertop", aiHint: "kitchen countertop" },
      { src: "https://placehold.co/800x800.png", alt: "Close-up of InvisaCook controls", aiHint: "touch controls" },
      { src: "https://placehold.co/800x800.png", alt: "Undermount view of InvisaCook installation", aiHint: "product installation" },
      { src: "https://placehold.co/800x800.png", alt: "Cooking with InvisaCook", aiHint: "active cooking" },
    ],
    features: [
      { icon: 'Flame', text: "Available in 1 to 4 burner configurations" },
      { icon: 'Zap', text: "Power Boost feature for rapid heating" },
      { icon: 'Wifi', text: "Full control via the InvisaCook mobile app" },
    ],
    specs: [
      { label: "Compatibility", value: "12mm Porcelain or Granite" },
      { label: "Power Source", value: "220V Hardwired" },
      { label: "Control", value: "Digital Touch Controls & Wi-Fi App" },
      { label: "Safety", value: "Auto-Shutoff, Pan Detection, Child Lock" },
    ],
    videos: [
        { id: '1', title: 'See the InvisaCook in Action', thumbnail: 'https://placehold.co/600x400.png', aiHint: 'cooking demo', duration: '2:34' },
        { id: '2', title: 'Installation on Granite Countertops', thumbnail: 'https://placehold.co/600x400.png', aiHint: 'kitchen installation', duration: '8:12' },
    ],
    documents: [
      { id: 1, title: "4-Burner Installation Manual", description: "Complete guide to installing the 4-burner model.", type: "Manual", language: "English" },
      { id: 4, title: "Manual de Instalación (2 Quemadores)", description: "Guía de instalación para el modelo de 2 quemadores.", type: "Manual", language: "Spanish" },
      { id: 6, title: "Guide d'installation de la table de cuisson", description: "Instructions complètes pour tous les modèles.", type: "Guide", language: "French" },
    ]
  },
  "invisacookware-sets": {
    title: "InvisaCookware Sets",
    price: 499.0,
    description:
      "Engineered for maximum performance and to protect your valuable countertop. Our 5-ply copper core cookware ensures even heat distribution, while the proprietary riser system elevates the pan just enough to prevent scorching and optimize induction transfer.",
    images: [
      { src: "https://placehold.co/800x800.png", alt: "Full InvisaCookware set", aiHint: "cookware set" },
      { src: "https://placehold.co/800x800.png", alt: "Close-up of a pot from the set", aiHint: "stainless steel pot" },
      { src: "https://placehold.co/800x800.png", alt: "Bottom of a pan showing copper core", aiHint: "copper pan" },
      { src: "https://placehold.co/800x800.png", alt: "Cookware in action on an InvisaCook surface", aiHint: "cooking pot" },
    ],
    features: [
      { icon: 'Layers', text: "5-Ply Copper Core construction for even heating" },
      {
        icon: 'CircleDollarSign',
        text: "Sets starting at $499, individual pieces available",
      },
    ],
    specs: [
      { label: "Material", value: "Stainless Steel with Copper Core" },
      { label: "Pieces", value: "Available in 5-piece and 10-piece sets" },
      { label: "Compatibility", value: "All induction cooktops" },
      { label: "Special Feature", value: "Integrated Countertop Riser" },
    ],
    videos: [
        { id: '3', title: 'The Difference of 5-Ply Cookware', thumbnail: 'https://placehold.co/600x400.png', aiHint: 'product feature', duration: '4:05' },
    ],
    documents: [
      { id: 2, title: "InvisaCookware Care Guide", description: "How to maintain your cookware for a lifetime of use.", type: "Guide", language: "English" },
    ]
  },
  invisamat: {
    title: "InvisaMat",
    price: 79.0,
    description:
      "The essential accessory for your InvisaCook system. This proprietary silicone mat ensures proper heat diffusion, protects the countertop surface from scratches, and helps indicate the active cooking zone. It's the perfect blend of safety and functionality.",
    images: [
      { src: "https://placehold.co/800x800.png", alt: "InvisaMat on a countertop", aiHint: "silicone mat" },
      { src: "https://placehold.co/800x800.png", alt: "Close-up of the InvisaMat texture", aiHint: "silicone texture" },
      { src: "https://placehold.co/800x800.png", alt: "InvisaMat being cleaned", aiHint: "kitchen cleaning" },
    ],
    features: [
      { icon: 'Sun', text: "Optimizes heat transfer for efficient cooking" },
      { text: "Protects countertop from scratches and minor spills" },
      { text: "Dishwasher safe for easy cleanup" },
    ],
    specs: [
      { label: "Material", value: "High-Grade, Food-Safe Silicone" },
      { label: "Heat Resistance", value: "Up to 450°F (232°C)" },
      { label: "Dimensions", value: "Available for each burner size" },
    ],
    videos: [],
    documents: []
  },
  invisacharge: {
    title: "InvisaCharge",
    price: 129.0,
    description:
      "Declutter your kitchen with our through-surface wireless charger. Like the InvisaCook, the InvisaCharge mounts invisibly under your countertop, providing a powerful Qi charging station that works through up to 5cm of stone.",
    images: [
        { src: "https://placehold.co/800x800.png", alt: "Phone charging on countertop with InvisaCharge", aiHint: "wireless charging" },
        { src: "https://placehold.co/800x800.png", alt: "Underside view of the InvisaCharge unit", aiHint: "charger installation" },
        { src: "https://placehold.co/800x800.png", alt: "Diagram showing charging through stone", aiHint: "technology diagram" },
    ],
    features: [
      {
        icon: 'BatteryCharging',
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
    videos: [
        { id: '4', title: 'Charge Through Stone: A Demo', thumbnail: 'https://placehold.co/600x400.png', aiHint: 'technology demo', duration: '1:45' },
    ],
    documents: [
       { id: 3, title: "InvisaCharge Spec Sheet", description: "Technical specifications for the InvisaCharge unit.", type: "Spec Sheet", language: "English" },
    ]
  },
  invisarail: {
    title: "InvisaRail",
    price: 249.0,
    description:
      "The backbone of your InvisaCook installation. This precision-engineered rail system provides the essential support structure for your undermount burners, ensuring a perfectly level and secure fit within your cabinetry.",
    images: [
        { src: "https://placehold.co/800x800.png", alt: "InvisaRail system", aiHint: "metal rail" },
        { src: "https://placehold.co/800x800.png", alt: "Close-up of InvisaRail mounting bracket", aiHint: "metal bracket" },
        { src: "https://placehold.co/800x800.png", alt: "InvisaRail installed in a cabinet", aiHint: "kitchen cabinet" },
    ],
    features: [
      { icon: 'Ruler', text: "Supports cabinet widths up to 96 inches" },
      { text: "Ensures level and secure burner installation" },
      { text: "Made from high-strength anodized aluminum" },
    ],
    specs: [
      { label: "Material", value: "Anodized Aluminum" },
      { label: "Compatibility", value: "All InvisaCook burner models" },
      { label: "Includes", value: "All necessary mounting hardware" },
    ],
    videos: [],
    documents: [
        { id: 5, title: "InvisaRail Technical Drawing", description: "Detailed dimensions and specs for the InvisaRail.", type: "Spec Sheet", language: "English" },
    ]
  },
};

export type Product = Omit<(typeof productData)[keyof typeof productData], 'features' | 'documents'> & {
  features: {
      icon?: string;
      text: string;
  }[];
  documents: {
      id: number;
      title: string;
      description: string;
      type: string;
      language: string;
  }[];
};
export type ProductWithSlug = Product & { slug: string };

export const getProductBySlug = (slug: string): ProductWithSlug | undefined => {
  const product = productData[slug as keyof typeof productData] as Product | undefined;
  if (product) {
    return { ...product, slug };
  }
  return undefined;
};

export const getAllProducts = (): ProductWithSlug[] => {
    return Object.entries(productData).map(([slug, product]) => ({...(product as Product), slug}))
}

function ProductVideos({ videos }: { videos: Product['videos'] }) {
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
        </section>
    );
}

function ProductDownloads({ documents }: { documents: Product['documents'] }) {
    if (!documents || documents.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-secondary/50">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                 <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Manuals & Guides</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                        Access detailed documentation for your product.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {documents.map((doc) => (
                         <Card key={doc.id}>
                            <CardHeader>
                            <CardTitle className="text-xl">{doc.title}</CardTitle>
                            <CardDescription>{doc.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                {doc.type} / {doc.language}
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="#">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Link>
                            </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


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
        
        <ProductPageContent product={product} />

        <ProductDownloads documents={product.documents} />
        <CustomerReviews />
        <RelatedProducts currentProductSlug={params.slug}/>

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
