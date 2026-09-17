import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { COMPARE_PRESENT_EXERCISES } from "@/data/compare/present-simple-continuous";

export const Route = createFileRoute("/compare/present")({
  head: () => ({
    meta: [
      { title: "Present Simple или Present Continuous — разница и тренировка" },
      {
        name: "description",
        content:
          "Простое объяснение разницы: обычно → Present Simple, сейчас и в процессе → Present Continuous. 10 упражнений с разбором.",
      },
      { property: "og:title", content: "Present Simple или Present Continuous?" },
      {
        property: "og:description",
        content: "ОБЫЧНО → SIMPLE, СЕЙЧАС → CONTINUOUS: наглядное сравнение и 10 заданий.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePresentPage,
});

const PAIRS = [
  {
    who: "Anna",
    usual: { en: "Anna reads books every evening.", ru: "Анна читает книги каждый вечер." },
    now: { en: "Anna is reading a book.", ru: "Анна сейчас читает книгу." },
  },
  {
    who: "Tom",
    usual: { en: "Tom plays computer games after school.", ru: "Том играет в игры после школы." },
    now: { en: "Tom is doing his homework.", ru: "Сейчас Том делает домашнее задание." },
  },
];

function ComparePresentPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Present Simple или Present Continuous?</h1>
        <p className="text-muted-foreground">
          Время выбирает не глагол, а ситуация: привычка или процесс.
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="text-xs font-bold tracking-widest text-primary">PRESENT SIMPLE</p>
              <p className="font-display text-xl font-bold">ОБЫЧНО</p>
              <p className="font-mono text-sm">I play football every Saturday.</p>
              <p className="text-sm text-muted-foreground">Я играю в футбол каждую субботу.</p>
              <p className="pt-2 font-mono text-lg tracking-widest">● ● ● ● ●</p>
              <p className="text-xs text-muted-foreground">регулярно повторяется</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-accent p-5">
              <p className="text-xs font-bold tracking-widest text-accent-foreground">
                PRESENT CONTINUOUS
              </p>
              <p className="font-display text-xl font-bold">СЕЙЧАС / В ПРОЦЕССЕ</p>
              <p className="font-mono text-sm">I am playing football.</p>
              <p className="text-sm text-muted-foreground">Я сейчас играю в футбол.</p>
              <p className="pt-2 font-mono text-lg tracking-widest">────████────</p>
              <p className="text-xs text-muted-foreground">действие идёт прямо сейчас</p>
            </div>
          </section>

          <section className="card-surface space-y-2 p-5 text-center">
            <p className="font-display text-lg font-bold">
              ОБЫЧНО → SIMPLE &nbsp;•&nbsp; СЕЙЧАС / ПРОЦЕСС → CONTINUOUS
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Одна ситуация — два варианта</h2>
            {PAIRS.map((p) => (
              <div key={p.who} className="card-surface grid gap-3 p-5 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary/30 p-3">
                  <p className="text-xs font-bold tracking-widest text-primary">ОБЫЧНО</p>
                  <p className="mt-1 font-mono text-sm">{p.usual.en}</p>
                  <p className="text-sm text-muted-foreground">{p.usual.ru}</p>
                </div>
                <div className="rounded-xl border-2 border-accent/40 p-3">
                  <p className="text-xs font-bold tracking-widest text-accent-foreground">СЕЙЧАС</p>
                  <p className="mt-1 font-mono text-sm">{p.now.en}</p>
                  <p className="text-sm text-muted-foreground">{p.now.ru}</p>
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              Видишь: глагол может быть любым. Время подсказывает ситуация.
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
            exercises={COMPARE_PRESENT_EXERCISES}
            tenseId="compare-present"
            title="10 заданий на выбор времени. Часть из них решается только по смыслу."
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
