import { lazy } from "react";
import { Home, ShoppingCart, User, HelpCircle, Box, FileQuestion, MapPin, Phone, Info, RefreshCcw, Truck } from "lucide-react";
import { adminRoutes } from "./admin-routes";

export interface Route {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    title: string;
    icon?: React.ReactNode;
    protected?: boolean;
    children?: Route[];
}

export const routes: Route[] = [
    ...adminRoutes,
    {
        path: "/",
        element: lazy(() => import("@/pages/home")),
        title: "Home",
        icon: <Home className="h-4 w-4" />,
    },
    {
        path: "/products",
        element: lazy(() => import("@/pages/products")),
        title: "Products",
        icon: <Box className="h-4 w-4" />,
    },
    {
        path: "/products/:id",
        element: lazy(() => import("@/pages/product-detail")),
        title: "Product Detail",
    },
    {
        path: "/cart",
        element: lazy(() => import("@/pages/cart")),
        title: "Cart",
        icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
        path: "/checkout",
        element: lazy(() => import("@/pages/checkout")),
        title: "Checkout",
        protected: true,
    },
    {
        path: "/profile",
        element: lazy(() => import("@/pages/profile")),
        title: "Profile",
        icon: <User className="h-4 w-4" />,
        protected: true,
    },
    {
        path: "/about",
        element: lazy(() => import("@/pages/about")),
        title: "About",
        icon: <Info className="h-4 w-4" />,
    },
    {
        path: "/contact",
        element: lazy(() => import("@/pages/contact")),
        title: "Contact",
        icon: <Phone className="h-4 w-4" />,
    },
    {
        path: "/faq",
        element: lazy(() => import("@/pages/faq")),
        title: "FAQ",
        icon: <FileQuestion className="h-4 w-4" />,
    },
    {
        path: "/help",
        element: lazy(() => import("@/pages/help")),
        title: "Help Center",
        icon: <HelpCircle className="h-4 w-4" />,
    },
    {
        path: "/orders/:orderId",
        element: lazy(() => import("@/pages/orders")),
        title: "Track Order",
        icon: <MapPin className="h-4 w-4" />,
        protected: true,
    },
    {
        path: "/shipping",
        element: lazy(() => import("@/pages/shipping")),
        title: "Shipping Policy",
        icon: <Truck className="h-4 w-4" />,
    },
    {
        path: "/returns",
        element: lazy(() => import("@/pages/returns")),
        title: "Returns & Exchanges",
        icon: <RefreshCcw className="h-4 w-4" />,
    },
];