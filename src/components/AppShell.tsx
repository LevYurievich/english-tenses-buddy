import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Главная", icon: "🏠" },
  { to: "/learn", label: "Учим времена", icon: "📘" },
  { to: "/mistakes", label: "Мои ошибки", icon: "🧩" },
  { to: "/progress", label: "Прогресс", icon: "📈" },
  { to: "/time-machine", label: "Машина времени", icon: "🕰️" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-5 md:block">
        <Link to="/" className="block">
          <p className="font-display text-lg font-bold leading-tight">
            English Tenses
            <br />
            Trainer
          </p>
        </Link>
        <nav className="mt-8 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted"
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 pb-20 md:pb-0">
        <header className="border-b border-border bg-card px-4 py-3 md:hidden">
          <Link to="/" className="font-display text-base font-bold">
            English Tenses Trainer
          </Link>
        </header>
        <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-card md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            activeProps={{ className: "text-primary" }}
            className="flex flex-1 flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-semibold text-muted-foreground"
          >
            <span aria-hidden className="text-base">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
