"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ProductWithSlug } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Label } from "../ui/label";

interface ProductListingProps {
  allProducts: ProductWithSlug[];
}

export function ProductListing({ allProducts }: ProductListingProps) {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 2000],
    inStock: false,
  });

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map(p => p.category));
    return Array.from(cats);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      // Note: inStock is not part of product data, so this is a placeholder.
      // You would add an `inStock` property to your product data to make this work.
      const stockMatch = !filters.inStock || true; 

      return categoryMatch && priceMatch && stockMatch;
    });
  }, [allProducts, filters]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value,
    }));
  };

  const handleStockChange = (checked: boolean | "indeterminate") => {
    setFilters(prev => ({
      ...prev,
      inStock: !!checked,
    }));
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">All Products</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
          Explore our full range of innovative cooking products and accessories.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${cat}`}
                        checked={filters.categories.includes(cat)}
                        onCheckedChange={() => handleCategoryChange(cat)}
                      />
                      <Label htmlFor={`cat-${cat}`} className="font-normal">{cat}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  min={0}
                  max={2000}
                  step={50}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={handleStockChange}
                  />
                  <Label htmlFor="in-stock" className="font-normal">In Stock Only</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.slug} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={product.images[0].src}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={product.images[0].aiHint}
                    />
                  </div>
                </Link>
                <CardHeader>
                   <Link href={`/products/${product.slug}`} className="block">
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">${product.price.toFixed(2)}</CardDescription>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                    <p className="text-muted-foreground text-sm flex-grow mb-4">{product.description.substring(0, 80)}...</p>
                    <div className="flex gap-2">
                       <Button className="flex-1" size="sm">
                           <ShoppingCart className="mr-2 h-4 w-4" />
                           Add to Cart
                       </Button>
                       <Button asChild className="flex-1" variant="outline" size="sm">
                           <Link href={`/products/${product.slug}`}>Details</Link>
                       </Button>
                   </div>
                </CardContent>
              </Card>
            ))}
            {filteredProducts.length === 0 && (
                <div className="sm:col-span-2 xl:col-span-3 text-center py-12">
                     <p className="text-muted-foreground">No products match the selected filters.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
