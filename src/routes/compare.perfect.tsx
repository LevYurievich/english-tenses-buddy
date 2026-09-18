import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Practice } from "@/components/present-simple/Practice";
import { COMPARE_PERFECT_EXERCISES } from "@/data/compare/present-perfect-past-simple";

export const Route = createFileRoute("/compare/perfect")({
  head: () => ({
    meta: [
      { title: "Present Perfect или Past Simple — разница и тренировка" },
      {
        name: "description",
        content:
          "Когда важен момент прошлого, а когда результат сейчас: понятное сравнение Present Perfect и Past Simple и 15 заданий с разбором.",
      },
      { property: "og:title", content: "Present Perfect или Past Simple?" },
      {
        property: "og:description",
        content: "КОГДА? → Past Simple, РЕЗУЛЬТАТ СЕЙЧАС → Present Perfect. Сравнение и тренировка.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePerfectPage,
});

const PAIRS = [
  {
    who: "Ключ",
    past: { en: "I lost my key yesterday.", ru: "Я потерял ключ вчера. Когда? → yesterday." },
    perfect: { en: "I have lost my key.", ru: "Я потерял ключ. Сейчас ключа нет." },
  },
  {
    who: "Китай",
    past: { en: "I went to China in 2024.", ru: "Я ездил в Китай в 2024 году. Законченный период." },
    perfect: { en: "I have been to China.", ru: "Я был в Китае. Жизненный опыт." },
  },
];

const FINISHED_TIME = ["yesterday", "last week", "in 2020", "two days ago", "when I was ten"];

function ComparePerfectPage() {
  const [stage, setStage] = useState<"theory" | "practice">("theory");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Present Perfect или Past Simple?</h1>
        <p className="text-muted-foreground">
          Оба времени говорят о прошлом. Разница в том, что для нас важнее.
        </p>
      </header>

      {stage === "theory" ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface space-y-2 border-l-4 border-l-border p-5">
              <p className="text-xs font-bold tracking-widest text-muted-foreground">PAST SIMPLE</p>
              <p className="font-display text-xl font-bold">КОГДА?</p>
              <p className="text-sm text-muted-foreground">
                Действие относится к законченному моменту прошлого.
              </p>
              <p className="pt-2 font-mono text-sm">I lost my key yesterday.</p>
            </div>
            <div className="card-surface space-y-2 border-l-4 border-l-primary p-5">
              <p className="text-xs font-bold tracking-widest text-primary">PRESENT PERFECT</p>
              <p className="font-display text-xl font-bold">ЧТО ВАЖНО СЕЙЧАС?</p>
              <p className="text-sm text-muted-foreground">
                Результат или опыт к настоящему моменту. Точный момент прошлого не в фокусе.
              </p>
              <p className="pt-2 font-mono text-sm">I have lost my key.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Одна ситуация — два взгляда</h2>
            {PAIRS.map((p) => (
              <div key={p.who} className="card-surface grid gap-3 p-5 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-border p-3">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground">
                    PAST SIMPLE
                  </p>
                  <p className="mt-1 font-mono text-sm">{p.past.en}</p>
                  <p className="text-sm text-muted-foreground">{p.past.ru}</p>
                </div>
                <div className="rounded-xl border-2 border-primary/40 p-3">
                  <p className="text-xs font-bold tracking-widest text-primary">PRESENT PERFECT</p>
                  <p className="mt-1 font-mono text-sm">{p.perfect.en}</p>
                  <p className="text-sm text-muted-foreground">{p.perfect.ru}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="card-surface space-y-3 p-5">
            <h2 className="text-xl">Законченный момент прошлого</h2>
            <p className="text-sm text-muted-foreground">
              Если назван конкретный законченный момент прошлого, обычно нужен Past Simple.
            </p>
            <div className="flex flex-wrap gap-2">
              {FINISHED_TIME.map((w) => (
                <span
                  key={w}
                  className="rounded-lg border-2 border-dotted border-marker/60 bg-marker-soft px-3 py-2 text-sm font-semibold text-marker"
                >
                  {w}
                </span>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-destructive/40 bg-destructive/10 p-4 text-sm">
                ✕ I have seen him yesterday.
              </div>
              <div className="rounded-xl border-2 border-success/40 bg-success/10 p-4 text-sm">
                ✓ I saw him yesterday.
              </div>
            </div>
            <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
              Слова сами по себе не решают всё: today, this week, this year могут относиться к
              периоду, который ещё идёт. Тогда смотри на смысл ситуации.
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
            exercises={COMPARE_PERFECT_EXERCISES}
            tenseId="compare-perfect"
            title="Сначала определи сигнал, потом выбери время. Часть заданий решается только по смыслу."
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
