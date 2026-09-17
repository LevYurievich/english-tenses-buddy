import { createFileRoute } from "@tanstack/react-router";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/app-button";
import { TENSES } from "@/data/tenses";
import { getTenseProgress, resetAll, useProgress } from "@/lib/progress";
import { allPercents, overall } from "@/lib/tense-stats";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Мой прогресс — English Tenses Trainer" },
      {
        name: "description",
        content: "Прогресс по 12 временам английского: теория, упражнения, точность и тесты.",
      },
      { property: "og:title", content: "Мой прогресс — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Следи за прогрессом по каждому из 12 времён английского языка.",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const state = useProgress();
  const percents = allPercents(state);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl">Мой прогресс</h1>
        <p className="mt-2 text-muted-foreground">
          Прогресс сохраняется в этом браузере — можно вернуться позже.
        </p>
      </header>

      <div className="card-surface p-5">
        <ProgressBar value={overall(state)} label="Общий прогресс" tone="success" />
      </div>

      <div className="space-y-3">
        {TENSES.map((t) => {
          const p = state ? getTenseProgress(state, t.id) : null;
          const accuracy = p && p.total ? Math.round((p.correct / p.total) * 100) : 0;
          return (
            <section key={t.id} className="card-surface space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg">{t.title}</h2>
                <span className="font-display font-bold">{percents[t.id] ?? 0}%</span>
              </div>
              <ProgressBar value={percents[t.id] ?? 0} />
              {t.available && p ? (
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <dt className="text-muted-foreground">Теория изучена</dt>
                    <dd className="font-semibold">{p.theoryDone ? "да" : "нет"}</dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <dt className="text-muted-foreground">Практика</dt>
                    <dd className="font-semibold">
                      {p.doneExercises.length}/{COUNTS[t.id]?.exercises ?? 0}
                    </dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <dt className="text-muted-foreground">Точность ответов</dt>
                    <dd className="font-semibold">{accuracy}%</dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <dt className="text-muted-foreground">Последний тест</dt>
                    <dd className="font-semibold">
                      {p.lastTestScore !== null ? `${p.lastTestScore}/${p.testTotal}` : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <dt className="text-muted-foreground">Лучший результат</dt>
                    <dd className="font-semibold">
                      {p.bestTestScore !== null ? `${p.bestTestScore}/${p.testTotal}` : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <dt className="text-muted-foreground">Ошибок</dt>
                    <dd className="font-semibold">{p.mistakes}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">Скоро</p>
              )}
            </section>
          );
        })}
      </div>

      <Button
        variant="ghost"
        onClick={() => {
          if (window.confirm("Сбросить весь прогресс?")) resetAll();
        }}
      >
        Сбросить прогресс
      </Button>
    </div>
  );
}
