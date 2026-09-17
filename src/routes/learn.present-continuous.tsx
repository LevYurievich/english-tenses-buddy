import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PresentContinuousTheory } from "@/components/present-continuous/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import {
  PRESENT_CONTINUOUS_EXERCISES,
  PRESENT_CONTINUOUS_TEST,
} from "@/data/present-continuous/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "test" | "mistakes";

export const Route = createFileRoute("/learn/present-continuous")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return tab === "theory" || tab === "practice" || tab === "test" || tab === "mistakes"
      ? { tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Present Continuous — правило, формула и 30 упражнений" },
      {
        name: "description",
        content:
          "Present Continuous по шагам: сейчас и в процессе, am/is/are + V-ing, правила -ing, 30 упражнений и итоговый тест.",
      },
      { property: "og:title", content: "Present Continuous — English Tenses Trainer" },
      {
        property: "og:description",
        content: "СЕЙЧАС + В ПРОЦЕССЕ = Present Continuous: теория, тренировка и разбор ошибок.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PresentContinuousPage,
});

const TENSE_ID = "present-continuous";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Итоговый тест" },
];

function PresentContinuousPage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return PRESENT_CONTINUOUS_EXERCISES.filter((e) => categories.has(e.errorCategory));
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PRESENT • НАСТОЯЩЕЕ</p>
        <h1 className="text-3xl">Present Continuous</h1>
        <p className="text-muted-foreground">Сейчас • в процессе • временная ситуация</p>
        <ProgressBar value={percent} label="Прогресс урока" />
      </header>

      <div className="flex gap-2 rounded-xl bg-muted p-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
              tab === t.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "theory" ? (
        <PresentContinuousTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("practice");
          }}
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PRESENT_CONTINUOUS_EXERCISES}
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
          exercises={PRESENT_CONTINUOUS_TEST}
          tenseId={TENSE_ID}
          title="Проверим Present Continuous"
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
                to="/compare/present"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Сравнить с Present Simple
              </Link>
            </>
          }
        />
      ) : null}
    </div>
  );
}
