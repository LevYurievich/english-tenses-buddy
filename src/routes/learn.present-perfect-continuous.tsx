import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PresentPerfectContinuousTheory } from "@/components/present-perfect-continuous/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import {
  PRESENT_PERFECT_CONTINUOUS_EXERCISES,
  PRESENT_PERFECT_CONTINUOUS_TEST,
} from "@/data/present-perfect-continuous/exercises";
import { FOR_SINCE_EXERCISES } from "@/data/present-perfect-continuous/for-since";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "for-since" | "practice" | "test" | "mistakes";

export const Route = createFileRoute("/learn/present-perfect-continuous")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return tab === "theory" ||
      tab === "for-since" ||
      tab === "practice" ||
      tab === "test" ||
      tab === "mistakes"
      ? { tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Present Perfect Continuous — have/has been + V-ing и 30 упражнений" },
      {
        name: "description",
        content:
          "Present Perfect Continuous по шагам: как долго, have/has + been + V-ing, разница FOR и SINCE, 30 упражнений и итоговый тест.",
      },
      { property: "og:title", content: "Present Perfect Continuous — English Tenses Trainer" },
      {
        property: "og:description",
        content: "КАК ДОЛГО? → have / has + been + V-ing: теория, FOR/SINCE, тренировка и тест.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PresentPerfectContinuousPage,
});

const TENSE_ID = "present-perfect-continuous";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "for-since", label: "FOR / SINCE" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Итоговый тест" },
];

function PresentPerfectContinuousPage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return [...FOR_SINCE_EXERCISES, ...PRESENT_PERFECT_CONTINUOUS_EXERCISES].filter((e) =>
      categories.has(e.errorCategory),
    );
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PRESENT • НАСТОЯЩЕЕ</p>
        <h1 className="text-3xl">Present Perfect Continuous</h1>
        <p className="text-muted-foreground">
          Как долго • процесс до настоящего момента • have / has + been + V-ing
        </p>
        <ProgressBar value={percent} label="Прогресс урока" />
      </header>

      <div className="flex flex-wrap gap-2 rounded-xl bg-muted p-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.id)}
            className={`flex-1 shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition ${
              tab === t.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "theory" ? (
        <PresentPerfectContinuousTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("for-since");
          }}
        />
      ) : null}

      {tab === "for-since" ? (
        <Practice
          exercises={FOR_SINCE_EXERCISES}
          tenseId={TENSE_ID}
          title="8 коротких заданий: FOR — промежуток, SINCE — точка начала."
          onFinish={() => go("practice")}
          finishLabel="К основной тренировке"
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PRESENT_PERFECT_CONTINUOUS_EXERCISES}
          tenseId={TENSE_ID}
          title="30 заданий: от простых к сложным. В конце — итоговый тест."
          onFinish={() => go("test")}
        />
      ) : null}

      {tab === "mistakes" ? (
        mistakeExercises.length ? (
          <Practice
            exercises={mistakeExercises}
            tenseId={TENSE_ID}
            title="Тренировка по темам, где ты ошибался."
            onFinish={() => go("test")}
            finishLabel="К итоговому тесту"
          />
        ) : (
          <div className="card-surface p-6 text-muted-foreground">
            Ошибок пока нет — тренировать нечего. Отличная работа!
          </div>
        )
      ) : null}

      {tab === "test" ? (
        <MiniTest
          exercises={PRESENT_PERFECT_CONTINUOUS_TEST}
          tenseId={TENSE_ID}
          title="Проверим Present Perfect Continuous"
          extraActions={
            <>
              <button
                type="button"
                onClick={() => go("mistakes")}
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Повторить ошибки
              </button>
              <Link
                to="/compare/perfect-continuous"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Сравнить с Present Perfect
              </Link>
            </>
          }
        />
      ) : null}
    </div>
  );
}
