import { Link } from "react-router-dom";
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    Star,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import useUserStore from "@/store/user-store";
import useProductStore from "@/store/product-store";
import useOrderStore from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

export default function AdminHome() {
    const { users, fetchAllUsers } = useUserStore();
    const { products, fetchProducts } = useProductStore();
    const { orders, fetchAllOrders } = useOrderStore();

    useEffect(() => {
        fetchAllUsers();
        fetchProducts();
        fetchAllOrders();
    }, [fetchAllUsers, fetchProducts, fetchAllOrders]);

    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_price || 0), 0) || 0;
    const averageRating = products?.reduce((sum, p) => sum + p.rating, 0) / (products?.length || 1);

    const stats = [
        {
            title: "Total Users",
            value: users?.length.toString() || "0",
            description: "Registered users",
            icon: Users,
            color: "text-blue-500",
        },
        {
            title: "Total Products",
            value: products?.length.toString() || "0",
            description: "Products in inventory",
            icon: Package,
            color: "text-green-500",
        },
        {
            title: "Total Orders",
            value: orders?.length.toString() || "0",
            description: "Orders processed",
            icon: ShoppingCart,
            color: "text-purple-500",
        },
        {
            title: "Revenue",
            value: formatPrice(totalRevenue),
            description: "Total revenue",
            icon: DollarSign,
            color: "text-yellow-500",
        },
        {
            title: "Average Rating",
            value: averageRating.toFixed(1),
            description: "Product satisfaction",
            icon: Star,
            color: "text-orange-500",
        },
    ];

    const recentOrders = orders?.slice(0, 3).map(order => ({
        action: "New order received",
        details: `Order #${order.id.slice(-5)} by ${order.user?.name}`,
        time: new Date(order.created_at).toLocaleString(),
    })) || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                    Monitor and manage your store's performance
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Link
                            to="/admin/products"
                            className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted"
                        >
                            <Package className="h-5 w-5" />
                            <div className="flex-1">
                                <div className="font-medium">Manage Products</div>
                                <div className="text-sm text-muted-foreground">
                                    Add, edit, or remove products
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/admin/orders"
                            className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <div className="flex-1">
                                <div className="font-medium">View Orders</div>
                                <div className="text-sm text-muted-foreground">
                                    Track and manage orders
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/admin/users"
                            className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted"
                        >
                            <Users className="h-5 w-5" />
                            <div className="flex-1">
                                <div className="font-medium">User Management</div>
                                <div className="text-sm text-muted-foreground">
                                    Manage user accounts
                                </div>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your store</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentOrders.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="w-full space-y-1">
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {activity.details}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}