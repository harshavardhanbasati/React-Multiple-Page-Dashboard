import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    if (loading) {
        return _jsx("div", { className: "center-page", children: "Loading..." });
    }
    return user ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
}
