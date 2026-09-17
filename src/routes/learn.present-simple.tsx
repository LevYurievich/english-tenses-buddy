import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PresentSimpleTheory } from "@/components/present-simple/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import { PRESENT_SIMPLE_EXERCISES, PRESENT_SIMPLE_TEST } from "@/data/present-simple/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "test" | "mistakes";

export const Route = createFileRoute("/learn/present-simple")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return tab === "theory" || tab === "practice" || tab === "test" || tab === "mistakes"
      ? { tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Present Simple — теория, формулы и тренировка" },
      {
        name: "description",
        content:
          "Present Simple по шагам: когда используем, слова-маркеры, формулы, упражнения и мини-тест из 10 вопросов.",
      },
      { property: "og:title", content: "Present Simple — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Правило, формула и практика Present Simple с объяснением ошибок.",
      },
    ],
  }),
  component: PresentSimplePage,
});

const TENSE_ID = "present-simple";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Мини-тест" },
];

function PresentSimplePage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return PRESENT_SIMPLE_EXERCISES.filter((e) => categories.has(e.errorCategory));
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PRESENT • НАСТОЯЩЕЕ</p>
        <h1 className="text-3xl">Present Simple</h1>
        <p className="text-muted-foreground">Обычно • регулярно • факты</p>
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
        <PresentSimpleTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("practice");
          }}
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PRESENT_SIMPLE_EXERCISES}
          tenseId={TENSE_ID}
          title="Уровень 1 — со словами-подсказками. Задания идут от простых к сложным."
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
            finishLabel="К мини-тесту"
          />
        ) : (
          <div className="card-surface p-6 text-muted-foreground">
            Ошибок пока нет — тренировать нечего. Отличная работа!
          </div>
        )
      ) : null}

      {tab === "test" ? (
        <MiniTest exercises={PRESENT_SIMPLE_TEST} tenseId={TENSE_ID} title="Present Simple" />
      ) : null}
    </div>
  );
}
