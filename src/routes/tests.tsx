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
        content: "Проверь себя: тесты без подсказок и итоговое испытание Present.",
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
          <p className="font-display text-lg font-bold">🏆 Испытание Present</p>
          <p className="mt-1 text-sm text-muted-foreground">
            20 заданий: сам выбираешь время, интерфейс нейтральный.
          </p>
          <p className="mt-3 text-sm font-bold text-primary">Начать тест →</p>
        </Link>
      </div>

      <Tensy mood="hint">
        В тесте нет подсказок по цвету и символам — это проверка, а не тренировка.
      </Tensy>
    </div>
  );
}
