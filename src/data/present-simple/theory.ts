export type TheoryExample = { ru: string; en: string };

export const MARKER_WORDS = [
  { en: "often", ru: "часто" },
  { en: "usually", ru: "обычно" },
  { en: "always", ru: "всегда" },
  { en: "sometimes", ru: "иногда" },
  { en: "never", ru: "никогда" },
  { en: "every day", ru: "каждый день" },
  { en: "every week", ru: "каждую неделю" },
  { en: "on Mondays", ru: "по понедельникам" },
];

export const USAGE_POINTS = [
  "о привычках",
  "о регулярных действиях",
  "о фактах",
  "о расписаниях",
];

export const USAGE_EXAMPLES: TheoryExample[] = [
  { ru: "Я хожу в школу каждый день.", en: "I go to school every day." },
  { ru: "Моя сестра любит кошек.", en: "My sister likes cats." },
  { ru: "Солнце встаёт на востоке.", en: "The sun rises in the east." },
];

export const CHEATSHEET = {
  columns: ["I / You / We / They", "He / She / It"],
  rows: [
    { sign: "+", cells: ["play", "plays"] },
    { sign: "−", cells: ["don't play", "doesn't play"] },
    { sign: "?", cells: ["Do ... play?", "Does ... play?"] },
  ],
};
