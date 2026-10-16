import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Activity,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

const navigation = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/projects", label: "Projects", icon: FolderKanban },
  { path: "/analytics", label: "Analytics", icon: Activity },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-10 flex w-[72px] flex-col border-r border-[#ececf3] bg-white px-2 py-5 sm:w-[235px] sm:px-4 sm:py-6 dark:border-[#34384a] dark:bg-[#202331]">
        <div className="flex items-center justify-center gap-2.5 sm:justify-start">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#7463e7] text-white shadow-md shadow-[#7463e733]">
            <Sparkles size={20} />
          </span>
          <span className="hidden text-2xl font-extrabold tracking-tight sm:inline">
            orbit<span className="text-[#7463e7]">.</span>
          </span>
        </div>
        <p className="mb-3 mt-10 hidden px-3 text-[10px] font-bold tracking-[1.2px] text-[#9698aa] sm:block">
          WORKSPACE
        </p>
        <nav className="mt-8 flex flex-col gap-1.5 sm:mt-0">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={item.label}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-3 rounded-xl px-2.5 py-3 text-sm font-semibold transition-colors sm:justify-start ${
                    isActive
                      ? "bg-[#f0edff] text-[#6d5bdb] dark:bg-[#332f50] dark:text-[#c4bbff]"
                      : "text-[#77798c] hover:bg-[#f7f6fc] hover:text-[#6d5bdb] dark:text-[#a5a9bb] dark:hover:bg-[#292d3c] dark:hover:text-[#c4bbff]"
                  }`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-[#eeeeF4] pt-4 dark:border-[#34384a]">
          <div className="mb-3 flex min-w-0 items-center justify-center gap-2 sm:justify-start">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e9e5ff] text-xs font-bold text-[#6755d5]">
              {user?.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden min-w-0 flex-col gap-1 sm:flex">
              <strong className="truncate text-[11px]">{user?.name}</strong>
              <span className="truncate text-[10px] text-[#999bad]">{user?.email}</span>
            </span>
          </div>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2.5 text-xs font-semibold text-[#77798c] transition-colors hover:bg-[#f7f6fc] hover:text-[#6d5bdb] sm:justify-start dark:text-[#a5a9bb] dark:hover:bg-[#292d3c]"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </aside>
      <div className="ml-[72px] min-h-screen sm:ml-[235px]">
        <header className="sticky top-0 z-[5] flex h-[65px] items-center justify-between border-b border-[#ececf3] bg-white/90 px-3 text-[11px] text-[#999bad] backdrop-blur sm:px-8 dark:border-[#34384a] dark:bg-[#202331]/90">
          <span>
            Workspace / <strong className="text-[#34354a] dark:text-[#edf0fa]">Overview</strong>
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-[#6e7084] sm:inline dark:text-[#a5a9bb]">
              Welcome, {user?.name}
            </span>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-[#e8e8f0] bg-white text-[#66687d] transition-colors hover:border-[#cfc8ff] hover:text-[#6d5bdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7463e7] dark:border-[#34384a] dark:bg-[#202331] dark:text-[#edf0fa]"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "dark"}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#e8e8f0] bg-white px-2.5 text-[11px] font-semibold text-[#66687d] transition-colors hover:border-[#cfc8ff] hover:text-[#6d5bdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7463e7] sm:px-3 dark:border-[#34384a] dark:bg-[#202331] dark:text-[#edf0fa]"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
