import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { COMPARE_PPC_EXERCISES } from "@/data/compare/perfect-vs-perfect-continuous";
import { STATIVE_VERBS } from "@/data/present-perfect-continuous/theory";

export const Route = createFileRoute("/compare/perfect-continuous")({
  head: () => ({
    meta: [
      { title: "Present Perfect или Present Perfect Continuous — разница" },
      {
        name: "description",
        content:
          "Результат или процесс: понятное сравнение Present Perfect и Present Perfect Continuous и 8 упражнений с разбором.",
      },
      { property: "og:title", content: "Present Perfect или Present Perfect Continuous?" },
      {
        property: "og:description",
        content: "РЕЗУЛЬТАТ → PERFECT, ПРОЦЕСС И ДЛИТЕЛЬНОСТЬ → PERFECT CONTINUOUS.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePerfectContinuousPage,
});

const PAIRS = [
  {
    who: "Книга",
    perfect: { en: "I have read the book.", ru: "Я прочитал книгу. Важен результат: книга прочитана." },
    continuous: {
      en: "I have been reading the book for two hours.",
      ru: "Я читаю книгу уже два часа. Важен процесс и его длительность.",
    },
  },
  {
    who: "Кухня",
    perfect: { en: "She has cleaned the kitchen.", ru: "Кухня убрана — результат." },
    continuous: {
      en: "She has been cleaning the kitchen for two hours.",
      ru: "Она убиралась два часа — процесс и длительность.",
    },
  },
];

function ComparePerfectContinuousPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Present Perfect или Present Perfect Continuous?</h1>
        <p className="text-muted-foreground">
          Оба времени связывают прошлое с настоящим. Разница в том, что в центре внимания.
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="text-xs font-bold tracking-widest text-primary">PRESENT PERFECT</p>
              <p className="font-display text-xl font-bold">РЕЗУЛЬТАТ</p>
              <p className="text-sm text-muted-foreground">
                Чаще всего важен готовый итог: что сделано к этому моменту.
              </p>
              <p className="pt-2 font-mono text-sm">have / has + V3</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-accent p-5">
              <p className="text-xs font-bold tracking-widest text-accent-foreground">
                PRESENT PERFECT CONTINUOUS
              </p>
              <p className="font-display text-xl font-bold">ПРОЦЕСС / ДЛИТЕЛЬНОСТЬ</p>
              <p className="text-sm text-muted-foreground">
                Чаще всего важно, как долго идёт процесс или что он оставил после себя.
              </p>
              <p className="pt-2 font-mono text-sm">have / has + been + V-ing</p>
            </div>
          </section>

          <p className="text-sm text-muted-foreground">
            Это не абсолютное правило без исключений: иногда возможны оба варианта, и они просто
            меняют акцент. В заданиях ниже контекст подобран так, чтобы ответ был однозначным.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl">Одна ситуация — два взгляда</h2>
            {PAIRS.map((p) => (
              <div key={p.who} className="card-surface grid gap-3 p-5 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary/30 p-3">
                  <p className="text-xs font-bold tracking-widest text-primary">РЕЗУЛЬТАТ</p>
                  <p className="mt-1 font-mono text-sm">{p.perfect.en}</p>
                  <p className="text-sm text-muted-foreground">{p.perfect.ru}</p>
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
            <h2 className="text-xl">Осторожно: FOR ≠ всегда Continuous</h2>
            <p className="text-sm text-muted-foreground">
              Некоторые глаголы состояния обычно не используются в Continuous.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATIVE_VERBS.map((v) => (
                <span key={v} className="rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold">
                  {v}
                </span>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-success/40 bg-success/10 p-4 text-sm">
                ✓ I have known Anna for five years.
              </div>
              <div className="rounded-xl border-2 border-destructive/40 bg-destructive/10 p-4 text-sm">
                ✕ I have been knowing Anna for five years.
              </div>
            </div>
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
            exercises={COMPARE_PPC_EXERCISES}
            tenseId="compare-perfect-continuous"
            title="8 заданий: решай по контексту — важен результат или процесс."
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
