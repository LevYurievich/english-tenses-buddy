/** Статистика по грамматическим навыкам и по категориям ошибок — по сохранённым результатам. */
import type { ProgressState } from "./progress";
import { EXERCISE_BY_ID } from "./exercise-index";
import type { Exercise } from "@/data/types";

export const SKILL_GROUPS: { id: string; title: string; skills: Exercise["skill"][] }[] = [
  { id: "tense-choice", title: "Выбор времени", skills: ["tense-choice", "situation", "meaning"] },
  { id: "formula", title: "Формула", skills: ["formula", "statement", "order"] },
  { id: "verb-form", title: "Форма глагола", skills: ["verb-form", "ing", "be-form", "been"] },
  { id: "question", title: "Вопросы", skills: ["question"] },
  { id: "negative", title: "Отрицания", skills: ["negative"] },
  { id: "for-since", title: "FOR / SINCE", skills: ["for-since"] },
];

export type SkillStat = { id: string; title: string; correct: number; total: number; accuracy: number };

/** Все ответы ученика: [упражнение, верно?]. */
function answers(state: ProgressState | null): [Exercise, boolean][] {
  if (!state) return [];
  const out: [Exercise, boolean][] = [];
  Object.values(state.tenses).forEach((t) => {
    Object.entries(t.results ?? {}).forEach(([id, ok]) => {
      const ex = EXERCISE_BY_ID[id];
      if (ex) out.push([ex, ok]);
    });
  });
  return out;
}

export function skillStats(state: ProgressState | null): SkillStat[] {
  const data = answers(state);
  return SKILL_GROUPS.map((group) => {
    const rows = data.filter(([ex]) => group.skills.includes(ex.skill));
    const correct = rows.filter(([, ok]) => ok).length;
    const total = rows.length;
    return {
      id: group.id,
      title: group.title,
      correct,
      total,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
    };
  });
}

export type CategoryStat = { category: string; correct: number; total: number; accuracy: number };

export function categoryStats(state: ProgressState | null): CategoryStat[] {
  const data = answers(state);
  const map = new Map<string, { correct: number; total: number }>();
  data.forEach(([ex, ok]) => {
    const row = map.get(ex.errorCategory) ?? { correct: 0, total: 0 };
    row.total += 1;
    if (ok) row.correct += 1;
    map.set(ex.errorCategory, row);
  });
  return [...map.entries()]
    .map(([category, r]) => ({
      category,
      ...r,
      accuracy: Math.round((r.correct / r.total) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** Категории, где точность ниже 75% и есть минимум 3 ответа. */
export function weakCategories(state: ProgressState | null): CategoryStat[] {
  return categoryStats(state).filter((c) => c.total >= 3 && c.accuracy < 75);
}

/** Общая точность по всем ответам. */
export function accuracyOverall(state: ProgressState | null): number {
  if (!state) return 0;
  const totals = Object.values(state.tenses).reduce(
    (acc, t) => ({ correct: acc.correct + t.correct, total: acc.total + t.total }),
    { correct: 0, total: 0 },
  );
  return totals.total ? Math.round((totals.correct / totals.total) * 100) : 0;
}
