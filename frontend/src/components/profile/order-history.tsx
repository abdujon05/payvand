import { useEffect } from "react";
import useOrderStore from "@/store/order-store";
import useUserStore from "@/store/user-store";
import { downloadOrdersAsCsv, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { FileDown, Package, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export function OrderHistory() {
  const { user } = useUserStore();
  const { orders, loading, fetchUserOrders } = useOrderStore();

  useEffect(() => {
    if (user?.id) {
      fetchUserOrders(user.id);
    }
  }, [user?.id, fetchUserOrders]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="mt-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="orders">
          <AccordionTrigger className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span className="font-semibold">Order History</span>
              <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                {orders.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 pt-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  View and manage your order history
                </p>
                <Button variant="outline" size="sm" onClick={() => downloadOrdersAsCsv(orders)}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        #{order.id.slice(-3)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium">{order.product.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatPrice(order.product.price)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(order.total_price)}
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Link to={`/orders/${order.id}`} className="underline text-red-400">Track</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No orders found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}