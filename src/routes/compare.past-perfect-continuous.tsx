import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { COMPARE_PFC_EXERCISES } from "@/data/compare/past-perfect-continuous";

export const Route = createFileRoute("/compare/past-perfect-continuous")({
  head: () => ({
    meta: [
      { title: "Past Perfect или Past Perfect Continuous — разница и 15 упражнений" },
      {
        name: "description",
        content:
          "Результат до момента прошлого или длительность процесса: сравнение Past Perfect и Past Perfect Continuous, понятные пары примеров и 15 упражнений с разбором.",
      },
      { property: "og:title", content: "Past Perfect или Past Perfect Continuous?" },
      {
        property: "og:description",
        content: "СКОЛЬКО СДЕЛАНО → had + V3 • КАК ДОЛГО ДЕЛАЛ → had been + V-ing.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePfcPage,
});

const PAIRS = [
  {
    who: "Письма",
    perfect: { en: "Tom had written five emails before lunch.", ru: "Важен результат: пять писем готовы." },
    continuous: {
      en: "Tom had been writing emails for two hours before lunch.",
      ru: "Важны процесс и длительность: два часа.",
    },
  },
  {
    who: "Кухня",
    perfect: {
      en: "She had cleaned the kitchen before the guests arrived.",
      ru: "Кухня была убрана — результат.",
    },
    continuous: {
      en: "She had been cleaning the kitchen for two hours before the guests arrived.",
      ru: "Она занималась уборкой два часа — процесс.",
    },
  },
];

function ComparePfcPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Past Perfect или Past Perfect Continuous?</h1>
        <p className="text-muted-foreground">
          Оба времени смотрят назад от момента прошлого. Разница в том, что важнее: результат или
          длительность процесса.
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="text-xs font-bold tracking-widest text-primary">PAST PERFECT</p>
              <p className="font-display text-xl font-bold">РЕЗУЛЬТАТ до момента прошлого</p>
              <p className="font-mono text-sm">had + V3</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-accent p-5">
              <p className="text-xs font-bold tracking-widest text-accent-foreground">
                PAST PERFECT CONTINUOUS
              </p>
              <p className="font-display text-xl font-bold">ПРОЦЕСС и ДЛИТЕЛЬНОСТЬ до него</p>
              <p className="font-mono text-sm">had + been + V-ing</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Одна ситуация — два взгляда</h2>
            {PAIRS.map((p) => (
              <div key={p.who} className="card-surface grid gap-3 p-5 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary/30 p-3">
                  <p className="text-xs font-bold tracking-widest text-primary">PAST PERFECT</p>
                  <p className="mt-1 font-mono text-sm">{p.perfect.en}</p>
                  <p className="text-sm text-muted-foreground">{p.perfect.ru}</p>
                </div>
                <div className="rounded-xl border-2 border-accent/40 p-3">
                  <p className="text-xs font-bold tracking-widest text-accent-foreground">
                    PAST PERFECT CONTINUOUS
                  </p>
                  <p className="mt-1 font-mono text-sm">{p.continuous.en}</p>
                  <p className="text-sm text-muted-foreground">{p.continuous.ru}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">Количество или длительность?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-border p-4">
                <p className="font-display font-bold">СКОЛЬКО СДЕЛАНО?</p>
                <p className="font-mono text-sm">She had written 5 pages.</p>
                <p className="text-sm text-muted-foreground">фокус на результате → Past Perfect</p>
              </div>
              <div className="rounded-xl border-2 border-border p-4">
                <p className="font-display font-bold">КАК ДОЛГО ДЕЛАЛ?</p>
                <p className="font-mono text-sm">She had been writing for 2 hours.</p>
                <p className="text-sm text-muted-foreground">
                  фокус на процессе → Past Perfect Continuous
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Это полезный ориентир, а не абсолютное правило.
            </p>
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">И ещё сравнение: Past Continuous</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-border p-4">
                <p className="text-xs font-bold tracking-widest text-muted-foreground">
                  PAST CONTINUOUS
                </p>
                <p className="mt-1 font-display font-bold">ПРОЦЕСС В МОМЕНТ ПРОШЛОГО</p>
                <p className="font-mono text-sm">At 8 p.m. I was studying.</p>
              </div>
              <div className="rounded-xl border-2 border-primary/40 p-4">
                <p className="text-xs font-bold tracking-widest text-primary">
                  PAST PERFECT CONTINUOUS
                </p>
                <p className="mt-1 font-display font-bold">ПРОЦЕСС ДО МОМЕНТА ПРОШЛОГО</p>
                <p className="font-mono text-sm">By 8 p.m. I had been studying for two hours.</p>
              </div>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PAST CONTINUOUS
────────████ 20:00 ████────────

PAST PERFECT CONTINUOUS
████████████████→ 20:00 ★`}
            </pre>
          </section>

          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xl">Иногда возможны оба варианта</h2>
            <p className="font-mono text-sm">He had worked there for ten years.</p>
            <p className="font-mono text-sm">He had been working there for ten years.</p>
            <p className="text-sm text-muted-foreground">
              Без дополнительного контекста оба предложения правильные — меняется только фокус. В
              заданиях ниже контекст всегда подсказывает, что важнее.
            </p>
          </section>

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
            exercises={COMPARE_PFC_EXERCISES}
            tenseId="compare-past-perfect-continuous"
            title="15 заданий: сначала явный контраст, потом ты сам определяешь, что важнее."
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
