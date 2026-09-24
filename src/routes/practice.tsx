import { createFileRoute, Link } from "@tanstack/react-router";
import { useProgress } from "@/lib/progress";
import { weakCategories } from "@/lib/skill-stats";
import { CATEGORY_TITLES } from "@/data/error-categories";
import { COUNTS } from "@/lib/tense-stats";
import { getTenseProgress } from "@/lib/progress";
import { Tensy } from "@/components/Tensy";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Тренируюсь — English Tenses Trainer" },
      {
        name: "description",
        content:
          "Сравнение времён, смешанные задания, слабые места и работа над ошибками в одном месте.",
      },
      { property: "og:title", content: "Тренируюсь — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Тренировка выбора времени: сравнения, смешанные задания и разбор ошибок.",
      },
    ],
  }),
  component: PracticePage,
});

const CARDS = [
  {
    to: "/compare/present" as const,
    icon: "▶",
    title: "Simple vs Continuous",
    description: "Привычка или процесс прямо сейчас",
    id: "compare-present",
  },
  {
    to: "/compare/perfect" as const,
    icon: "✓",
    title: "Perfect vs Past Simple",
    description: "Связь с настоящим или завершённое прошлое",
    id: "compare-perfect",
  },
  {
    to: "/compare/perfect-continuous" as const,
    icon: "⏱",
    title: "Perfect vs Perfect Continuous",
    description: "Результат или длительность процесса",
    id: "compare-perfect-continuous",
  },
  {
    to: "/all-present" as const,
    icon: "🔁",
    title: "Все Present",
    description: "Сам выбираешь время по смыслу",
    id: "all-present",
  },
  {
    to: "/all-past" as const,
    icon: "🕰",
    title: "Все времена Past",
    description: "Четыре прошедших времени — выбираешь сам",
    id: "all-past",
  },
  {
    to: "/coordinates" as const,
    icon: "🧭",
    title: "Как выбрать время из 12?",
    description: "Две координаты: ГДЕ? и ЧТО?",
    id: "coordinates",
  },
  {
    to: "/all-12" as const,
    icon: "🌐",
    title: "Все 12 времён",
    description: "Смешанная тренировка без подсказки категории",
    id: "all-12",
  },
  {
    to: "/final" as const,
    icon: "🏁",
    title: "Final Challenge",
    description: "30 заданий на все 12 времён — без подсказок",
    id: "final-challenge",
  },
  {
    to: "/all-future" as const,
    icon: "🔮",
    title: "Все времена Future",
    description: "Четыре времени будущего — выбираешь сам",
    id: "all-future",
  },
  {
    to: "/compare/future" as const,
    icon: "🚀",
    title: "Три способа о будущем",
    description: "will · be going to · Present Continuous",
    id: "compare-future",
  },
  {
    to: "/compare/future-continuous" as const,
    icon: "🔭",
    title: "Future Simple vs Future Continuous",
    description: "Событие или процесс в момент будущего?",
    id: "compare-future-continuous",
  },
  {
    to: "/compare/future-perfect" as const,
    icon: "🎯",
    title: "Future Simple vs Future Perfect",
    description: "Событие, процесс в момент или результат к моменту?",
    id: "compare-future-perfect",
  },
  {
    to: "/compare/future-perfect-continuous" as const,
    icon: "⏱",
    title: "Future Perfect vs Future Perfect Continuous",
    description: "Что будет готово или как долго уже будет идти?",
    id: "compare-future-perfect-continuous",
  },
];

function PracticePage() {
  const progress = useProgress();
  const weak = weakCategories(progress);
  const mistakes = progress?.mistakes.length ?? 0;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl">🎯 Тренируюсь</h1>
        <p className="mt-2 text-muted-foreground">
          Здесь тренируется главное умение — выбирать время по смыслу ситуации.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/review" className="card-interactive border-primary/40 p-5 sm:col-span-2">
          <p className="font-display text-lg font-bold">🔁 Умное повторение</p>
          <p className="mt-1 text-sm text-muted-foreground">10 заданий по темам, где были ошибки</p>
        </Link>
        <Link to="/quick" search={{ mode: "quick" }} className="card-interactive p-5">
          <p className="font-display text-lg font-bold">⚡ Быстрая тренировка</p>
          <p className="mt-1 text-sm text-muted-foreground">10 вопросов из изученных тем</p>
        </Link>
        <Link to="/quick" search={{ mode: "weak" }} className="card-interactive p-5">
          <p className="font-display text-lg font-bold">🎯 Слабые места</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {weak.length
              ? weak
                  .slice(0, 3)
                  .map((w) => CATEGORY_TITLES[w.category] ?? w.category)
                  .join(", ")
              : "Слабых мест пока не видно"}
          </p>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => {
          const p = progress ? getTenseProgress(progress, c.id) : null;
          const total = COUNTS[c.id]?.exercises ?? 0;
          return (
            <Link key={c.to} to={c.to} className="card-interactive p-5">
              <p className="font-display text-lg font-bold">
                <span aria-hidden>{c.icon}</span> {c.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <p className="mt-3 text-sm font-bold text-primary">
                {p ? `${p.doneExercises.length} / ${total} заданий` : `${total} заданий`}
              </p>
            </Link>
          );
        })}
      </div>

      <Link to="/mistakes" className="card-interactive block p-5">
        <p className="font-display text-lg font-bold">🧠 Разбор ошибок</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {mistakes ? `Ошибок к повторению: ${mistakes}` : "Ошибок пока нет"}
        </p>
      </Link>

      <Tensy mood="motivation">
        Ошибка — это подсказка. Посмотри, какое правило повторяется чаще всего, и начни с него.
      </Tensy>
    </div>
  );
}
