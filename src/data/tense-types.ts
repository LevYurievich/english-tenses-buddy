/**
 * Визуальная система четырёх типов времён.
 * Используется в карточках, теории, упражнениях, сравнениях, прогрессе и результатах.
 * Цвет — только дополнение: всегда есть символ и название.
 */
export type TenseTypeId = "simple" | "continuous" | "perfect" | "perfect-continuous";

export type TenseType = {
  id: TenseTypeId;
  symbol: string;
  label: string;
  meaning: string;
  /** Класс фона/текста из дизайн-системы. */
  className: string;
};

export const TENSE_TYPES: Record<TenseTypeId, TenseType> = {
  simple: {
    id: "simple",
    symbol: "🔁",
    label: "SIMPLE",
    meaning: "Обычно / факт",
    className: "bg-type-simple-soft text-type-simple",
  },
  continuous: {
    id: "continuous",
    symbol: "▶",
    label: "CONTINUOUS",
    meaning: "Процесс",
    className: "bg-type-continuous-soft text-type-continuous",
  },
  perfect: {
    id: "perfect",
    symbol: "✓",
    label: "PERFECT",
    meaning: "Результат / опыт",
    className: "bg-type-perfect-soft text-type-perfect",
  },
  "perfect-continuous": {
    id: "perfect-continuous",
    symbol: "⏱",
    label: "PERFECT CONTINUOUS",
    meaning: "Длительность процесса",
    className: "bg-type-duration-soft text-type-duration",
  },
};

/** Какому типу принадлежит конкретное время (работает и для будущих Past/Future). */
export function typeOfTense(tenseId?: string): TenseType | null {
  if (!tenseId) return null;
  const id = tenseId.toLowerCase();
  if (id.includes("perfect-continuous") || id.includes("perfect continuous"))
    return TENSE_TYPES["perfect-continuous"];
  if (id.includes("perfect")) return TENSE_TYPES.perfect;
  if (id.includes("continuous")) return TENSE_TYPES.continuous;
  if (id.includes("simple")) return TENSE_TYPES.simple;
  return null;
}

export const TENSE_TYPE_LIST = Object.values(TENSE_TYPES);
