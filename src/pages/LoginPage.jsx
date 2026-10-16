import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, KeyRound, Sparkles } from "lucide-react";
import users from "../data/users.json";
import { useAuth } from "../hooks/useAuth";

const demoUser = users.find((user) => user.isDemo);

export default function LoginPage() {
  const [email, setEmail] = useState(demoUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleDemoLogin() {
    setError("");
    try {
      loginAsDemo();
      navigate("/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Demo login failed.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f7fb] p-4 sm:p-8 dark:bg-[#151722]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-[#ececf3] bg-white shadow-[0_30px_100px_-45px_rgba(37,38,58,0.35)] md:grid-cols-[0.9fr_1.1fr] dark:border-[#34384a] dark:bg-[#202331]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5545c8] via-[#7463e7] to-[#9285f4] p-10 text-white md:flex lg:p-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full border-[38px] border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-28 -left-20 size-80 rounded-full border-[48px] border-white/10" />
          <div className="relative z-10 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <Sparkles size={22} />
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              orbit<span className="text-[#d7d1ff]">.</span>
            </span>
          </div>
          <div className="relative z-10 my-12">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-white/75">
              YOUR WORKSPACE, IN ORBIT
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              Good to see you again.
            </h1>
            <p className="max-w-sm text-sm leading-7 text-white/80">
              Sign in to pick up where you left off and keep your team&apos;s
              best work moving forward.
            </p>
          </div>
          <p className="relative z-10 text-xs text-white/65">
            A clearer view of everything you&apos;re building.
          </p>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-center gap-2.5 md:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-[#7463e7] text-white">
              <Sparkles size={19} />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              orbit<span className="text-[#7463e7]">.</span>
            </span>
          </div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#7463e7] dark:text-[#b9afff]">
            WELCOME BACK
          </p>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#25263a] sm:text-3xl dark:text-[#edf0fa]">
            Sign in to your workspace
          </h2>
          <p className="mb-7 text-sm leading-6 text-[#9294a6] dark:text-[#a5a9bb]">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-xs font-semibold text-[#5e6074] dark:text-[#c6cada]">
              Email address
              <input
                className="w-full rounded-xl border border-[#e4e5ee] bg-white px-3.5 py-3 text-sm text-[#25263a] outline-none transition placeholder:text-[#a7a9b8] focus:border-[#a89df3] focus:ring-4 focus:ring-[#7463e715] dark:border-[#3b3f53] dark:bg-[#252838] dark:text-[#edf0fa]"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="username"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold text-[#5e6074] dark:text-[#c6cada]">
              Password
              <input
                className="w-full rounded-xl border border-[#e4e5ee] bg-white px-3.5 py-3 text-sm text-[#25263a] outline-none transition placeholder:text-[#a7a9b8] focus:border-[#a89df3] focus:ring-4 focus:ring-[#7463e715] dark:border-[#3b3f53] dark:bg-[#252838] dark:text-[#edf0fa]"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </label>
            {error && (
              <p
                className="rounded-lg bg-[#fff0f1] px-3 py-2.5 text-xs text-[#b13d4b] dark:bg-[#432b35] dark:text-[#ff9da6]"
                role="alert"
              >
                {error}
              </p>
            )}
            <button
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#7463e7] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#7463e733] transition hover:bg-[#6554d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7463e7] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign in"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-7 rounded-2xl border border-[#e8e5f5] bg-[#fbfaff] p-4 dark:border-[#3b3f53] dark:bg-[#252838]">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#f0edff] text-[#7463e7] dark:bg-[#332f50] dark:text-[#c4bbff]">
                <KeyRound size={17} />
              </span>
              <div>
                <h3 className="m-0 text-sm font-bold text-[#25263a] dark:text-[#edf0fa]">
                  Demo account
                </h3>
                <p className="m-0 text-xs text-[#9294a6] dark:text-[#a5a9bb]">
                  Try the dashboard with a sample profile
                </p>
              </div>
            </div>
            {demoUser ? (
              <>
                <p className="mb-1.5 break-all text-xs text-[#626477] dark:text-[#a5a9bb]">
                  <strong className="text-[#28283a] dark:text-[#edf0fa]">Email:</strong>{" "}
                  {demoUser.email}
                </p>
                <p className="mb-4 text-xs text-[#626477] dark:text-[#a5a9bb]">
                  <strong className="text-[#28283a] dark:text-[#edf0fa]">Password:</strong>{" "}
                  {demoUser.password}
                </p>
                <button
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#e8e8f0] bg-white px-3 py-2 text-xs font-bold text-[#66687d] transition hover:border-[#cfc8ff] hover:text-[#6d5bdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7463e7] dark:border-[#45495c] dark:bg-[#202331] dark:text-[#edf0fa]"
                  type="button"
                  onClick={handleDemoLogin}
                >
                  <Eye size={16} />
                  Explore dashboard without credentials
                </button>
              </>
            ) : (
              <p className="m-0 text-xs text-[#626477] dark:text-[#a5a9bb]" role="status">
                No demo account is configured in users.json.
              </p>
            )}
          </div>
          <p className="mb-0 mt-4 text-center text-[10px] leading-relaxed text-[#999bad] dark:text-[#a5a9bb]">
            Demo project only: accounts are bundled into the frontend and are
            not suitable for real authentication.
          </p>
        </section>
      </div>
    </main>
  );
}
