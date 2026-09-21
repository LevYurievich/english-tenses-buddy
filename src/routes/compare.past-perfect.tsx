import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { COMPARE_PAST_PERFECT_EXERCISES } from "@/data/compare/past-perfect-simple";

export const Route = createFileRoute("/compare/past-perfect")({
  head: () => ({
    meta: [
      { title: "Past Perfect или Past Simple — разница и 15 упражнений" },
      {
        name: "description",
        content:
          "Событие прошлого или то, что случилось раньше другого момента: сравнение Past Simple и Past Perfect, временные линии, 15 упражнений с разбором.",
      },
      { property: "og:title", content: "Past Perfect или Past Simple?" },
      {
        property: "og:description",
        content: "● событие → Past Simple, ещё раньше → had + V3.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePastPerfectPage,
});

const PAIRS = [
  {
    who: "Том уходит",
    simple: { en: "Tom left at 6 p.m.", ru: "Просто факт прошлого." },
    perfect: {
      en: "When I arrived at 7 p.m., Tom had left.",
      ru: "Уход произошёл до другого прошлого события.",
    },
  },
  {
    who: "Завтрак",
    simple: { en: "I ate breakfast at 8.", ru: "Одно событие прошлого." },
    perfect: {
      en: "By the time I left home, I had eaten breakfast.",
      ru: "Завтрак закончился к моменту ухода.",
    },
  },
];

function ComparePastPerfectPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Past Perfect или Past Simple?</h1>
        <p className="text-muted-foreground">
          Оба времени про прошлое. Разница в том, показываем ли мы, что одно событие случилось
          раньше другого.
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="text-xs font-bold tracking-widest text-primary">PAST SIMPLE</p>
              <p className="font-display text-xl font-bold">СОБЫТИЕ В ПРОШЛОМ</p>
              <p className="font-mono text-sm">● факт</p>
              <p className="pt-1 font-mono text-sm">V2 · did + V1</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-accent p-5">
              <p className="text-xs font-bold tracking-widest text-accent-foreground">
                PAST PERFECT
              </p>
              <p className="font-display text-xl font-bold">РАНЬШЕ ДРУГОГО МОМЕНТА</p>
              <p className="font-mono text-sm">● ──── ● позже</p>
              <p className="pt-1 font-mono text-sm">had + V3</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Одна ситуация — два взгляда</h2>
            {PAIRS.map((p) => (
              <div key={p.who} className="card-surface grid gap-3 p-5 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary/30 p-3">
                  <p className="text-xs font-bold tracking-widest text-primary">PAST SIMPLE</p>
                  <p className="mt-1 font-mono text-sm">{p.simple.en}</p>
                  <p className="text-sm text-muted-foreground">{p.simple.ru}</p>
                </div>
                <div className="rounded-xl border-2 border-accent/40 p-3">
                  <p className="text-xs font-bold tracking-widest text-accent-foreground">
                    PAST PERFECT
                  </p>
                  <p className="mt-1 font-mono text-sm">{p.perfect.en}</p>
                  <p className="text-sm text-muted-foreground">{p.perfect.ru}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">Расставь события</h2>
            <p className="font-mono text-sm">The film had started before I arrived.</p>
            <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`FILM STARTED      I ARRIVED        NOW
   ●────────────────●──────────────●
 раньше            позже`}
            </pre>
            <p className="text-sm text-muted-foreground">
              Past Perfect → had started, Past Simple → arrived.
            </p>
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">Точка отсчёта</h2>
            <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-base font-bold">
              PERFECT = СМОТРИМ НАЗАД ОТ ТОЧКИ
            </p>
            <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PRESENT PERFECT
PAST ●──────────────→ NOW ★

PAST PERFECT
PAST ●────→ PAST ★────────→ NOW`}
            </pre>
            <p className="font-mono text-sm">I have lost my key. → важно сейчас</p>
            <p className="font-mono text-sm">
              I had lost my key before I got home. → важно в тот момент прошлого
            </p>
          </section>

          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xl">Не учи механически</h2>
            <p className="text-sm text-muted-foreground">
              Правило «если два действия в прошлом, первое всегда Past Perfect» неверно. Past
              Perfect нужен, когда важно подчеркнуть, что действие случилось раньше другого момента.
              Если порядок и так понятен, естественным будет Past Simple. В заданиях ниже контекст
              однозначный.
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
            exercises={COMPARE_PAST_PERFECT_EXERCISES}
            tenseId="compare-past-perfect"
            title="15 заданий: сначала готовая линия времени, потом ты строишь её сам."
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
