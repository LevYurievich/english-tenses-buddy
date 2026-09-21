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
import { ALL_PAST_TRAINING, PAST_FINAL_BANK } from "@/data/all-past";
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
  "all-past": ALL_PAST_TRAINING,
  "past-simple": PAST_SIMPLE_EXERCISES,
  "past-continuous": PAST_CONTINUOUS_EXERCISES,
  "compare-past": COMPARE_PAST_EXERCISES,
  "past-perfect": [...ORDER_EXERCISES, ...PAST_PERFECT_EXERCISES],
  "compare-past-perfect": COMPARE_PAST_PERFECT_EXERCISES,
  "past-perfect-continuous": [...POINT_EXERCISES, ...PAST_PERFECT_CONTINUOUS_EXERCISES],
  "compare-past-perfect-continuous": COMPARE_PFC_EXERCISES,
  "future-simple": [...WHY_WILL_EXERCISES, ...FUTURE_SIMPLE_EXERCISES],
  "compare-future": COMPARE_FUTURE_EXERCISES,
};

export const ALL_EXERCISES: Exercise[] = [
  ...Object.values(BANKS).flat(),
  ...PRESENT_SIMPLE_TEST,
  ...PRESENT_CONTINUOUS_TEST,
  ...PRESENT_PERFECT_TEST,
  ...PRESENT_PERFECT_CONTINUOUS_TEST,
  ...PAST_SIMPLE_TEST,
  ...PAST_CONTINUOUS_TEST,
  ...PAST_PERFECT_TEST,
  ...PAST_PERFECT_CONTINUOUS_TEST,
  ...PAST_FINAL_BANK,
  ...FUTURE_SIMPLE_TEST,
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
