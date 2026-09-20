/**
 * Учебный материал модуля «Все Present».
 * Данные универсальные: такие же структуры подойдут для будущих модулей Past и Future.
 */

export type TenseMapRow = {
  meaning: string;
  tense: string;
  formula: string;
  example: string;
};

export const PRESENT_MAP: TenseMapRow[] = [
  {
    meaning: "Обычно / факт",
    tense: "Present Simple",
    formula: "V1 / V1 + s",
    example: "I play · He plays",
  },
  {
    meaning: "Сейчас / процесс",
    tense: "Present Continuous",
    formula: "am / is / are + V-ing",
    example: "I am playing",
  },
  {
    meaning: "Результат / опыт",
    tense: "Present Perfect",
    formula: "have / has + V3",
    example: "I have played",
  },
  {
    meaning: "Процесс + длительность",
    tense: "Present Perfect Continuous",
    formula: "have / has + been + V-ing",
    example: "I have been playing",
  },
];

export type MnemonicCard = {
  icon: string;
  tense: string;
  short: string;
  meaning: string;
  formula: string;
};

export const MNEMONIC_CARDS: MnemonicCard[] = [
  {
    icon: "🔁",
    tense: "Present Simple",
    short: "SIMPLE",
    meaning: "ОБЫЧНО",
    formula: "V1 / V1 + s",
  },
  {
    icon: "▶",
    tense: "Present Continuous",
    short: "CONTINUOUS",
    meaning: "СЕЙЧАС / ПРОЦЕСС",
    formula: "am / is / are + V-ing",
  },
  {
    icon: "✓",
    tense: "Present Perfect",
    short: "PERFECT",
    meaning: "РЕЗУЛЬТАТ / ОПЫТ",
    formula: "have / has + V3",
  },
  {
    icon: "⏱",
    tense: "Present Perfect Continuous",
    short: "PERFECT CONTINUOUS",
    meaning: "КАК ДОЛГО / ПРОЦЕСС",
    formula: "have / has + been + V-ing",
  },
];

export type TreeStep = {
  question: string;
  yes: string;
  formula: string;
};

export const DECISION_TREE: TreeStep[] = [
  {
    question: "Это привычка, факт или регулярное действие?",
    yes: "Present Simple",
    formula: "V1 / V1 + s",
  },
  {
    question: "Действие происходит сейчас или это временная ситуация?",
    yes: "Present Continuous",
    formula: "am / is / are + V-ing",
  },
  {
    question: "Важен результат или опыт к настоящему моменту?",
    yes: "Present Perfect",
    formula: "have / has + V3",
  },
  {
    question: "Важны сам процесс и его длительность до настоящего момента?",
    yes: "Present Perfect Continuous",
    formula: "have / has + been + V-ing",
  },
];

/** Короткий тренинг «Научи меня выбирать»: сначала смысл, потом время. */
export type TeachCase = {
  id: string;
  situation?: string;
  sentence: string;
  meaningOptions: string[];
  meaningAnswer: string;
  tenseAnswer: string;
  why: string;
  formula: string;
  result: string;
};

export const MEANING_OPTIONS = [
  "Обычное / регулярное действие",
  "Процесс сейчас",
  "Результат сейчас",
  "Длительность процесса",
];

export const TEACH_CASES: TeachCase[] = [
  {
    id: "teach-1",
    sentence: "Tom plays football every Saturday.",
    meaningOptions: MEANING_OPTIONS,
    meaningAnswer: "Обычное / регулярное действие",
    tenseAnswer: "Present Simple",
    why: "Том регулярно играет по субботам. Слово every Saturday только подсказывает, но главное — сам смысл: это привычное действие.",
    formula: "V1 / V1 + s",
    result: "Tom plays football every Saturday.",
  },
  {
    id: "teach-2",
    sentence: "Look! Tom is playing football.",
    meaningOptions: MEANING_OPTIONS,
    meaningAnswer: "Процесс сейчас",
    tenseAnswer: "Present Continuous",
    why: "Мы наблюдаем действие прямо сейчас: Том в процессе игры.",
    formula: "am / is / are + V-ing",
    result: "Look! Tom is playing football.",
  },
  {
    id: "teach-3",
    situation: "Том не может открыть дверь, потому что потерял ключ.",
    sentence: "Tom ___ his key.",
    meaningOptions: MEANING_OPTIONS,
    meaningAnswer: "Результат сейчас",
    tenseAnswer: "Present Perfect",
    why: "Важно не то, когда он потерял ключ, а результат сейчас: ключа у него нет.",
    formula: "have / has + V3",
    result: "Tom has lost his key.",
  },
  {
    id: "teach-4",
    situation: "Том начал делать домашнее задание два часа назад и всё ещё его делает.",
    sentence: "Tom ___ his homework for two hours.",
    meaningOptions: MEANING_OPTIONS,
    meaningAnswer: "Длительность процесса",
    tenseAnswer: "Present Perfect Continuous",
    why: "Действие началось раньше, продолжается сейчас, и важна его длительность — два часа.",
    formula: "have / has + been + V-ing",
    result: "Tom has been doing his homework for two hours.",
  },
];

/** Контрастные пары «один глагол — разные времена». */
export const CONTRAST_SETS: { verb: string; rows: { meaning: string; sentence: string }[] }[] = [
  {
    verb: "READ",
    rows: [
      { meaning: "Обычно", sentence: "I read before bed every day." },
      { meaning: "Сейчас", sentence: "I am reading now." },
      { meaning: "Результат", sentence: "I have read this book." },
      { meaning: "Как долго", sentence: "I have been reading for two hours." },
    ],
  },
  {
    verb: "PLAY",
    rows: [
      { meaning: "Обычно", sentence: "Tom plays football every Saturday." },
      { meaning: "Сейчас", sentence: "Tom is playing football." },
      { meaning: "Результат", sentence: "Tom has played three matches this week." },
      { meaning: "Как долго", sentence: "Tom has been playing football for two hours." },
    ],
  },
];

export const TENSE_NAMES = [
  "Present Simple",
  "Present Continuous",
  "Present Perfect",
  "Present Perfect Continuous",
];
