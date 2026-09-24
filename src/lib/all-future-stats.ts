/** Диагностика модуля «Все Future»: по временам, навыкам и категориям ошибок. */
import type { Exercise } from "@/data/types";
import { CATEGORY_TITLES } from "@/data/error-categories";
import { SKILL_TITLES } from "@/data/skills";
import { ALL_FUTURE_ID, ALL_FUTURE_TRAINING, FUTURE_FINAL_BANK, FUTURE_LEVELS } from "@/data/all-future";
import { getTenseProgress, type ProgressState } from "./progress";
import type { Stat } from "./all-present-stats";

export type { Stat };

export const FUTURE_TITLES: Record<string, string> = {
  "future-simple": "Future Simple",
  "future-continuous": "Future Continuous",
  "future-perfect": "Future Perfect",
  "future-perfect-continuous": "Future Perfect Continuous",
};

const BANK: Exercise[] = [...ALL_FUTURE_TRAINING, ...FUTURE_FINAL_BANK];

function group(
  results: Record<string, boolean>,
  keyOf: (ex: Exercise) => string | undefined,
  titleOf: (key: string) => string,
): Stat[] {
  const map = new Map<string, { correct: number; total: number }>();
  BANK.forEach((ex) => {
    const value = results[ex.id];
    if (value === undefined) return;
    const key = keyOf(ex);
    if (!key) return;
    const row = map.get(key) ?? { correct: 0, total: 0 };
    row.total += 1;
    if (value) row.correct += 1;
    map.set(key, row);
  });
  return [...map.entries()].map(([key, row]) => ({ key, title: titleOf(key), ...row }));
}

export function futureModuleResults(state: ProgressState | null): Record<string, boolean> {
  if (!state) return {};
  return getTenseProgress(state, ALL_FUTURE_ID).results ?? {};
}

export function futureByTense(results: Record<string, boolean>): Stat[] {
  const stats = group(
    results,
    (ex) => ex.targetTense,
    (k) => FUTURE_TITLES[k] ?? k,
  );
  const order = Object.keys(FUTURE_TITLES);
  return stats.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
}

export function futureBySkill(results: Record<string, boolean>): Stat[] {
  return group(
    results,
    (ex) => ex.skill,
    (k) => SKILL_TITLES[k] ?? k,
  ).sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export function futureByCategory(results: Record<string, boolean>): Stat[] {
  return group(
    results,
    (ex) => ex.errorCategory,
    (k) => CATEGORY_TITLES[k] ?? k,
  );
}

export function futureLevelProgress(state: ProgressState | null) {
  const done = state ? getTenseProgress(state, ALL_FUTURE_ID).doneExercises : [];
  return FUTURE_LEVELS.map((level) => ({
    id: level.id,
    title: level.title,
    done: level.exercises.filter((e) => done.includes(e.id)).length,
    total: level.exercises.length,
  }));
}

export function futureLevelsCompleted(state: ProgressState | null): boolean {
  return futureLevelProgress(state).every((l) => l.done >= l.total);
}

/** 1–3 самых слабых навыка — для блока «Твои слабые места». */
export function futureWeakSpots(results: Record<string, boolean>): Stat[] {
  return [...futureByCategory(results), ...futureByTense(results)]
    .filter((s) => s.total >= 2 && s.correct / s.total < 0.85)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 3);
}

/** Конкретный вывод, а не «хорошо / плохо». */
export function futureRecommendations(results: Record<string, boolean>): string[] {
  const tenses = futureByTense(results);
  const strong = tenses.filter((s) => s.total >= 2 && s.correct / s.total >= 0.85);
  const weak = tenses
    .filter((s) => s.total >= 2 && s.correct / s.total < 0.8)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
  const weakCats = futureByCategory(results)
    .filter((s) => s.total - s.correct >= 2)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);

  const texts: string[] = [];
  if (strong.length >= 2) {
    texts.push(`Ты уверенно справляешься: ${strong.map((s) => s.title).join(", ")}.`);
  }
  weak.slice(0, 2).forEach((s) => {
    texts.push(
      `${s.title} — ${Math.round((s.correct / s.total) * 100)}%. Вернись к уроку и повтори, в каких ситуациях нужно это время.`,
    );
  });
  weakCats.slice(0, 2).forEach((s) => {
    texts.push(`«${s.title}» — здесь чаще всего были ошибки. Потренируй именно это различие.`);
  });
  if (!texts.length) {
    texts.push("Пока всё ровно: времена прошлого ты выбираешь уверенно. Попробуй Past Challenge.");
  }
  return texts;
}

/** Подбор заданий для тренировки слабых мест — только из проверенного банка. */
export function futureWeakAreaExercises(results: Record<string, boolean>, limit = 12): Exercise[] {
  const catScore = new Map(
    futureByCategory(results).map((s) => [s.key, s.total ? s.correct / s.total : 1]),
  );
  const tenseScore = new Map(
    futureByTense(results).map((s) => [s.key, s.total ? s.correct / s.total : 1]),
  );

  const scored = ALL_FUTURE_TRAINING.map((ex) => {
    const answered = results[ex.id];
    const cat = catScore.get(ex.errorCategory) ?? 1;
    const tense = tenseScore.get(ex.targetTense ?? "") ?? 1;
    const score = cat * 0.6 + tense * 0.4 - (answered === false ? 0.5 : 0);
    return { ex, score };
  })
    .filter((row) => row.score < 0.95)
    .sort((a, b) => a.score - b.score);

  return scored.slice(0, limit).map((r) => r.ex);
}
