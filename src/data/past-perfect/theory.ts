/** Данные теории Past Perfect. Отдельно от UI. */

export const MARKER_WORDS = [
  { en: "before", ru: "до того как" },
  { en: "after", ru: "после того как" },
  { en: "already", ru: "уже" },
  { en: "by 6 p.m.", ru: "к 6 вечера" },
  { en: "by Monday", ru: "к понедельнику" },
  { en: "by the time...", ru: "к тому времени, когда..." },
];

export const USAGE_CASES: { title: string; en: string; ru: string; note: string }[] = [
  {
    title: "Одно действие завершилось до другого",
    en: "When I arrived, Tom had left.",
    ru: "Когда я пришёл, Том уже ушёл.",
    note: "had left — раньше, arrived — позже.",
  },
  {
    title: "Действие завершилось к моменту прошлого",
    en: "By 8 p.m., I had finished my homework.",
    ru: "К 8 вечера я закончил домашнее задание.",
    note: "BY = к определённому моменту.",
  },
  {
    title: "Причина ситуации в прошлом",
    en: "Tom was hungry because he hadn't eaten breakfast.",
    ru: "Том был голоден, потому что не позавтракал.",
    note: "Голод — в прошлом, причина — ещё раньше.",
  },
];

export const IRREGULAR_VERBS: { v1: string; v2: string; v3: string; ru: string }[] = [
  { v1: "play", v2: "played", v3: "played", ru: "играть" },
  { v1: "go", v2: "went", v3: "gone", ru: "идти" },
  { v1: "see", v2: "saw", v3: "seen", ru: "видеть" },
  { v1: "eat", v2: "ate", v3: "eaten", ru: "есть" },
  { v1: "write", v2: "wrote", v3: "written", ru: "писать" },
  { v1: "take", v2: "took", v3: "taken", ru: "брать" },
  { v1: "break", v2: "broke", v3: "broken", ru: "ломать" },
  { v1: "do", v2: "did", v3: "done", ru: "делать" },
  { v1: "be", v2: "was / were", v3: "been", ru: "быть" },
];

export const CHEATSHEET: { sign: string; formula: string; example: string }[] = [
  { sign: "+", formula: "Subject + had + V3", example: "I had finished." },
  { sign: "−", formula: "Subject + hadn't + V3", example: "I hadn't finished." },
  { sign: "?", formula: "Had + subject + V3 ?", example: "Had I finished?" },
];
