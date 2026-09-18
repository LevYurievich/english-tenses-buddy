export const MARKER_WORDS = [
  { en: "for", ru: "в течение" },
  { en: "since", ru: "с (какого-то момента)" },
  { en: "all day", ru: "весь день" },
  { en: "all morning", ru: "всё утро" },
  { en: "all week", ru: "всю неделю" },
  { en: "lately", ru: "в последнее время" },
  { en: "recently", ru: "недавно" },
  { en: "how long", ru: "как долго" },
];

export const USAGE_CARDS: {
  title: string;
  text: string;
  examples: { ru: string; en: string }[];
}[] = [
  {
    title: "Действие началось раньше и продолжается сейчас",
    text: "Главный вопрос — КАК ДОЛГО? Нас интересует длительность процесса.",
    examples: [
      { ru: "Я изучаю английский уже три года.", en: "I have been studying English for three years." },
      { ru: "Она ждёт автобус двадцать минут.", en: "She has been waiting for the bus for twenty minutes." },
    ],
  },
  {
    title: "Процесс только что закончился, а результат виден сейчас",
    text: "Действие могло закончиться минуту назад, но мы видим его следы.",
    examples: [
      { ru: "Том устал, потому что он бегал.", en: "Tom is tired because he has been running." },
      { ru: "У тебя грязные руки. Ты работал в саду?", en: "Your hands are dirty. Have you been working in the garden?" },
    ],
  },
];

export const HAVE_TABLE = [
  { who: "I / You / We / They", aux: "have been", example: "I have been studying" },
  { who: "He / She / It", aux: "has been", example: "She has been studying" },
];

export const PARTS = [
  { part: "HAVE / HAS", note: "показывает Perfect — связь с настоящим" },
  { part: "BEEN", note: "обязательная часть конструкции" },
  { part: "V-ING", note: "показывает процесс" },
];

export const FOR_EXAMPLES = ["for two hours", "for three days", "for a week", "for five years", "for a long time"];

export const SINCE_EXAMPLES = ["since Monday", "since 2024", "since 5 o'clock", "since January", "since I was ten"];

export const STATIVE_VERBS = ["know", "believe", "understand", "love", "want", "need"];

export const CHEATSHEET_SIGNS = [
  { sign: "+", example: "I have been working. / She has been working." },
  { sign: "−", example: "I haven't been working. / She hasn't been working." },
  { sign: "?", example: "Have you been working? / Has she been working?" },
];
