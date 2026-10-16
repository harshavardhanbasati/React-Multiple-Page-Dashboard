import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StatCard({ title, value, note, icon }) {
    return (_jsxs("section", { className: "stat-card", children: [_jsxs("div", { className: "stat-top", children: [_jsx("span", { className: "stat-icon", children: icon }), _jsx("span", { className: "stat-note", children: note })] }), _jsx("p", { children: title }), _jsx("h2", { children: value })] }));
}
