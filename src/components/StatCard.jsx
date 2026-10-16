export default function StatCard({ title, value, note, icon }) {
  return (
    <section className="rounded-2xl border border-[#ececf3] bg-white p-5 shadow-sm dark:border-[#34384a] dark:bg-[#202331]">
      <div className="mb-5 flex items-center justify-between gap-2">
        <span className="grid size-10 place-items-center rounded-xl bg-[#f0edff] text-[#7463e7] dark:bg-[#332f50] dark:text-[#c4bbff]">
          {icon}
        </span>
        <span className="rounded-md bg-[#e7f8f0] px-2 py-1 text-[10px] font-bold text-[#248d68] dark:bg-[#1e3d35] dark:text-[#7bd6b3]">
          {note}
        </span>
      </div>
      <p className="mb-1.5 text-xs text-[#9294a6] dark:text-[#a5a9bb]">{title}</p>
      <h2 className="m-0 text-2xl font-bold tracking-tight text-[#25263a] dark:text-[#edf0fa]">
        {value}
      </h2>
    </section>
  );
}
