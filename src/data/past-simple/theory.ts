/** Данные теории Past Simple. Отдельно от UI — тексты легко дополнять. */

export type TheoryExample = { ru: string; en: string };

export const MARKER_WORDS = [
  { en: "yesterday", ru: "вчера" },
  { en: "last night", ru: "вчера вечером" },
  { en: "last week", ru: "на прошлой неделе" },
  { en: "last year", ru: "в прошлом году" },
  { en: "... ago", ru: "... назад" },
  { en: "in 2020", ru: "в 2020 году" },
  { en: "when I was...", ru: "когда я был(а)..." },
  { en: "then", ru: "затем" },
];

export const USAGE_CASES: { title: string; en: string; ru: string; note: string }[] = [
  {
    title: "Законченное действие в прошлом",
    en: "I visited London last year.",
    ru: "Я посетил Лондон в прошлом году.",
    note: "Действие произошло и закончилось.",
  },
  {
    title: "Последовательность событий",
    en: "I got up, had breakfast and went to school.",
    ru: "Я встал, позавтракал и пошёл в школу.",
    note: "got up → had breakfast → went to school",
  },
  {
    title: "Повторяющиеся действия в прошлом",
    en: "When I was a child, I played football every day.",
    ru: "Когда я был ребёнком, я каждый день играл в футбол.",
    note: "every day здесь не значит Present Simple — решает контекст.",
  },
];

export const IRREGULAR_VERBS: { v1: string; v2: string; v3: string; ru: string }[] = [
  { v1: "go", v2: "went", v3: "gone", ru: "идти" },
  { v1: "see", v2: "saw", v3: "seen", ru: "видеть" },
  { v1: "eat", v2: "ate", v3: "eaten", ru: "есть" },
  { v1: "write", v2: "wrote", v3: "written", ru: "писать" },
  { v1: "take", v2: "took", v3: "taken", ru: "брать" },
  { v1: "come", v2: "came", v3: "come", ru: "приходить" },
  { v1: "do", v2: "did", v3: "done", ru: "делать" },
  { v1: "have", v2: "had", v3: "had", ru: "иметь" },
  { v1: "make", v2: "made", v3: "made", ru: "делать, создавать" },
  { v1: "buy", v2: "bought", v3: "bought", ru: "покупать" },
  { v1: "give", v2: "gave", v3: "given", ru: "давать" },
  { v1: "find", v2: "found", v3: "found", ru: "находить" },
];

export const ED_RULES: { pattern: string; examples: string[] }[] = [
  { pattern: "Обычный случай: V1 + ed", examples: ["play → played", "work → worked"] },
  { pattern: "Слово на -e: добавляем только -d", examples: ["live → lived", "like → liked"] },
  { pattern: "Согласная + y → -ied", examples: ["study → studied", "try → tried"] },
  {
    pattern: "Короткое слово, согласная удваивается",
    examples: ["stop → stopped", "plan → planned"],
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

export const CHEATSHEET: { sign: string; formula: string; example: string }[] = [
  { sign: "+", formula: "Subject + V2", example: "I played football." },
  { sign: "−", formula: "Subject + didn't + V1", example: "I didn't play football." },
  { sign: "?", formula: "Did + subject + V1 ?", example: "Did you play football?" },
  { sign: "BE", formula: "was / were", example: "I was tired. They were at home." },
];
