import { useMemo } from "react";
import type { Exercise } from "@/data/types";

export type InputProps = {
  exercise: Exercise;
  answer: string;
  setAnswer: (value: string) => void;
  checked: boolean;
};

export function MultipleChoiceInput({ exercise, answer, setAnswer, checked }: InputProps) {
  if (exercise.type !== "multiple-choice") return null;
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {exercise.options.map((option) => {
        const selected = answer === option;
        return (
          <button
            key={option}
            type="button"
            disabled={checked}
            onClick={() => setAnswer(option)}
            className={`rounded-xl border-2 px-4 py-3 text-left font-semibold transition disabled:opacity-70 ${
              selected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function TextInput({ exercise, answer, setAnswer, checked }: InputProps) {
  const placeholder =
    exercise.type === "fill-blank" ? "Форма глагола" : "Напиши предложение целиком";
  return (
    <input
      type="text"
      value={answer}
      disabled={checked}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      autoCapitalize="off"
      spellCheck={false}
      className="w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary disabled:opacity-70"
    />
  );
}

export function ErrorFinderInput({ exercise, answer, setAnswer, checked }: InputProps) {
  if (exercise.type !== "error-finder") return null;
  return (
    <div className="flex flex-wrap gap-2">
      {exercise.tokens.map((token, i) => {
        const selected = answer === String(i);
        return (
          <button
            key={`${token}-${i}`}
            type="button"
            disabled={checked}
            onClick={() => setAnswer(String(i))}
            className={`rounded-lg border-2 px-3 py-2 font-semibold transition ${
              selected ? "border-destructive bg-destructive/10" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {token}
          </button>
        );
      })}
    </div>
  );
}

/** Сборка предложения нажатием на слова (для sentence-builder и constructor). */
export function TokenBuilderInput({ exercise, answer, setAnswer, checked }: InputProps) {
  const tokens =
    exercise.type === "sentence-builder" || exercise.type === "constructor" ? exercise.tokens : [];
  const chosen = useMemo(() => (answer ? answer.split("|") : []), [answer]);
  const available = useMemo(() => {
    const rest = [...tokens];
    chosen.forEach((c) => {
      const i = rest.indexOf(c);
      if (i >= 0) rest.splice(i, 1);
    });
    return rest;
  }, [tokens, chosen]);

  const set = (next: string[]) => setAnswer(next.join("|"));

  return (
    <div className="space-y-3">
      <div className="flex min-h-14 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 p-3">
        {chosen.length === 0 ? (
          <span className="text-sm text-muted-foreground">Нажимай на слова ниже по порядку</span>
        ) : (
          chosen.map((token, i) => (
            <button
              key={`${token}-${i}`}
              type="button"
              disabled={checked}
              onClick={() => set(chosen.filter((_, idx) => idx !== i))}
              className="rounded-lg border-2 border-primary/50 bg-primary/10 px-3 py-2 font-semibold"
            >
              {token}
            </button>
          ))
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {available.map((token, i) => (
          <button
            key={`${token}-${i}`}
            type="button"
            disabled={checked}
            onClick={() => set([...chosen, token])}
            className="rounded-lg border-2 border-border bg-card px-3 py-2 font-semibold transition hover:border-primary/50"
          >
            {token}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Собранное значение токенов → строка предложения. */
export function tokensToSentence(raw: string): string {
  return raw
    .split("|")
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([?!.,])/g, "$1");
}
