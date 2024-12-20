import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout() {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <AdminSidebar />
            <div className="flex flex-col">
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}