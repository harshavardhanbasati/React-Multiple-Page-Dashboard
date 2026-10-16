import { Bell, LockKeyhole, Moon, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

function SettingsHeading({ icon, title, description }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f0edff] text-[#7463e7] dark:bg-[#332f50] dark:text-[#c4bbff]">
        {icon}
      </span>
      <div>
        <h2 className="mb-1 text-base font-bold">{title}</h2>
        <p className="m-0 text-xs text-[#9294a6] dark:text-[#a5a9bb]">{description}</p>
      </div>
    </div>
  );
}

const cardClass =
  "max-w-3xl rounded-2xl border border-[#ececf3] bg-white p-5 shadow-sm dark:border-[#34384a] dark:bg-[#202331]";

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const optionClasses =
    "inline-flex min-w-[110px] items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7463e7]";

  return (
    <div className="flex flex-col gap-6">
      <section>
        <p className="mb-2 text-[10px] font-bold tracking-[1.2px] text-[#9698aa]">YOUR PREFERENCES</p>
        <h1 className="mb-1.5 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="m-0 text-sm text-[#9294a6] dark:text-[#a5a9bb]">
          Manage your account and personalize your workspace.
        </p>
      </section>
      <section className={cardClass}>
        <SettingsHeading
          icon={theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
          title="Appearance"
          description="Choose the theme used across your dashboard."
        />
        <div className="flex gap-2.5" role="group" aria-label="Color theme">
          {["light", "dark"].map((option) => {
            const selected = theme === option;
            const Icon = option === "dark" ? Moon : Sun;
            return (
              <button
                key={option}
                type="button"
                className={`${optionClasses} ${
                  selected
                    ? "border-[#7463e7] bg-[#f0edff] text-[#6d5bdb] dark:bg-[#332f50] dark:text-[#c4bbff]"
                    : "border-[#e8e8f0] bg-white text-[#66687d] hover:border-[#cfc8ff] hover:text-[#6d5bdb] dark:border-[#34384a] dark:bg-[#202331] dark:text-[#edf0fa]"
                }`}
                aria-pressed={selected}
                onClick={() => setTheme(option)}
              >
                <Icon size={16} />
                {option === "dark" ? "Dark" : "Light"}
              </button>
            );
          })}
        </div>
      </section>
      <section className={cardClass}>
        <SettingsHeading
          icon={<UserRound size={19} />}
          title="Account"
          description="Your current demo account details."
        />
        {[
          ["Name", user?.name],
          ["Email", user?.email],
          ["Role", user?.role ?? "Dashboard User"],
          ["Location", user?.city ?? "India"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-4 border-t border-[#f0f0f5] py-3.5 text-xs dark:border-[#34384a]"
          >
            <span className="text-[#9294a6] dark:text-[#a5a9bb]">{label}</span>
            <strong className="text-right">{value}</strong>
          </div>
        ))}
      </section>
      <section className={cardClass}>
        <SettingsHeading
          icon={<Bell size={19} />}
          title="Notifications"
          description="Choose whether to enable notification preferences."
        />
        <label className="flex items-center justify-between border-t border-[#f0f0f5] pt-4 text-xs dark:border-[#34384a]">
          <span>Enable notifications</span>
          <input
            className="size-4 accent-[#7463e7]"
            type="checkbox"
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
          />
        </label>
      </section>
      <section className={cardClass}>
        <SettingsHeading
          icon={<LockKeyhole size={19} />}
          title="Security"
          description="This project uses demo authentication stored in your browser."
        />
        <button
          className="rounded-xl border border-[#e8e8f0] bg-white px-4 py-2.5 text-xs font-bold text-[#66687d] transition hover:border-[#cfc8ff] hover:text-[#6d5bdb] dark:border-[#34384a] dark:bg-[#202331] dark:text-[#edf0fa]"
          onClick={() => setSaved(true)}
        >
          Acknowledge
        </button>
        {saved && (
          <p className="mb-0 mt-3 text-xs text-[#248d68]" role="status">
            Preference saved for this screen.
          </p>
        )}
      </section>
    </div>
  );
}
