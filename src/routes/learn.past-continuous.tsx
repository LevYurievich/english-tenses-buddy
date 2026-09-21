import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PastContinuousTheory } from "@/components/past-continuous/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import {
  PAST_CONTINUOUS_EXERCISES,
  PAST_CONTINUOUS_TEST,
} from "@/data/past-continuous/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "test" | "mistakes";

export const Route = createFileRoute("/learn/past-continuous")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return tab === "theory" || tab === "practice" || tab === "test" || tab === "mistakes"
      ? { tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Past Continuous — was/were + V-ing: теория и 36 упражнений" },
      {
        name: "description",
        content:
          "Past Continuous по шагам: процесс в момент прошлого, was/were + V-ing, while и when, 36 упражнений и тест из 15 вопросов.",
      },
      { property: "og:title", content: "Past Continuous — English Tenses Trainer" },
      {
        property: "og:description",
        content: "БЫЛО В ПРОЦЕССЕ В ТОТ МОМЕНТ: was / were + V-ing, тренировка и разбор ошибок.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastContinuousPage,
});

const TENSE_ID = "past-continuous";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Итоговый тест" },
];

function PastContinuousPage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return PAST_CONTINUOUS_EXERCISES.filter((e) => categories.has(e.errorCategory));
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PAST • ПРОШЕДШЕЕ</p>
        <h1 className="text-3xl">Past Continuous</h1>
        <p className="text-muted-foreground">
          Было в процессе в тот момент • was / were + V-ing
        </p>
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
        <PastContinuousTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("practice");
          }}
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PAST_CONTINUOUS_EXERCISES}
          tenseId={TENSE_ID}
          title="36 заданий: was / were, V-ing, вопросы, while и when, процесс или событие."
          onFinish={() => go("test")}
          finishLabel="К итоговому тесту"
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
          exercises={PAST_CONTINUOUS_TEST}
          tenseId={TENSE_ID}
          title="Проверим Past Continuous"
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
                to="/compare/past"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Сравнить с Past Simple
              </Link>
            </>
          }
        />
      ) : null}
    </div>
  );
}
