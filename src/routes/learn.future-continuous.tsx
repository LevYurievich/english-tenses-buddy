import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MiniTest } from "@/components/present-simple/MiniTest";
import { Practice } from "@/components/present-simple/Practice";
import { FutureContinuousTheory } from "@/components/future-continuous/Theory";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import {
  CONTINUOUS_FAMILY_EXERCISES,
  FUTURE_CONTINUOUS_EXERCISES,
  FUTURE_CONTINUOUS_TEST,
  LOOK_AHEAD_EXERCISES,
} from "@/data/future-continuous/exercises";
import { CONTINUOUS_FAMILY } from "@/data/future-continuous/theory";
import { markTheoryDone, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "theory" | "practice" | "family" | "test" | "mistakes";

const TAB_IDS: Tab[] = ["theory", "practice", "family", "test", "mistakes"];

export const Route = createFileRoute("/learn/future-continuous")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Future Continuous — WILL + BE + V-ING: теория и 50 упражнений" },
      {
        name: "description",
        content:
          "Future Continuous по смыслу: процесс в определённый момент будущего. WILL + BE + V-ING, вопросы, отрицания, timeline, Continuous family и тест из 15 заданий.",
      },
      { property: "og:title", content: "Future Continuous — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Что будет происходить в тот момент? Процесс в будущем: will be + V-ing.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FutureContinuousPage,
});

const TENSE_ID = "future-continuous";

const PRACTICE_EXERCISES = [...LOOK_AHEAD_EXERCISES, ...FUTURE_CONTINUOUS_EXERCISES];
const ALL_BANK = [...PRACTICE_EXERCISES, ...CONTINUOUS_FAMILY_EXERCISES];

const TABS: { id: Tab; label: string }[] = [
  { id: "theory", label: "Разобраться" },
  { id: "practice", label: "Потренироваться" },
  { id: "family", label: "Continuous family" },
  { id: "test", label: "Итоговый тест" },
];

function FutureContinuousPage() {
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
        <h1 className="text-3xl">Future Continuous</h1>
        <p className="text-muted-foreground">
          WILL + BE + V-ING • процесс в определённый момент будущего
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
        <FutureContinuousTheory
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
            title="Сначала 6 заданий «Загляни в будущее», потом 35: формы, вопросы, отрицания, timeline и выбор между Future Simple и Future Continuous."
            onFinish={() => go("family")}
            finishLabel="К Continuous family"
          />
          <Link
            to="/compare/future-continuous"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            Future Simple vs Future Continuous →
          </Link>
        </>
      ) : null}

      {tab === "family" ? (
        <>
          <section className="card-surface space-y-3 p-5">
            <p className="text-xs font-bold tracking-widest text-primary">CONTINUOUS FAMILY</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {CONTINUOUS_FAMILY.map((f) => (
                <div key={f.id} className="rounded-xl bg-muted p-4 text-sm">
                  <p className="font-display font-bold">{f.label}</p>
                  <p className="mt-1 font-mono">{f.formula}</p>
                  <p className="mt-1 text-muted-foreground">{f.ru}</p>
                </div>
              ))}
            </div>
            <p className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center font-display font-bold text-primary">
              ВРЕМЯ МЕНЯЕТСЯ. ИДЕЯ «ПРОЦЕСС» ОСТАЁТСЯ.
            </p>
          </section>
          <Practice
            exercises={CONTINUOUS_FAMILY_EXERCISES}
            tenseId={TENSE_ID}
            title="9 коротких заданий: 3 — сейчас, 3 — в тот момент прошлого, 3 — в тот момент будущего."
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
          <MiniTest
            exercises={FUTURE_CONTINUOUS_TEST}
            tenseId={TENSE_ID}
            title="Проверим Future Continuous"
          />
          <Tensy mood="test">
            Если ошибки появляются в выборе между Future Simple и Future Continuous, сначала спроси:
            что произойдёт или что будет происходить в тот момент?
          </Tensy>
        </>
      ) : null}
    </div>
  );
}
