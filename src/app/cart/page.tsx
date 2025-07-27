
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";

// This is a mock implementation. In a real app, this would come from a context or state management.
const cartItems = [
  { ...getAllProducts()[0], quantity: 1 },
  { ...getAllProducts()[1], quantity: 2 },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shipping = 25.0;
const tax = subtotal * 0.08;
const total = subtotal + shipping + tax;

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50 py-12 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Your Cart</h1>
          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {cartItems.map(product => (
                        <li key={product.slug} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                          <Image src={product.images[0].src} alt={product.title} width={100} height={100} className="rounded-md object-cover flex-shrink-0" />
                          <div className="flex-1 grid gap-2">
                            <h3 className="font-semibold">{product.title}</h3>
                            <p className="text-sm text-muted-foreground sm:hidden">${product.price.toFixed(2)}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4" /></Button>
                                    <span className="w-8 text-center">{product.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                                </div>
                                <p className="font-semibold text-right sm:hidden">${(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                           <p className="font-semibold w-20 text-right hidden sm:block">${(product.price * product.quantity).toFixed(2)}</p>
                           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive self-end sm:self-center"><Trash2 className="h-4 w-4" /></Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-muted-foreground">
                      <span>Taxes</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Separator />
                     <div className="space-y-2">
                        <Input placeholder="Discount code" />
                        <Button variant="outline" className="w-full">Apply Discount</Button>
                    </div>
                    <Button asChild className="w-full" size="lg">
                        <Link href="/checkout">
                            <CreditCard className="mr-2 h-5 w-5"/>
                            Proceed to Checkout
                        </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="text-center py-20">
              <CardContent>
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                  <Link href="/all-products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
