import { createFileRoute } from "@tanstack/react-router";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/app-button";
import { TENSES } from "@/data/tenses";
import { getTenseProgress, resetAll, useProgress } from "@/lib/progress";
import { allPercents, COUNTS, overall } from "@/lib/tense-stats";
import { levelFor, useGame } from "@/lib/gamification";
import { accuracyOverall, skillStats, weakCategories } from "@/lib/skill-stats";
import { ACHIEVEMENTS } from "@/data/achievements";
import { CATEGORY_TITLES } from "@/data/error-categories";
import { TenseTypeBadge } from "@/components/TenseTypeBadge";
import { Link } from "@tanstack/react-router";

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
  const game = useGame();
  const level = levelFor(game?.xp ?? 0);
  const accuracy = accuracyOverall(state);
  const skills = skillStats(state);
  const weak = weakCategories(state);
  const unlocked = game?.achievements ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl">Твой прогресс</h1>
        <p className="mt-2 text-muted-foreground">
          Прогресс сохраняется в этом браузере — можно вернуться позже.
        </p>
      </header>

      <div className="card-surface space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="stat-chip bg-primary/10 text-primary">
            Уровень {level.level} · {level.title}
          </span>
          <span className="stat-chip bg-xp/15 text-foreground">⭐ {game?.xp ?? 0} XP</span>
          <span className="stat-chip bg-streak/15 text-foreground">
            🔥 {game?.currentStreak ?? 0} дн. подряд (лучшая {game?.bestStreak ?? 0})
          </span>
          <span className="stat-chip bg-muted text-foreground">🎯 {accuracy}% точность</span>
        </div>
        <ProgressBar value={overall(state)} label="Общий прогресс" tone="success" />
        {level.next ? (
          <ProgressBar
            value={level.progress}
            label={`До уровня «${level.next.title}» — ${level.next.min - (game?.xp ?? 0)} XP`}
          />
        ) : null}
      </div>

      <section className="card-surface space-y-4 p-5">
        <h2 className="text-xl">Навыки грамматики</h2>
        {skills.map((s) => (
          <div key={s.id}>
            <ProgressBar
              value={s.accuracy}
              label={`${s.title} · ${s.correct}/${s.total}`}
              tone={s.accuracy >= 80 ? "success" : "primary"}
            />
          </div>
        ))}
      </section>

      {weak.length ? (
        <section className="card-surface space-y-3 border-2 border-warning/40 p-5">
          <h2 className="text-xl">Что повторить</h2>
          <ul className="space-y-1 text-sm">
            {weak.slice(0, 4).map((w) => (
              <li key={w.category} className="flex justify-between gap-3">
                <span>{CATEGORY_TITLES[w.category] ?? w.category}</span>
                <span className="font-bold text-warning">{w.accuracy}%</span>
              </li>
            ))}
          </ul>
          <Link
            to="/quick"
            search={{ mode: "weak" as const }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Потренировать
          </Link>
        </section>
      ) : null}

      <section className="card-surface p-5">
        <h2 className="text-xl">Достижения</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => {
            const got = unlocked.includes(a.id);
            return (
              <div
                key={a.id}
                className={`rounded-xl border p-3 text-sm ${
                  got ? "border-success/50 bg-success/10" : "border-border bg-muted/50 opacity-70"
                }`}
              >
                <p className="font-display font-bold">
                  <span aria-hidden>{a.icon}</span> {a.title} {got ? "✓" : "🔒"}
                </p>
                <p className="text-muted-foreground">{a.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <h2 className="text-xl">Навыки по временам</h2>

      <div className="space-y-3">
        {[
          ...TENSES.map((t) => ({ id: t.id, title: t.title, available: t.available })),
          { id: "all-present", title: "Все Present", available: true },
        ].map((t) => {
          const p = state ? getTenseProgress(state, t.id) : null;
          const accuracy = p && p.total ? Math.round((p.correct / p.total) * 100) : 0;
          return (
            <section key={t.id} className="card-surface space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold">{t.title}</h3>
                  <TenseTypeBadge tenseId={t.id} showMeaning={false} />
                </div>
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
                    <dt className="text-muted-foreground">Попыток теста</dt>
                    <dd className="font-semibold">{p.testAttempts ?? 0}</dd>
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
