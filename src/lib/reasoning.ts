import type { Exercise, Reasoning, ReasoningStepKind } from "@/data/types";
import { PRESENT_SIMPLE_REASONING } from "@/data/present-simple/reasoning";
import { PRESENT_CONTINUOUS_REASONING } from "@/data/present-continuous/reasoning";
import { PRESENT_PERFECT_REASONING } from "@/data/present-perfect/reasoning";
import { PRESENT_PERFECT_CONTINUOUS_REASONING } from "@/data/present-perfect-continuous/reasoning";
import { COMPARE_PRESENT_REASONING } from "@/data/compare/present-simple-continuous";
import { COMPARE_PERFECT_REASONING } from "@/data/compare/present-perfect-past-simple";
import { COMPARE_PPC_REASONING } from "@/data/compare/perfect-vs-perfect-continuous";
import { PAST_SIMPLE_REASONING } from "@/data/past-simple/reasoning";
import { PAST_CONTINUOUS_REASONING } from "@/data/past-continuous/reasoning";
import { COMPARE_PAST_REASONING } from "@/data/compare/past-simple-continuous";
import { PAST_PERFECT_REASONING } from "@/data/past-perfect/reasoning";
import { COMPARE_PAST_PERFECT_REASONING } from "@/data/compare/past-perfect-simple";
import { normalize } from "./answer-check";

/**
 * Реестр объяснений «Почему?» по временам.
 * Новое время = новый файл reasoning.ts и одна строка здесь.
 */
export const REASONING_BY_TENSE: Record<string, Record<string, Reasoning>> = {
  "present-simple": PRESENT_SIMPLE_REASONING,
  "present-continuous": PRESENT_CONTINUOUS_REASONING,
  "present-perfect": PRESENT_PERFECT_REASONING,
  "present-perfect-continuous": PRESENT_PERFECT_CONTINUOUS_REASONING,
  "compare-present": COMPARE_PRESENT_REASONING,
  "compare-perfect": COMPARE_PERFECT_REASONING,
  "compare-perfect-continuous": COMPARE_PPC_REASONING,
  "past-simple": PAST_SIMPLE_REASONING,
  "past-continuous": PAST_CONTINUOUS_REASONING,
  "compare-past": COMPARE_PAST_REASONING,
  "past-perfect": PAST_PERFECT_REASONING,
  "compare-past-perfect": COMPARE_PAST_PERFECT_REASONING,
};

/** Стандартные заголовки шагов (общие для всех времён). */
export const STEP_TITLES: Record<ReasoningStepKind, string> = {
  when: "Когда происходит действие?",
  what: "Что происходит?",
  tense: "Какое время подходит?",
  who: "Кто выполняет действие?",
  structure: "Какая нужна конструкция?",
  form: "Какая форма глагола нужна?",
};

/** Объяснение для упражнения: сначала inline, потом реестр, потом запасной вариант. */
export function getReasoning(ex: Exercise): Reasoning {
  const found = ex.reasoning ?? REASONING_BY_TENSE[ex.tense]?.[ex.id];
  if (found) return found;
  return {
    steps: [{ kind: "form", text: ex.explanation }],
    result: ex.correctAnswer,
  };
}

/** Разбор именно того варианта, который выбрал ученик. */
export function explainWrongAnswer(reasoning: Reasoning, userAnswer: string): string | null {
  const a = normalize(userAnswer);
  const match = reasoning.wrongAnswers?.find((w) => normalize(w.answer) === a);
  return match?.text ?? reasoning.wrongDefault ?? null;
}
