/** Подбор заданий для быстрой тренировки и тренировки слабых мест. Без AI — только готовые банки. */
import type { Exercise } from "@/data/types";
import type { ProgressState } from "./progress";
import { BANKS } from "./exercise-index";
import { weakCategories } from "./skill-stats";
import { getTenseProgress } from "./progress";

export const QUICK_SIZE = 10;

/** Времена и модули, которые ученик уже начал (теория или хотя бы один ответ). */
export function unlockedModules(state: ProgressState | null): string[] {
  if (!state) return [];
  return Object.keys(BANKS).filter((id) => {
    const p = getTenseProgress(state, id);
    return p.theoryDone || p.total > 0;
  });
}

function shuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed || 1;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    s = (s * 1103515245 + 12345) % 2147483647;
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/** 10 коротких заданий только из уже изученных тем. */
export function quickTraining(state: ProgressState | null, seed = Date.now()): Exercise[] {
  const modules = unlockedModules(state);
  const pool = modules.flatMap((id) => BANKS[id] ?? []);
  const source = pool.length ? pool : (BANKS["present-simple"] ?? []);
  return shuffle(source, seed).slice(0, QUICK_SIZE);
}

/** Задания по категориям, где точность ниже нормы. */
export function weakSpotTraining(state: ProgressState | null, seed = Date.now()): Exercise[] {
  const weak = weakCategories(state).map((c) => c.category);
  const pool = Object.values(BANKS)
    .flat()
    .filter((ex) => weak.includes(ex.errorCategory));
  if (!pool.length) return quickTraining(state, seed);
  return shuffle(pool, seed).slice(0, QUICK_SIZE);
}
