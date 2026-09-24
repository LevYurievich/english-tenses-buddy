import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import { Drill } from "@/components/coordinates/Drill";
import { CoordinatesTheory } from "@/components/coordinates/Theory";
import { Trainer, type SessionRow } from "@/components/coordinates/Trainer";
import { Workshop } from "@/components/coordinates/Workshop";
import { CoordDiagnostics } from "@/components/coordinates/Diagnostics";
import { CHECKPOINT, COORD_LEVELS, LEVEL_1, LEVEL_2, LEVEL_3, WHAT_ITEMS, WHERE_ITEMS } from "@/data/coordinates/items";
import { COORDINATES_ID, MEANINGS, MEANING_INFO, ZONES, ZONE_INFO, type Meaning, type Zone } from "@/data/coordinates/model";
import { diagnose, recordMeaning, recordZone, useCoord, weakAreaItems } from "@/lib/coordinates-stats";
import { getTenseProgress, markTheoryDone, recordTest, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "map" | "where" | "what" | "level1" | "level2" | "level3" | "workshop" | "checkpoint" | "diagnostics" | "weak";

const TABS: { id: Tab; label: string }[] = [
  { id: "map", label: "Карта 3 × 4" },
  { id: "where", label: "Шаг 1: ГДЕ?" },
  { id: "what", label: "Шаг 2: ЧТО?" },
  { id: "level1", label: "Уровень 1" },
  { id: "level2", label: "Уровень 2" },
  { id: "level3", label: "Уровень 3" },
  { id: "workshop", label: "Мастерская" },
  { id: "checkpoint", label: "Checkpoint" },
  { id: "diagnostics", label: "Диагностика" },
  { id: "weak", label: "Слабые места" },
];
const TAB_IDS = TABS.map((t) => t.id) as string[];

export const Route = createFileRoute("/coordinates")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && TAB_IDS.includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Как выбрать время из 12? — координаты времени" },
      { name: "description", content: "Две координаты — ГДЕ точка отсчёта и ЧТО важно — дают одно из 12 времён. Матрица 3 × 4, тренировки, три уровня и checkpoint." },
      { property: "og:title", content: "Координаты времени — English Tenses Trainer" },
      { property: "og:description", content: "3 временные зоны × 4 смысла = 12 времён. Учимся выбирать время в два шага." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoordinatesPage,
});

const zoneOptions = () => ZONES.map((z) => ({ value: z, label: `${ZONE_INFO[z].icon} ${ZONE_INFO[z].label}` }));
const meaningOptions = () => MEANINGS.map((m) => ({ value: m, label: `${MEANING_INFO[m].icon} ${MEANING_INFO[m].label}`, sub: MEANING_INFO[m].ru }));

