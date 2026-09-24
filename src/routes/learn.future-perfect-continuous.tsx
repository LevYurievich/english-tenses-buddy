import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { FuturePerfectContinuousTheory } from "@/components/future-perfect-continuous/Theory";
import { PerfectContinuousFamily } from "@/components/PerfectContinuousFamily";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import {
  TIMER_EXERCISES,
  FUTURE_PERFECT_CONTINUOUS_EXERCISES,
  FUTURE_PERFECT_CONTINUOUS_TEST,
  PERFECT_CONTINUOUS_FAMILY_EXERCISES,
} from "@/data/future-perfect-continuous/exercises";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "family" | "test" | "mistakes";

const TAB_IDS: Tab[] = ["theory", "practice", "family", "test", "mistakes"];

export const Route = createFileRoute("/learn/future-perfect-continuous")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Future Perfect Continuous — как долго к моменту в будущем" },
      {
        name: "description",
        content:
          "Future Perfect Continuous по смыслу: как долго процесс будет длиться к будущему моменту. WILL HAVE BEEN + V-ING, for / since, Perfect Continuous family и тест.",
      },
      { property: "og:title", content: "Future Perfect Continuous — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Точка в будущем + таймер: как долго процесс уже будет идти?",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FuturePerfectContinuousPage,
});

const TENSE_ID = "future-perfect-continuous";

const PRACTICE_EXERCISES = [...TIMER_EXERCISES, ...FUTURE_PERFECT_CONTINUOUS_EXERCISES];
const ALL_BANK = [...PRACTICE_EXERCISES, ...PERFECT_CONTINUOUS_FAMILY_EXERCISES];

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "family", label: "Perfect Continuous family" },
  { id: "test", label: "Итоговый тест" },
];

function FuturePerfectContinuousPage() {
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
        <h1 className="text-3xl">Future Perfect Continuous</h1>
        <p className="text-muted-foreground">WILL + HAVE + BEEN + V-ING • длительность к будущей точке</p>
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
        <FuturePerfectContinuousTheory
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
            title="Сначала 6 заданий «Запусти таймер», потом 35: формула, V-ing, for/since, вопросы, отрицания, timeline и выбор времени."
            onFinish={() => go("family")}
            finishLabel="К Perfect Continuous family"
          />
          <Link
            to="/compare/future-perfect-continuous"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            Future Perfect vs Future Perfect Continuous →
          </Link>
        </>
      ) : null}

      {tab === "family" ? (
        <>
          <PerfectContinuousFamily highlight="future" />
          <Practice
            exercises={PERFECT_CONTINUOUS_FAMILY_EXERCISES}
            tenseId={TENSE_ID}
            title="9 заданий: где точка отсчёта — сейчас, в прошлом или в будущем? И как долго длится процесс?"
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
          <MiniTest exercises={FUTURE_PERFECT_CONTINUOUS_TEST} tenseId={TENSE_ID} title="Проверим Future Perfect Continuous" />
          <Tensy mood="test">
            Главная сложность — отличить результат от длительности. Спроси себя: что будет готово? или
            как долго это уже будет происходить?
          </Tensy>
          <Link
            to="/compare/future-perfect-continuous"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            Потренировать разницу →
          </Link>
        </>
      ) : null}
    </div>
  );
}
