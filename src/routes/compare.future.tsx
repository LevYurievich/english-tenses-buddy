import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { Tensy } from "@/components/Tensy";
import { COMPARE_FUTURE_EXERCISES } from "@/data/compare/future-ways";
import { FUTURE_CONTRASTS, FUTURE_WAYS } from "@/data/future-simple/theory";

export const Route = createFileRoute("/compare/future")({
  head: () => ({
    meta: [
      { title: "WILL или BE GOING TO или Present Continuous — три способа о будущем" },
      {
        name: "description",
        content:
          "Короткое введение: WILL — решение сейчас, be going to — намерение, Present Continuous — договорённость. 12 упражнений с понятным контекстом.",
      },
      { property: "og:title", content: "Три способа говорить о будущем" },
      {
        property: "og:description",
        content: "WILL · BE GOING TO · PRESENT CONTINUOUS — когда какой вариант естественнее.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompareFuturePage,
});

function CompareFuturePage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">ВВЕДЕНИЕ</p>
        <h1 className="text-3xl">Три способа говорить о будущем</h1>
        <p className="text-muted-foreground">
          Это короткое введение, а не отдельный большой курс. Главное — не запомнить правило
          «будущее = WILL».
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            {FUTURE_WAYS.map((w) => (
              <div key={w.id} className="card-surface space-y-2 border-l-4 border-l-primary p-5">
                <p className="font-display text-sm font-bold tracking-widest text-primary">
                  {w.form}
                </p>
                <p className="font-display text-base font-bold">{w.meaning}</p>
                <p className="text-sm text-muted-foreground">{w.context}</p>
                <p className="font-mono text-sm font-semibold">{w.example}</p>
                <p className="text-sm text-muted-foreground">{w.ru}</p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Главные контрасты</h2>
            {FUTURE_CONTRASTS.map((c) => (
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
            <h2 className="text-xl">Границы не абсолютные</h2>
            <p className="text-sm text-muted-foreground">
              В реальном английском эти конструкции иногда пересекаются: одну и ту же ситуацию можно
              описать по-разному, слегка меняя смысл. Поэтому в заданиях ниже контекст всегда
              подсказывает, есть ли план, договорённость или решение возникло прямо сейчас.
            </p>
          </section>

          <Tensy mood="hint">
            Сначала спроси себя: решение появилось только что, намерение было раньше или встреча уже
            назначена?
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
            exercises={COMPARE_FUTURE_EXERCISES}
            tenseId="compare-future"
            title="12 заданий: 4 — WILL, 4 — be going to, 4 — Present Continuous для будущего."
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
