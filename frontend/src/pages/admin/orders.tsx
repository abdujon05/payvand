import { useEffect } from "react";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, User, Calendar, DollarSign } from "lucide-react";
import useOrderStore from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

export default function Orders() {
    const { orders = [], loading, fetchAllOrders } = useOrderStore();

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    if (loading) {
        return (
            <div className="flex h-[200px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const totalRevenue = orders.reduce((sum, order) => sum + (order?.total_price || 0), 0);
    const totalOrders = orders.length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Orders Overview</h1>
                <p className="mt-2 text-muted-foreground">
                    Track and manage all customer orders in one place
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatPrice(totalRevenue / totalOrders || 0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                        A detailed list of all customer orders
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            order && (
                                <div
                                    key={order.id}
                                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={order.product?.image}
                                            alt={order.product?.name}
                                            className="h-16 w-16 rounded-md object-cover"
                                        />
                                        <div className="space-y-1">
                                            <h3 className="font-medium">{order.product?.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Badge variant="outline">Order #{order.id?.slice(-5)}</Badge>
                                                <span>•</span>
                                                <span>{formatPrice(order.total_price || 0)}</span>
                                                <span>•</span>
                                                <span>Qty: {order.quantity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ml-auto flex flex-col items-end gap-2 sm:flex-row sm:gap-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>{order.user?.name || 'Unknown User'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {order.created_at ? format(new Date(order.created_at), "MMM d, yyyy") : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                        {!orders.length && (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Package className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-lg font-medium">No orders found</p>
                                <p className="text-sm text-muted-foreground">
                                    Orders will appear here when customers make purchases.
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}