import { lazy } from "react";
import {
    Users,
    ShoppingBag,
    LayoutDashboard,
    ClipboardList
} from "lucide-react";

export const adminRoutes = [
    {
        path: "/admin",
        element: lazy(() => import("@/pages/admin")),
        title: "Dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
        protected: true,
        requireAdmin: true,
    },
    {
        path: "/admin/users",
        element: lazy(() => import("@/pages/admin/users")),
        title: "Users",
        icon: <Users className="h-4 w-4" />,
        protected: true,
        requireAdmin: true,
    },
    {
        path: "/admin/products",
        element: lazy(() => import("@/pages/admin/products")),
        title: "Products",
        icon: <ShoppingBag className="h-4 w-4" />,
        protected: true,
        requireAdmin: true,
    },
    {
        path: "/admin/orders",
        element: lazy(() => import("@/pages/admin/orders")),
        title: "Orders",
        icon: <ClipboardList className="h-4 w-4" />,
        protected: true,
        requireAdmin: true,
    },
]