import { useEffect, useState } from "react";
import type { Exercise } from "@/data/types";
import { explainWrongAnswer, getReasoning, STEP_TITLES } from "@/lib/reasoning";

/**
 * Универсальная кнопка «Почему?» с раскрывающимся пошаговым разбором.
 * Работает для любого времени: тексты берутся из данных упражнения.
 */
export function WhyPanel({
  exercise,
  correct,
  userAnswer,
}: {
  exercise: Exercise;
  correct: boolean;
  userAnswer: string;
}) {
  const [open, setOpen] = useState(false);
  const reasoning = getReasoning(exercise);

  useEffect(() => {
    setOpen(false);
  }, [exercise.id]);

  const wrongText = correct ? null : explainWrongAnswer(reasoning, userAnswer);

  return (
    <div className="rounded-xl border-2 border-primary/30 bg-primary/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-display text-base font-bold text-primary"
      >
        <span>Почему?</span>
        <span aria-hidden className={`text-sm transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open ? (
        <div className="space-y-4 border-t border-primary/20 px-4 py-4">
          <p className="font-display text-lg font-bold">
            {reasoning.title ?? `Почему ${exercise.correctAnswer}?`}
          </p>

          {reasoning.chain?.length ? (
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              {reasoning.chain.map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-1.5">
                  <span className="rounded-full border border-border bg-background px-2.5 py-1">
                    {item}
                  </span>
                  {i < reasoning.chain!.length - 1 ? (
                    <span aria-hidden className="text-muted-foreground">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}

          <ol className="space-y-3">
            {reasoning.steps.map((step, i) => (
              <li key={`${step.kind}-${i}`} className="rounded-lg bg-background/70 p-3">
                <p className="text-xs font-bold tracking-wide text-muted-foreground">
                  ШАГ {i + 1}. {(step.title ?? STEP_TITLES[step.kind]).toUpperCase()}
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  {step.highlight ? (
                    <span className="mr-1 rounded bg-marker-soft px-1.5 py-0.5 font-semibold text-marker">
                      {step.highlight}
                    </span>
                  ) : null}
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="rounded-lg border border-success/40 bg-success/10 p-3">
            <p className="text-xs font-bold tracking-wide text-muted-foreground">ОТВЕТ</p>
            <p className="mt-1 font-semibold">{reasoning.result}</p>
          </div>

          {reasoning.whyThisTense ? (
            <div className="rounded-lg border-2 border-primary/30 bg-background/70 p-3">
              <p className="font-display text-sm font-bold text-primary">
                {reasoning.whyThisTense.title ?? "Почему именно это время?"}
              </p>
              <ul className="mt-2 space-y-1.5">
                {reasoning.whyThisTense.steps.map((step, i) => (
                  <li key={`tense-${i}`} className="text-sm leading-relaxed">
                    {step.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {reasoning.remember ? (
            <p className="rounded-lg border border-dashed border-marker/60 bg-marker-soft px-3 py-2 text-sm text-marker">
              <span className="font-bold">Запомни: </span>
              {reasoning.remember}
            </p>
          ) : null}

          {wrongText ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3">
              <p className="font-display text-sm font-bold">Почему мой ответ неправильный?</p>
              <p className="mt-1 text-sm leading-relaxed">{wrongText}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
