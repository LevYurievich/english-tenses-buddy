import { Link } from "@tanstack/react-router";
import type { TenseMeta } from "@/data/tenses";
import { ProgressBar } from "./ProgressBar";

export function TenseCard({
  tense,
  percent,
  completed = false,
}: {
  tense: TenseMeta;
  percent: number;
  completed?: boolean;
}) {
  return (
    <article className="card-surface flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg">{tense.title}</h3>
        {tense.available ? (
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
            {completed ? "Пройдено" : "Доступно"}
          </span>
        ) : (
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
            Скоро
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{tense.tagline}</p>
      <ProgressBar value={percent} label="Прогресс" />
      {tense.available && tense.path ? (
        <Link
          to={tense.path as "/learn/present-simple"}
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          {completed ? "Повторить" : "Учить"}
        </Link>
      ) : (
        <span className="mt-1 inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-muted px-4 py-2 text-sm font-bold text-muted-foreground">
          Скоро
        </span>
      )}
    </article>
  );
}
