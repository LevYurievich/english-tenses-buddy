/** Данные теории Past Continuous. Отдельно от UI. */

export const MARKER_WORDS = [
  { en: "at 5 p.m. yesterday", ru: "вчера в 5 вечера" },
  { en: "at that moment", ru: "в тот момент" },
  { en: "all evening", ru: "весь вечер" },
  { en: "while", ru: "пока, в то время как" },
  { en: "when", ru: "когда" },
];

export const USAGE_CASES: { title: string; en: string; ru: string; note: string }[] = [
  {
    title: "Процесс в конкретный момент прошлого",
    en: "At 7 p.m. I was having dinner.",
    ru: "В 7 вечера я ужинал.",
    note: "Мы заглядываем внутрь момента: действие шло.",
  },
  {
    title: "Два действия одновременно",
    en: "While I was reading, my brother was playing computer games.",
    ru: "Пока я читал, мой брат играл в компьютерные игры.",
    note: "PROCESS ↔ PROCESS",
  },
  {
    title: "Процесс прервало короткое событие",
    en: "I was sleeping when the phone rang.",
    ru: "Я спал, когда зазвонил телефон.",
    note: "████ процесс + ● событие (Past Simple)",
  },
];

export const BE_FORMS: { subject: string; form: string }[] = [
  { subject: "I", form: "was" },
  { subject: "He", form: "was" },
  { subject: "She", form: "was" },
  { subject: "It", form: "was" },
  { subject: "You", form: "were" },
  { subject: "We", form: "were" },
  { subject: "They", form: "were" },
];

export const ING_RULES: { pattern: string; examples: string[] }[] = [
  { pattern: "Обычный случай: V1 + ing", examples: ["play → playing", "read → reading"] },
  { pattern: "Немая -e уходит", examples: ["make → making", "write → writing"] },
  { pattern: "Короткое слово — согласная удваивается", examples: ["run → running", "sit → sitting"] },
  { pattern: "-ie → -ying", examples: ["lie → lying", "die → dying"] },
];

export const CHEATSHEET: { sign: string; formula: string; example: string }[] = [
  { sign: "+", formula: "Subject + was / were + V-ing", example: "I was reading." },
  { sign: "−", formula: "Subject + wasn't / weren't + V-ing", example: "I wasn't reading." },
  { sign: "?", formula: "Was / Were + subject + V-ing ?", example: "Was I reading?" },
  { sign: "+", formula: "They + were + V-ing", example: "They were reading." },
  { sign: "−", formula: "They + weren't + V-ing", example: "They weren't reading." },
  { sign: "?", formula: "Were + they + V-ing ?", example: "Were they reading?" },
];
