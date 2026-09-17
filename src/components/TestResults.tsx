import type { ReactNode } from "react";
import { SKILL_TITLES } from "@/data/skills";
import { Button } from "./ui/app-button";
import { ProgressBar } from "./ProgressBar";

export type SkillStat = { skill: string; correct: number; total: number };

/** Персональная рекомендация по самой слабой группе навыков. */
function recommend(stats: SkillStat[]): string | null {
  const weak = stats
    .filter((s) => s.correct < s.total)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)[0];
  if (!weak) return null;
  const title = SKILL_TITLES[weak.skill] ?? weak.skill;
  const texts: Record<string, string> = {
    "tense-choice":
      "Стоит повторить выбор времени. Ты хорошо строишь предложения, но иногда путаешь Present Simple и Present Continuous.",
    "be-form": "Повтори помощников: I → am, he / she / it → is, you / we / they → are.",
    ing: "Повтори правила окончания -ing: make → making, run → running, lie → lying.",
    question: "Потренируй вопросы: помощник выходит вперёд.",
    negative: "Потренируй отрицания: not ставим сразу после помощника.",
    order: "Потренируй порядок слов: кто → помощник → действие → что → когда.",
    translation: "Потренируй перевод: сначала определи, кто действует и какое нужно время.",
    situation: "Читай ситуацию внимательнее: время выбирается по смыслу, а не по слову-маркеру.",
  };
  return texts[weak.skill] ?? `Стоит повторить тему «${title}».`;
}

export function TestResults({
  title,
  score,
  total,
  stats,
  onRetry,
  extraActions,
}: {
  title: string;
  score: number;
  total: number;
  stats: SkillStat[];
  onRetry: () => void;
  extraActions?: ReactNode;
}) {
  const percent = Math.round((score / total) * 100);
  const verdict =
    percent >= 90
      ? "Отличная работа!"
      : percent >= 70
        ? "Хороший результат, ещё немного практики."
        : "Стоит повторить правило и попробовать снова.";
  const recommendation = recommend(stats);

  return (
    <section className="card-surface space-y-5 p-6">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary">ТВОЙ РЕЗУЛЬТАТ</p>
        <h2 className="mt-1 text-2xl">
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
      {recommendation ? (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="font-display font-bold text-primary">Рекомендация</p>
          <p className="mt-1 text-sm leading-relaxed">{recommendation}</p>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button onClick={onRetry}>Пройти тест ещё раз</Button>
        {extraActions}
      </div>
    </section>
  );
}
