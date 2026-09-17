import { useEffect, useState } from "react";
import type { Exercise } from "@/data/types";
import { checkAnswer } from "@/lib/check-exercise";
import { AnswerFeedback } from "@/components/AnswerFeedback";
import { GrammarChip } from "@/components/GrammarChip";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ProgressBar";
import {
  ErrorFinderInput,
  MultipleChoiceInput,
  TextInput,
  TokenBuilderInput,
  tokensToSentence,
} from "./inputs";

const TYPE_TITLES: Record<Exercise["type"], string> = {
  "multiple-choice": "Выбери форму",
  "fill-blank": "Вставь форму глагола",
  "sentence-builder": "Собери предложение",
  transformation: "Преобразуй предложение",
  "error-finder": "Найди ошибку",
  translation: "Перевод",
  constructor: "Конструктор",
};

export function ExerciseCard({
  exercise,
  index,
  total,
  onResult,
  onNext,
  showHint = true,
  showFeedback = true,
  nextLabel = "Дальше",
}: {
  exercise: Exercise;
  index: number;
  total: number;
  onResult: (correct: boolean, userAnswer: string) => void;
  onNext: () => void;
  showHint?: boolean;
  showFeedback?: boolean;
  nextLabel?: string;
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setAnswer("");
    setChecked(false);
    setCorrect(false);
  }, [exercise.id]);

  const isTokenType = exercise.type === "sentence-builder" || exercise.type === "constructor";
  const finalAnswer = isTokenType ? tokensToSentence(answer) : answer;

  const handleCheck = () => {
    const ok = checkAnswer(exercise, isTokenType ? finalAnswer : answer);
    setCorrect(ok);
    setChecked(true);
    onResult(ok, isTokenType ? finalAnswer : answer);
  };

  const inputProps = { exercise, answer, setAnswer, checked };

  return (
    <section className="card-surface p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest text-primary">
            ЗАДАНИЕ {index + 1} ИЗ {total} · {TYPE_TITLES[exercise.type].toUpperCase()}
          </p>
          <h2 className="mt-1 text-xl">{exercise.task}</h2>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
          Уровень {exercise.difficulty}
        </span>
      </div>

      <ProgressBar value={((index + (checked ? 1 : 0)) / total) * 100} />

      <p className="my-5 rounded-xl bg-muted/60 px-4 py-4 text-lg font-semibold sm:text-xl">
        {exercise.question}
      </p>

      <div className="space-y-4">
        {exercise.type === "multiple-choice" ? <MultipleChoiceInput {...inputProps} /> : null}
        {exercise.type === "error-finder" ? <ErrorFinderInput {...inputProps} /> : null}
        {isTokenType ? <TokenBuilderInput {...inputProps} /> : null}
        {exercise.type === "fill-blank" ||
        exercise.type === "transformation" ||
        exercise.type === "translation" ? (
          <TextInput {...inputProps} />
        ) : null}

        {showHint && !checked ? <Hint text={exercise.hint} /> : null}

        {!checked ? (
          <Button onClick={handleCheck} disabled={!answer.trim()}>
            Проверить
          </Button>
        ) : (
          <>
            {showFeedback ? (
              <AnswerFeedback
                correct={correct}
                correctAnswer={exercise.correctAnswer}
                explanation={exercise.explanation}
              />
            ) : (
              <p className="rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
                Ответ сохранён. Результат будет в конце теста.
              </p>
            )}

            {showFeedback && exercise.type === "constructor" ? (
              <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-muted/40 p-4">
                {exercise.breakdown.map((part) => (
                  <GrammarChip key={part.text} role={part.role} note={part.note}>
                    {part.text}
                  </GrammarChip>
                ))}
              </div>
            ) : null}

            <Button variant="success" onClick={onNext}>
              {nextLabel}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
