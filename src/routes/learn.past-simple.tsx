import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PastSimpleTheory } from "@/components/past-simple/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import { PAST_SIMPLE_EXERCISES, PAST_SIMPLE_TEST } from "@/data/past-simple/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "test" | "mistakes";

export const Route = createFileRoute("/learn/past-simple")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return tab === "theory" || tab === "practice" || tab === "test" || tab === "mistakes"
      ? { tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Past Simple — было и закончилось: теория и тренировка" },
      {
        name: "description",
        content:
          "Past Simple по шагам: V2, неправильные глаголы, DID + V1, was/were, 38 упражнений и итоговый тест из 15 вопросов.",
      },
      { property: "og:title", content: "Past Simple — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Правило, формулы и практика Past Simple с пошаговым объяснением «Почему?».",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastSimplePage,
});

const TENSE_ID = "past-simple";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Итоговый тест" },
];

function PastSimplePage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return PAST_SIMPLE_EXERCISES.filter((e) => categories.has(e.errorCategory));
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PAST • ПРОШЕДШЕЕ</p>
        <h1 className="text-3xl">Past Simple</h1>
        <p className="text-muted-foreground">Было → закончилось • ← ● ───────── NOW</p>
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
        <PastSimpleTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("practice");
          }}
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PAST_SIMPLE_EXERCISES}
          tenseId={TENSE_ID}
          title="Тренировка Past Simple: V2, DID + V1, вопросы, отрицания и was / were."
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
          exercises={PAST_SIMPLE_TEST}
          tenseId={TENSE_ID}
          title="Проверим Past Simple"
        />
      ) : null}
    </div>
  );
}
