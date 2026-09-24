import { createFileRoute, Link } from "@tanstack/react-router";
import { getTenseProgress, useProgress } from "@/lib/progress";
import { COUNTS } from "@/lib/tense-stats";
import { Tensy } from "@/components/Tensy";
import { TenseTypeBadge } from "@/components/TenseTypeBadge";

export const Route = createFileRoute("/tests")({
  head: () => ({
    meta: [
      { title: "Проверяю себя — English Tenses Trainer" },
      {
        name: "description",
        content: "Тесты по временам английского без подсказок: мини-тесты и итоговое испытание.",
      },
      { property: "og:title", content: "Проверяю себя — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Проверь себя: тесты без подсказок, Present, Past и Future Challenge и Final Challenge.",
      },
    ],
  }),
  component: TestsPage,
});

const TESTS = [
  { id: "present-simple", title: "Present Simple", to: "/learn/present-simple" as const },
  { id: "present-continuous", title: "Present Continuous", to: "/learn/present-continuous" as const },
  { id: "present-perfect", title: "Present Perfect", to: "/learn/present-perfect" as const },
  {
    id: "present-perfect-continuous",
    title: "Present Perfect Continuous",
    to: "/learn/present-perfect-continuous" as const,
  },
  { id: "past-simple", title: "Past Simple", to: "/learn/past-simple" as const },
  { id: "past-continuous", title: "Past Continuous", to: "/learn/past-continuous" as const },
  { id: "past-perfect", title: "Past Perfect", to: "/learn/past-perfect" as const },
  {
    id: "past-perfect-continuous",
    title: "Past Perfect Continuous",
    to: "/learn/past-perfect-continuous" as const,
  },
  { id: "future-simple", title: "Future Simple", to: "/learn/future-simple" as const },
  {
    id: "future-continuous",
    title: "Future Continuous",
    to: "/learn/future-continuous" as const,
  },
  { id: "future-perfect", title: "Future Perfect", to: "/learn/future-perfect" as const },
  {
    id: "future-perfect-continuous",
    title: "Future Perfect Continuous",
    to: "/learn/future-perfect-continuous" as const,
  },
];

function TestsPage() {
  const progress = useProgress();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl">🏆 Проверяю себя</h1>
        <p className="mt-2 text-muted-foreground">
          Тесты идут без подсказок и без шпаргалки — так видно настоящий уровень.
        </p>
      </header>

      <div className="space-y-3">
        {TESTS.map((t) => {
          const p = progress ? getTenseProgress(progress, t.id) : null;
          const total = COUNTS[t.id]?.test ?? 0;
          return (
            <Link
              key={t.id}
              to={t.to}
              search={{ tab: "test" as const }}
              className="card-interactive block p-5"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold">{t.title}</p>
                  <div className="mt-1">
                    <TenseTypeBadge tenseId={t.id} />
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">Начать тест →</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Последний: {p?.lastTestScore !== null && p ? `${p.lastTestScore}/${p.testTotal}` : "—"} ·
                Лучший: {p?.bestTestScore !== null && p ? `${p.bestTestScore}/${p.testTotal}` : "—"} ·
                Вопросов: {total}
              </p>
            </Link>
          );
        })}

        <Link
          to="/all-present"
          search={{ tab: "exam" as const }}
          className="card-interactive block p-5"
        >
          <p className="font-display text-lg font-bold">🏆 Present Challenge</p>
          <p className="mt-1 text-sm text-muted-foreground">
            20 заданий: сам выбираешь время, интерфейс нейтральный.
          </p>
          <p className="mt-3 text-sm font-bold text-primary">Начать тест →</p>
        </Link>
        <Link
          to="/all-past"
          search={{ tab: "exam" as const }}
          className="card-interactive block p-5"
        >
          <p className="font-display text-lg font-bold">🏆 Past Challenge</p>
          <p className="mt-1 text-sm text-muted-foreground">
            20 заданий по всем временам прошлого. Никаких подсказок.
          </p>
          <p className="mt-3 text-sm font-bold text-primary">Начать тест →</p>
        </Link>
        <Link
          to="/coordinates"
          search={{ tab: "checkpoint" as const }}
          className="card-interactive block p-5"
        >
          <p className="font-display text-lg font-bold">🧭 Checkpoint: координаты</p>
          <p className="mt-1 text-sm text-muted-foreground">12 новых заданий — по одному на каждое время.</p>
          <p className="mt-3 text-sm font-bold text-primary">Начать →</p>
        </Link>
        <Link
          to="/all-future"
          search={{ tab: "exam" as const }}
          className="card-interactive block p-5"
        >
          <p className="font-display text-lg font-bold">🏆 Future Challenge</p>
          <p className="mt-1 text-sm text-muted-foreground">
            20 заданий по всем временам будущего. Никаких подсказок.
          </p>
          <p className="mt-3 text-sm font-bold text-primary">Начать тест →</p>
        </Link>
        <Link to="/final" className="card-interactive block p-5">
          <p className="font-display text-lg font-bold">🏁 Final Challenge</p>
          <p className="mt-1 text-sm text-muted-foreground">Итоговая проверка всех 12 времён</p>
          <p className="mt-1 text-xs text-muted-foreground">30 заданий • все 12 времён • без подсказок</p>
          <p className="mt-3 text-sm font-bold text-primary">Пройти Final Challenge →</p>
        </Link>
      </div>

      <Tensy mood="test">
        В тесте нет подсказок по цвету и символам — это проверка, а не тренировка.
      </Tensy>
    </div>
  );
}
