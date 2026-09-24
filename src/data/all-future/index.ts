/** Модуль «Все Future»: три уровня тренировки + банк Future Challenge. */
import type { Exercise } from "@/data/types";
import { FUTURE_FINAL_BANK, FUTURE_LEVEL_1, FUTURE_LEVEL_2, FUTURE_LEVEL_3 } from "./exercises";
import type { TenseMapRow } from "@/data/all-present/theory";

export { FUTURE_FINAL_BANK, FUTURE_LEVEL_1, FUTURE_LEVEL_2, FUTURE_LEVEL_3 };
export { FUTURE_TENSE_TITLES } from "./exercises";
export { ALL_FUTURE_ID } from "./helpers";

export const FUTURE_LEVELS: { id: 1 | 2 | 3; exercises: Exercise[] }[] = [
  { id: 1, exercises: FUTURE_LEVEL_1 },
  { id: 2, exercises: FUTURE_LEVEL_2 },
  { id: 3, exercises: FUTURE_LEVEL_3 },
];

export const ALL_FUTURE_TRAINING: Exercise[] = [...FUTURE_LEVEL_1, ...FUTURE_LEVEL_2, ...FUTURE_LEVEL_3];

export const FUTURE_FINAL_SIZE = 20;

/** 20 заданий для попытки; при пересдаче стартовая позиция сдвигается. */
export function futureFinalTestFor(attempt: number): Exercise[] {
  const bank = FUTURE_FINAL_BANK;
  const offset = (attempt * 4) % bank.length;
  return Array.from({ length: FUTURE_FINAL_SIZE }, (_, i) => bank[(offset + i) % bank.length] as Exercise);
}

export const FUTURE_MAP: TenseMapRow[] = [
  { meaning: "Что произойдёт? Решение, обещание, прогноз", tense: "Future Simple", formula: "will + V1", example: "I'll help you." },
  { meaning: "Что будет происходить В тот момент?", tense: "Future Continuous", formula: "will be + V-ing", example: "At 8 I'll be watching TV." },
  { meaning: "Что уже будет готово К тому моменту?", tense: "Future Perfect", formula: "will have + V3", example: "By 8 I'll have finished." },
  { meaning: "Как долго процесс будет идти К тому моменту?", tense: "Future Perfect Continuous", formula: "will have been + V-ing", example: "By 8 I'll have been working for 5 hours." },
];
