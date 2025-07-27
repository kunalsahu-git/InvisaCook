import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ProductListing } from "@/components/sections/product-listing";
import { getAllProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getAllProducts();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProductListing allProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
