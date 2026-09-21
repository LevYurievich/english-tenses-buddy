import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { WhyPanel } from "@/components/WhyPanel";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/app-button";
import { CATEGORY_RULES, CATEGORY_TITLES } from "@/data/error-categories";
import type { Exercise } from "@/data/types";
import { displayAnswer } from "@/lib/check-exercise";
import { recordAnswer, recordTest } from "@/lib/progress";
import { statusLabel, TENSE_TITLES } from "@/lib/all-present-stats";

type Answer = { exercise: Exercise; correct: boolean; userAnswer: string };

/**
 * Финальный экзамен смешанного модуля: без подсказок, шпаргалки и правильного ответа до проверки.
 * После результата можно разобрать каждый неправильный вопрос.
 */
export function FinalTenseTest({
  exercises,
  moduleId,
  title,
  attempt,
  onRetry,
  extraActions,
}: {
  exercises: Exercise[];
  moduleId: string;
  title: string;
  attempt: number;
  onRetry: () => void;
  extraActions?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const finished = index >= exercises.length;

  const stats = useMemo(() => {
    const map = new Map<string, { correct: number; total: number }>();
    answers.forEach((a) => {
      const key = a.exercise.targetTense ?? "other";
      const row = map.get(key) ?? { correct: 0, total: 0 };
      row.total += 1;
      if (a.correct) row.correct += 1;
      map.set(key, row);
    });
    return [...map.entries()].map(([key, row]) => ({
      key,
      title: TENSE_TITLES[key] ?? key,
      ...row,
    }));
  }, [answers]);

  const mistakeMap = useMemo(() => {
    const map = new Map<string, number>();
    answers
      .filter((a) => !a.correct)
      .forEach((a) => {
        const key = a.exercise.errorCategory;
        map.set(key, (map.get(key) ?? 0) + 1);
      });
    return [...map.entries()];
  }, [answers]);

  if (finished) {
    const score = answers.filter((a) => a.correct).length;
    const percent = Math.round((score / exercises.length) * 100);
    const wrong = answers.filter((a) => !a.correct);

    return (
      <section className="space-y-4">
        <div className="card-surface space-y-5 p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-primary">ФИНАЛЬНЫЙ ТЕСТ</p>
            <h2 className="mt-1 text-2xl">
              {title} — {score}/{exercises.length}
            </h2>
            <p className="mt-1 font-semibold text-primary">
              {percent}% · {statusLabel(percent)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Попытка №{attempt + 1}</p>
          </div>
          <ProgressBar value={percent} tone={percent >= 70 ? "success" : "primary"} />

          <div className="space-y-3">
            {stats.map((s) => (
              <ProgressBar
                key={s.key}
                value={(s.correct / s.total) * 100}
                label={`${s.title} — ${Math.round((s.correct / s.total) * 100)}%`}
              />
            ))}
          </div>

          {mistakeMap.length ? (
            <div className="rounded-xl border-2 border-border p-4">
              <p className="font-display font-bold">Где были ошибки?</p>
              <ul className="mt-2 space-y-1 text-sm">
                {mistakeMap.map(([cat, count]) => (
                  <li key={cat}>
                    {count} × {CATEGORY_TITLES[cat] ?? cat}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-xl border-2 border-success/40 bg-success/10 p-4 text-sm font-semibold text-success">
              Ошибок нет — времена ты выбираешь уверенно.
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {wrong.length ? (
              <Button variant="ghost" onClick={() => setReviewOpen((v) => !v)}>
                {reviewOpen ? "Скрыть разбор" : "Разобрать мои ошибки"}
              </Button>
            ) : null}
            <Button
              onClick={() => {
                setIndex(0);
                setAnswers([]);
                setReviewOpen(false);
                onRetry();
              }}
            >
              Пройти ещё раз
            </Button>
            {extraActions}
          </div>
        </div>

        {reviewOpen
          ? wrong.map((a) => {
              const rule = CATEGORY_RULES[a.exercise.errorCategory];
              return (
                <div key={a.exercise.id} className="card-surface space-y-3 p-5">
                  <p className="font-semibold">{a.exercise.question}</p>
                  <p className="text-sm text-destructive">Твой ответ: {a.userAnswer || "—"}</p>
                  <p className="text-sm text-success">Правильно: {a.exercise.correctAnswer}</p>
                  <WhyPanel exercise={a.exercise} correct={false} userAnswer={a.userAnswer} />
                  {rule ? (
                    <p className="rounded-lg bg-muted px-3 py-2 text-sm">
                      <span className="font-bold">Повтори правило: </span>
                      {rule.rule}
                    </p>
                  ) : null}
                </div>
              );
            })
          : null}
      </section>
    );
  }

  const current = exercises[index];
  if (!current) return null;

  return (
    <ExerciseCard
      key={`${attempt}-${current.id}`}
      exercise={current}
      index={index}
      total={exercises.length}
      showHint={false}
      showFeedback={false}
      nextLabel={index === exercises.length - 1 ? "Показать результат" : "Дальше"}
      onResult={(correct, userAnswer) => {
        const shown = displayAnswer(current, userAnswer);
        setAnswers((prev) => [...prev, { exercise: current, correct, userAnswer: shown }]);
        recordAnswer({
          tenseId: moduleId,
          exerciseId: current.id,
          correct,
          category: current.errorCategory,
          question: current.question,
          userAnswer: shown,
          correctAnswer: current.correctAnswer,
          explanation: current.explanation,
        });
      }}
      onNext={() => {
        const next = index + 1;
        if (next >= exercises.length) {
          const score = answers.filter((a) => a.correct).length;
          recordTest(moduleId, score, exercises.length);
        }
        setIndex(next);
      }}
    />
  );
}
