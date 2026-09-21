import { PRESENT_SIMPLE_EXERCISES, PRESENT_SIMPLE_TEST } from "@/data/present-simple/exercises";
import {
  PRESENT_CONTINUOUS_EXERCISES,
  PRESENT_CONTINUOUS_TEST,
} from "@/data/present-continuous/exercises";
import { PRESENT_PERFECT_EXERCISES, PRESENT_PERFECT_TEST } from "@/data/present-perfect/exercises";
import {
  PRESENT_PERFECT_CONTINUOUS_EXERCISES,
  PRESENT_PERFECT_CONTINUOUS_TEST,
} from "@/data/present-perfect-continuous/exercises";
import { FOR_SINCE_EXERCISES } from "@/data/present-perfect-continuous/for-since";
import { COMPARE_PPC_EXERCISES } from "@/data/compare/perfect-vs-perfect-continuous";
import { COMPARE_PRESENT_EXERCISES } from "@/data/compare/present-simple-continuous";
import { COMPARE_PERFECT_EXERCISES } from "@/data/compare/present-perfect-past-simple";
import { ALL_PRESENT_TRAINING, FINAL_TEST_SIZE } from "@/data/all-present";
import { ALL_PAST_TRAINING, PAST_FINAL_SIZE } from "@/data/all-past";
import { PAST_SIMPLE_EXERCISES, PAST_SIMPLE_TEST } from "@/data/past-simple/exercises";
import {
  PAST_CONTINUOUS_EXERCISES,
  PAST_CONTINUOUS_TEST,
} from "@/data/past-continuous/exercises";
import { COMPARE_PAST_EXERCISES } from "@/data/compare/past-simple-continuous";
import {
  ORDER_EXERCISES,
  PAST_PERFECT_EXERCISES,
  PAST_PERFECT_TEST,
} from "@/data/past-perfect/exercises";
import { COMPARE_PAST_PERFECT_EXERCISES } from "@/data/compare/past-perfect-simple";
import {
  PAST_PERFECT_CONTINUOUS_EXERCISES,
  PAST_PERFECT_CONTINUOUS_TEST,
  POINT_EXERCISES,
} from "@/data/past-perfect-continuous/exercises";
import { COMPARE_PFC_EXERCISES } from "@/data/compare/past-perfect-continuous";
import {
  FUTURE_SIMPLE_EXERCISES,
  FUTURE_SIMPLE_TEST,
  WHY_WILL_EXERCISES,
} from "@/data/future-simple/exercises";
import { COMPARE_FUTURE_EXERCISES } from "@/data/compare/future-ways";
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
  "present-perfect": {
    exercises: PRESENT_PERFECT_EXERCISES.length,
    test: PRESENT_PERFECT_TEST.length,
  },
  "present-perfect-continuous": {
    exercises: PRESENT_PERFECT_CONTINUOUS_EXERCISES.length + FOR_SINCE_EXERCISES.length,
    test: PRESENT_PERFECT_CONTINUOUS_TEST.length,
  },
  "past-simple": {
    exercises: PAST_SIMPLE_EXERCISES.length,
    test: PAST_SIMPLE_TEST.length,
  },
  "past-continuous": {
    exercises: PAST_CONTINUOUS_EXERCISES.length,
    test: PAST_CONTINUOUS_TEST.length,
  },
  "compare-past": {
    exercises: COMPARE_PAST_EXERCISES.length,
    test: 0,
  },
  "past-perfect": {
    exercises: ORDER_EXERCISES.length + PAST_PERFECT_EXERCISES.length,
    test: PAST_PERFECT_TEST.length,
  },
  "compare-past-perfect": {
    exercises: COMPARE_PAST_PERFECT_EXERCISES.length,
    test: 0,
  },
  "past-perfect-continuous": {
    exercises: POINT_EXERCISES.length + PAST_PERFECT_CONTINUOUS_EXERCISES.length,
    test: PAST_PERFECT_CONTINUOUS_TEST.length,
  },
  "compare-past-perfect-continuous": {
    exercises: COMPARE_PFC_EXERCISES.length,
    test: 0,
  },
  "all-present": {
    exercises: ALL_PRESENT_TRAINING.length,
    test: FINAL_TEST_SIZE,
  },
  "all-past": {
    exercises: ALL_PAST_TRAINING.length,
    test: PAST_FINAL_SIZE,
  },
  "compare-perfect-continuous": {
    exercises: COMPARE_PPC_EXERCISES.length,
    test: 0,
  },
  "compare-present": {
    exercises: COMPARE_PRESENT_EXERCISES.length,
    test: 0,
  },
  "compare-perfect": {
    exercises: COMPARE_PERFECT_EXERCISES.length,
    test: 0,
  },
  "future-simple": {
    exercises: WHY_WILL_EXERCISES.length + FUTURE_SIMPLE_EXERCISES.length,
    test: FUTURE_SIMPLE_TEST.length,
  },
  "compare-future": {
    exercises: COMPARE_FUTURE_EXERCISES.length,
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
