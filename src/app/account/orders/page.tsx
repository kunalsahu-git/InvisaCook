

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

const orders = [
  {
    id: "ORD001",
    date: "2023-10-23",
    total: "$250.00",
    status: "Fulfilled",
  },
  {
    id: "ORD002",
    date: "2023-10-24",
    total: "$150.00",
    status: "Pending",
  },
  {
    id: "ORD003",
    date: "2023-10-25",
    total: "$350.00",
    status: "Shipped",
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
                <TableCell>{order.total}</TableCell>
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
                    <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
