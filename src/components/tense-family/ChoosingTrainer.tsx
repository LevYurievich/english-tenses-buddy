import { useState } from "react";
import { Button } from "@/components/ui/app-button";
import { ProgressBar } from "@/components/ProgressBar";
import { TEACH_CASES, TENSE_NAMES, type TeachCase } from "@/data/all-present/theory";

/**
 * «Научи меня выбирать»: сначала ученик определяет смысл ситуации,
 * потом выбирает время и только затем видит формулу и готовое предложение.
 */
export function ChoosingTrainer({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [meaning, setMeaning] = useState<string | null>(null);
  const [tense, setTense] = useState<string | null>(null);

  const current: TeachCase | undefined = TEACH_CASES[index];

  if (!current) {
    return (
      <div className="card-surface space-y-4 p-6">
        <h2 className="text-2xl">Теперь ты знаешь алгоритм</h2>
        <p className="text-muted-foreground">
          Смысл ситуации → время → формула → форма глагола. Дальше — три уровня тренировки.
        </p>
        <Button onClick={onDone}>К уровню 1</Button>
      </div>
    );
  }

  const meaningRight = meaning === current.meaningAnswer;
  const tenseRight = tense === current.tenseAnswer;

  const next = () => {
    setMeaning(null);
    setTense(null);
    setIndex((i) => i + 1);
  };

  return (
    <section className="card-surface space-y-5 p-5 sm:p-6">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary">
          ШАГ {index + 1} ИЗ {TEACH_CASES.length} · НАУЧИ МЕНЯ ВЫБИРАТЬ
        </p>
        <ProgressBar value={(index / TEACH_CASES.length) * 100} />
      </div>

      {current.situation ? (
        <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3">
          <p className="text-xs font-bold tracking-widest text-primary">СИТУАЦИЯ</p>
          <p className="mt-1 text-sm leading-relaxed">{current.situation}</p>
        </div>
      ) : null}

      <p className="rounded-xl bg-muted/60 px-4 py-4 text-lg font-semibold">{current.sentence}</p>

      <div className="space-y-2">
        <p className="font-display font-bold">1. Что здесь главное?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {current.meaningOptions.map((option) => {
            const selected = meaning === option;
            const isAnswer = option === current.meaningAnswer;
            const tone = !meaning
              ? "border-border bg-card hover:border-primary/50"
              : isAnswer
                ? "border-success bg-success/10"
                : selected
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-card opacity-70";
            return (
              <button
                key={option}
                type="button"
                disabled={!!meaning}
                onClick={() => setMeaning(option)}
                className={`rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${tone}`}
              >
                {option}
              </button>
            );
          })}
        </div>
        {meaning ? (
          <p className={`text-sm font-semibold ${meaningRight ? "text-success" : "text-destructive"}`}>
            {meaningRight ? "✓ Верно!" : `Почти. Здесь главное: ${current.meaningAnswer}.`}
          </p>
        ) : null}
      </div>

      {meaning ? (
        <div className="space-y-2">
          <p className="font-display font-bold">2. Какое время передаёт этот смысл?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {TENSE_NAMES.map((name) => {
              const selected = tense === name;
              const isAnswer = name === current.tenseAnswer;
              const tone = !tense
                ? "border-border bg-card hover:border-primary/50"
                : isAnswer
                  ? "border-success bg-success/10"
                  : selected
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card opacity-70";
              return (
                <button
                  key={name}
                  type="button"
                  disabled={!!tense}
                  onClick={() => setTense(name)}
                  className={`rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${tone}`}
                >
                  {name}
                </button>
              );
            })}
          </div>
          {tense ? (
            <p className={`text-sm font-semibold ${tenseRight ? "text-success" : "text-destructive"}`}>
              {tenseRight ? "✓ Верно!" : `Здесь нужно: ${current.tenseAnswer}.`}
            </p>
          ) : null}
        </div>
      ) : null}

      {tense ? (
        <div className="space-y-3 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="font-display font-bold text-primary">Почему?</p>
          <p className="text-sm leading-relaxed">{current.why}</p>
          <p className="font-mono text-sm">{current.formula}</p>
          <div className="rounded-lg border border-success/40 bg-success/10 p-3">
            <p className="text-xs font-bold tracking-wide text-muted-foreground">ОТВЕТ</p>
            <p className="mt-1 font-semibold">{current.result}</p>
          </div>
          <Button variant="success" onClick={next}>
            {index === TEACH_CASES.length - 1 ? "Завершить" : "Дальше"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
