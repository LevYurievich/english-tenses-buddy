import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import { Trainer, type SessionRow } from "@/components/coordinates/Trainer";
import { CoordDiagnostics } from "@/components/coordinates/Diagnostics";
import { Scenarios } from "@/components/all12/Scenario";
import { Lab, MarkerTraps } from "@/components/all12/Lab";
import { Heatmap, SessionSummary } from "@/components/all12/Results";
import { ALL12_ID, A12_LEVEL_1, A12_LEVEL_2, A12_LEVEL_3, A12_LEVEL_4, A12_SCENARIO_ITEMS } from "@/data/all12/items";
import { diagnose, useStore } from "@/lib/coordinates-stats";
import { ALL12_STORE } from "@/lib/all12-stats";
import { getTenseProgress, recordTest, useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

type Tab = "start" | "level1" | "level2" | "level3" | "lab" | "level4" | "results";

const TABS: { id: Tab; label: string }[] = [
  { id: "start", label: "Старт" },
  { id: "level1", label: "1. Нахожу координаты" },
  { id: "level2", label: "2. Выбираю время" },
  { id: "level3", label: "3. Читаю контекст" },
  { id: "lab", label: "Лаборатория" },
  { id: "level4", label: "4. Переключаюсь" },
  { id: "results", label: "Результаты" },
];
const TAB_IDS = TABS.map((t) => t.id) as string[];

export const Route = createFileRoute("/all-12")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search["tab"];
    return typeof tab === "string" && TAB_IDS.includes(tab) ? { tab: tab as Tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Все 12 времён — смешанная тренировка" },
      { name: "description", content: "Никаких отдельных Present, Past и Future: ситуация — и ты сам выбираешь одно из 12 времён. Четыре уровня, мини-истории и диагностика." },
      { property: "og:title", content: "Все 12 времён — English Tenses Trainer" },
      { property: "og:description", content: "Смысл → время → форма. Главная смешанная тренировка по 12 временам." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: All12Page,
});

function All12Page() {
  const { tab = "start" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const go = (next: Tab) => navigate({ search: { tab: next } });
  const progress = useProgress();
  const state = useStore(ALL12_STORE);
  const d = useMemo(() => diagnose(state), [state]);
  const done = progress ? getTenseProgress(progress, ALL12_ID).doneExercises : [];

  const summary = (rows: SessionRow[]) => <SessionSummary rows={rows} />;
  const onLevel4 = (rows: SessionRow[]) => recordTest(ALL12_ID, rows.filter((r) => r.analysis.correct).length, rows.length);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold tracking-widest text-primary">КООРДИНАТЫ ✓ → ВСЕ 12 ВРЕМЁН</p>
        <h1 className="text-3xl">Все 12 времён</h1>
        <p className="text-muted-foreground">Теперь никаких отдельных Present, Past и Future. Перед тобой ситуация — выбери время сам.</p>
        <ProgressBar value={percentFor(progress, ALL12_ID)} label="Прогресс модуля" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { t: "Уровень 1", items: A12_LEVEL_1 },
            { t: "Уровень 2", items: A12_LEVEL_2 },
            { t: "Уровень 3", items: A12_LEVEL_3 },
            { t: "Уровень 4", items: A12_SCENARIO_ITEMS },
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

      {tab === "start" ? (
        <div className="space-y-4">
          <section className="card-surface space-y-4 p-5 sm:p-6">
            <p className="font-display text-2xl font-bold">3 временные зоны × 4 способа посмотреть на действие = 12 времён</p>
            <ol className="grid gap-2 text-sm sm:grid-cols-4">
              {["1. ГДЕ? Present / Past / Future", "2. ЧТО? Событие / процесс / результат / длительность", "3. КАКОЕ ВРЕМЯ? одно из 12", "4. КАК ПОСТРОИТЬ? формула + форма глагола"].map((s) => (
                <li key={s} className="rounded-xl border-2 border-border p-3 font-medium">{s}</li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground">Главное правило: смысл → время → форма. Не «слово-маркер → время».</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => go("level1")} className="rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground">Начать смешанную тренировку</button>
              <Link to="/coordinates" search={{ tab: "map" }} className="rounded-xl border-2 border-primary/40 px-5 py-2.5 font-bold text-primary">Повторить координаты времени</Link>
            </div>
          </section>
          <MarkerTraps />
        </div>
      ) : null}

      {tab === "level1" ? (
        <Trainer store={ALL12_STORE} items={A12_LEVEL_1} mode="guided" intro="Уровень 1 — сначала ГДЕ?, потом ЧТО?. Ячейка карты откроется, когда выберешь обе координаты." onFinish={() => go("level2")} finishLabel="Уровень 2 →" renderSummary={summary} />
      ) : null}
      {tab === "level2" ? (
        <Trainer store={ALL12_STORE} items={A12_LEVEL_2} mode="help" intro="Уровень 2 — выбери время сам. Если трудно, нажми «Нужна помощь»: сначала ГДЕ?, потом ЧТО?." onFinish={() => go("level3")} finishLabel="Уровень 3 →" renderSummary={summary} />
      ) : null}
      {tab === "level3" ? (
        <Trainer store={ALL12_STORE} items={A12_LEVEL_3} mode="blind" intro="Уровень 3 — читай контекст: диалоги, мини-ситуации, причина и следствие." onFinish={() => go("lab")} finishLabel="Лаборатория →" renderSummary={summary} />
      ) : null}
      {tab === "lab" ? <Lab onFinish={() => go("level4")} /> : null}
      {tab === "level4" ? (
        <Scenarios
          scenarios={A12_LEVEL_4}
          onComplete={onLevel4}
          onFinish={() => go("results")}
          renderSummary={(rows) => (
            <>
              <SessionSummary rows={rows} />
              {rows.length && rows.filter((r) => r.analysis.correct).length / rows.length >= 0.75 ? (
                <Tensy mood="cheer" title="Мастер 12 времён">Ты сам переключаешься между временами внутри одной истории.</Tensy>
              ) : null}
            </>
          )}
        />
      ) : null}

      {tab === "results" ? (
        <div className="space-y-4">
          <Heatmap d={d} />
          <CoordDiagnostics d={d} />
          {d.formIssues.length ? (
            <section className="card-surface p-5 text-sm">
              <h2 className="text-lg">Форма глагола</h2>
              <ul className="mt-1">{d.formIssues.map((f) => <li key={f.skill}>{f.skill}: {f.count}</li>)}</ul>
            </section>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Link to="/review" className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Умное повторение</Link>
            <Link to="/mistakes" className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">Мои ошибки</Link>
            <Link to="/progress" className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">Смотреть прогресс</Link>
          </div>
        </div>
      ) : null}

    </div>
  );
}
