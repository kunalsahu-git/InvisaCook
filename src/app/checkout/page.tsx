"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";


const checkoutFormSchema = z.object({
  email: z.string().email(),
  
  shipping: z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      address: z.string().min(5),
      city: z.string().min(2),
      state: z.string().min(2),
      zip: z.string().min(5),
      country: z.string().min(2),
  }),

  payment: z.object({
      cardholderName: z.string().min(2),
      cardNumber: z.string().min(16).max(16),
      expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid expiry date"),
      cvc: z.string().min(3).max(4),
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Mock data
const cartItems = [
  { ...getAllProducts()[0], quantity: 1 },
  { ...getAllProducts()[1], quantity: 2 },
];
const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shippingCost = 25.0;
const tax = subtotal * 0.08;
const total = subtotal + shippingCost + tax;


export default function CheckoutPage() {
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      shipping: {
        firstName: "", lastName: "", address: "", city: "", state: "", zip: "", country: "USA"
      },
      payment: {
        cardholderName: "", cardNumber: "", expirationDate: "", cvc: ""
      }
    },
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log(data);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. A confirmation email has been sent.",
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
          </div>
        
          <div className="grid lg:grid-cols-2 lg:gap-12">
            {/* Left Column: Form */}
            <div className="lg:order-1">
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
                  <Card>
                    <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                    <CardContent>
                       <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="shipping.firstName" render={({ field }) => ( <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="shipping.lastName" render={({ field }) => ( <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      </div>
                      <FormField control={form.control} name="shipping.address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <FormField control={form.control} name="shipping.city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="shipping.state" render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="shipping.zip" render={({ field }) => ( <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
                     <CardContent className="space-y-4">
                        <FormField control={form.control} name="payment.cardholderName" render={({ field }) => ( <FormItem><FormLabel>Cardholder Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="payment.cardNumber" render={({ field }) => ( <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem> )} />
                       <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="payment.expirationDate" render={({ field }) => ( <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem> )} />
                         <FormField control={form.control} name="payment.cvc" render={({ field }) => ( <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem> )} />
                      </div>
                     </CardContent>
                  </Card>
                   <Button type="submit" size="lg" className="w-full">
                     <Lock className="mr-2 h-5 w-5" />
                     Pay ${total.toFixed(2)}
                   </Button>
                </form>
               </Form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:order-2 bg-secondary/50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                   <div key={item.slug} className="flex items-center justify-between gap-4">
                      <div className="relative">
                        <Image src={item.images[0].src} alt={item.title} width={64} height={64} className="rounded-md object-cover" />
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                   </div>
                ))}
              </div>
              <Separator className="my-6" />
               <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
               </div>
              <Separator className="my-6" />
              <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
