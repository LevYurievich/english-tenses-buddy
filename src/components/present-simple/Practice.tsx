import { useMemo, useState } from "react";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { Button } from "@/components/ui/app-button";
import { ProgressBar } from "@/components/ProgressBar";
import type { Exercise } from "@/data/types";
import { recordAnswer } from "@/lib/progress";
import { displayAnswer } from "@/lib/check-exercise";

export function Practice({
  exercises,
  tenseId,
  title,
  onFinish,
  finishLabel = "К мини-тесту",
}: {
  exercises: Exercise[];
  tenseId: string;
  title: string;
  onFinish: () => void;
  finishLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const done = index >= exercises.length;
  const current = exercises[index];

  const accuracy = useMemo(
    () => (stats.total ? Math.round((stats.correct / stats.total) * 100) : 0),
    [stats],
  );

  if (!exercises.length) {
    return (
      <div className="card-surface p-6">
        <p className="text-muted-foreground">Упражнений пока нет.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="card-surface space-y-4 p-6">
        <h2 className="text-2xl">Тренировка пройдена</h2>
        <p className="text-muted-foreground">
          Правильных ответов: {stats.correct} из {stats.total} ({accuracy}%).
        </p>
        <ProgressBar value={accuracy} tone="success" />
        <div className="flex flex-wrap gap-2">
          <Button onClick={onFinish}>{finishLabel}</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIndex(0);
              setStats({ correct: 0, total: 0 });
            }}
          >
            Пройти ещё раз
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-muted-foreground">{title}</p>
      <ExerciseCard
        key={current.id}
        exercise={current}
        index={index}
        total={exercises.length}
        onResult={(correct, userAnswer) => {
          setStats((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
          recordAnswer({
            tenseId,
            exerciseId: current.id,
            correct,
            category: current.errorCategory,
            question: current.question,
            userAnswer: displayAnswer(current, userAnswer),
            correctAnswer: current.correctAnswer,
            explanation: current.explanation,
          });
        }}
        onNext={() => setIndex((i) => i + 1)}
        nextLabel={index === exercises.length - 1 ? "Завершить" : "Дальше"}
      />
    </div>
  );
}
