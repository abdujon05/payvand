import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { adminRoutes } from "@/routes/admin-routes";
import { cn } from "@/lib/utils";
import { Menu, Store } from "lucide-react";

export function AdminSidebar({ className }: { className?: string }) {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                    <AdminSidebarContent />
                </SheetContent>
            </Sheet>

            <div className={cn("hidden border-r bg-muted/10 lg:block", className)}>
                <AdminSidebarContent />
            </div>
        </>
    )
}

function AdminSidebarContent() {
    const location = useLocation();

    return (
        <div className="flex h-full flex-col gap-2">
            <div className="flex h-14 items-center border-b px-6">
                <Link to="/admin" className="flex items-center gap-2 font-semibold">
                    <span className="text-lg">Admin Panel</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-3">
                <nav className="grid gap-1 py-2">
                    {adminRoutes.map((route) => (
                        <Link key={route.path} to={route.path}>
                            <Button
                                variant="ghost"
                                className={cn("w-full justify-start gap-2",
                                    location.pathname === route.path && "bg-muted",
                                )}
                            >
                                {route.icon}
                                {route.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
            <div className="border-t p-4">
                <Link to="/profile">
                    <Button variant="outline" size="sm" className="w-full">
                        <Store className="mr-2 h-4 w-4" />
                        Back to Shop
                    </Button>
                </Link>
            </div>
        </div>
    )
}