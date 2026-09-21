/** Модуль «Все Past»: три уровня тренировки + банк Past Challenge. */
import type { Exercise } from "@/data/types";
import { LEVEL_1 } from "./level1";
import { LEVEL_2 } from "./level2";
import { LEVEL_3 } from "./level3";

export { LEVEL_1, LEVEL_2, LEVEL_3 };
export { ALL_PAST_ID } from "./helpers";
export { PAST_FINAL_BANK, PAST_FINAL_SIZE, pastFinalTestFor } from "./final-test";

export type LevelId = 1 | 2 | 3;

export const PAST_LEVELS: { id: LevelId; title: string; subtitle: string; exercises: Exercise[] }[] =
  [
    {
      id: 1,
      title: "Уровень 1 — вижу подсказку",
      subtitle: "Контекст понятный, есть слова-подсказки: yesterday, at 8 p.m., before, for.",
      exercises: LEVEL_1,
    },
    {
      id: 2,
      title: "Уровень 2 — понимаю ситуацию",
      subtitle: "Маркеров мало: время выбираем по смыслу ситуации.",
      exercises: LEVEL_2,
    },
    {
      id: 3,
      title: "Уровень 3 — выбираю сам",
      subtitle: "Без вариантов и подсказок: сам определи время и форму глагола.",
      exercises: LEVEL_3,
    },
  ];

export const ALL_PAST_TRAINING: Exercise[] = [...LEVEL_1, ...LEVEL_2, ...LEVEL_3];
