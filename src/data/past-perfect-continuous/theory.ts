/** Данные теории Past Perfect Continuous. Отдельно от UI. */

export const MARKER_WORDS = [
  { en: "for two hours", ru: "в течение двух часов" },
  { en: "since morning", ru: "с утра" },
  { en: "all day", ru: "весь день" },
  { en: "before", ru: "до того как" },
  { en: "by the time", ru: "к тому времени, когда" },
  { en: "when", ru: "когда (момент прошлого)" },
  { en: "how long", ru: "как долго" },
];

export const PERSONS = [
  "I had been working.",
  "You had been working.",
  "He had been working.",
  "She had been working.",
  "We had been working.",
  "They had been working.",
];

export const USAGE_CASES: { title: string; en: string; ru: string; note: string; line: string }[] = [
  {
    title: "Процесс длился до другого события в прошлом",
    en: "When the teacher came in, the children had been talking for ten minutes.",
    ru: "Когда учитель вошёл, дети разговаривали уже десять минут.",
    note: "Точка отсчёта — приход учителя. До неё шёл процесс.",
    line: `TALKING
████████████████████
                    ● TEACHER CAME`,
  },
  {
    title: "Процесс закончился, но результат был виден в прошлом",
    en: "Tom was tired because he had been running.",
    ru: "Том устал, потому что до этого бегал.",
    note: "Процесс мог уже закончиться, но его результат виден в тот момент прошлого.",
    line: `RUNNING
██████████████■
               ● TOM WAS TIRED`,
  },
];

export const FOR_EXAMPLES = ["for two hours", "for three days", "for a long time"];
export const SINCE_EXAMPLES = ["since Monday", "since 5 o'clock", "since morning"];

export const ING_REMINDER = [
  "work → working",
  "study → studying",
  "make → making",
  "run → running",
  "lie → lying",
];

export const STATIVE_VERBS = ["know", "believe", "understand", "want", "need", "love"];

export const CONTINUOUS_SYSTEM = [
  { tense: "Present Continuous", formula: "AM / IS / ARE + V-ING", sense: "процесс сейчас" },
  { tense: "Past Continuous", formula: "WAS / WERE + V-ING", sense: "процесс тогда" },
  {
    tense: "Present Perfect Continuous",
    formula: "HAVE / HAS + BEEN + V-ING",
    sense: "процесс до сейчас",
  },
  {
    tense: "Past Perfect Continuous",
    formula: "HAD + BEEN + V-ING",
    sense: "процесс до момента в прошлом",
  },
];

export const CHEATSHEET: { sign: string; formula: string; example: string }[] = [
  { sign: "+", formula: "Subject + had + been + V-ing", example: "I had been working." },
  { sign: "−", formula: "Subject + hadn't + been + V-ing", example: "I hadn't been working." },
  { sign: "?", formula: "Had + subject + been + V-ing ?", example: "Had I been working?" },
];
