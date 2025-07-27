

import { notFound } from "next/navigation";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CustomerReviews } from "@/components/sections/customer-reviews";
import { RelatedProducts } from "@/components/sections/related-products";
import { ProductPageContent } from "@/components/shared/product-page-content";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { ProductVideos } from "@/components/sections/product-videos";
import { ProductDownloads } from "@/components/sections/product-downloads";

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
