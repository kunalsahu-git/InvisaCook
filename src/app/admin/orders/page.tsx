

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
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "ORD001",
    customer: "Liam Johnson",
    date: "2023-10-23",
    total: "$250.00",
    status: "Fulfilled",
  },
  {
    id: "ORD002",
    customer: "Olivia Smith",
    date: "2023-10-24",
    total: "$150.00",
    status: "Pending",
  },
  {
    id: "ORD003",
    customer: "Noah Williams",
    date: "2023-10-25",
    total: "$350.00",
    status: "Fulfilled",
  },
  {
    id: "ORD004",
    customer: "Emma Brown",
    date: "2023-10-26",
    total: "$450.00",
    status: "Shipped",
  },
  {
    id: "ORD005",
    customer: "Ava Jones",
    date: "2023-10-27",
    total: "$550.00",
    status: "Cancelled",
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          View and manage customer orders.
        </p>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
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
              <TableCell>{order.customer}</TableCell>
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
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Order</DropdownMenuItem>
                        <DropdownMenuItem>Edit Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
