import { useContext, useState } from "react";
import { Plus, Search } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { DashboardContext } from "../context/DashboardContext";

const inputClass =
  "w-full rounded-lg border border-[#e4e5ee] bg-white px-3 py-2.5 text-sm text-[#25263a] outline-none focus:border-[#a89df3] focus:ring-4 focus:ring-[#7463e715] dark:border-[#3b3f53] dark:bg-[#252838] dark:text-[#edf0fa]";

export default function ProjectsPage() {
  const dashboard = useContext(DashboardContext);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  if (!dashboard) return null;

  const filteredProjects = dashboard.projects.filter((project) => {
    const matchesName = project.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || project.status === status;
    return matchesName && matchesStatus;
  });

  function handleAddProject(event) {
    event.preventDefault();
    dashboard.addProject({
      id: Date.now(),
      name,
      description,
      status: "Planning",
      progress: 0,
      dueDate: "2026-12-01",
    });
    setName("");
    setDescription("");
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[1.2px] text-[#9698aa]">PLAN AND TRACK</p>
          <h1 className="mb-1.5 text-3xl font-bold tracking-tight">Projects</h1>
          <p className="m-0 text-sm text-[#9294a6] dark:text-[#a5a9bb]">
            Search projects, filter by status, or add a project.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#7463e7] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#7463e733] transition hover:bg-[#6554d7] sm:self-auto"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={17} />
          {showForm ? "Cancel" : "Add project"}
        </button>
      </section>
      {showForm && (
        <form
          className="flex flex-col items-start gap-4 rounded-2xl border border-[#ececf3] bg-white p-5 shadow-sm dark:border-[#34384a] dark:bg-[#202331]"
          onSubmit={handleAddProject}
        >
          <h2 className="m-0 text-base font-bold">New project</h2>
          <label className="flex w-full flex-col gap-2 text-xs font-semibold text-[#5e6074] dark:text-[#c6cada]">
            Project name
            <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label className="flex w-full flex-col gap-2 text-xs font-semibold text-[#5e6074] dark:text-[#c6cada]">
            Description
            <textarea className={`${inputClass} resize-y`} value={description} onChange={(event) => setDescription(event.target.value)} required rows={3} />
          </label>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#7463e7] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#6554d7]" type="submit">
            <Plus size={16} /> Save project
          </button>
        </form>
      )}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#ececf3] bg-white p-3 sm:flex-row dark:border-[#34384a] dark:bg-[#202331]">
        <label className="flex min-w-0 flex-1 items-center gap-2 px-2 text-[#999bad]">
          <Search size={17} />
          <input
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#25263a] outline-none placeholder:text-[#999bad] dark:text-[#edf0fa]"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
          />
        </label>
        <select
          className="rounded-lg border border-[#e8e8f0] bg-white px-3 py-2 text-xs text-[#66687d] outline-none focus:border-[#a89df3] dark:border-[#3b3f53] dark:bg-[#252838] dark:text-[#edf0fa]"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter project status"
        >
          <option>All</option>
          <option>In progress</option>
          <option>Planning</option>
          <option>Completed</option>
        </select>
      </div>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-[#ececf3] bg-white p-10 text-center text-sm text-[#9294a6] dark:border-[#34384a] dark:bg-[#202331] dark:text-[#a5a9bb]">
          No projects match your search.
        </div>
      )}
    </div>
  );
}