function CoordinatesPage() {
  const { tab = "map" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const go = (next: Tab) => navigate({ search: { tab: next } });
  const progress = useProgress();
  const coord = useCoord();
  const d = useMemo(() => diagnose(coord), [coord]);
  const weak = useMemo(() => weakAreaItems(coord), [coord]);
  const done = progress ? getTenseProgress(progress, COORDINATES_ID).doneExercises : [];

  const onCheckpoint = (rows: SessionRow[]) => {
    recordTest(COORDINATES_ID, rows.filter((r) => r.analysis.correct).length, rows.length);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">PRESENT ✓ · PAST ✓ · FUTURE ✓ → КООРДИНАТЫ ВРЕМЕНИ</p>
        <h1 className="text-3xl">Как выбрать время из 12?</h1>
        <p className="text-muted-foreground">Два шага: ГДЕ точка отсчёта? ЧТО хочет показать говорящий? Пересечение — нужное время.</p>
        <ProgressBar value={percentFor(progress, COORDINATES_ID)} label="Прогресс модуля" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            { t: "ГДЕ?", items: WHERE_ITEMS },
            { t: "ЧТО?", items: WHAT_ITEMS },
            ...COORD_LEVELS.map((l) => ({ t: `Уровень ${l.id}`, items: l.items })),
          ].map((x) => {
            const n = x.items.filter((i) => done.includes(i.id)).length;
            return (
              <div key={x.t} className="rounded-xl border-2 border-border px-3 py-2 text-sm">
                <span className="font-semibold">{x.t}</span>
                <span className="ml-2 text-muted-foreground">{n}/{x.items.length}</span>
                {n >= x.items.length ? <span className="ml-1 text-success">✓</span> : null}
              </div>
            );
          })}
        </div>
      </header>

      <nav aria-label="Разделы модуля" className="flex gap-2 overflow-x-auto rounded-xl bg-muted p-1.5">
        {TABS.map((t) => (
          <button key={t.id} type="button" aria-current={tab === t.id ? "page" : undefined} onClick={() => go(t.id)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition ${tab === t.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}>
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "map" ? <CoordinatesTheory onDone={() => { markTheoryDone(COORDINATES_ID); go("where"); }} /> : null}

      {tab === "where" ? (
        <Drill
          items={WHERE_ITEMS}
          title="Шаг 1. Не выбираем время — только зону. NOW — это настоящая точка отсчёта, даже без слова now."
          question={() => "Где находится главная точка отсчёта?"}
          options={zoneOptions}
          answerOf={(i) => i.answer}
          onAnswer={(i, v) => recordZone(i.id, i.sentence, i.answer, v as Zone)}
          onFinish={() => go("what")}
          finishLabel="Шаг 2: ЧТО? →"
        />
      ) : null}

      {tab === "what" ? (
        <Drill
          items={WHAT_ITEMS}
          title="Шаг 2. Зону не выбираем — только смысл выделенной формы."
          question={() => "Что хочет показать говорящий?"}
          options={meaningOptions}
          answerOf={(i) => i.answer}
          onAnswer={(i, v) => recordMeaning(i.id, i.sentence, i.answer, v as Meaning)}
          onFinish={() => go("level1")}
          finishLabel="Уровень 1 →"
        />
      ) : null}

      {tab === "level1" ? (
        <Trainer items={LEVEL_1} mode="guided" intro="Уровень 1 — две координаты. ГДЕ? → ЧТО? → матрица → форма." onFinish={() => go("level2")} finishLabel="Уровень 2 →" />
      ) : null}
      {tab === "level2" ? (
        <Trainer items={LEVEL_2} mode="free" intro="Уровень 2 — найди сам. Если нужно, разбери задание по координатам." onFinish={() => go("level3")} finishLabel="Уровень 3 →" />
      ) : null}
      {tab === "level3" ? (
        <Trainer items={LEVEL_3} mode="blind" intro="Уровень 3 — без карты. Только контекст." onFinish={() => go("workshop")} finishLabel="Мастерская →" />
      ) : null}

      {tab === "workshop" ? <Workshop onFinish={() => go("checkpoint")} /> : null}

      {tab === "checkpoint" ? (
        <div className="space-y-4">
          <section className="card-surface p-5 sm:p-6">
            <h2 className="text-xl">Checkpoint: координаты освоены?</h2>
            <p className="mt-1 text-sm text-muted-foreground">12 новых заданий, без подсказок и без карты. Это ещё не финальный экзамен по 12 временам.</p>
          </section>
          <Trainer
            items={CHECKPOINT}
            mode="blind"
            intro="Checkpoint"
            onComplete={onCheckpoint}
            onFinish={() => go("diagnostics")}
            finishLabel="К диагностике →"
            renderSummary={(rows) => {
              const c = rows.filter((r) => r.analysis.coordOk !== null);
              const m = rows.filter((r) => r.analysis.meaningOk !== null);
              const p = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");
              return (
                <div className="space-y-2 text-center text-sm">
                  <p>Time coordinate accuracy: <b>{p(c.filter((r) => r.analysis.coordOk).length, c.length)}</b></p>
                  <p>Meaning accuracy: <b>{p(m.filter((r) => r.analysis.meaningOk).length, m.length)}</b></p>
                  <p className="text-muted-foreground">Точность по каждому времени — предварительная и считается вместе с уровнями модуля: см. «Диагностику».</p>
                  {rows.filter((r) => r.analysis.correct).length >= 9 ? (
                    <Tensy mood="cheer" title="Навигатор времени">Ты научился находить время по двум координатам.</Tensy>
                  ) : null}
                </div>
              );
            }}
          />
        </div>
      ) : null}

      {tab === "diagnostics" ? (
        <div className="space-y-4">
          <CoordDiagnostics d={d} />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => go("weak")} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Тренировать слабые места</button>
            <Link to="/mistakes" className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">Мои ошибки</Link>
          </div>
        </div>
      ) : null}

      {tab === "weak" ? (
        weak && weak.items.length ? (
          <Trainer key={weak.title} items={weak.items} mode="free" intro={`Слабое место: ${weak.title}. Задания из разных временных зон.`} onFinish={() => go("diagnostics")} finishLabel="К диагностике" />
        ) : (
          <div className="card-surface p-6 text-muted-foreground">Слабых мест пока не видно — пройди уровни, и подбор появится здесь.</div>
        )
      ) : null}

      <p className="sr-only">Уровни: {LEVEL_1.length}, {LEVEL_2.length}, {LEVEL_3.length}</p>
    </div>
  );
}
