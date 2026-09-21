/**
 * Учебный материал модуля «Все Past»: четыре смысла, шпаргалка, алгоритм выбора,
 * временная линия, «одна ситуация — четыре времени», тренажёры «Собери время» и «Построй timeline».
 */
import type { TenseMapRow, MnemonicCard, TreeStep } from "@/data/all-present/theory";

export const PAST_MAP: TenseMapRow[] = [
  {
    meaning: "Событие / факт",
    tense: "Past Simple",
    formula: "V2 · did + V1",
    example: "I watched a film yesterday.",
  },
  {
    meaning: "Процесс в тот момент",
    tense: "Past Continuous",
    formula: "was / were + V-ing",
    example: "I was watching a film at 8 p.m.",
  },
  {
    meaning: "Результат раньше другого момента",
    tense: "Past Perfect",
    formula: "had + V3",
    example: "I had watched the film before Tom arrived.",
  },
  {
    meaning: "Процесс / длительность до момента",
    tense: "Past Perfect Continuous",
    formula: "had + been + V-ing",
    example: "I had been watching the film for an hour.",
  },
];

/** Четыре главных вопроса — с чего начинается раздел. */
export type MeaningCard = {
  icon: string;
  tense: string;
  question: string;
  meaning: string;
  example: string;
  line: string;
};

export const MEANING_CARDS: MeaningCard[] = [
  {
    icon: "●",
    tense: "Past Simple",
    question: "ЧТО ПРОИЗОШЛО?",
    meaning: "Законченное событие или факт.",
    example: "I watched a film yesterday.",
    line: "PAST ────●──── NOW",
  },
  {
    icon: "████",
    tense: "Past Continuous",
    question: "ЧТО ПРОИСХОДИЛО?",
    meaning: "Процесс в определённый момент прошлого.",
    example: "I was watching a film at 8 p.m.",
    line: "PAST ──████──── NOW",
  },
  {
    icon: "✓",
    tense: "Past Perfect",
    question: "ЧТО ПРОИЗОШЛО РАНЬШЕ?",
    meaning: "Событие или результат до другого момента прошлого.",
    example: "I had watched the film before Tom arrived.",
    line: "PAST ●────●──── NOW",
  },
  {
    icon: "⏱",
    tense: "Past Perfect Continuous",
    question: "КАК ДОЛГО ЭТО ПРОИСХОДИЛО ДО ТОГО МОМЕНТА?",
    meaning: "Процесс и его длительность до момента прошлого.",
    example: "I had been watching the film for an hour before Tom arrived.",
    line: "PAST ═══════●──── NOW",
  },
];

export const PAST_MNEMONIC_CARDS: MnemonicCard[] = [
  {
    icon: "●",
    tense: "Past Simple",
    short: "SIMPLE",
    meaning: "СОБЫТИЕ",
    formula: "V2 · did + V1",
  },
  {
    icon: "▶",
    tense: "Past Continuous",
    short: "CONTINUOUS",
    meaning: "ПРОЦЕСС В ТОТ МОМЕНТ",
    formula: "was / were + V-ing",
  },
  {
    icon: "✓",
    tense: "Past Perfect",
    short: "PERFECT",
    meaning: "РАНЬШЕ ДРУГОГО МОМЕНТА",
    formula: "had + V3",
  },
  {
    icon: "⏱",
    tense: "Past Perfect Continuous",
    short: "PERFECT CONTINUOUS",
    meaning: "ДЛИТЕЛЬНОСТЬ ДО МОМЕНТА",
    formula: "had + been + V-ing",
  },
];

export const PAST_DECISION_TREE: TreeStep[] = [
  {
    question: "Шаг 1. Это прошлое? Шаг 2. Мы просто говорим о законченном событии или факте?",
    yes: "Past Simple",
    formula: "V2 · did + V1",
  },
  {
    question: "Шаг 3. Нас интересует процесс В конкретный момент прошлого?",
    yes: "Past Continuous",
    formula: "was / were + V-ing",
  },
  {
    question:
      "Шаг 4. Есть другой момент прошлого, и действие случилось раньше. Шаг 5. Важен результат / факт?",
    yes: "Past Perfect",
    formula: "had + V3",
  },
  {
    question: "Шаг 5. А если важен сам процесс и его длительность до того момента?",
    yes: "Past Perfect Continuous",
    formula: "had + been + V-ing",
  },
];

/** Единая временная линия PAST → NOW. */
export const TIMELINE_ROWS: { art: string; caption: string; tense: string }[] = [
  { art: "────●────────────", caption: "EVENT — событие", tense: "Past Simple" },
  { art: "──████████───────", caption: "PROCESS — процесс", tense: "Past Continuous" },
  { art: "●────────●───────", caption: "EARLIER → LATER", tense: "Past Perfect" },
  { art: "████████→●───────", caption: "DURATION → PAST POINT", tense: "Past Perfect Continuous" },
];

