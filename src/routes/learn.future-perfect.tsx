import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { FuturePerfectTheory } from "@/components/future-perfect/Theory";
import { PerfectFamily } from "@/components/PerfectFamily";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import {
  DEADLINE_EXERCISES,
  FUTURE_PERFECT_EXERCISES,
  FUTURE_PERFECT_TEST,
  PERFECT_FAMILY_EXERCISES,
} from "@/data/future-perfect/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "family" | "test" | "mistakes";

const TAB_IDS: Tab[] = ["theory", "practice", "family", "test", "mistakes"];

export const Route = createFileRoute("/learn/future-perfect")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Future Perfect — WILL HAVE + V3: результат к дедлайну" },
      {
        name: "description",
        content:
          "Future Perfect по смыслу: что уже будет готово к будущему моменту. WILL HAVE + V3, by / by the time, Perfect family и тест из 15 заданий.",
      },
      { property: "og:title", content: "Future Perfect — English Tenses Trainer" },
      {
        property: "og:description",
        content: "К какому моменту? Что к нему уже будет готово? Учимся Future Perfect.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FuturePerfectPage,
});

const TENSE_ID = "future-perfect";

const PRACTICE_EXERCISES = [...DEADLINE_EXERCISES, ...FUTURE_PERFECT_EXERCISES];
const ALL_BANK = [...PRACTICE_EXERCISES, ...PERFECT_FAMILY_EXERCISES];

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "family", label: "Perfect family" },
  { id: "test", label: "Итоговый тест" },
];

function FuturePerfectPage() {
  const { tab = "theory" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const percent = percentFor(progress, TENSE_ID);

  const go = (next: Tab) => navigate({ search: { tab: next } });

  const mistakeExercises = useMemo(() => {
    const categories = new Set(
      (progress?.mistakes ?? []).filter((m) => m.tense === TENSE_ID).map((m) => m.category),
    );
    return ALL_BANK.filter((e) => categories.has(e.errorCategory));
  }, [progress]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">FUTURE • БУДУЩЕЕ</p>
        <h1 className="text-3xl">Future Perfect</h1>
        <p className="text-muted-foreground">WILL + HAVE + V3 • результат к будущей точке</p>
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
        <FuturePerfectTheory
          onDone={() => {
            markTheoryDone(TENSE_ID);
            go("practice");
          }}
        />
      ) : null}

      {tab === "practice" ? (
        <>
          <Practice
            exercises={PRACTICE_EXERCISES}
            tenseId={TENSE_ID}
            title="Сначала 6 заданий «Найди дедлайн», потом 35: формула, V3, вопросы, отрицания, timeline и выбор времени."
            onFinish={() => go("family")}
            finishLabel="К Perfect family"
          />
          <Link
            to="/compare/future-perfect"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            Future Simple vs Future Perfect →
          </Link>
        </>
      ) : null}

      {tab === "family" ? (
        <>
          <PerfectFamily highlight="future" />
          <Practice
            exercises={PERFECT_FAMILY_EXERCISES}
            tenseId={TENSE_ID}
            title="9 коротких заданий: где точка отсчёта — сейчас, в прошлом или в будущем?"
            onFinish={() => go("test")}
            finishLabel="К итоговому тесту"
          />
        </>
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
        <>
          <MiniTest exercises={FUTURE_PERFECT_TEST} tenseId={TENSE_ID} title="Проверим Future Perfect" />
          <Tensy mood="test">
            Если путаешься между Future Continuous и Future Perfect, спроси: что будет происходить В
            этот момент или что уже будет готово К этому моменту?
          </Tensy>
          <Link
            to="/compare/future-perfect"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            Потренировать выбор →
          </Link>
        </>
      ) : null}
    </div>
  );
}
