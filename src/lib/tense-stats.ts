import { PRESENT_SIMPLE_EXERCISES, PRESENT_SIMPLE_TEST } from "@/data/present-simple/exercises";
import {
  PRESENT_CONTINUOUS_EXERCISES,
  PRESENT_CONTINUOUS_TEST,
} from "@/data/present-continuous/exercises";
import { COMPARE_PRESENT_EXERCISES } from "@/data/compare/present-simple-continuous";
import { TENSES } from "@/data/tenses";
import { getTenseProgress, tensePercent, type ProgressState } from "./progress";

export const COUNTS: Record<string, { exercises: number; test: number }> = {
  "present-simple": {
    exercises: PRESENT_SIMPLE_EXERCISES.length,
    test: PRESENT_SIMPLE_TEST.length,
  },
  "present-continuous": {
    exercises: PRESENT_CONTINUOUS_EXERCISES.length,
    test: PRESENT_CONTINUOUS_TEST.length,
  },
  "compare-present": {
    exercises: COMPARE_PRESENT_EXERCISES.length,
    test: 0,
  },
};

export function percentFor(state: ProgressState | null, tenseId: string): number {
  if (!state) return 0;
  const counts = COUNTS[tenseId];
  if (!counts) return 0;
  return tensePercent(state, tenseId, counts.exercises, counts.test);
}

export function allPercents(state: ProgressState | null): Record<string, number> {
  return Object.fromEntries(TENSES.map((t) => [t.id, percentFor(state, t.id)]));
}

/** Урок считается пройденным: теория + все упражнения + хотя бы одна попытка теста. */
export function isCompleted(state: ProgressState | null, tenseId: string): boolean {
  if (!state) return false;
  const counts = COUNTS[tenseId];
  if (!counts) return false;
  const p = getTenseProgress(state, tenseId);
  return (
    p.theoryDone &&
    p.doneExercises.length >= counts.exercises &&
    (counts.test === 0 || (p.testAttempts ?? 0) > 0)
  );
}

/** Средний прогресс по доступным временам: «Скоро» не считаем провалом. */
export function overall(state: ProgressState | null): number {
  const available = TENSES.filter((t) => t.available);
  if (!available.length) return 0;
  const values = available.map((t) => percentFor(state, t.id));
  return Math.round(values.reduce((a, b) => a + b, 0) / available.length);
}
