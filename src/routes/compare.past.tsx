import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { COMPARE_PAST_EXERCISES } from "@/data/compare/past-simple-continuous";

export const Route = createFileRoute("/compare/past")({
  head: () => ({
    meta: [
      { title: "Past Simple или Past Continuous — разница и 15 упражнений" },
      {
        name: "description",
        content:
          "Что произошло или что происходило: понятное сравнение Past Simple и Past Continuous, процесс и событие, 15 упражнений с разбором.",
      },
      { property: "og:title", content: "Past Simple или Past Continuous?" },
      {
        property: "og:description",
        content: "● событие → Past Simple, ████ процесс → Past Continuous.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePastPage,
});

const PAIRS = [
  {
    who: "Фильм",
    simple: { en: "I watched a film yesterday.", ru: "Фильм посмотрел — законченное действие." },
    continuous: {
      en: "I was watching a film at 8 p.m.",
      ru: "В 8 часов я был в процессе просмотра.",
    },
  },
  {
    who: "Дорога домой",
    simple: { en: "I saw Anna near the shop.", ru: "Встреча — короткое событие." },
    continuous: { en: "I was walking home.", ru: "Прогулка — длительный фон." },
  },
];

function ComparePastPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Past Simple или Past Continuous?</h1>
        <p className="text-muted-foreground">
          Оба времени про прошлое. Разница в том, смотрим мы на факт или внутрь процесса.
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="text-xs font-bold tracking-widest text-primary">PAST SIMPLE</p>
              <p className="font-display text-xl font-bold">ЧТО ПРОИЗОШЛО?</p>
              <p className="font-mono text-sm">● событие / факт</p>
              <p className="pt-1 font-mono text-sm">V2 · did + V1</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-accent p-5">
              <p className="text-xs font-bold tracking-widest text-accent-foreground">
                PAST CONTINUOUS
              </p>
              <p className="font-display text-xl font-bold">ЧТО ПРОИСХОДИЛО?</p>
              <p className="font-mono text-sm">████ процесс</p>
              <p className="pt-1 font-mono text-sm">was / were + V-ing</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Одна ситуация — два взгляда</h2>
            {PAIRS.map((p) => (
              <div key={p.who} className="card-surface grid gap-3 p-5 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary/30 p-3">
                  <p className="text-xs font-bold tracking-widest text-primary">СОБЫТИЕ</p>
                  <p className="mt-1 font-mono text-sm">{p.simple.en}</p>
                  <p className="text-sm text-muted-foreground">{p.simple.ru}</p>
                </div>
                <div className="rounded-xl border-2 border-accent/40 p-3">
                  <p className="text-xs font-bold tracking-widest text-accent-foreground">
                    ПРОЦЕСС
                  </p>
                  <p className="mt-1 font-mono text-sm">{p.continuous.en}</p>
                  <p className="text-sm text-muted-foreground">{p.continuous.ru}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">Главная конструкция: PROCESS + EVENT</h2>
            <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`██████████████████
        ●
walking
        saw Anna`}
            </pre>
            <p className="font-mono text-sm">I was walking home when I saw Anna.</p>
            <p className="text-sm text-muted-foreground">
              was walking — фон и процесс, saw — событие.
            </p>
            <p className="font-mono text-sm">
              The children were playing outside when it started to rain.
            </p>
          </section>

          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xl">Не учи механически</h2>
            <p className="text-sm text-muted-foreground">
              Правило «when = Past Simple, while = Past Continuous» слишком упрощённое. When часто
              вводит событие, while часто связывает процессы, но выбор времени зависит от того, как
              говорящий представляет действие. В заданиях ниже контекст однозначный.
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
            exercises={COMPARE_PAST_EXERCISES}
            tenseId="compare-past"
            title="15 заданий: сначала явный контекст, потом решаешь сам — процесс или событие."
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
