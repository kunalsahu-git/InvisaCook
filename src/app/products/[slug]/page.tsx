

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { PlayCircle, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CustomerReviews } from "@/components/sections/customer-reviews";
import { RelatedProducts } from "@/components/sections/related-products";
import Image from "next/image";
import { ProductPageContent } from "@/components/shared/product-page-content";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getAllProducts, Product, productData } from "@/lib/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function ProductVideos({ videos }: { videos: Product['videos'] }) {
    const [selectedVideo, setSelectedVideo] = useState<Product['videos'][0] | null>(null);

    if (!videos || videos.length === 0) {
        return null;
    }

    const getThumbnailUrl = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

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
                                            src={getThumbnailUrl(video.videoId)}
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
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </DialogContent>
                    )}
                </Dialog>
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

function ProductDetailPage({
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

        <ProductVideos videos={product.videos} />
        <ProductDownloads documents={product.documents} />
        <CustomerReviews />
        <RelatedProducts currentProductSlug={params.slug}/>

      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
