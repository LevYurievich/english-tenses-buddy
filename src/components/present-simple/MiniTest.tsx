import { useState } from "react";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { TestResults, type SkillStat } from "@/components/TestResults";
import type { Exercise } from "@/data/types";
import { displayAnswer } from "@/lib/check-exercise";
import { recordAnswer, recordTest } from "@/lib/progress";

export function MiniTest({
  exercises,
  tenseId,
  title,
}: {
  exercises: Exercise[];
  tenseId: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<{ skill: string; correct: boolean }[]>([]);
  const finished = index >= exercises.length;

  if (finished) {
    const score = results.filter((r) => r.correct).length;
    const skills = [...new Set(results.map((r) => r.skill))];
    const stats: SkillStat[] = skills.map((skill) => {
      const rows = results.filter((r) => r.skill === skill);
      return { skill, correct: rows.filter((r) => r.correct).length, total: rows.length };
    });
    return (
      <TestResults
        title={title}
        score={score}
        total={exercises.length}
        stats={stats}
        onRetry={() => {
          setIndex(0);
          setResults([]);
        }}
      />
    );
  }

  const current = exercises[index];

  return (
    <ExerciseCard
      key={current.id}
      exercise={current}
      index={index}
      total={exercises.length}
      showHint={false}
      showFeedback={false}
      nextLabel={index === exercises.length - 1 ? "Показать результат" : "Дальше"}
      onResult={(correct, userAnswer) => {
        const next = [...results, { skill: current.skill, correct }];
        setResults(next);
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
        if (next.length === exercises.length) {
          recordTest(tenseId, next.filter((r) => r.correct).length, exercises.length);
        }
      }}
      onNext={() => setIndex((i) => i + 1)}
    />
  );
}
