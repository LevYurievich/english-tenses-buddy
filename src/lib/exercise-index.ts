/** Общий индекс всех упражнений приложения: id → упражнение. Нужен для подбора тренировок. */
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
import { ALL_PRESENT_TRAINING } from "@/data/all-present";
import type { Exercise } from "@/data/types";

/** Тренировочные упражнения, сгруппированные по времени/модулю. */
export const BANKS: Record<string, Exercise[]> = {
  "present-simple": PRESENT_SIMPLE_EXERCISES,
  "present-continuous": PRESENT_CONTINUOUS_EXERCISES,
  "present-perfect": PRESENT_PERFECT_EXERCISES,
  "present-perfect-continuous": [
    ...PRESENT_PERFECT_CONTINUOUS_EXERCISES,
    ...FOR_SINCE_EXERCISES,
  ],
  "compare-present": COMPARE_PRESENT_EXERCISES,
  "compare-perfect": COMPARE_PERFECT_EXERCISES,
  "compare-perfect-continuous": COMPARE_PPC_EXERCISES,
  "all-present": ALL_PRESENT_TRAINING,
};

export const ALL_EXERCISES: Exercise[] = [
  ...Object.values(BANKS).flat(),
  ...PRESENT_SIMPLE_TEST,
  ...PRESENT_CONTINUOUS_TEST,
  ...PRESENT_PERFECT_TEST,
  ...PRESENT_PERFECT_CONTINUOUS_TEST,
];

export const EXERCISE_BY_ID: Record<string, Exercise> = Object.fromEntries(
  ALL_EXERCISES.map((e) => [e.id, e]),
);

/** Какому модулю принадлежит упражнение (нужно для записи прогресса в смешанных тренировках). */
export const MODULE_BY_EXERCISE: Record<string, string> = Object.fromEntries(
  Object.entries(BANKS).flatMap(([module, list]) => list.map((e) => [e.id, module])),
);

export function moduleOf(exerciseId: string): string {
  return MODULE_BY_EXERCISE[exerciseId] ?? "present-simple";
}
