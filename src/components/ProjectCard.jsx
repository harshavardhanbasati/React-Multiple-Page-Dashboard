import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  "In progress": "bg-[#f0edff] text-[#6d5bdb] dark:bg-[#332f50] dark:text-[#c4bbff]",
  Planning: "bg-[#fff2df] text-[#bd7b2d] dark:bg-[#443521] dark:text-[#f1c27d]",
  Completed: "bg-[#e6f8f0] text-[#248d68] dark:bg-[#1e3d35] dark:text-[#7bd6b3]",
};

export default function ProjectCard({ project }) {
  return (
    <article className="min-w-0 rounded-2xl border border-[#ececf3] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-[#34384a] dark:bg-[#202331]">
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="grid size-10 place-items-center rounded-xl bg-[#f0edff] font-bold text-[#7463e7] dark:bg-[#332f50] dark:text-[#c4bbff]">
          {project.name.slice(0, 1)}
        </div>
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-bold ${statusStyles[project.status] ?? statusStyles.Planning}`}
        >
          {project.status}
        </span>
      </div>
      <h3 className="mb-2 text-sm font-bold text-[#25263a] dark:text-[#edf0fa]">
        {project.name}
      </h3>
      <p className="mb-5 min-h-9 text-xs leading-relaxed text-[#9294a6] dark:text-[#a5a9bb]">
        {project.description}
      </p>
      <div className="mb-2 flex items-center justify-between text-[11px] text-[#85879a] dark:text-[#a5a9bb]">
        <span>Progress</span>
        <strong className="text-[#37384b] dark:text-[#edf0fa]">
          {project.progress}%
        </strong>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-[#f0f0f6] dark:bg-[#34384a]"
        role="progressbar"
        aria-valuenow={project.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${project.name} progress`}
      >
        <div
          className="h-full rounded-full bg-[#7969e8] transition-[width]"
          style={{ width: `${project.progress}%` }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f0f0f5] pt-3 text-[11px] dark:border-[#34384a]">
        <span className="inline-flex items-center gap-1.5 text-[#999bad] dark:text-[#a5a9bb]">
          <CalendarDays size={14} />
          {project.dueDate}
        </span>
        <Link
          to={`/projects/${project.id}`}
          aria-label={`Open ${project.name}`}
          className="inline-flex items-center gap-1 font-bold text-[#6d5bdb] hover:text-[#5141c4] dark:text-[#b9afff]"
        >
          Details <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
