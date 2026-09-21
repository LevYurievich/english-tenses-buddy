import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { CheatSheet } from "@/components/tense-family/CheatSheet";
import { ChoosingTrainer } from "@/components/tense-family/ChoosingTrainer";
import { DiagnosticResults } from "@/components/tense-family/DiagnosticResults";
import { FamilyTheory } from "@/components/tense-family/FamilyTheory";
import { FinalTenseTest } from "@/components/tense-family/FinalTenseTest";
import { ProgressBar } from "@/components/ProgressBar";
import { ALL_PRESENT_ID, finalTestFor, LEVEL_1, LEVEL_2, LEVEL_3 } from "@/data/all-present";
import {
  bySkill,
  byTense,
  levelProgress,
  moduleResults,
  recommendations,
  weakAreaExercises,
} from "@/lib/all-present-stats";
import { getTenseProgress, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "map" | "teach" | "level1" | "level2" | "level3" | "diagnostics" | "exam" | "weak";

const TABS: { id: Tab; label: string }[] = [
  { id: "map", label: "Как выбрать" },
  { id: "teach", label: "Научи выбирать" },
  { id: "level1", label: "Уровень 1" },
  { id: "level2", label: "Уровень 2" },
  { id: "level3", label: "Уровень 3" },
  { id: "diagnostics", label: "Диагностика" },
  { id: "exam", label: "Финальный тест" },
  { id: "weak", label: "Слабые места" },
];

const TAB_IDS = TABS.map((t) => t.id);

export const Route = createFileRoute("/all-present")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Все Present — выбираем время по смыслу: 50 упражнений и экзамен" },
      {
        name: "description",
        content:
          "Смешанный тренажёр четырёх времён Present: алгоритм выбора времени, три уровня из 50 упражнений, диагностика, тренировка слабых мест и финальный тест из 20 заданий.",
      },
      { property: "og:title", content: "Все Present — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Смысл ситуации → время → формула. 50 упражнений и финальный тест.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllPresentPage,
});

function AllPresentPage() {
  const { tab = "map" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const go = (next: Tab) => navigate({ search: { tab: next } });

  const results = useMemo(() => moduleResults(progress), [progress]);
  const levels = levelProgress(progress);
  const module = progress ? getTenseProgress(progress, ALL_PRESENT_ID) : null;
  const attempts = module?.testAttempts ?? 0;
  const exam = useMemo(() => finalTestFor(attempts), [attempts]);
  const weak = useMemo(() => weakAreaExercises(results), [results]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PRESENT • СМЕШАННЫЙ МОДУЛЬ</p>
        <h1 className="text-3xl">Все Present</h1>
        <p className="text-muted-foreground">
          Здесь никто не подсказывает время — ты выбираешь его сам по смыслу ситуации.
        </p>
        <ProgressBar value={percentFor(progress, ALL_PRESENT_ID)} label="Прогресс модуля" />
        <div className="grid gap-2 sm:grid-cols-3">
          {levels.map((l) => (
            <div key={l.id} className="rounded-xl border-2 border-border px-3 py-2 text-sm">
              <span className="font-semibold">Уровень {l.id}</span>
              <span className="ml-2 text-muted-foreground">
                {l.done}/{l.total}
              </span>
              {l.done >= l.total ? <span className="ml-2 text-success">✓</span> : null}
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-wrap gap-2 rounded-xl bg-muted p-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.id)}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              tab === t.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "map" ? <FamilyTheory onDone={() => go("teach")} /> : null}
      {tab === "teach" ? <ChoosingTrainer onDone={() => go("level1")} /> : null}

      {tab === "level1" ? (
        <Practice
          exercises={LEVEL_1}
          tenseId={ALL_PRESENT_ID}
          title="Уровень 1 — вижу подсказку: 20 заданий с маркерами."
          header={<CheatSheet />}
          onFinish={() => go("level2")}
          finishLabel="К уровню 2"
        />
      ) : null}

      {tab === "level2" ? (
        <Practice
          exercises={LEVEL_2}
          tenseId={ALL_PRESENT_ID}
          title="Уровень 2 — понимаю ситуацию: 20 заданий по смыслу."
          header={<CheatSheet />}
          onFinish={() => go("level3")}
          finishLabel="К уровню 3"
        />
      ) : null}

      {tab === "level3" ? (
        <Practice
          exercises={LEVEL_3}
          tenseId={ALL_PRESENT_ID}
          title="Уровень 3 — выбираю сам: 10 заданий без подсказок."
          showHint={false}
          onFinish={() => go("diagnostics")}
          finishLabel="К диагностике"
        />
      ) : null}

      {tab === "diagnostics" ? (
        <DiagnosticResults
          title="Как ты понимаешь Present Tenses"
          tenseStats={byTense(results)}
          skillStats={bySkill(results)}
          recommendations={recommendations(results)}
          actions={
            <>
              <button
                type="button"
                onClick={() => go("weak")}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
              >
                Тренировать слабые места
              </button>
              <button
                type="button"
                onClick={() => go("exam")}
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Финальный тест
              </button>
            </>
          }
        />
      ) : null}

      {tab === "exam" ? (
        <FinalTenseTest
          exercises={exam}
          moduleId={ALL_PRESENT_ID}
          title="Present Tenses"
          attempt={attempts}
          onRetry={() => go("exam")}
          extraActions={
            <>
              <button
                type="button"
                onClick={() => go("weak")}
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Тренировать слабые места
              </button>
              <Link
                to="/mistakes"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
              >
                Мои ошибки
              </Link>
            </>
          }
        />
      ) : null}

      {tab === "weak" ? (
        weak.length ? (
          <Practice
            exercises={weak}
            tenseId={ALL_PRESENT_ID}
            title="Задания из тем, где точность ниже. Подбор по твоим сохранённым ответам."
            header={<CheatSheet />}
            onFinish={() => go("diagnostics")}
            finishLabel="К диагностике"
          />
        ) : (
          <div className="card-surface p-6 text-muted-foreground">
            Слабых мест пока не видно — пройди уровни, и подбор заданий появится здесь.
          </div>
        )
      ) : null}
    </div>
  );
}
