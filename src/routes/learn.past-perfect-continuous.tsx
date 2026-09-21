import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PastPerfectContinuousTheory } from "@/components/past-perfect-continuous/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import {
  PAST_PERFECT_CONTINUOUS_EXERCISES,
  PAST_PERFECT_CONTINUOUS_TEST,
  POINT_EXERCISES,
} from "@/data/past-perfect-continuous/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "point" | "practice" | "test" | "mistakes";

const TAB_IDS: Tab[] = ["theory", "point", "practice", "test", "mistakes"];

export const Route = createFileRoute("/learn/past-perfect-continuous")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab)
      ? { tab: tab as Tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Past Perfect Continuous — had been + V-ing: теория и 35 упражнений" },
      {
        name: "description",
        content:
          "Past Perfect Continuous по шагам: процесс до момента в прошлом, had + been + V-ing, точка отсчёта, how long, for и since, 35 упражнений и тест из 15 вопросов.",
      },
      { property: "og:title", content: "Past Perfect Continuous — English Tenses Trainer" },
      {
        property: "og:description",
        content: "КАК ДОЛГО ДО ТОГО МОМЕНТА? → had + been + V-ing: теория, тренировка и тест.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastPerfectContinuousPage,
});

const TENSE_ID = "past-perfect-continuous";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "point", label: "Найди точку" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Итоговый тест" },
];

function PastPerfectContinuousPage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return [...POINT_EXERCISES, ...PAST_PERFECT_CONTINUOUS_EXERCISES].filter((e) =>
      categories.has(e.errorCategory),
    );
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PAST • ПРОШЕДШЕЕ</p>
        <h1 className="text-3xl">Past Perfect Continuous</h1>
        <p className="text-muted-foreground">
          Процесс длился до момента в прошлом • had + been + V-ing
        </p>
        <ProgressBar value={percent} label="Прогресс урока" />
      </header>

      <div className="flex flex-wrap gap-2 rounded-xl bg-muted p-1.5">
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
        <PastPerfectContinuousTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("point");
          }}
        />
      ) : null}

      {tab === "point" ? (
        <Practice
          exercises={POINT_EXERCISES}
          tenseId={TENSE_ID}
          title="Разогрев: 6 коротких заданий «Найди точку отсчёта»."
          onFinish={() => go("practice")}
          finishLabel="К основной тренировке"
          showHint
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PAST_PERFECT_CONTINUOUS_EXERCISES}
          tenseId={TENSE_ID}
          title="35 заданий: HAD + BEEN + V-ING, вопросы и отрицания, точка отсчёта, результат или процесс."
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
          exercises={PAST_PERFECT_CONTINUOUS_TEST}
          tenseId={TENSE_ID}
          title="Проверим Past Perfect Continuous"
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
                to="/compare/past-perfect-continuous"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Сравнить с Past Perfect
              </Link>
            </>
          }
        />
      ) : null}
    </div>
  );
}
