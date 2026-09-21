import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORY_RULES, CATEGORY_TITLES } from "@/data/error-categories";
import { TENSES } from "@/data/tenses";
import { clearMistakes, useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/app-button";

export const Route = createFileRoute("/mistakes")({
  head: () => ({
    meta: [
      { title: "Мои ошибки — English Tenses Trainer" },
      {
        name: "description",
        content: "Разбор твоих ошибок по правилам английских времён и повторная тренировка.",
      },
      { property: "og:title", content: "Мои ошибки — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Смотри, в каких правилах ты ошибаешься, и тренируй именно их.",
      },
    ],
  }),
  component: MistakesPage,
});

function MistakesPage() {
  const progress = useProgress();
  const mistakes = progress?.mistakes ?? [];

  const groups = [
    ...TENSES.map((t) => ({ id: t.id, title: t.title })),
    { id: "all-present", title: "Все Present" },
  ];

  const byTense = groups.map((tense) => {
    const rows = mistakes.filter((m) => m.tense === tense.id);
    const categories = [...new Set(rows.map((m) => m.category))].map((c) => ({
      category: c,
      count: rows.filter((m) => m.category === c).length,
    }));
    return { tense, rows, categories };
  }).filter((x) => x.rows.length);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl">Мои ошибки</h1>
        <p className="mt-2 text-muted-foreground">
          Здесь собраны правила, в которых ты ошибался. Их можно потренировать отдельно.
        </p>
      </header>

      {!byTense.length ? (
        <div className="card-surface p-6 text-muted-foreground">
          Пока ошибок нет. Пройди тренировку Present Simple — и здесь появится разбор.
        </div>
      ) : null}

      {byTense.map(({ tense, rows, categories }) => (
        <section key={tense.id} className="card-surface space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl">{tense.title}</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
              Ошибок: {rows.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Ты несколько раз ошибался здесь:</p>

          <div className="space-y-3">
            {categories.map(({ category, count }) => {
              const rule = CATEGORY_RULES[category];
              return (
                <div key={category} className="rounded-xl border-2 border-border p-4">
                  <p className="font-display font-bold">
                    {CATEGORY_TITLES[category] ?? category}{" "}
                    <span className="text-sm font-semibold text-muted-foreground">
                      · {count} раз(а)
                    </span>
                  </p>
                  {rule ? (
                    <>
                      <p className="mt-1 text-sm font-semibold text-primary">{rule.rule}</p>
                      <p className="mt-2 text-sm text-success">✓ {rule.right}</p>
                      <p className="text-sm text-destructive">✕ Не: {rule.wrong}</p>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          <details className="rounded-xl bg-muted/50 p-4">
            <summary className="cursor-pointer text-sm font-bold">Последние ответы</summary>
            <ul className="mt-3 space-y-2 text-sm">
              {rows.slice(0, 8).map((m) => (
                <li key={m.id} className="rounded-lg bg-card p-3">
                  <p className="font-semibold">{m.question}</p>
                  <p className="text-destructive">Твой ответ: {m.userAnswer || "—"}</p>
                  <p className="text-success">Правильно: {m.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </details>

          <div className="flex flex-wrap gap-2">
            {tense.available && tense.path ? (
              <Link
                to={tense.path as "/learn/present-simple"}
                search={{ tab: "mistakes" as const }}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110"
              >
                Потренировать мои ошибки
              </Link>
            ) : null}
            <Button variant="ghost" onClick={() => clearMistakes(tense.id)}>
              Очистить список
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