/** Одна ситуация — четыре времени. */
export const PAST_CONTRAST_SETS: {
  verb: string;
  rows: { meaning: string; sentence: string }[];
  askWhatChanges?: string;
}[] = [
  {
    verb: "STUDY",
    rows: [
      { meaning: "Факт", sentence: "Tom studied English yesterday." },
      { meaning: "Процесс в 7 часов", sentence: "Tom was studying English at 7 p.m." },
      {
        meaning: "Раньше другого события",
        sentence: "Tom had studied the topic before the test started.",
      },
      {
        meaning: "Длительность до события",
        sentence: "Tom had been studying for two hours before the test started.",
      },
    ],
  },
  {
    verb: "WORK",
    rows: [
      { meaning: "Факт", sentence: "Tom worked yesterday." },
      { meaning: "Процесс в 5 часов", sentence: "Tom was working at 5 p.m." },
      { meaning: "Раньше прихода Анны", sentence: "Tom had finished his work before Anna arrived." },
      {
        meaning: "Длительность до прихода Анны",
        sentence: "Tom had been working for three hours before Anna arrived.",
      },
    ],
    askWhatChanges:
      "Глагол один и тот же. Что меняется в смысле? Сначала просто факт, потом процесс в конкретный момент, потом действие раньше другого события, потом длительность процесса до него.",
  },
];

export const PAST_TENSE_NAMES = [
  "Past Simple",
  "Past Continuous",
  "Past Perfect",
  "Past Perfect Continuous",
];

/** Тренажёр «Собери время»: смысл → время → формула. */
export type BuildCase = {
  id: string;
  situation: string;
  /** Шаг 2 — есть ли точка отсчёта в прошлом. */
  pointQuestion: string;
  pointOptions: string[];
  pointAnswer: string;
  /** Шаг 4 — что важно. */
  focusOptions: string[];
  focusAnswer: string;
  tenseAnswer: string;
  /** Шаг 6 — собери формулу (в правильном порядке). */
  formulaTokens: string[];
  formulaAnswer: string[];
  result: string;
  why: string;
};

export const FOCUS_OPTIONS = [
  "Законченное событие",
  "Процесс в тот момент",
  "Результат раньше другого момента",
  "Длительность процесса до момента",
];

export const BUILD_CASES: BuildCase[] = [
  {
    id: "bp-1",
    situation: "Когда мама вернулась домой, Том уже два часа делал уроки.",
    pointQuestion: "Есть ли точка отсчёта в прошлом?",
    pointOptions: ["Да — мама вернулась домой", "Нет, момент один"],
    pointAnswer: "Да — мама вернулась домой",
    focusOptions: FOCUS_OPTIONS,
    focusAnswer: "Длительность процесса до момента",
    tenseAnswer: "Past Perfect Continuous",
    formulaTokens: ["DOING", "HAD", "BEEN"],
    formulaAnswer: ["HAD", "BEEN", "DOING"],
    result: "Tom had been doing his homework for two hours when his mother came home.",
    why: "Момент прошлого — мама вернулась. До него шёл процесс, и важно, сколько он длился: два часа.",
  },
  {
    id: "bp-2",
    situation: "Вчера вечером в восемь часов Аня смотрела фильм.",
    pointQuestion: "Есть ли точка отсчёта в прошлом?",
    pointOptions: ["Да — восемь часов вечера", "Нет, момента нет"],
    pointAnswer: "Да — восемь часов вечера",
    focusOptions: FOCUS_OPTIONS,
    focusAnswer: "Процесс в тот момент",
    tenseAnswer: "Past Continuous",
    formulaTokens: ["WATCHING", "WAS"],
    formulaAnswer: ["WAS", "WATCHING"],
    result: "Anna was watching a film at eight o'clock yesterday.",
    why: "Нас интересует не факт «посмотрела», а что происходило именно в восемь часов.",
  },
  {
    id: "bp-3",
    situation: "Когда мы пришли в кинотеатр, фильм уже начался.",
    pointQuestion: "Есть ли точка отсчёта в прошлом?",
    pointOptions: ["Да — мы пришли в кинотеатр", "Нет, момент один"],
    pointAnswer: "Да — мы пришли в кинотеатр",
    focusOptions: FOCUS_OPTIONS,
    focusAnswer: "Результат раньше другого момента",
    tenseAnswer: "Past Perfect",
    formulaTokens: ["STARTED", "HAD"],
    formulaAnswer: ["HAD", "STARTED"],
    result: "The film had already started when we arrived.",
    why: "Два события: фильм начался раньше, мы пришли позже. Важен факт, что к нашему приходу фильм уже шёл.",
  },
  {
    id: "bp-4",
    situation: "Вчера Том сыграл два матча и пошёл домой.",
    pointQuestion: "Есть ли точка отсчёта в прошлом?",
    pointOptions: ["Нет — просто рассказ о вчерашних событиях", "Да, есть другой момент"],
    pointAnswer: "Нет — просто рассказ о вчерашних событиях",
    focusOptions: FOCUS_OPTIONS,
    focusAnswer: "Законченное событие",
    tenseAnswer: "Past Simple",
    formulaTokens: ["PLAYED"],
    formulaAnswer: ["PLAYED"],
    result: "Tom played two matches and went home yesterday.",
    why: "Это просто последовательность законченных событий вчера — помощник не нужен, достаточно V2.",
  },
];

