import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { Tensy } from "@/components/Tensy";
import { COMPARE_FC_EXERCISES } from "@/data/compare/future-simple-continuous";
import { FS_VS_FC, PC_FUTURE_NOTE } from "@/data/future-continuous/theory";

export const Route = createFileRoute("/compare/future-continuous")({
  head: () => ({
    meta: [
      { title: "Future Simple или Future Continuous — событие или процесс?" },
      {
        name: "description",
        content:
          "Что произойдёт или что будет происходить в определённый момент? 15 упражнений на выбор между Future Simple и Future Continuous с понятным контекстом.",
      },
      { property: "og:title", content: "Future Simple vs Future Continuous" },
      {
        property: "og:description",
        content: "Событие, решение и прогноз — или процесс в конкретный момент будущего.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompareFutureContinuousPage,
});

function CompareFutureContinuousPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНЕНИЕ</p>
        <h1 className="text-3xl">Future Simple vs Future Continuous</h1>
        <p className="text-muted-foreground">
          Что произойдёт? — или — что будет происходить в определённый момент?
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">
                FUTURE SIMPLE
              </p>
              <p className="font-display text-base font-bold">ЧТО ПРОИЗОЙДЁТ?</p>
              <p className="text-sm text-muted-foreground">
                Событие · решение сейчас · прогноз · будущий факт
              </p>
              <p className="font-mono text-sm font-semibold">I'll call Tom tonight.</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-accent p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">
                FUTURE CONTINUOUS
              </p>
              <p className="font-display text-base font-bold">
                ЧТО БУДЕТ ПРОИСХОДИТЬ В ТОТ МОМЕНТ?
              </p>
              <p className="text-sm text-muted-foreground">Процесс вокруг точки будущего</p>
              <p className="font-mono text-sm font-semibold">
                At 8 tonight, I'll be talking to Tom.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Три пары для сравнения</h2>
            {FS_VS_FC.map((c) => (
              <div key={c.title} className="card-surface space-y-3 p-5">
                <p className="font-display text-lg font-bold">{c.title}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border-2 border-primary/30 p-3 text-sm">{c.left}</div>
                  <div className="rounded-xl border-2 border-accent/40 p-3 text-sm">{c.right}</div>
                </div>
                <p className="text-sm text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </section>

          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xl">Не путай с договорённостью</h2>
            <p className="font-mono text-sm font-semibold">{PC_FUTURE_NOTE.left}</p>
            <p className="text-sm text-muted-foreground">{PC_FUTURE_NOTE.leftNote}</p>
            <p className="font-mono text-sm font-semibold">{PC_FUTURE_NOTE.right}</p>
            <p className="text-sm text-muted-foreground">{PC_FUTURE_NOTE.rightNote}</p>
          </section>

          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xl">Иногда возможны оба варианта</h2>
            <p className="text-sm text-muted-foreground">
              «I'll work tomorrow» и «I'll be working tomorrow» — оба предложения естественные,
              меняется только фокус. Поэтому в заданиях ниже всегда есть контекст: конкретный момент,
              решение или прогноз.
            </p>
          </section>

          <Tensy mood="hint">
            Сначала спроси: что произойдёт — или что будет происходить в тот момент?
          </Tensy>

          <button
            type="button"
            onClick={() => setStage("practice")}
            className="w-full rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:brightness-110"
          >
            Я понял(а) → к тренировке
          </button>
        </>
      ) : (
        <>
          <Practice
            exercises={COMPARE_FC_EXERCISES}
            tenseId="compare-future-continuous"
            title="15 заданий: сначала явный контраст, потом жизненные ситуации, потом контекст без подсказок."
            onFinish={() => setStage("theory")}
            finishLabel="Вернуться к объяснению"
          />
          <Link
            to="/progress"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            Посмотреть прогресс
          </Link>
        </>
      )}
    </div>
  );
}
