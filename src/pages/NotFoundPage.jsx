import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
export default function NotFoundPage() {
    return (_jsxs("div", { className: "center-page", children: [_jsx(Compass, { size: 36 }), _jsx("h1", { children: "Page not found" }), _jsx("p", { className: "muted", children: "The page you are looking for does not exist." }), _jsx(Link, { to: "/dashboard", className: "primary-button", children: "Go to dashboard" })] }));
}
