import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Plus, Search } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { DashboardContext } from "../context/DashboardContext";
export default function ProjectsPage() {
    const dashboard = useContext(DashboardContext);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    if (!dashboard)
        return null;
    const filteredProjects = dashboard.projects.filter((project) => {
        const matchesName = project.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === "All" || project.status === status;
        return matchesName && matchesStatus;
    });
    function handleAddProject(event) {
        event.preventDefault();
        const newProject = {
            id: Date.now(),
            name,
            description,
            status: "Planning",
            progress: 0,
            dueDate: "2026-12-01",
        };
        dashboard.addProject(newProject);
        setName("");
        setDescription("");
        setShowForm(false);
    }
    return (_jsxs("div", { className: "page-stack", children: [_jsxs("section", { className: "page-heading", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "PLAN AND TRACK" }), _jsx("h1", { children: "Projects" }), _jsx("p", { className: "muted", children: "Search projects, filter by status, or add a project." })] }), _jsxs("button", { className: "primary-button", onClick: () => setShowForm(!showForm), children: [_jsx(Plus, { size: 17 }), " ", showForm ? "Cancel" : "Add project"] })] }), showForm && (_jsxs("form", { className: "content-card add-project-form", onSubmit: handleAddProject, children: [_jsx("h2", { children: "New project" }), _jsxs("label", { children: ["Project name", _jsx("input", { value: name, onChange: (event) => setName(event.target.value), required: true })] }), _jsxs("label", { children: ["Description", _jsx("textarea", { value: description, onChange: (event) => setDescription(event.target.value), required: true, rows: 3 })] }), _jsxs("button", { className: "primary-button", type: "submit", children: [_jsx(Plus, { size: 16 }), " Save project"] })] })), _jsxs("div", { className: "filter-row", children: [_jsxs("label", { className: "search-input", children: [_jsx(Search, { size: 17 }), _jsx("input", { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search projects..." })] }), _jsxs("select", { value: status, onChange: (event) => setStatus(event.target.value), "aria-label": "Filter project status", children: [_jsx("option", { children: "All" }), _jsx("option", { children: "In progress" }), _jsx("option", { children: "Planning" }), _jsx("option", { children: "Completed" })] })] }), _jsx("section", { className: "projects-grid", children: filteredProjects.map((project) => _jsx(ProjectCard, { project: project }, project.id)) }), filteredProjects.length === 0 && _jsx("div", { className: "content-card empty-state", children: "No projects match your search." })] }));
}
