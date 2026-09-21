import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import { displayAnswer } from "@/lib/check-exercise";
import { moduleOf } from "@/lib/exercise-index";
import { recordAnswer, useProgress } from "@/lib/progress";
import { quickTraining, weakSpotTraining } from "@/lib/training";

type Mode = "quick" | "weak";

export const Route = createFileRoute("/quick")({
  validateSearch: (search: Record<string, unknown>): { mode?: Mode } => {
    const mode = search["mode"];
    return mode === "weak" ? { mode: "weak" } : { mode: "quick" };
  },
  head: () => ({
    meta: [
      { title: "Быстрая тренировка — English Tenses Trainer" },
      {
        name: "description",
        content: "10 коротких заданий по уже изученным временам английского языка.",
      },
      { property: "og:title", content: "Быстрая тренировка — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Пять минут практики: короткие задания и разбор ошибок.",
      },
    ],
  }),
  component: QuickPage,
});

function QuickPage() {
  const { mode } = Route.useSearch();
  const progress = useProgress();
  const [seed, setSeed] = useState(1);
  const [index, setIndex] = useState(0);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const exercises = useMemo(
    () => (mode === "weak" ? weakSpotTraining(progress, seed) : quickTraining(progress, seed)),
    // Набор фиксируется на время сессии тренировки.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, progress === null],
  );

  const current = exercises[index];
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;

  if (!exercises.length) {
    return (
      <div className="card-surface p-6">
        <p className="text-muted-foreground">
          Сначала пройди хотя бы одну тему — тогда появятся задания для тренировки.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl">{mode === "weak" ? "🎯 Слабые места" : "⚡ 5 минут"}</h1>
        <p className="mt-2 text-muted-foreground">
          {mode === "weak"
            ? "Задания по правилам, где точность пока ниже нормы."
            : "10 коротких заданий из уже изученных тем."}
        </p>
      </header>

      {!current ? (
        <div className="card-surface space-y-4 p-6">
          <h2 className="text-2xl">Тренировка пройдена</h2>
          <p className="text-muted-foreground">
            Правильных ответов: {stats.correct} из {stats.total} ({accuracy}%).
          </p>
          <ProgressBar value={accuracy} tone="success" />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setSeed((s) => s + 1);
                setIndex(0);
                setStats({ correct: 0, total: 0 });
              }}
            >
              Ещё подход
            </Button>
            <Link
              to="/progress"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold"
            >
              К прогрессу
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Tensy mood="hint" compact>
            Не спеши: сначала пойми ситуацию, потом выбирай форму.
          </Tensy>
          <ExerciseCard
            key={current.id}
            exercise={current}
            index={index}
            total={exercises.length}
            onResult={(correct, userAnswer) => {
              setStats((s) => ({
                correct: s.correct + (correct ? 1 : 0),
                total: s.total + 1,
              }));
              recordAnswer({
                tenseId: moduleOf(current.id),
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
        </>
      )}
    </div>
  );
}
