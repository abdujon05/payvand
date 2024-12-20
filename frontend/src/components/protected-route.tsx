import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/store/auth-store";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const location = useLocation();
    const { isAuthenticated, isLoading, role } = useAuthStore();

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (requireAdmin && role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}