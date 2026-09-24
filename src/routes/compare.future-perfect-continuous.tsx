import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PerfectContinuousFamily } from "@/components/PerfectContinuousFamily";
import { Practice } from "@/components/present-simple/Practice";
import { Tensy } from "@/components/Tensy";
import { COMPARE_FPC_FUTURE_EXERCISES } from "@/data/compare/future-perfect-continuous";

export const Route = createFileRoute("/compare/future-perfect-continuous")({
  head: () => ({
    meta: [
      { title: "Future Perfect или Future Perfect Continuous — результат или длительность?" },
      {
        name: "description",
        content:
          "Что будет готово к моменту — или как долго это уже будет происходить? 15 упражнений на выбор между Future Perfect и Future Perfect Continuous.",
      },
      { property: "og:title", content: "Future Perfect vs Future Perfect Continuous" },
      { property: "og:description", content: "Сколько будет сделано или как долго будет длиться — выбираем по смыслу." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНЕНИЕ</p>
        <h1 className="text-3xl">Future Perfect vs Future Perfect Continuous</h1>
        <p className="text-muted-foreground">Что будет готово? — или — как долго это уже будет происходить?</p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">FUTURE PERFECT</p>
              <p className="font-display font-bold">ЧТО / СКОЛЬКО БУДЕТ ГОТОВО? ✓</p>
              <p className="text-sm text-muted-foreground">Результат, количество: three chapters, the whole fence</p>
              <p className="font-mono text-sm font-semibold">By 6, Tom will have read three chapters.</p>
            </div>
            <div className="card-surface space-y-2 p-5">
              <p className="font-display text-sm font-bold tracking-widest text-primary">FUTURE PERFECT CONTINUOUS</p>
              <p className="font-display font-bold">КАК ДОЛГО УЖЕ БУДЕТ ИДТИ? ⏱</p>
              <p className="text-sm text-muted-foreground">Длительность процесса: for three hours, since 3</p>
              <p className="font-mono text-sm font-semibold">By 6, Tom will have been reading for three hours.</p>
            </div>
          </section>
          <PerfectContinuousFamily highlight="future" />
          <Tensy mood="map">
            Спроси себя: я считаю готовый результат или запускаю таймер процесса?
          </Tensy>
          <button
            type="button"
            onClick={() => setStage("practice")}
            className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:brightness-110"
          >
            К тренировке →
          </button>
        </>
      ) : (
        <Practice
          exercises={COMPARE_FPC_FUTURE_EXERCISES}
          tenseId="compare-future-perfect-continuous"
          title="15 заданий: сначала явный контраст, потом ситуации, в конце — почти без подсказок."
          onFinish={() => setStage("theory")}
          finishLabel="Готово"
        />
      )}
    </div>
  );
}
