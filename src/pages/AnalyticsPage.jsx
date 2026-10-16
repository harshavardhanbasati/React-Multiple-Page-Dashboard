import { Activity, CheckCircle2, FolderKanban, Users } from "lucide-react";
import { useContext } from "react";
import StatCard from "../components/StatCard";
import { DashboardContext } from "../context/DashboardContext";

export default function AnalyticsPage() {
  const dashboard = useContext(DashboardContext);
  if (!dashboard) return null;

  const completed = dashboard.projects.filter((project) => project.status === "Completed").length;
  const averageProgress = dashboard.projects.length
    ? Math.round(
        dashboard.projects.reduce((total, project) => total + project.progress, 0) /
          dashboard.projects.length,
      )
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <p className="mb-2 text-[10px] font-bold tracking-[1.2px] text-[#9698aa]">WORKSPACE REPORT</p>
        <h1 className="mb-1.5 text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="m-0 text-sm text-[#9294a6] dark:text-[#a5a9bb]">
          Simple statistics about your projects and team.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total projects" value={dashboard.projects.length} note="All projects" icon={<FolderKanban size={19} />} />
        <StatCard title="Completed" value={completed} note="Finished projects" icon={<CheckCircle2 size={19} />} />
        <StatCard title="Team members" value={dashboard.users.length || "—"} note="Fetched from API" icon={<Users size={19} />} />
        <StatCard title="Average progress" value={`${averageProgress}%`} note="Across projects" icon={<Activity size={19} />} />
      </section>
      <section className="rounded-2xl border border-[#ececf3] bg-white p-5 shadow-sm sm:p-6 dark:border-[#34384a] dark:bg-[#202331]">
        <h2 className="mb-1 text-base font-bold">Project progress</h2>
        <p className="m-0 text-xs text-[#9294a6] dark:text-[#a5a9bb]">
          Compare progress across your projects.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {dashboard.projects.map((project) => (
            <div key={project.id}>
              <div className="mb-2 flex items-center justify-between gap-3 text-xs text-[#85879a] dark:text-[#a5a9bb]">
                <span className="truncate">{project.name}</span>
                <strong className="text-[#37384b] dark:text-[#edf0fa]">{project.progress}%</strong>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-[#f0f0f6] dark:bg-[#34384a]"
                role="progressbar"
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${project.name} progress`}
              >
                <div className="h-full rounded-full bg-[#7969e8]" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
