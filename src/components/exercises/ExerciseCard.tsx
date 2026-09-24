import { useEffect, useState } from "react";
import type { Exercise } from "@/data/types";
import { checkAnswer, displayAnswer } from "@/lib/check-exercise";
import { WhyPanel } from "@/components/WhyPanel";
import { AnswerFeedback } from "@/components/AnswerFeedback";
import { GrammarChip } from "@/components/GrammarChip";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/app-button";
import { ProgressBar } from "@/components/ProgressBar";
import { TenseTypeBadge } from "@/components/TenseTypeBadge";
import { TimelineDiagram } from "./TimelineDiagram";
import { useGame } from "@/lib/gamification";
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
  mixed = false,
}: {
  /** Смешанная тренировка: тип времени показываем только после ответа. */
  mixed?: boolean;
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
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const game = useGame();

  useEffect(() => {
    setAnswer("");
    setChecked(false);
    setCorrect(false);
    setAttempts(0);
    setShowExplanation(false);
  }, [exercise.id]);

  const isTokenType = exercise.type === "sentence-builder" || exercise.type === "constructor";
  const finalAnswer = isTokenType ? tokensToSentence(answer) : answer;
  const given = isTokenType ? finalAnswer : answer;

  const handleCheck = () => {
    const ok = checkAnswer(exercise, given);
    setCorrect(ok);
    setChecked(true);
    const attempt = attempts + 1;
    setAttempts(attempt);
    if (attempt === 1) onResult(ok, given);
    if (ok || attempt > 1) setShowExplanation(true);
  };

  const inputProps = { exercise, answer, setAnswer, checked };
  const streak = game?.answerStreak ?? 0;
  // Подсказки типа времени показываем только в тренировке с подсказками.
  const showTypeHint = showHint && showFeedback;
  // В смешанных модулях тип времени и есть ответ — показываем его только после проверки.
  const isMixed = mixed || exercise.tense.startsWith("all-");

  return (
    <section className="card-surface p-5 sm:p-6">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-widest text-primary">
            {index + 1} / {total} · {TYPE_TITLES[exercise.type].toUpperCase()}
          </p>
          <h2 className="mt-1 text-lg leading-snug sm:text-xl">{exercise.task}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {streak >= 3 ? (
            <span className="stat-chip bg-streak/15 text-foreground">🔥 {streak} подряд</span>
          ) : null}
          <span className="stat-chip bg-muted text-muted-foreground">
            Уровень {exercise.difficulty}
          </span>
        </div>
      </div>

      <ProgressBar value={((index + (checked && correct ? 1 : 0)) / total) * 100} />

      {exercise.situation ? (
        <div className="mt-5 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3">
          <p className="text-xs font-bold tracking-widest text-primary">СИТУАЦИЯ</p>
          <p className="mt-1 text-sm leading-relaxed">{exercise.situation}</p>
        </div>
      ) : null}

      {showTypeHint && exercise.targetTense && (!isMixed || checked) ? (
        <div className="mt-4">
          <TenseTypeBadge tenseId={exercise.targetTense} />
        </div>
      ) : null}

      {exercise.timeline ? <TimelineDiagram spec={exercise.timeline} /> : null}

      <p className="sentence-box my-5">{exercise.question}</p>

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
                correctAnswer={showExplanation || correct ? exercise.correctAnswer : ""}
                explanation={
                  showExplanation || correct
                    ? exercise.explanation
                    : "Попробуй вспомнить правило и ответить ещё раз."
                }
                userAnswer={displayAnswer(exercise, given)}
                tip={correct || showExplanation ? undefined : exercise.hint}
              />
            ) : (
              <p className="rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
                Ответ сохранён. Результат будет в конце теста.
              </p>
            )}

            {showFeedback && (correct || showExplanation) ? (
              <WhyPanel
                exercise={exercise}
                correct={correct}
                userAnswer={displayAnswer(exercise, given)}
              />
            ) : null}

            {showFeedback && exercise.type === "constructor" && (correct || showExplanation) ? (
              <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-muted/40 p-4">
                {exercise.breakdown.map((part) => (
                  <GrammarChip key={part.text} role={part.role} note={part.note}>
                    {part.text}
                  </GrammarChip>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {!correct && showFeedback && attempts === 1 ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setChecked(false);
                  }}
                >
                  Попробовать ещё
                </Button>
              ) : null}
              {!correct && showFeedback && !showExplanation ? (
                <Button variant="ghost" onClick={() => setShowExplanation(true)}>
                  Показать объяснение
                </Button>
              ) : null}
              <Button variant="success" onClick={onNext}>
                {nextLabel} →
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
