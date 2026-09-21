/**
 * Диагностика смешанного модуля.
 * Универсальная: работает с любым набором упражнений, у которых заполнено targetTense.
 */
import type { Exercise } from "@/data/types";
import { CATEGORY_TITLES } from "@/data/error-categories";
import { SKILL_TITLES } from "@/data/skills";
import { ALL_PRESENT_TRAINING, FINAL_TEST_BANK, LEVELS } from "@/data/all-present";
import { ALL_PRESENT_ID } from "@/data/all-present/helpers";
import { getTenseProgress, type ProgressState } from "./progress";

export const TENSE_TITLES: Record<string, string> = {
  "present-simple": "Present Simple",
  "present-continuous": "Present Continuous",
  "present-perfect": "Present Perfect",
  "present-perfect-continuous": "Present Perfect Continuous",
};

export type Stat = { key: string; title: string; correct: number; total: number };

const BANK: Exercise[] = [...ALL_PRESENT_TRAINING, ...FINAL_TEST_BANK];

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

export function moduleResults(state: ProgressState | null): Record<string, boolean> {
  if (!state) return {};
  return getTenseProgress(state, ALL_PRESENT_ID).results ?? {};
}

export function byTense(results: Record<string, boolean>): Stat[] {
  const stats = group(
    results,
    (ex) => ex.targetTense,
    (k) => TENSE_TITLES[k] ?? k,
  );
  const order = Object.keys(TENSE_TITLES);
  return stats.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
}

export function bySkill(results: Record<string, boolean>): Stat[] {
  return group(
    results,
    (ex) => ex.skill,
    (k) => SKILL_TITLES[k] ?? k,
  ).sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export function byCategory(results: Record<string, boolean>): Stat[] {
  return group(
    results,
    (ex) => ex.errorCategory,
    (k) => CATEGORY_TITLES[k] ?? k,
  );
}

/** Сколько заданий уровня уже выполнено. */
export function levelProgress(state: ProgressState | null) {
  const done = state ? getTenseProgress(state, ALL_PRESENT_ID).doneExercises : [];
  return LEVELS.map((level) => ({
    id: level.id,
    title: level.title,
    done: level.exercises.filter((e) => done.includes(e.id)).length,
    total: level.exercises.length,
  }));
}

export function levelCompleted(state: ProgressState | null, level: 1 | 2 | 3): boolean {
  const row = levelProgress(state).find((l) => l.id === level);
  return !!row && row.done >= row.total;
}

/** Понятный статус вместо сухого процента. */
export function statusLabel(percent: number): string {
  if (percent >= 85) return "Уверенно";
  if (percent >= 65) return "Нужно немного повторить";
  return "Стоит повторить";
}

/** Рекомендации по реальным ошибкам пользователя (без AI, только сохранённые данные). */
export function recommendations(results: Record<string, boolean>): string[] {
  const weakTenses = byTense(results)
    .filter((s) => s.total >= 2 && s.correct / s.total < 0.8)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
  const weakCats = byCategory(results)
    .filter((s) => s.total - s.correct >= 2)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);

  const texts: string[] = [];
  weakTenses.slice(0, 2).forEach((s) => {
    texts.push(
      `${s.title}: ${Math.round((s.correct / s.total) * 100)}%. Вернись к уроку и повтори, в каких ситуациях нужно это время.`,
    );
  });
  weakCats.slice(0, 2).forEach((s) => {
    texts.push(`«${s.title}» — здесь чаще всего были ошибки. Потренируй именно эту тему.`);
  });
  if (!texts.length) texts.push("Пока всё ровно: времена ты выбираешь уверенно. Попробуй экзамен.");
  return texts;
}

/** Подбор заданий для тренировки слабых мест: сначала темы с низкой точностью. */
export function weakAreaExercises(results: Record<string, boolean>, limit = 12): Exercise[] {
  const catScore = new Map(
    byCategory(results).map((s) => [s.key, s.total ? s.correct / s.total : 1]),
  );
  const tenseScore = new Map(
    byTense(results).map((s) => [s.key, s.total ? s.correct / s.total : 1]),
  );

  const scored = ALL_PRESENT_TRAINING.map((ex) => {
    const answered = results[ex.id];
    const cat = catScore.get(ex.errorCategory) ?? 1;
    const tense = tenseScore.get(ex.targetTense ?? "") ?? 1;
    // чем ниже точность и чем свежее ошибка, тем выше приоритет
    const score = cat * 0.6 + tense * 0.4 - (answered === false ? 0.5 : 0);
    return { ex, score };
  })
    .filter((row) => row.score < 0.95)
    .sort((a, b) => a.score - b.score);

  return scored.slice(0, limit).map((r) => r.ex);
}
