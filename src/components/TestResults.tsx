import { SKILL_TITLES } from "@/data/present-simple/exercises";
import { Button } from "./ui/app-button";
import { ProgressBar } from "./ProgressBar";

export type SkillStat = { skill: string; correct: number; total: number };

export function TestResults({
  title,
  score,
  total,
  stats,
  onRetry,
}: {
  title: string;
  score: number;
  total: number;
  stats: SkillStat[];
  onRetry: () => void;
}) {
  const percent = Math.round((score / total) * 100);
  const verdict =
    percent >= 90
      ? "Отличная работа!"
      : percent >= 70
        ? "Хороший результат, ещё немного практики."
        : "Стоит повторить правило и попробовать снова.";

  return (
    <section className="card-surface space-y-5 p-6">
      <div>
        <h2 className="text-2xl">
          {title} — {score}/{total}
        </h2>
        <p className="mt-1 text-muted-foreground">{verdict}</p>
      </div>
      <ProgressBar value={percent} tone={percent >= 70 ? "success" : "primary"} label="Результат" />
      <div className="space-y-3">
        {stats.map((s) => (
          <ProgressBar
            key={s.skill}
            value={(s.correct / s.total) * 100}
            label={SKILL_TITLES[s.skill] ?? s.skill}
          />
        ))}
      </div>
      <Button onClick={onRetry}>Пройти тест снова</Button>
    </section>
  );
}
