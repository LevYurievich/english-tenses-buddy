import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";

export type DrillOption = { value: string; label: string; sub?: string };

/** Тренировка одной координаты: выбери вариант → сразу объяснение. */
export function Drill<T extends { id: string; sentence: string; focus?: string; why: string }>({
  items,
  title,
  question,
  options,
  answerOf,
  onAnswer,
  onFinish,
  finishLabel,
}: {
  items: T[];
  title: string;
  question: (item: T) => string;
  options: (item: T) => DrillOption[];
  answerOf: (item: T) => string;
  onAnswer: (item: T, value: string) => void;
  onFinish?: () => void;
  finishLabel?: string;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= items.length;

  if (done) {
    return (
      <section className="card-surface space-y-3 p-6 text-center">
        <p className="text-xs font-bold tracking-widest text-primary">ГОТОВО</p>
        <h2 className="text-2xl">
          {score} из {items.length}
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => { setI(0); setScore(0); setPicked(null); }} className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">
            Ещё раз
          </button>
          {onFinish ? (
            <button type="button" onClick={onFinish} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              {finishLabel ?? "Дальше"}
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  const item = items[i]!;
  const answer = answerOf(item);
  const parts = item.focus ? item.sentence.split(item.focus) : [item.sentence];

  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <ProgressBar value={(i / items.length) * 100} label={`Задание ${i + 1} из ${items.length}`} />
      </div>
      <p className="text-xl font-medium leading-snug">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <mark className="rounded bg-accent px-1 text-accent-foreground">{item.focus}</mark>
            {parts.slice(1).join(item.focus)}
          </>
        ) : (
          item.sentence
        )}
      </p>
      <p className="font-display font-bold">{question(item)}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options(item).map((o) => {
          const state = picked === null ? "" : o.value === answer ? "border-success bg-success/10" : o.value === picked ? "border-destructive bg-destructive/10" : "opacity-60";
          return (
            <button
              key={o.value}
              type="button"
              disabled={picked !== null}
              onClick={() => {
                setPicked(o.value);
                if (o.value === answer) setScore((s) => s + 1);
                onAnswer(item, o.value);
              }}
              className={`rounded-xl border-2 border-border p-3 text-left transition hover:border-primary/60 motion-reduce:transition-none ${state}`}
            >
              <span className="block font-bold">
                {picked !== null && o.value === answer ? "✓ " : picked === o.value ? "✗ " : ""}
                {o.label}
              </span>
              {o.sub ? <span className="block text-xs text-muted-foreground">{o.sub}</span> : null}
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <div className="space-y-3">
          <div className={`rounded-xl p-3 text-sm ${picked === answer ? "bg-success/10" : "bg-destructive/10"}`}>
            <p className="font-bold">{picked === answer ? "Верно!" : "Не совсем."}</p>
            <p className="mt-1">{item.why}</p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={() => { setPicked(null); setI(i + 1); }}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Дальше →
          </button>
        </div>
      ) : null}
    </section>
  );
}
