import { useContext } from "react";
import { CheckCircle2, FolderKanban, RefreshCw, Users } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import { DashboardContext } from "../context/DashboardContext";
import { useAuth } from "../hooks/useAuth";

const cardClass =
  "min-w-0 rounded-2xl border border-[#ececf3] bg-white p-5 shadow-sm dark:border-[#34384a] dark:bg-[#202331]";

export default function DashboardPage() {
  const dashboard = useContext(DashboardContext);
  const { user } = useAuth();
  if (!dashboard) return null;

  const activeProjects = dashboard.projects.filter(
    (project) => project.status === "In progress",
  );
  const completedProjects = dashboard.projects.filter(
    (project) => project.status === "Completed",
  );

  return (
    <div className="flex flex-col gap-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[1.2px] text-[#9698aa]">
            YOUR WORKSPACE
          </p>
          <h1 className="mb-1.5 text-3xl font-bold tracking-tight">
            Good morning, {user?.name.split(" ")[0]}!
          </h1>
          <p className="m-0 text-sm text-[#9294a6] dark:text-[#a5a9bb]">
            Here is a simple overview of your team&apos;s work.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#e8e8f0] bg-white px-4 py-2.5 text-xs font-bold text-[#66687d] transition hover:border-[#cfc8ff] hover:text-[#6d5bdb] disabled:opacity-60 sm:self-auto dark:border-[#34384a] dark:bg-[#202331] dark:text-[#edf0fa]"
          onClick={() => void dashboard.refreshData()}
          disabled={dashboard.loading}
        >
          <RefreshCw size={16} className={dashboard.loading ? "animate-spin" : ""} />
          {dashboard.loading ? "Refreshing..." : "Refresh data"}
        </button>
      </section>
      {dashboard.error && (
        <div className="rounded-xl border border-[#ffebc8] bg-[#fff7e8] px-4 py-3 text-xs text-[#95651f] dark:border-[#604a2b] dark:bg-[#443521] dark:text-[#f1c27d]">
          {dashboard.error}
        </div>
      )}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Active projects" value={activeProjects.length} note="In progress" icon={<FolderKanban size={19} />} />
        <StatCard title="Team members" value={dashboard.users.length || "—"} note="From API" icon={<Users size={19} />} />
        <StatCard title="Completed projects" value={completedProjects.length} note="Finished" icon={<CheckCircle2 size={19} />} />
      </section>
      <section className="flex items-center justify-between gap-4">
        <div>
          <h2 className="mb-1 text-base font-bold">Projects in progress</h2>
          <p className="m-0 text-xs text-[#9294a6] dark:text-[#a5a9bb]">
            A quick look at the work happening now.
          </p>
        </div>
        <Link to="/projects" className="shrink-0 text-xs font-bold text-[#6d5bdb] hover:text-[#5141c4] dark:text-[#b9afff]">
          View all projects →
        </Link>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {activeProjects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className={cardClass}>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-bold">Recent activity</h2>
            <p className="m-0 text-xs text-[#9294a6] dark:text-[#a5a9bb]">
              Sample tasks fetched from an API.
            </p>
          </div>
          {dashboard.loading && dashboard.activities.length === 0 ? (
            <p className="text-xs text-[#9294a6] dark:text-[#a5a9bb]">Loading activity...</p>
          ) : (
            <ul className="m-0 list-none p-0">
              {dashboard.activities.slice(0, 5).map((activity) => (
                <li key={activity.id} className="flex items-center gap-2.5 border-b border-[#f1f1f6] py-3 text-xs last:border-0 dark:border-[#34384a]">
                  <CheckCircle2
                    size={17}
                    className={activity.completed ? "shrink-0 text-[#2eaa80]" : "shrink-0 text-[#c0c2ce]"}
                  />
                  <span className="min-w-0 flex-1">{activity.title}</span>
                  <small className="text-[10px] text-[#9698aa]">
                    {activity.completed ? "Completed" : "Open"}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cardClass}>
          <h2 className="mb-1 text-base font-bold">Team members</h2>
          <p className="m-0 text-xs text-[#9294a6] dark:text-[#a5a9bb]">
            Fetched from JSONPlaceholder.
          </p>
          {dashboard.loading && dashboard.users.length === 0 ? (
            <p className="mt-4 text-xs text-[#9294a6] dark:text-[#a5a9bb]">Loading team...</p>
          ) : (
            <ul className="mt-4 flex list-none flex-col gap-4 p-0">
              {dashboard.users.slice(0, 5).map((member) => (
                <li key={member.id} className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e9e5ff] text-xs font-bold text-[#6755d5]">
                    {member.name.slice(0, 1)}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <strong className="text-xs">{member.name}</strong>
                    <small className="truncate text-[10px] text-[#999bad]">{member.email}</small>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
