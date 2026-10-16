import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
export default function ProjectDetailsPage() {
    const { projectId } = useParams();
    const dashboard = useContext(DashboardContext);
    if (!dashboard)
        return null;
    const project = dashboard.projects.find((item) => item.id === Number(projectId));
    if (!project) {
        return _jsxs("div", { className: "content-card", children: [_jsx("h1", { children: "Project not found" }), _jsx(Link, { to: "/projects", className: "text-link", children: "Back to projects" })] });
    }
    function increaseProgress() {
        const nextProgress = Math.min(100, project.progress + 10);
        dashboard.updateProject({
            ...project,
            progress: nextProgress,
            status: nextProgress === 100 ? "Completed" : project.status,
        });
    }
    return (_jsxs("div", { className: "page-stack", children: [_jsxs(Link, { to: "/projects", className: "text-link back-link", children: [_jsx(ArrowLeft, { size: 16 }), " Back to projects"] }), _jsxs("section", { className: "content-card detail-card", children: [_jsx("span", { className: `status status-${project.status.toLowerCase().replace(" ", "-")}`, children: project.status }), _jsx("h1", { children: project.name }), _jsx("p", { className: "muted", children: project.description }), _jsxs("p", { className: "detail-date", children: [_jsx(CalendarDays, { size: 16 }), " Due date: ", project.dueDate] }), _jsxs("div", { className: "progress-heading", children: [_jsx("span", { children: "Project progress" }), _jsxs("strong", { children: [project.progress, "%"] })] }), _jsx("div", { className: "progress-track large-track", children: _jsx("div", { className: "progress-value", style: { width: `${project.progress}%` } }) }), _jsxs("button", { className: "primary-button progress-button", onClick: increaseProgress, disabled: project.progress === 100, children: [_jsx(CheckCircle2, { size: 16 }), " ", project.progress === 100 ? "Project completed" : "Increase progress by 10%"] })] })] }));
}
