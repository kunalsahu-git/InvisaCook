
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

interface RelatedProductsProps {
    currentProductSlug: string;
}

export function RelatedProducts({ currentProductSlug }: RelatedProductsProps) {
  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter(p => p.slug !== currentProductSlug).slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section id="related-products" className="w-full py-12 md:py-24 bg-background border-t">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">You Might Also Like</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Complete your invisible kitchen with these essential components.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((product) => (
            <Card key={product.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48">
                <Image
                  src={product.images[0].src}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="h-auto w-full"
                  data-ai-hint={product.images[0].aiHint}
                />
              </div>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description.substring(0, 100)}...</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                 <Button asChild className="w-full" variant="outline">
                    <Link href={`/products/${product.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
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
