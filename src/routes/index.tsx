import { createFileRoute, Link } from "@tanstack/react-router";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/lib/progress";
import { overall } from "@/lib/tense-stats";
import { levelFor, useGame } from "@/lib/gamification";
import { accuracyOverall, weakCategories } from "@/lib/skill-stats";
import { LearningPath, nextStep, pathStatuses } from "@/components/LearningPath";
import { AchievementWatcher } from "@/components/AchievementWatcher";
import { Tensy } from "@/components/Tensy";
import { CATEGORY_TITLES } from "@/data/error-categories";
import { TENSES } from "@/data/tenses";
import { isCompleted } from "@/lib/tense-stats";

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

const MODES = [
  {
    to: "/learn" as const,
    icon: "📚",
    title: "Учусь",
    description: "Правило → примеры → практика",
    accent: "from-primary/15 to-primary/5 border-primary/30",
  },
  {
    to: "/practice" as const,
    icon: "🎯",
    title: "Тренируюсь",
    description: "Сравнения, смешанные задания, слабые места",
    accent: "from-type-continuous-soft to-card border-type-continuous/30",
  },
  {
    to: "/tests" as const,
    icon: "🏆",
    title: "Проверяю себя",
    description: "Тесты без подсказок",
    accent: "from-type-duration-soft to-card border-type-duration/30",
  },
];

function Home() {
  const progress = useProgress();
  const game = useGame();
  const percent = overall(progress);
  const level = levelFor(game?.xp ?? 0);
  const accuracy = accuracyOverall(progress);
  const next = nextStep(progress);
  const steps = pathStatuses(progress);
  const learned = TENSES.filter((t) => isCompleted(progress, t.id)).length;
  const weak = weakCategories(progress);
  const mistakes = progress?.mistakes.length ?? 0;
  const dailyDone = game && game.daily.date === new Date().toISOString().slice(0, 10)
    ? game.daily.count
    : 0;

  return (
    <div className="space-y-8">
      <AchievementWatcher />

      <section className="hero-surface rounded-3xl p-6 sm:p-9">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-widest opacity-80">
            PAST ●──── PRESENT ────→ FUTURE
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">English Tenses Trainer</h1>
          <p className="mt-2 max-w-xl text-base opacity-90">
            Путешествие по временам: понимай смысл, а не заучивай правила.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="stat-chip bg-card/90 text-foreground">📈 {percent}% курса</span>
          <span className="stat-chip bg-card/90 text-foreground">⭐ {game?.xp ?? 0} XP</span>
          <span className="stat-chip bg-card/90 text-foreground">
            🔥 {game?.currentStreak ?? 0} дн. подряд
          </span>
          <span className="stat-chip bg-card/90 text-foreground">🎯 {accuracy}% точность</span>
        </div>

        <div className="mt-4 max-w-md rounded-2xl bg-card/95 p-4 text-foreground">
          <ProgressBar value={percent} label={`Уровень ${level.level} · ${level.title}`} />
          <p className="mt-3 text-xs font-bold tracking-widest text-primary">ПРОДОЛЖИМ?</p>
          <p className="mt-1 font-display text-lg">{next ? next.title : "Present освоен"}</p>
          <p className="text-sm text-muted-foreground">
            {next ? next.subtitle : "Машина времени готова двигаться дальше."}
          </p>
          <Link
            to={(next?.to ?? "/all-present") as "/learn/present-simple"}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110"
          >
            {percent > 0 ? "Продолжить →" : "Начать обучение →"}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {MODES.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className={`card-interactive flex flex-col gap-2 bg-linear-to-br p-5 ${m.accent}`}
          >
            <span aria-hidden className="text-2xl">
              {m.icon}
            </span>
            <span className="font-display text-lg font-bold">{m.title}</span>
            <span className="flex-1 text-sm text-muted-foreground">{m.description}</span>
            <span className="text-sm font-bold text-primary">
              {m.title === "Учусь"
                ? `${learned} из 12 времён · Продолжить →`
                : m.title === "Тренируюсь"
                  ? `Ошибок к повторению: ${mistakes} · Тренироваться →`
                  : "Начать тест →"}
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link to="/quick" search={{ mode: "quick" }} className="card-interactive p-5">
          <p className="font-display text-lg font-bold">⚡ Быстрая тренировка</p>
          <p className="mt-1 text-sm text-muted-foreground">
            10 коротких заданий из уже изученных тем.
          </p>
        </Link>
        <Link to="/quick" search={{ mode: "weak" }} className="card-interactive p-5">
          <p className="font-display text-lg font-bold">🎯 Слабые места</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {weak.length
              ? `Повтори: ${weak
                  .slice(0, 2)
                  .map((w) => CATEGORY_TITLES[w.category] ?? w.category)
                  .join(", ")}`
              : "Пока слабых мест не видно — продолжай тренироваться."}
          </p>
        </Link>
      </section>

      <section className="card-surface p-5">
        <ProgressBar
          value={((dailyDone / (game?.dailyGoal ?? 10)) * 100) | 0}
          label={`Сегодня ${dailyDone} / ${game?.dailyGoal ?? 10} заданий`}
          tone="success"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Цель необязательная — занимайся в своём темпе.
        </p>
      </section>

      <LearningPath state={progress} />

      <Tensy mood="hint">
        {steps.every((s) => s.status === "done")
          ? "Отличная работа. Present пройден целиком — дальше будет Past."
          : "Совет: сначала пойми ситуацию, потом выбирай время. Формула — последний шаг."}
      </Tensy>

      <p className="border-t border-border pt-4 text-xs text-muted-foreground">
        ⓘ Прогресс хранится в браузере на этом устройстве. При смене устройства или
        браузера прогресс начнётся заново. Регистрация не требуется.
      </p>
    </div>
  );
}
