import { Link } from "@tanstack/react-router";
import type { ProgressState } from "@/lib/progress";
import { getTenseProgress } from "@/lib/progress";
import { COUNTS, isCompleted } from "@/lib/tense-stats";
import { TenseTypeBadge } from "@/components/TenseTypeBadge";

type Step = {
  id: string;
  title: string;
  subtitle: string;
  to: string;
  kind: "tense" | "compare" | "challenge";
};

export const PATH_STEPS: Step[] = [
  {
    id: "present-simple",
    title: "Present Simple",
    subtitle: "Обычно • факт • V / V-s",
    to: "/learn/present-simple",
    kind: "tense",
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    subtitle: "Сейчас • процесс • am/is/are + V-ing",
    to: "/learn/present-continuous",
    kind: "tense",
  },
  {
    id: "compare-present",
    title: "Simple vs Continuous",
    subtitle: "Учимся различать привычку и процесс",
    to: "/compare/present",
    kind: "compare",
  },
  {
    id: "present-perfect",
    title: "Present Perfect",
    subtitle: "Результат • опыт • have/has + V3",
    to: "/learn/present-perfect",
    kind: "tense",
  },
  {
    id: "compare-perfect",
    title: "Perfect vs Past Simple",
    subtitle: "Связь с настоящим или завершённое прошлое",
    to: "/compare/perfect",
    kind: "compare",
  },
  {
    id: "present-perfect-continuous",
    title: "Present Perfect Continuous",
    subtitle: "Как долго • have/has been + V-ing",
    to: "/learn/present-perfect-continuous",
    kind: "tense",
  },
  {
    id: "all-present",
    title: "Испытание Present",
    subtitle: "Сам выбираешь время по смыслу",
    to: "/all-present",
    kind: "challenge",
  },
  {
    id: "past-simple",
    title: "Past Simple",
    subtitle: "Было • закончилось • V2 / DID + V1",
    to: "/learn/past-simple",
    kind: "tense",
  },
  {
    id: "past-continuous",
    title: "Past Continuous",
    subtitle: "Процесс в момент прошлого • was/were + V-ing",
    to: "/learn/past-continuous",
    kind: "tense",
  },
  {
    id: "compare-past",
    title: "Past Simple vs Past Continuous",
    subtitle: "Событие ● или процесс ████",
    to: "/compare/past",
    kind: "compare",
  },
  {
    id: "past-perfect",
    title: "Past Perfect",
    subtitle: "Раньше другого момента прошлого • had + V3",
    to: "/learn/past-perfect",
    kind: "tense",
  },
  {
    id: "compare-past-perfect",
    title: "Past Perfect vs Past Simple",
    subtitle: "Что произошло раньше?",
    to: "/compare/past-perfect",
    kind: "compare",
  },
  {
    id: "past-perfect-continuous",
    title: "Past Perfect Continuous",
    subtitle: "Процесс до момента прошлого • had been + V-ing",
    to: "/learn/past-perfect-continuous",
    kind: "tense",
  },
  {
    id: "compare-past-perfect-continuous",
    title: "Past Perfect vs Past Perfect Continuous",
    subtitle: "Результат или длительность процесса?",
    to: "/compare/past-perfect-continuous",
    kind: "compare",
  },
  {
    id: "all-past",
    title: "Испытание Past",
    subtitle: "Сам выбираешь одно из четырёх времён прошлого",
    to: "/all-past",
    kind: "challenge",
  },
  {
    id: "future-simple",
    title: "Future Simple",
    subtitle: "Решение сейчас • обещание • прогноз • will + V1",
    to: "/learn/future-simple",
    kind: "tense",
  },
  {
    id: "compare-future",
    title: "Три способа говорить о будущем",
    subtitle: "will · be going to · Present Continuous",
    to: "/compare/future",
    kind: "compare",
  },
];

/** Следующая остановка маршрута — пока закрыта. */
const LOCKED_PAST = ["Future Continuous"];

export type StepStatus = "done" | "current" | "open";

export function stepDone(state: ProgressState | null, step: Step): boolean {
  if (!state) return false;
  if (step.kind === "compare") {
    const p = getTenseProgress(state, step.id);
    const count = COUNTS[step.id]?.exercises ?? 0;
    return count > 0 && p.doneExercises.length >= count;
  }
  return isCompleted(state, step.id);
}

/** Статусы шагов: пройдено, текущий, доступно. */
export function pathStatuses(state: ProgressState | null): (Step & { status: StepStatus })[] {
  let currentTaken = false;
  return PATH_STEPS.map((step) => {
    const done = stepDone(state, step);
    if (!done && !currentTaken) {
      currentTaken = true;
      return { ...step, status: "current" as const };
    }
    return { ...step, status: done ? ("done" as const) : ("open" as const) };
  });
}

/** Следующий логичный шаг ученика. */
export function nextStep(state: ProgressState | null) {
  return pathStatuses(state).find((s) => s.status === "current") ?? null;
}

const MARK: Record<StepStatus, { icon: string; label: string; cls: string }> = {
  done: { icon: "✓", label: "Пройдено", cls: "border-success bg-success/15 text-success" },
  current: { icon: "●", label: "Сейчас здесь", cls: "border-primary bg-primary/15 text-primary" },
  open: { icon: "○", label: "Доступно", cls: "border-border bg-muted text-muted-foreground" },
};

export function LearningPath({ state }: { state: ProgressState | null }) {
  const steps = pathStatuses(state);
  return (
    <section className="card-surface p-5 sm:p-6">
      <h2 className="font-display text-xl">Твой путь</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Маршрут по Present: от привычек до самостоятельного выбора времени.
      </p>

      <ol className="mt-5 space-y-2">
        {steps.map((step) => {
          const mark = MARK[step.status];
          return (
            <li key={step.id}>
              <Link
                to={step.to as "/learn/present-simple"}
                className="card-interactive grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3 sm:p-4"
              >
                <span
                  aria-hidden
                  className={`grid size-8 shrink-0 place-items-center rounded-full border-2 text-sm font-bold ${mark.cls}`}
                >
                  {step.kind === "challenge" && step.status !== "done" ? "🏆" : mark.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display font-bold">{step.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {step.subtitle}
                  </span>
                </span>
                <span className="hidden text-xs font-bold text-muted-foreground sm:block">
                  {mark.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <ul className="mt-2 space-y-2">
        {LOCKED_PAST.map((title) => (
          <li
            key={title}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-dashed border-border p-3 sm:p-4"
          >
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-border bg-muted text-sm"
            >
              🔒
            </span>
            <span className="min-w-0 truncate font-display font-bold text-muted-foreground">
              {title}
            </span>
            <span className="text-xs font-bold text-muted-foreground">Скоро</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-2xl border border-dashed border-border p-4">
        <p className="text-xs font-bold tracking-widest text-muted-foreground">
          PAST ✓ ← PRESENT ✓ → FUTURE ●
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {steps.every((s) => s.status === "done")
            ? "PRESENT ✓ → PAST ✓ → FUTURE SIMPLE ✓. Следующая остановка: Future Continuous."
            : "Маршрут открыт до Future Simple. Остальные времена будущего пока закрыты."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <TenseTypeBadge type="simple" />
          <TenseTypeBadge type="continuous" />
          <TenseTypeBadge type="perfect" />
          <TenseTypeBadge type="perfect-continuous" />
        </div>
      </div>
    </section>
  );
}
