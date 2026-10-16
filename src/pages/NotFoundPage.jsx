import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f6f7fb] px-6 text-center dark:bg-[#151722]">
      <Compass size={42} className="text-[#7463e7]" />
      <h1 className="m-0 text-3xl font-bold">Page not found</h1>
      <p className="m-0 max-w-md text-sm text-[#9294a6] dark:text-[#a5a9bb]">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-2 rounded-xl bg-[#7463e7] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#6554d7]"
      >
        Go to dashboard
      </Link>
    </main>
  );
}
