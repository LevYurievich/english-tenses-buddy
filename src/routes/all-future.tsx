import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { CheatSheet } from "@/components/tense-family/CheatSheet";
import { DiagnosticResults } from "@/components/tense-family/DiagnosticResults";
import { FutureFamilyTheory } from "@/components/tense-family/FutureFamilyTheory";
import { FinalTenseTest } from "@/components/tense-family/FinalTenseTest";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import {
  ALL_FUTURE_ID,
  FUTURE_LEVEL_1 as LEVEL_1,
  FUTURE_LEVEL_2 as LEVEL_2,
  FUTURE_LEVEL_3 as LEVEL_3,
  FUTURE_MAP,
  futureFinalTestFor,
} from "@/data/all-future";
import {
  futureByTense,
  futureBySkill,
  futureLevelProgress,
  futureModuleResults,
  futureRecommendations,
  futureWeakAreaExercises,
  futureWeakSpots,
} from "@/lib/all-future-stats";
import { getTenseProgress, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab =
  | "map"
  | "level1"
  | "level2"
  | "level3"
  | "diagnostics"
  | "exam"
  | "weak";

const TABS: { id: Tab; label: string }[] = [
  { id: "map", label: "Четыре смысла" },
  { id: "level1", label: "Уровень 1" },
  { id: "level2", label: "Уровень 2" },
  { id: "level3", label: "Уровень 3" },
  { id: "diagnostics", label: "Диагностика" },
  { id: "exam", label: "Future Challenge" },
  { id: "weak", label: "Слабые места" },
];

const TAB_IDS = TABS.map((t) => t.id);

export const Route = createFileRoute("/all-future")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && (TAB_IDS as string[]).includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Все времена Future — выбираем время по смыслу и Future Challenge" },
      {
        name: "description",
        content:
          "Смешанный тренажёр четырёх времён Future: четыре смысла, AT или BY, алгоритм выбора, 55 упражнений трёх уровней, диагностика и Future Challenge из 20 заданий.",
      },
      { property: "og:title", content: "Все времена Future — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Смысл ситуации → время → формула. 55 упражнений и Future Challenge.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllFuturePage,
});

const sheet = <CheatSheet title="Шпаргалка Future" rows={FUTURE_MAP} />;

function AllFuturePage() {
  const { tab = "map" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const progress = useProgress();
  const go = (next: Tab) => navigate({ search: { tab: next } });

  const results = useMemo(() => futureModuleResults(progress), [progress]);
  const levels = futureLevelProgress(progress);
  const module = progress ? getTenseProgress(progress, ALL_FUTURE_ID) : null;
  const attempts = module?.testAttempts ?? 0;
  const exam = useMemo(() => futureFinalTestFor(attempts), [attempts]);
  const weak = useMemo(() => futureWeakAreaExercises(results), [results]);
  const weakSpots = useMemo(() => futureWeakSpots(results), [results]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">FUTURE • СМЕШАННЫЙ МОДУЛЬ</p>
        <h1 className="text-3xl">Все времена Future</h1>
        <p className="text-muted-foreground">
          Ты знаешь четыре способа говорить о будущем. Теперь научимся выбирать между ними.
        </p>
        <ProgressBar value={percentFor(progress, ALL_FUTURE_ID)} label="Прогресс модуля" />
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

      {tab === "map" ? <FutureFamilyTheory onDone={() => go("level1")} /> : null}

      {tab === "level1" ? (
        <Practice
          exercises={LEVEL_1}
          tenseId={ALL_FUTURE_ID}
          title="Уровень 1 — вижу подсказку: 20 заданий с at / by / for."
          header={sheet}
          onFinish={() => go("level2")}
          finishLabel="К уровню 2"
        />
      ) : null}

      {tab === "level2" ? (
        <Practice
          exercises={LEVEL_2}
          tenseId={ALL_FUTURE_ID}
          title="Уровень 2 — понимаю будущую ситуацию: 20 заданий по смыслу."
          header={sheet}
          onFinish={() => go("level3")}
          finishLabel="К уровню 3"
        />
      ) : null}

      {tab === "level3" ? (
        <Practice
          exercises={LEVEL_3}
          tenseId={ALL_FUTURE_ID}
          title="Уровень 3 — выбираю сам: 15 заданий без подсказок."
          showHint={false}
          onFinish={() => go("diagnostics")}
          finishLabel="К диагностике"
        />
      ) : null}

      {tab === "diagnostics" ? (
        <div className="space-y-4">
          <DiagnosticResults
            title="Как ты понимаешь Future Tenses"
            tenseStats={futureByTense(results)}
            skillStats={futureBySkill(results)}
            recommendations={futureRecommendations(results)}
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
                  Future Challenge
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
            <h2 className="text-xl">🏆 Future Challenge</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Теперь никаких подсказок. Только ты и время. 20 заданий, нейтральный интерфейс.
            </p>
          </section>
          <FinalTenseTest
            exercises={exam}
            moduleId={ALL_FUTURE_ID}
            title="Future Challenge"
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
            Три временные зоны пройдены: PAST ✓ PRESENT ✓ FUTURE ✓. Дальше соберём всю систему:
            3 временные точки × 4 смысла = 12 времён.
          </Tensy>
        </div>
      ) : null}

      {tab === "weak" ? (
        weak.length ? (
          <Practice
            exercises={weak}
            tenseId={ALL_FUTURE_ID}
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
