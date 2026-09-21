import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { PastPerfectTheory } from "@/components/past-perfect/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import {
  ORDER_EXERCISES,
  PAST_PERFECT_EXERCISES,
  PAST_PERFECT_TEST,
} from "@/data/past-perfect/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "order" | "practice" | "test" | "mistakes";

const TAB_IDS: Tab[] = ["theory", "order", "practice", "test", "mistakes"];

export const Route = createFileRoute("/learn/past-perfect")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab)
      ? { tab: tab as Tab }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Past Perfect — had + V3: теория, 36 упражнений и тест" },
      {
        name: "description",
        content:
          "Past Perfect по шагам: два момента прошлого, что произошло раньше, had + V3, before/after, by the time, 36 упражнений и тест из 15 вопросов.",
      },
      { property: "og:title", content: "Past Perfect — English Tenses Trainer" },
      {
        property: "og:description",
        content: "ПРОШЛОЕ ДО ПРОШЛОГО: had + V3, порядок событий, тренировка и разбор ошибок.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastPerfectPage,
});

const TENSE_ID = "past-perfect";

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "order", label: "Что раньше?" },
  { id: "practice", label: "Потренироваться" },
  { id: "test", label: "Итоговый тест" },
];

function PastPerfectPage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return PAST_PERFECT_EXERCISES.filter((e) => categories.has(e.errorCategory));
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PAST • ПРОШЕДШЕЕ</p>
        <h1 className="text-3xl">Past Perfect</h1>
        <p className="text-muted-foreground">
          Произошло раньше другого события в прошлом • had + V3
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
        <PastPerfectTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("order");
          }}
        />
      ) : null}

      {tab === "order" ? (
        <Practice
          exercises={ORDER_EXERCISES}
          tenseId={TENSE_ID}
          title="Разогрев: 6 коротких заданий «Что произошло раньше?»."
          onFinish={() => go("practice")}
          finishLabel="К основной тренировке"
          showHint
        />
      ) : null}

      {tab === "practice" ? (
        <Practice
          exercises={PAST_PERFECT_EXERCISES}
          tenseId={TENSE_ID}
          title="36 заданий: V3, had + V3, вопросы и отрицания, порядок событий, Past Simple или Past Perfect."
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
          exercises={PAST_PERFECT_TEST}
          tenseId={TENSE_ID}
          title="Проверим Past Perfect"
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
                to="/compare/past-perfect"
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
