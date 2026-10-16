import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Activity, CheckCircle2, FolderKanban, Users } from "lucide-react";
import { useContext } from "react";
import StatCard from "../components/StatCard";
import { DashboardContext } from "../context/DashboardContext";
export default function AnalyticsPage() {
    const dashboard = useContext(DashboardContext);
    if (!dashboard)
        return null;
    const completed = dashboard.projects.filter((project) => project.status === "Completed").length;
    const averageProgress = dashboard.projects.length
        ? Math.round(dashboard.projects.reduce((total, project) => total + project.progress, 0) / dashboard.projects.length)
        : 0;
    return (_jsxs("div", { className: "page-stack", children: [_jsx("section", { className: "page-heading", children: _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "WORKSPACE REPORT" }), _jsx("h1", { children: "Analytics" }), _jsx("p", { className: "muted", children: "Simple statistics about your projects and team." })] }) }), _jsxs("section", { className: "stats-grid", children: [_jsx(StatCard, { title: "Total projects", value: dashboard.projects.length, note: "All projects", icon: _jsx(FolderKanban, { size: 19 }) }), _jsx(StatCard, { title: "Completed", value: completed, note: "Finished projects", icon: _jsx(CheckCircle2, { size: 19 }) }), _jsx(StatCard, { title: "Team members", value: dashboard.users.length || "—", note: "Fetched from API", icon: _jsx(Users, { size: 19 }) }), _jsx(StatCard, { title: "Average progress", value: `${averageProgress}%`, note: "Across projects", icon: _jsx(Activity, { size: 19 }) })] }), _jsxs("section", { className: "content-card", children: [_jsx("h2", { children: "Project progress" }), _jsx("p", { className: "muted", children: "Compare progress across your projects." }), _jsx("div", { className: "analytics-project-list", children: dashboard.projects.map((project) => (_jsxs("div", { className: "analytics-project", children: [_jsxs("div", { className: "progress-heading", children: [_jsx("span", { children: project.name }), _jsxs("strong", { children: [project.progress, "%"] })] }), _jsx("div", { className: "progress-track", children: _jsx("div", { className: "progress-value", style: { width: `${project.progress}%` } }) })] }, project.id))) })] })] }));
}
