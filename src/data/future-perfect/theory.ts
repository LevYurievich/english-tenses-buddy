/** Теория Future Perfect — данные отдельно от UI. */

export const MAIN_IDEA = {
  title: "К будущему моменту результат уже будет готов",
  question: "Что уже будет сделано к этому моменту?",
  example: "By 8 p.m., Tom will have finished his homework.",
  ru: "К 8 часам Том уже закончит домашнее задание.",
  steps: [
    { label: "СЕЙЧАС", text: "действие ещё не завершено" },
    { label: "8 P.M. 🎯", text: "будущая точка — дедлайн" },
    { label: "К ЭТОЙ ТОЧКЕ", text: "HOMEWORK = FINISHED ✓" },
  ],
};

export const V3_LIST = [
  ["finish", "finished", "finished"],
  ["go", "went", "gone"],
  ["write", "wrote", "written"],
  ["eat", "ate", "eaten"],
  ["do", "did", "done"],
  ["buy", "bought", "bought"],
  ["leave", "left", "left"],
  ["see", "saw", "seen"],
];

export const FORMS = [
  { kind: "Утверждение", formula: "I / you / he / she / we / they + WILL HAVE + V3", example: "She will have finished by Friday." },
  { kind: "Отрицание", formula: "WON'T (WILL NOT) + HAVE + V3", example: "Anna won't have finished by Friday." },
  { kind: "Вопрос", formula: "WILL + кто + HAVE + V3?", example: "Will Tom have finished by 8?" },
  { kind: "Wh-вопрос", formula: "What / How much + WILL + кто + HAVE + V3?", example: "How many pages will you have read by Sunday?" },
];

export const AT_VS_BY = [
  { word: "AT 8", meaning: "в этот момент — что будет происходить?", tense: "Future Continuous", example: "At 8, Tom will be doing his homework." },
  { word: "BY 8", meaning: "не позже 8 — что уже будет готово?", tense: "Future Perfect", example: "By 8, Tom will have done his homework." },
];

export const TYPICAL_MISTAKES = [
  { wrong: "She will has finished.", right: "She will have finished.", note: "После will — всегда have." },
  { wrong: "Tom will have went home.", right: "Tom will have gone home.", note: "Нужна V3, а не V2." },
  { wrong: "They will have finish.", right: "They will have finished.", note: "После have — не V1." },
  { wrong: "By the time you will come…", right: "By the time you come…", note: "После by the time — Present Simple." },
];

export const CHEATSHEET = [
  "Сначала найди будущую точку: by 8, by Friday, by the time…",
  "Спроси: что к ней уже будет готово?",
  "Результат к точке → WILL + HAVE + V3.",
  "Процесс в точке → will be + V-ing. Просто событие → will + V1.",
];
