import { createFileRoute, Link } from "@tanstack/react-router";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/progress";
import { overall } from "@/lib/tense-stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "English Tenses Trainer — тренажёр времён английского языка" },
      {
        name: "description",
        content:
          "Интерактивный тренажёр времён английского языка для школьников: теория, формулы, упражнения и мини-тесты.",
      },
      { property: "og:title", content: "English Tenses Trainer" },
      {
        property: "og:description",
        content: "Разберись во временах английского, а не просто заучи правила.",
      },
    ],
  }),
  component: Home,
});

const SECTIONS = [
  {
    title: "Учим времена",
    description: "Разбираем каждое время отдельно: правило → формула → практика.",
    action: "Начать",
    to: "/learn" as const,
    available: true,
  },
  {
    title: "Сравниваем времена",
    description: "Учимся понимать разницу между похожими временами.",
    action: "Скоро",
    to: "/compare" as const,
    available: false,
  },
  {
    title: "Все Present",
    description: "Сам выбираешь время по смыслу: 50 упражнений и финальный тест.",
    action: "Начать",
    to: "/all-present" as const,
    available: true,
  },
  {
    title: "Все времена",
    description: "Смешанная тренировка на все 12 времён.",
    action: "Скоро",
    to: "/all-tenses" as const,
    available: false,
  },
];

function Home() {
  const progress = useProgress();
  const percent = overall(progress);
  const started = percent > 0;

  return (
    <div className="space-y-8">
      <section className="hero-surface rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl">English Tenses Trainer</h1>
        <p className="mt-3 max-w-xl text-base opacity-90">
          Разберись во временах английского, а не просто заучи правила
        </p>
        <div className="mt-6 max-w-sm rounded-2xl bg-card/95 p-4 text-foreground">
          <ProgressBar value={percent} label="Твой прогресс" />
          <Link
            to="/learn/present-simple"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110"
          >
            {started ? "Продолжить обучение" : "Начать обучение"}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {SECTIONS.map((s) => (
          <article key={s.title} className="card-surface flex flex-col gap-3 p-5">
            <h2 className="text-lg">{s.title}</h2>
            <p className="flex-1 text-sm text-muted-foreground">{s.description}</p>
            {s.available ? (
              <Link
                to={s.to}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
              >
                {s.action}
              </Link>
            ) : (
              <Link
                to={s.to}
                className="inline-flex items-center justify-center rounded-xl bg-muted px-4 py-2 text-sm font-bold text-muted-foreground"
              >
                Скоро
              </Link>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
