import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { CheatSheet } from "@/components/tense-family/CheatSheet";
import { BuildTenseTrainer } from "@/components/tense-family/BuildTenseTrainer";
import { TimelineTrainer } from "@/components/tense-family/TimelineTrainer";
import { DiagnosticResults } from "@/components/tense-family/DiagnosticResults";
import { PastFamilyTheory } from "@/components/tense-family/PastFamilyTheory";
import { FinalTenseTest } from "@/components/tense-family/FinalTenseTest";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import { ALL_PAST_ID, LEVEL_1, LEVEL_2, LEVEL_3, pastFinalTestFor } from "@/data/all-past";
import { PAST_MAP } from "@/data/all-past/theory";
import {
  pastByTense,
  pastBySkill,
  pastLevelProgress,
  pastModuleResults,
  pastRecommendations,
  pastWeakAreaExercises,
  pastWeakSpots,
} from "@/lib/all-past-stats";
import { getTenseProgress, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab =
  | "map"
  | "build"
  | "timeline"
  | "level1"
  | "level2"
  | "level3"
  | "diagnostics"
  | "exam"
  | "weak";

const TABS: { id: Tab; label: string }[] = [
  { id: "map", label: "Четыре смысла" },
  { id: "build", label: "Собери время" },
  { id: "timeline", label: "Построй timeline" },
  { id: "level1", label: "Уровень 1" },
  { id: "level2", label: "Уровень 2" },
  { id: "level3", label: "Уровень 3" },
  { id: "diagnostics", label: "Диагностика" },
  { id: "exam", label: "Past Challenge" },
  { id: "weak", label: "Слабые места" },
];

const TAB_IDS = TABS.map((t) => t.id);

export const Route = createFileRoute("/all-past")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Все времена Past — выбираем время по смыслу и Past Challenge" },
      {
        name: "description",
        content:
          "Смешанный тренажёр четырёх времён Past: четыре смысла, алгоритм выбора, «Собери время», timeline, 55 упражнений трёх уровней, диагностика и Past Challenge из 20 заданий.",
      },
      { property: "og:title", content: "Все времена Past — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Смысл ситуации → время → формула. 55 упражнений и Past Challenge.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllPastPage,
});

const sheet = <CheatSheet title="Шпаргалка Past" rows={PAST_MAP} />;

function AllPastPage() {
  const { tab = "map" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const go = (next: Tab) => navigate({ search: { tab: next } });

  const results = useMemo(() => pastModuleResults(progress), [progress]);
  const levels = pastLevelProgress(progress);
  const module = progress ? getTenseProgress(progress, ALL_PAST_ID) : null;
  const attempts = module?.testAttempts ?? 0;
  const exam = useMemo(() => pastFinalTestFor(attempts), [attempts]);
  const weak = useMemo(() => pastWeakAreaExercises(results), [results]);
  const weakSpots = useMemo(() => pastWeakSpots(results), [results]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PAST • СМЕШАННЫЙ МОДУЛЬ</p>
        <h1 className="text-3xl">Все времена Past</h1>
        <p className="text-muted-foreground">
          Ты уже знаешь четыре прошедших времени. Теперь научимся выбирать между ними.
        </p>
        <ProgressBar value={percentFor(progress, ALL_PAST_ID)} label="Прогресс модуля" />
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

      {tab === "map" ? <PastFamilyTheory onDone={() => go("build")} /> : null}
      {tab === "build" ? <BuildTenseTrainer onDone={() => go("timeline")} /> : null}
      {tab === "timeline" ? <TimelineTrainer onDone={() => go("level1")} /> : null}

      {tab === "level1" ? (
        <Practice
          exercises={LEVEL_1}
          tenseId={ALL_PAST_ID}
          title="Уровень 1 — вижу подсказку: 20 заданий с понятным контекстом."
          header={sheet}
          onFinish={() => go("level2")}
          finishLabel="К уровню 2"
        />
      ) : null}

      {tab === "level2" ? (
        <Practice
          exercises={LEVEL_2}
          tenseId={ALL_PAST_ID}
          title="Уровень 2 — понимаю ситуацию: 20 заданий по смыслу."
          header={sheet}
          onFinish={() => go("level3")}
          finishLabel="К уровню 3"
        />
      ) : null}

      {tab === "level3" ? (
        <Practice
          exercises={LEVEL_3}
          tenseId={ALL_PAST_ID}
          title="Уровень 3 — выбираю сам: 15 заданий без подсказок."
          showHint={false}
          onFinish={() => go("diagnostics")}
          finishLabel="К диагностике"
        />
      ) : null}

      {tab === "diagnostics" ? (
        <div className="space-y-4">
          <DiagnosticResults
            title="Как ты понимаешь Past Tenses"
            tenseStats={pastByTense(results)}
            skillStats={pastBySkill(results)}
            recommendations={pastRecommendations(results)}
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
                  Past Challenge
                </button>
              </>
            }
          />
          {weakSpots.length ? (
            <section className="card-surface space-y-3 p-5 sm:p-6">
              <h2 className="text-xl">Твои слабые места</h2>
              <ol className="space-y-2 text-sm">
                {weakSpots.map((s, i) => (
                  <li key={s.key} className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-primary">{i + 1}.</span>
                    <span className="font-semibold">{s.title}</span>
                    <span className="text-muted-foreground">
                      {Math.round((s.correct / s.total) * 100)}%
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      ) : null}

      {tab === "exam" ? (
        <div className="space-y-4">
          <section className="card-surface p-5 sm:p-6">
            <h2 className="text-xl">🏆 Past Challenge</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Теперь никаких подсказок. Только ты и время. 20 заданий, нейтральный интерфейс.
            </p>
          </section>
          <FinalTenseTest
            exercises={exam}
            moduleId={ALL_PAST_ID}
            title="Past Challenge"
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
                  Разобрать мои ошибки
                </Link>
              </>
            }
          />
          <Tensy mood="map">
            Past пройден! Теперь ты умеешь видеть не только что произошло, но и что происходило
            раньше. Следующая остановка: FUTURE.
          </Tensy>
        </div>
      ) : null}

      {tab === "weak" ? (
        weak.length ? (
          <Practice
            exercises={weak}
            tenseId={ALL_PAST_ID}
            title="Задания из тем, где точность ниже. Подбор по твоим сохранённым ответам."
            header={sheet}
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
