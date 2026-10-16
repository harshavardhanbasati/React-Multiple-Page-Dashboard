import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

const statusStyles = {
  "In progress": "bg-[#f0edff] text-[#6d5bdb] dark:bg-[#332f50] dark:text-[#c4bbff]",
  Planning: "bg-[#fff2df] text-[#bd7b2d] dark:bg-[#443521] dark:text-[#f1c27d]",
  Completed: "bg-[#e6f8f0] text-[#248d68] dark:bg-[#1e3d35] dark:text-[#7bd6b3]",
};

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const dashboard = useContext(DashboardContext);
  if (!dashboard) return null;

  const project = dashboard.projects.find((item) => item.id === Number(projectId));
  if (!project) {
    return (
      <section className="rounded-2xl border border-[#ececf3] bg-white p-6 dark:border-[#34384a] dark:bg-[#202331]">
        <h1 className="mb-3 text-2xl font-bold">Project not found</h1>
        <Link to="/projects" className="font-semibold text-[#6d5bdb] dark:text-[#b9afff]">
          Back to projects
        </Link>
      </section>
    );
  }

  function increaseProgress() {
    const nextProgress = Math.min(100, project.progress + 10);
    dashboard.updateProject({
      ...project,
      progress: nextProgress,
      status: nextProgress === 100 ? "Completed" : project.status,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 self-start text-xs font-bold text-[#6d5bdb] hover:text-[#5141c4] dark:text-[#b9afff]"
      >
        <ArrowLeft size={16} /> Back to projects
      </Link>
      <section className="max-w-3xl rounded-2xl border border-[#ececf3] bg-white p-6 shadow-sm sm:p-8 dark:border-[#34384a] dark:bg-[#202331]">
        <span className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold ${statusStyles[project.status] ?? statusStyles.Planning}`}>
          {project.status}
        </span>
        <h1 className="mb-2 mt-4 text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-sm leading-6 text-[#9294a6] dark:text-[#a5a9bb]">{project.description}</p>
        <p className="my-6 flex items-center gap-2 text-xs text-[#77798c] dark:text-[#a5a9bb]">
          <CalendarDays size={16} /> Due date: {project.dueDate}
        </p>
        <div className="mb-2 flex items-center justify-between text-xs text-[#85879a] dark:text-[#a5a9bb]">
          <span>Project progress</span>
          <strong className="text-[#37384b] dark:text-[#edf0fa]">{project.progress}%</strong>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-[#f0f0f6] dark:bg-[#34384a]"
          role="progressbar"
          aria-valuenow={project.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Project progress"
        >
          <div className="h-full rounded-full bg-[#7969e8] transition-[width]" style={{ width: `${project.progress}%` }} />
        </div>
        <button
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7463e7] px-4 py-3 text-xs font-bold text-white shadow-md shadow-[#7463e733] transition hover:bg-[#6554d7] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={increaseProgress}
          disabled={project.progress === 100}
        >
          <CheckCircle2 size={16} />
          {project.progress === 100 ? "Project completed" : "Increase progress by 10%"}
        </button>
      </section>
    </div>
  );
}
