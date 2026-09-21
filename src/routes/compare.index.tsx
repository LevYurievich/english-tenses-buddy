import { createFileRoute, Link } from "@tanstack/react-router";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/progress";
import { percentFor } from "@/lib/tense-stats";

export const Route = createFileRoute("/compare/")({
  head: () => ({
    meta: [
      { title: "Сравниваем времена — English Tenses Trainer" },
      {
        name: "description",
        content:
          "Разбираемся, чем Present Simple отличается от Present Continuous, и тренируемся выбирать время по смыслу.",
      },
      { property: "og:title", content: "Сравниваем времена — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Present Simple или Present Continuous? Понятное объяснение и 10 упражнений.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});

const SOON = ["Все времена Future"];

function ComparePage() {
  const progress = useProgress();
  const percent = percentFor(progress, "compare-present");
  const percentPerfect = percentFor(progress, "compare-perfect");
  const percentPpc = percentFor(progress, "compare-perfect-continuous");
  const percentPast = percentFor(progress, "compare-past");
  const percentPastPerfect = percentFor(progress, "compare-past-perfect");
  const percentPfc = percentFor(progress, "compare-past-perfect-continuous");
  const percentFuture = percentFor(progress, "compare-future");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-widest text-primary">СРАВНИВАЕМ ВРЕМЕНА</p>
        <h1 className="text-3xl">Похожие времена рядом</h1>
        <p className="text-muted-foreground">
          Учимся выбирать время по смыслу ситуации, а не только по словам-подсказкам.
        </p>
      </header>

      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Present Simple или Present Continuous?</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">ОБЫЧНО → SIMPLE • СЕЙЧАС → CONTINUOUS</p>
        <ProgressBar value={percent} label="Прогресс" />
        <Link
          to="/compare/present"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percent > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>

      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Present Perfect или Past Simple?</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          КОГДА? → PAST SIMPLE • РЕЗУЛЬТАТ СЕЙЧАС → PRESENT PERFECT
        </p>
        <ProgressBar value={percentPerfect} label="Прогресс" />
        <Link
          to="/compare/perfect"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percentPerfect > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>

      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Present Perfect или Present Perfect Continuous?</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          РЕЗУЛЬТАТ → PERFECT • ПРОЦЕСС И ДЛИТЕЛЬНОСТЬ → PERFECT CONTINUOUS
        </p>
        <ProgressBar value={percentPpc} label="Прогресс" />
        <Link
          to="/compare/perfect-continuous"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percentPpc > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>

      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Past Simple или Past Continuous?</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          ЧТО ПРОИЗОШЛО? → PAST SIMPLE • ЧТО ПРОИСХОДИЛО? → PAST CONTINUOUS
        </p>
        <ProgressBar value={percentPast} label="Прогресс" />
        <Link
          to="/compare/past"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percentPast > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>

      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Past Perfect или Past Simple?</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          СОБЫТИЕ ● → PAST SIMPLE • РАНЬШЕ ДРУГОГО МОМЕНТА → HAD + V3
        </p>
        <ProgressBar value={percentPastPerfect} label="Прогресс" />
        <Link
          to="/compare/past-perfect"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percentPastPerfect > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>

      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Past Perfect или Past Perfect Continuous?</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          РЕЗУЛЬТАТ → HAD + V3 • ПРОЦЕСС И ДЛИТЕЛЬНОСТЬ → HAD BEEN + V-ING
        </p>
        <ProgressBar value={percentPfc} label="Прогресс" />
        <Link
          to="/compare/past-perfect-continuous"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percentPfc > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>
      <article className="card-surface flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg">Три способа говорить о будущем</h2>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            Доступно
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          РЕШЕНИЕ СЕЙЧАС → WILL • НАМЕРЕНИЕ → BE GOING TO • ДОГОВОРЁННОСТЬ → PRESENT CONTINUOUS
        </p>
        <ProgressBar value={percentFuture} label="Прогресс" />
        <Link
          to="/compare/future"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {percentFuture > 0 ? "Продолжить" : "Начать"}
        </Link>
      </article>


      <section className="card-surface space-y-3 p-5">
        <h2 className="text-lg">Скоро</h2>
        <ul className="space-y-2">
          {SOON.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 px-4 py-3 text-sm"
            >
              <span>{item}</span>
              <span className="text-xs font-bold text-muted-foreground">Скоро</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