/** Тренажёр «Построй timeline»: расставь события по порядку. */
export type TimelineCase = {
  id: string;
  sentence: string;
  /** Карточки в перемешанном виде. */
  cards: string[];
  /** Правильный порядок от раннего к позднему. */
  order: string[];
  earlier: string;
  tenseQuestion: string;
  tenseOptions: string[];
  tenseAnswer: string;
  why: string;
};

export const TIMELINE_CASES: TimelineCase[] = [
  {
    id: "tlp-1",
    sentence: "The film had started before we arrived.",
    cards: ["WE ARRIVED", "FILM STARTED"],
    order: ["FILM STARTED", "WE ARRIVED"],
    earlier: "FILM STARTED",
    tenseQuestion: "Какое время показывает, что фильм начался раньше?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Perfect",
    why: "Раннее событие показываем через had + V3: had started.",
  },
  {
    id: "tlp-2",
    sentence: "When the bus arrived, I had been waiting for 30 minutes.",
    cards: ["BUS ARRIVED", "START WAITING"],
    order: ["START WAITING", "BUS ARRIVED"],
    earlier: "START WAITING",
    tenseQuestion: "Какое время показывает, что ожидание длилось 30 минут до автобуса?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Perfect Continuous",
    why: "Процесс шёл до момента прошлого, и важна его длительность: had been waiting for 30 minutes.",
  },
  {
    id: "tlp-3",
    sentence: "I was walking home when I saw Anna.",
    cards: ["I SAW ANNA", "WALKING HOME (process)"],
    order: ["WALKING HOME (process)", "I SAW ANNA"],
    earlier: "WALKING HOME (process)",
    tenseQuestion: "Какое время нужно для фона — «шёл домой»?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Continuous",
    why: "Процесс уже шёл, когда случилось короткое событие. Фон → was walking, событие → saw.",
  },
  {
    id: "tlp-4",
    sentence: "Tom had finished his homework before dinner started.",
    cards: ["DINNER STARTED", "HOMEWORK FINISHED"],
    order: ["HOMEWORK FINISHED", "DINNER STARTED"],
    earlier: "HOMEWORK FINISHED",
    tenseQuestion: "Какое время показывает готовый результат раньше ужина?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Perfect",
    why: "Важен готовый результат к моменту ужина: had finished.",
  },
  {
    id: "tlp-5",
    sentence: "We went to the park and played football.",
    cards: ["PLAYED FOOTBALL", "WENT TO THE PARK"],
    order: ["WENT TO THE PARK", "PLAYED FOOTBALL"],
    earlier: "WENT TO THE PARK",
    tenseQuestion: "Какое время нужно для простой последовательности событий?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Simple",
    why: "События идут по порядку рассказа — Past Perfect здесь не нужен.",
  },
  {
    id: "tlp-6",
    sentence: "The children had been playing outside for an hour when it started to rain.",
    cards: ["IT STARTED TO RAIN", "CHILDREN STARTED PLAYING"],
    order: ["CHILDREN STARTED PLAYING", "IT STARTED TO RAIN"],
    earlier: "CHILDREN STARTED PLAYING",
    tenseQuestion: "Какое время показывает длительность игры до дождя?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Perfect Continuous",
    why: "Дождь — точка прошлого, игра длилась час до неё.",
  },
  {
    id: "tlp-7",
    sentence: "Sarah was reading when her phone rang.",
    cards: ["PHONE RANG", "READING (process)"],
    order: ["READING (process)", "PHONE RANG"],
    earlier: "READING (process)",
    tenseQuestion: "Какое время нужно для короткого события — «телефон зазвонил»?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Simple",
    why: "Короткое событие внутри процесса — Past Simple: rang.",
  },
  {
    id: "tlp-8",
    sentence: "By the time the teacher came in, the students had cleaned the classroom.",
    cards: ["TEACHER CAME IN", "STUDENTS CLEANED THE CLASSROOM"],
    order: ["STUDENTS CLEANED THE CLASSROOM", "TEACHER CAME IN"],
    earlier: "STUDENTS CLEANED THE CLASSROOM",
    tenseQuestion: "Какое время показывает готовый результат к приходу учителя?",
    tenseOptions: PAST_TENSE_NAMES,
    tenseAnswer: "Past Perfect",
    why: "К моменту прошлого результат был готов: had cleaned.",
  },
];

export const HEURISTIC_NOTE =
  "Этот алгоритм помогает выбрать время в типичных учебных ситуациях. В живом английском выбор времени также зависит от контекста и того, на чём говорящий делает акцент.";
