import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { Tensy } from "@/components/Tensy";
import { COMPARE_FCP_EXERCISES, COMPARE_FSP_EXERCISES } from "@/data/compare/future-simple-perfect";

export const Route = createFileRoute("/compare/future-perfect")({
  head: () => ({
    meta: [
      { title: "Future Simple, Continuous или Perfect — что будет готово к моменту?" },
      {
        name: "description",
        content:
          "Что произойдёт, что будет происходить в момент и что уже будет готово к моменту? 22 упражнения на выбор будущего времени по смыслу.",
      },
      { property: "og:title", content: "Future Simple vs Future Perfect" },
      {
        property: "og:description",
        content: "Событие, процесс в момент или результат к дедлайну — выбираем по смыслу.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompareFuturePerfectPage,
});

const TENSE_ID = "compare-future-perfect";

function CompareFuturePerfectPage() {
  const [stage, setStage] = useState<"theory" | "simple" | "continuous">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНЕНИЕ</p>
        <h1 className="text-3xl">Future Simple vs Future Perfect</h1>
        <p className="text-muted-foreground">
          Что произойдёт? — или — что уже будет готово к этому моменту?
        </p>
      </header>

      <div className="flex flex-wrap gap-2 rounded-xl bg-muted p-1.5">
        {(
          [
            ["theory", "Разобраться"],
            ["simple", "Simple vs Perfect"],
            ["continuous", "В момент или к моменту?"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setStage(id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
              stage === id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="card-surface space-y-2 p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">FUTURE SIMPLE</p>
              <p className="font-display font-bold">ЧТО ПРОИЗОЙДЁТ?</p>
              <p className="text-sm text-muted-foreground">Событие, решение, обещание, прогноз</p>
              <p className="font-mono text-sm font-semibold">Tom will finish his homework.</p>
            </div>
            <div className="card-surface space-y-2 p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">FUTURE CONTINUOUS</p>
              <p className="font-display font-bold">В МОМЕНТ? → ПРОЦЕСС</p>
              <p className="text-sm text-muted-foreground">Что будет происходить в точке</p>
              <p className="font-mono text-sm font-semibold">At 8, Tom will be doing his homework.</p>
            </div>
            <div className="card-surface space-y-2 p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">FUTURE PERFECT</p>
              <p className="font-display font-bold">К МОМЕНТУ? → РЕЗУЛЬТАТ</p>
              <p className="text-sm text-muted-foreground">Что уже будет готово к точке</p>
              <p className="font-mono text-sm font-semibold">By 8, Tom will have finished his homework.</p>
            </div>
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">Две пары</h2>
            <div className="rounded-xl bg-muted p-4 text-sm">
              <p className="font-mono">I will finish the report tomorrow.</p>
              <p className="text-muted-foreground">Просто сообщаю, что это произойдёт.</p>
              <p className="mt-2 font-mono">I will have finished the report by tomorrow.</p>
              <p className="text-muted-foreground">Завтра отчёт уже будет готов.</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-sm">
              <p className="font-mono">When you wake up, I will leave.</p>
              <p className="text-muted-foreground">Ты проснёшься → потом я уйду.</p>
              <p className="mt-2 font-mono">When you wake up, I will have left.</p>
              <p className="text-muted-foreground">Когда ты проснёшься, меня уже не будет.</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Слово by помогает, но не решает всё. В живой речи «I'll finish it by Friday» тоже
              нормально. Поэтому в заданиях всегда смотри на ситуацию.
            </p>
          </section>

          <Tensy mood="map">
            Флажок в будущем поставлен. Что мы увидим: событие, процесс или уже готовый результат?
          </Tensy>

          <button
            type="button"
            onClick={() => setStage("simple")}
            className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:brightness-110"
          >
            К тренировке →
          </button>
        </>
      ) : null}

      {stage === "simple" ? (
        <Practice
          exercises={COMPARE_FSP_EXERCISES}
          tenseId={TENSE_ID}
          title="12 заданий: 6 — Future Simple, 6 — Future Perfect. Сначала подсказки, потом только ситуация."
          onFinish={() => setStage("continuous")}
          finishLabel="В момент или к моменту? →"
        />
      ) : null}

      {stage === "continuous" ? (
        <Practice
          exercises={COMPARE_FCP_EXERCISES}
          tenseId={TENSE_ID}
          title="10 заданий: В МОМЕНТ? → процесс (will be + V-ing). К МОМЕНТУ? → результат (will have + V3)."
          onFinish={() => setStage("theory")}
          finishLabel="Готово"
        />
      ) : null}
    </div>
  );
}
