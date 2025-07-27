
"use client"

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Printer, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock Data - In a real app, you'd fetch this based on the ID
const allProducts = getAllProducts();
const orders = [
    {
        id: "ORD001",
        date: "2023-10-23",
        status: "Fulfilled",
        items: [
        { ...allProducts[0], quantity: 1 },
        { ...allProducts[1], quantity: 1 },
        ],
        shippingAddress: { name: "Jane Doe", address: "123 Beacon St", city: "Boston", state: "MA", zip: "02116", country: "USA" },
        billingAddress: { name: "Jane Doe", address: "123 Beacon St", city: "Boston", state: "MA", zip: "02116", country: "USA" },
        payment: { method: "Credit Card", cardLast4: "4242", transactionId: "ch_3PqF7aL2b3c4d5e6" },
        summary: { subtotal: 2298.00, shipping: 25.00, tax: 185.84, total: 2508.84 },
    },
    {
        id: "ORD002",
        date: "2023-10-24",
        status: "Pending",
        items: [{ ...allProducts[2], quantity: 2 }],
        shippingAddress: { name: "Jane Doe", address: "123 Beacon St", city: "Boston", state: "MA", zip: "02116", country: "USA" },
        billingAddress: { name: "Jane Doe", address: "123 Beacon St", city: "Boston", state: "MA", zip: "02116", country: "USA" },
        payment: { method: "Credit Card", cardLast4: "4242", transactionId: "ch_4AbG8bC3d4e5f6g7" },
        summary: { subtotal: 158.00, shipping: 10.00, tax: 13.44, total: 181.44 },
    },
    {
        id: "ORD003",
        date: "2023-10-25",
        status: "Shipped",
        items: [{ ...allProducts[3], quantity: 1 }],
        shippingAddress: { name: "Jane Doe", address: "123 Beacon St", city: "Boston", state: "MA", zip: "02116", country: "USA" },
        billingAddress: { name: "Jane Doe", address: "123 Beacon St", city: "Boston", state: "MA", zip: "02116", country: "USA" },
        payment: { method: "PayPal", email: "jane.doe@example.com", transactionId: "pi_5CdH9cD4e5f6g7h8" },
        summary: { subtotal: 129.00, shipping: 15.00, tax: 11.52, total: 155.52 },
    },
];

const getOrderById = (id: string) => orders.find(order => order.id === id);


export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }
  
  const handlePrint = () => {
    window.print();
  }

  return (
    <Card id="printable-receipt">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <Link href="/account/orders" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 no-print">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders
                </Link>
                <h1 className="text-2xl font-bold">Order Details</h1>
                <p className="text-muted-foreground">Order ID: {order.id}</p>
                <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex flex-col items-stretch md:items-end gap-2">
                <div className="flex items-center gap-2">
                    <Truck className="h-6 w-6 text-muted-foreground" />
                    <Badge variant={
                        order.status === 'Fulfilled' ? 'default' : 
                        order.status === 'Pending' ? 'secondary' :
                        order.status === 'Shipped' ? 'outline' :
                        'destructive'
                    } className="text-lg px-4 py-1">{order.status}</Badge>
                </div>
                 <Button onClick={handlePrint} variant="outline" className="mt-4 no-print">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Receipt
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
                 {/* Left Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="divide-y">
                                {order.items.map(item => (
                                <li key={item.slug} className="flex items-center gap-4 py-4">
                                    <Image src={item.images[0].src} alt={item.title} width={80} height={80} className="rounded-md object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{order.payment.method === 'Credit Card' ? `Ending in ${order.payment.cardLast4}` : 'PayPal'}</p>
                                    <p className="text-sm text-muted-foreground">Transaction ID: {order.payment.transactionId}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <address className="not-italic space-y-1">
                                <p className="font-semibold">{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                                <p>{order.shippingAddress.country}</p>
                            </address>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${order.summary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${order.summary.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Taxes</span>
                                <span>${order.summary.tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${order.summary.total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}
