import { PRESENT_SIMPLE_EXERCISES, PRESENT_SIMPLE_TEST } from "@/data/present-simple/exercises";
import { TENSES } from "@/data/tenses";
import { tensePercent, type ProgressState } from "./progress";

const COUNTS: Record<string, { exercises: number; test: number }> = {
  "present-simple": {
    exercises: PRESENT_SIMPLE_EXERCISES.length,
    test: PRESENT_SIMPLE_TEST.length,
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

export function overall(state: ProgressState | null): number {
  const values = TENSES.map((t) => percentFor(state, t.id));
  return Math.round(values.reduce((a, b) => a + b, 0) / TENSES.length);
}
