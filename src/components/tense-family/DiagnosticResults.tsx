import type { ReactNode } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import type { Stat } from "@/lib/all-present-stats";
import { statusLabel } from "@/lib/all-present-stats";

/** Диагностика смешанного модуля: по временам, по навыкам и рекомендации. */
export function DiagnosticResults({
  title,
  tenseStats,
  skillStats,
  recommendations,
  actions,
}: {
  title: string;
  tenseStats: Stat[];
  skillStats: Stat[];
  recommendations: string[];
  actions?: ReactNode;
}) {
  const answered = tenseStats.reduce((s, r) => s + r.total, 0);
  const correct = tenseStats.reduce((s, r) => s + r.correct, 0);
  const percent = answered ? Math.round((correct / answered) * 100) : 0;

  if (!answered) {
    return (
      <div className="card-surface p-6 text-muted-foreground">
        Пройди хотя бы несколько заданий — и здесь появится карта твоих знаний.
      </div>
    );
  }

  return (
    <section className="card-surface space-y-5 p-5 sm:p-6">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary">{title.toUpperCase()}</p>
        <h2 className="mt-1 text-2xl">
          {percent}% · {statusLabel(percent)}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Учтено ответов: {answered}. Времена со статусом «Скоро» сюда не входят.
        </p>
      </div>

      <div className="space-y-3">
        <p className="font-display font-bold">Как ты понимаешь Present Tenses</p>
        {tenseStats.map((s) => (
          <ProgressBar
            key={s.key}
            value={(s.correct / s.total) * 100}
            label={`${s.title} — ${Math.round((s.correct / s.total) * 100)}%`}
          />
        ))}
      </div>

      <div className="space-y-3">
        <p className="font-display font-bold">Навыки</p>
        {skillStats.map((s) => (
          <ProgressBar
            key={s.key}
            value={(s.correct / s.total) * 100}
            label={`${s.title} — ${Math.round((s.correct / s.total) * 100)}%`}
          />
        ))}
      </div>

      <div className="space-y-2 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
        <p className="font-display font-bold text-primary">Что повторить</p>
        <ul className="space-y-1.5 text-sm leading-relaxed">
          {recommendations.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </section>
  );
}
