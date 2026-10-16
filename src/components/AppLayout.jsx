import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Activity, FolderKanban, LayoutDashboard, LogOut, Settings, Sparkles, } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
const navigation = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/projects", label: "Projects", icon: FolderKanban },
    { path: "/analytics", label: "Analytics", icon: Activity },
    { path: "/settings", label: "Settings", icon: Settings },
];
export default function AppLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate("/login");
    }
    return (_jsxs("div", { className: "app-layout", children: [_jsxs("aside", { className: "sidebar", children: [_jsxs("div", { className: "brand", children: [_jsx("span", { className: "brand-icon", children: _jsx(Sparkles, { size: 19 }) }), _jsxs("span", { children: ["orbit", _jsx("span", { className: "brand-dot", children: "." })] })] }), _jsx("p", { className: "nav-label", children: "WORKSPACE" }), _jsx("nav", { className: "navigation", children: navigation.map((item) => {
                            const Icon = item.icon;
                            return (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`, children: [_jsx(Icon, { size: 18 }), item.label] }, item.path));
                        }) }), _jsxs("div", { className: "sidebar-bottom", children: [_jsxs("div", { className: "user-summary", children: [_jsx("div", { className: "avatar", children: user?.name.slice(0, 1).toUpperCase() }), _jsxs("div", { className: "user-text", children: [_jsx("strong", { children: user?.name }), _jsx("span", { children: user?.email })] })] }), _jsxs("button", { className: "logout-button", onClick: handleLogout, children: [_jsx(LogOut, { size: 17 }), " Log out"] })] })] }), _jsxs("div", { className: "main-area", children: [_jsxs("header", { className: "topbar", children: [_jsxs("span", { children: ["Workspace / ", _jsx("strong", { children: "Overview" })] }), _jsxs("span", { className: "topbar-greeting", children: ["Welcome, ", user?.name] })] }), _jsx("main", { className: "page-content", children: _jsx(Outlet, {}) })] })] }));
}
