import { createFileRoute, Link } from "@tanstack/react-router";
import { Tensy } from "@/components/Tensy";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/progress";
import { isCompleted, percentFor } from "@/lib/tense-stats";

export const Route = createFileRoute("/time-machine")({
  head: () => ({
    meta: [
      { title: "Машина времени — PAST ✓ ← PRESENT ✓ → FUTURE" },
      {
        name: "description",
        content:
          "Карта путешествия по временам английского: зоны PAST и PRESENT пройдены, зона FUTURE открыта — начинаем с Future Simple.",
      },
      { property: "og:title", content: "Машина времени — English Tenses Trainer" },
      {
        property: "og:description",
        content: "PAST ✓ ← PRESENT ✓ → FUTURE ● — следующая остановка Future Simple.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TimeMachinePage,
});

const ZONES = [
  {
    id: "present",
    title: "PRESENT",
    subtitle: "Настоящее",
    to: "/all-present" as const,
    open: true,
  },
  { id: "past", title: "PAST", subtitle: "Прошедшее", to: "/all-past" as const, open: true },
  {
    id: "future",
    title: "FUTURE",
    subtitle: "Будущее — активная зона",
    to: "/learn/future-simple" as const,
    open: true,
  },
];

const FUTURE_STOPS = [
  { id: "future-simple", title: "Future Simple", to: "/learn/future-simple" as const, open: true },
  {
    id: "future-continuous",
    title: "Future Continuous",
    to: "/learn/future-continuous" as const,
    open: true,
  },
  {
    id: "future-perfect",
    title: "Future Perfect",
    to: "/learn/future-perfect" as const,
    open: true,
  },
  {
    id: "future-perfect-continuous",
    title: "Future Perfect Continuous",
    to: "/learn/future-perfect-continuous" as const,
    open: true,
  },
  { id: "all-future", title: "All Future Tenses", to: undefined, open: false },
];

function TimeMachinePage() {
  const progress = useProgress();
  const futurePercent = Math.round(
    (percentFor(progress, "future-simple") +
      percentFor(progress, "future-continuous") +
      percentFor(progress, "future-perfect") +
      percentFor(progress, "future-perfect-continuous")) /
      4,
  );
  const doneIds = new Set(
    ["future-simple", "future-continuous", "future-perfect", "future-perfect-continuous"].filter((id) => isCompleted(progress, id)),
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">КАРТА ПУТЕШЕСТВИЯ</p>
        <h1 className="text-3xl">Машина времени</h1>
        <p className="text-muted-foreground">PAST ✓ ← PRESENT ✓ → FUTURE ●</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {ZONES.map((z) => (
          <Link key={z.id} to={z.to} className="card-interactive p-5">
            <p className="font-display text-xl font-bold">{z.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{z.subtitle}</p>
            <p className="mt-3 text-sm font-bold text-primary">Открыть →</p>
          </Link>
        ))}
      </section>

      <section className="card-surface space-y-4 p-5">
        <h2 className="text-xl">Зона FUTURE</h2>
        <ProgressBar value={futurePercent} label="Future Simple + Future Continuous" />
        <ul className="space-y-2">
          {FUTURE_STOPS.map((s) => (
            <li
              key={s.id}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm ${
                s.open ? "bg-primary/10" : "bg-muted/60"
              }`}
            >
              <span className="font-semibold">
                <span aria-hidden>{s.open ? (doneIds.has(s.id) ? "✓" : "●") : "○"}</span>{" "}
                {s.title}
              </span>
              {s.open && s.to ? (
                <Link to={s.to} className="text-xs font-bold text-primary">
                  Перейти →
                </Link>
              ) : (
                <span className="text-xs font-bold text-muted-foreground">Скоро</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Tensy mood="map">
        Настроим машину времени на конкретный момент будущего. Что мы увидим в этот момент?
      </Tensy>
    </div>
  );
}
