
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { getAllProducts } from "@/lib/products"
import Link from "next/link"

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
]

export default function UserOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>A history of all your purchases.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.summary.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      order.status === 'Fulfilled' ? 'default' : 
                      order.status === 'Pending' ? 'secondary' :
                      order.status === 'Shipped' ? 'outline' :
                      'destructive'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/account/orders/${order.id}`}>View Details</Link>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
