/** Модуль «Все Present»: три уровня тренировки + банк финального экзамена. */
import type { Exercise } from "@/data/types";
import { LEVEL_1 } from "./level1";
import { LEVEL_2 } from "./level2";
import { LEVEL_3 } from "./level3";

export { LEVEL_1, LEVEL_2, LEVEL_3 };
export { ALL_PRESENT_ID } from "./helpers";
export { FINAL_TEST_BANK, FINAL_TEST_SIZE, finalTestFor } from "./final-test";

export type LevelId = 1 | 2 | 3;

export const LEVELS: { id: LevelId; title: string; subtitle: string; exercises: Exercise[] }[] = [
  {
    id: 1,
    title: "Уровень 1 — вижу подсказку",
    subtitle: "Есть слова-маркеры: usually, now, already, for, since.",
    exercises: LEVEL_1,
  },
  {
    id: 2,
    title: "Уровень 2 — понимаю ситуацию",
    subtitle: "Маркеров почти нет: время выбираем по смыслу ситуации.",
    exercises: LEVEL_2,
  },
  {
    id: 3,
    title: "Уровень 3 — выбираю сам",
    subtitle: "Без вариантов и подсказок: сам определи время и форму глагола.",
    exercises: LEVEL_3,
  },
];

export const ALL_PRESENT_TRAINING: Exercise[] = [...LEVEL_1, ...LEVEL_2, ...LEVEL_3];
