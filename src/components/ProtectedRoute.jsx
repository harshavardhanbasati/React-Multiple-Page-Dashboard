import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    if (loading) {
        return <div className="grid min-h-screen place-items-center bg-[#f6f7fb] text-sm text-[#7463e7] dark:bg-[#151722]">Loading...</div>;
    }
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
