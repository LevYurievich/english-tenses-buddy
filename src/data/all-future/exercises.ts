/**
 * «Все Future»: 55 смешанных тренировочных заданий (20 / 20 / 15) и банк Future Challenge (28).
 * Каждое задание описано кратко; варианты, «Почему?» и «Почему не другие?» собираются из смысла времени.
 * Ничего не генерируется на лету — данные статичны.
 */
import type { ErrorCategory, Exercise, TimelineSpec } from "@/data/types";
import { ef, fb, mc, tl } from "./helpers";

export const FS = "future-simple";
export const FC = "future-continuous";
export const FP = "future-perfect";
export const FPC = "future-perfect-continuous";
type T = typeof FS | typeof FC | typeof FP | typeof FPC;

type Verb = [base: string, ing: string, v3: string];

const TITLE: Record<T, string> = {
  [FS]: "Future Simple",
  [FC]: "Future Continuous",
  [FP]: "Future Perfect",
  [FPC]: "Future Perfect Continuous",
};

const CATEGORY: Record<T, ErrorCategory> = {
  [FS]: "future_context_selection",
  [FC]: "future_simple_vs_continuous",
  [FP]: "future_continuous_vs_future_perfect",
  [FPC]: "future_perfect_vs_perfect_continuous",
};

const MEANING: Record<T, string> = {
  [FS]: "Событие, решение, обещание или прогноз → Future Simple.",
  [FC]: "Процесс В конкретный момент будущего → Future Continuous.",
  [FP]: "Результат будет готов К будущему моменту → Future Perfect.",
  [FPC]: "Процесс будет длиться уже какое-то время К будущему моменту → Future Perfect Continuous.",
};

const FORMULA: Record<T, string> = {
  [FS]: "will + V1",
  [FC]: "will + be + V-ing",
  [FP]: "will + have + V3",
  [FPC]: "will + have + been + V-ing",
};

const CHAIN: Record<T, string[]> = {
  [FS]: ["событие / решение", "Future Simple", "will + V1"],
  [FC]: ["В момент", "процесс", "Future Continuous", "will be + V-ing"],
  [FP]: ["К моменту", "результат ✓", "Future Perfect", "will have + V3"],
  [FPC]: ["К моменту", "как долго? ⏱", "Future Perfect Continuous", "will have been + V-ing"],
};

/** «Почему не другие?» — короткие объяснения для остальных трёх времён. */
const WHY_NOT: Record<T, string> = {
  [FS]: "Future Simple — просто событие или решение, без взгляда внутрь момента и без «к моменту».",
  [FC]: "Future Continuous — процесс В момент; здесь нас интересует не это.",
  [FP]: "Future Perfect — готовый результат К моменту; здесь результат не главное.",
  [FPC]: "Future Perfect Continuous — длительность К моменту; здесь не спрашивают «как долго?».",
};

const REMEMBER: Record<T, string> = {
  [FS]: "Нет особой точки и процесса — просто будущее событие → will + V1.",
  [FC]: "AT + момент → что будет происходить? → will be + V-ing.",
  [FP]: "BY + момент → что будет готово? → will have + V3.",
  [FPC]: "BY + момент + как долго? → will have been + V-ing.",
};

function formOf(t: T, [base, ing, v3]: Verb): string {
  if (t === FS) return `will ${base}`;
  if (t === FC) return `will be ${ing}`;
  if (t === FP) return `will have ${v3}`;
  return `will have been ${ing}`;
}

const contracted = (s: string) => s.replace(/^will /, "'ll ");

function options(v: Verb): string[] {
  return [FS, FC, FP, FPC].map((t) => formOf(t as T, v));
}

type Item = {
  id: string;
  level: 1 | 2 | 3;
  t: T;
  q: string;
  v: Verb;
  /** Где точка / какой контекст. */
  when: string;
  /** Что важно в ситуации. */
  what: string;
  situation?: string;
  also?: string[];
  /** Дополнительные навыки поверх автоматически определённых. */
  skills?: string[];
  timeline?: TimelineSpec;
  category?: ErrorCategory;
};

/** Навыки задания: из смысла времени, текста вопроса и механики. */
function skillsOf(i: Item, kind: "choice" | "form" | "fix"): string[] {
  const q = i.q.toLowerCase();
  const s = new Set<string>(["future_tense_selection"]);
  const hasAt = /\bat\b|this time/.test(q);
  const hasBy = /\bby\b/.test(q);
  const clause = /(by the time|when|if|before) [a-z]+ (arrives?|comes?|finishes|gets?|lands|wake|wakes|reach|starts?)/.test(q);
  if (i.t === FS) s.add("decision_prediction").add("v1_form");
  if (i.t === FC) s.add("process_at_future_point").add("future_reference_point").add("ing_form");
  if (i.t === FP) s.add("result_by_future_point").add("future_reference_point").add("v3_form");
  if (i.t === FPC)
    s.add("duration_by_future_point").add("future_reference_point").add("result_vs_duration").add("ing_form");
  if (i.t !== FS && (hasAt || hasBy)) s.add("at_vs_by");
  if (/\bfor\b|\bsince\b/.test(q) && i.t === FPC) s.add("for_since");
  if (clause || /by the time/.test(q)) s.add("future_time_clause");
  if (kind !== "choice") s.add("auxiliary_structure");
  if (q.trim().endsWith("?")) s.add("question_order");
  if (/won't|not /.test(q)) s.add("negative_form");
  (i.skills ?? []).forEach((x) => s.add(x));
  return [...s];
}

/** «Почему не другие?» — объяснение через смысл конкретной ситуации. */
function whyNot(target: T, other: T, i: Item): string {
  const ctx = i.when.replace(/\.$/, "");
  const table: Partial<Record<T, Partial<Record<T, string>>>> = {
    [FS]: {
      [FC]: `не подходит: мы не «заглядываем» в конкретный момент, чтобы увидеть процесс (${ctx}) — это просто решение или прогноз.`,
      [FP]: `не подходит: нет срока, к которому что-то должно быть готово. Речь о самом событии.`,
      [FPC]: `не подходит: никто не спрашивает, как долго что-то будет длиться к моменту.`,
    },
    [FC]: {
      [FS]: `не подходит: нас интересует не факт «произойдёт», а что будет в разгаре в этот момент (${ctx}).`,
      [FP]: `не подходит: предложение не говорит о результате, который должен быть готов К этому моменту — мы смотрим В него.`,
      [FPC]: `не подходит: длительность процесса до этой точки здесь не важна — нет «как долго?».`,
    },
    [FP]: {
      [FS]: `не подходит: важно не просто событие, а то, что оно будет завершено к сроку (${ctx}).`,
      [FC]: `не подходит: мы не смотрим, что будет происходить В этот момент, — к нему дело уже будет сделано.`,
      [FPC]: `не подходит: главное — готовый результат (${i.what.replace(/\.$/, "").toLowerCase()}), а не то, сколько времени шёл процесс.`,
    },
    [FPC]: {
      [FS]: `не подходит: это не разовое событие или решение — процесс тянется и мы считаем его длительность.`,
      [FC]: `не подходит: мало сказать, что процесс идёт в этот момент — важно, как долго он уже идёт (${ctx}).`,
      [FP]: `не подходит: мы не говорим о готовом результате — процесс ещё продолжается, важна длительность.`,
    },
  };
  return `${TITLE[other]} ${table[target]?.[other] ?? WHY_NOT[other]}`;
}

function common(i: Item, answer: string, kind: "choice" | "form" | "fix" = "choice") {
  const others = ([FS, FC, FP, FPC] as T[]).filter((x) => x !== i.t);
  return {
    id: i.id,
    level: i.level,
    target: i.t,
    question: i.q,
    ...(i.situation ? { situation: i.situation } : {}),
    hint:
      i.level === 1
        ? "Что здесь важно: событие, процесс В момент, результат К моменту или длительность К моменту?"
        : "Где точка в будущем? Смотрим В неё или К ней? Результат или длительность?",
    explanation: `${MEANING[i.t]} ${FORMULA[i.t]}.`,
    category: i.category ?? CATEGORY[i.t],
    skill: "tense-choice" as const,
    skills: skillsOf(i, kind),
    ...(i.timeline ? { timeline: i.timeline } : {}),
    title: `Почему ${answer}?`,
    chain: CHAIN[i.t],
    why: [
      ["when", i.when],
      ["what", i.what],
      ["tense", MEANING[i.t]],
      ["form", `${FORMULA[i.t]} → ${answer}.`],
    ] as [import("@/data/types").ReasoningStepKind, string][],
    remember: REMEMBER[i.t],
    alt: others.map((o) => [TITLE[o], whyNot(i.t, o, i)] as [string, string]),
  };
}

function MC(i: Item) {
  const answer = formOf(i.t, i.v);
  return mc({
    ...common(i, answer),
    ...(i.timeline ? { task: "Посмотри на линию времени и выбери форму" } : {}),
    options: options(i.v),
    answer,
  });
}

function FB(i: Item) {
  const answer = formOf(i.t, i.v);
  const alt = [contracted(answer), ...(i.also ?? [])];
  return fb({
    ...common(i, answer, "form"),
    task: i.timeline ? "Посмотри на линию времени и поставь глагол" : "Поставь глагол в нужное время",
    answer,
    also: alt,
  });
}

function TL(i: Item & { answer: string }) {
  return tl({ ...common(i, formOf(i.t, i.v), "form"), answer: i.answer, also: i.also ?? [] });
}

/** Найди и исправь ошибку: нажать на неправильное слово, после ответа — правильное предложение. */
function EF(i: Item & { tokens: string[]; wrongIndex: number; fixed: string; mistake: string }) {
  const c = common(i, i.fixed, "fix");
  return ef({
    ...c,
    question: "Найди слово с ошибкой.",
    task: "Найди и исправь ошибку",
    explanation: `Правильно: ${i.fixed} ${i.mistake}`,
    tokens: i.tokens,
    wrongIndex: i.wrongIndex,
    answer: i.fixed,
    result: i.fixed,
    title: "Почему здесь ошибка?",
  });
}

/** Два глагола в одном предложении: выбрать правильную пару форм. */
function PAIR(i: Item & { pairs: string[]; answer: string }) {
  return mc({
    ...common(i, i.answer),
    task: "Выбери пару форм для двух глаголов",
    options: i.pairs,
    answer: i.answer,
  });
}

// ———————————————————— LEVEL 1 «Вижу подсказку» ————————————————————
export const FUTURE_LEVEL_1: Exercise[] = [
  MC({ id: "af1-1", level: 1, t: FS, q: "I think it ___ tomorrow.", v: ["rain", "raining", "rained"], when: "Точки в будущем нет, есть I think.", what: "Просто мнение, прогноз." }),
  MC({ id: "af1-2", level: 1, t: FS, q: "Don't worry, I ___ you with this task.", v: ["help", "helping", "helped"], when: "Обещание прямо сейчас.", what: "Решение / обещание — событие." }),
  MC({ id: "af1-3", level: 1, t: FS, q: "Maybe Tom ___ us tonight.", v: ["call", "calling", "called"], when: "Maybe — предположение.", what: "Просто возможное событие." }),
  MC({ id: "af1-4", level: 1, t: FS, q: "The phone is ringing! — I ___ it.", v: ["answer", "answering", "answered"], when: "Решение принимается в момент речи.", what: "Спонтанное решение." }),
  MC({ id: "af1-5", level: 1, t: FS, q: "I'm sure she ___ the race.", v: ["win", "winning", "won"], when: "I'm sure — уверенный прогноз.", what: "Событие в будущем." }),

  MC({ id: "af1-6", level: 1, t: FC, q: "At 8 p.m. tomorrow I ___ the match.", v: ["watch", "watching", "watched"], when: "AT 8 p.m. tomorrow — точка в будущем.", what: "Что будет происходить В этот момент — процесс.", timeline: { point: "8 p.m.", action: "матч по TV", shape: "through" } }),
  MC({ id: "af1-7", level: 1, t: FC, q: "This time next week we ___ on the beach.", v: ["lie", "lying", "lain"], when: "This time next week — момент в будущем.", what: "Процесс в этот момент." }),
  MC({ id: "af1-8", level: 1, t: FC, q: "At noon tomorrow Anna ___ to Paris.", v: ["fly", "flying", "flown"], when: "AT noon tomorrow.", what: "В полдень она будет в процессе полёта." }),
  MC({ id: "af1-9", level: 1, t: FC, q: "Don't call me at 7 — I ___ dinner with my family at that moment.", v: ["have", "having", "had"], when: "AT 7 — момент.", what: "В 7 будет идти ужин — процесс." }),
  MC({ id: "af1-10", level: 1, t: FC, q: "At 10 a.m. on Monday the students ___ a test.", v: ["write", "writing", "written"], when: "AT 10 a.m. on Monday.", what: "В этот момент тест будет в процессе." }),

  MC({ id: "af1-11", level: 1, t: FP, q: "By Friday I ___ the project.", v: ["finish", "finishing", "finished"], when: "BY Friday — к моменту.", what: "Проект будет готов — результат.", timeline: { point: "Friday", action: "проект", shape: "done" } }),
  MC({ id: "af1-12", level: 1, t: FP, q: "By 2040 scientists ___ a base on the Moon.", v: ["build", "building", "built"], when: "BY 2040.", what: "К 2040 база будет построена — результат." }),
  MC({ id: "af1-13", level: 1, t: FP, q: "By the time you arrive, we ___ dinner.", v: ["cook", "cooking", "cooked"], when: "BY the time you arrive — к моменту.", what: "Ужин будет готов." }),
  MC({ id: "af1-14", level: 1, t: FP, q: "By the end of the month Tom ___ five books.", v: ["read", "reading", "read"], when: "BY the end of the month.", what: "Пять книг — готовый результат, количество." }),
  MC({ id: "af1-15", level: 1, t: FP, q: "By 11 p.m. all the guests ___.", v: ["leave", "leaving", "left"], when: "BY 11 p.m.", what: "К 11 гости уже уйдут — результат." }),

  MC({ id: "af1-16", level: 1, t: FPC, q: "By 6 p.m. I ___ for ten hours.", v: ["work", "working", "worked"], when: "BY 6 p.m. + for ten hours.", what: "Как долго процесс будет идти к этому моменту.", timeline: { from: "8 a.m.", point: "6 p.m.", action: "работа", shape: "until" } }),
  MC({ id: "af1-17", level: 1, t: FPC, q: "By June she ___ English for five years.", v: ["study", "studying", "studied"], when: "BY June + for five years.", what: "Длительность к моменту." }),
  MC({ id: "af1-18", level: 1, t: FPC, q: "By the time Dad comes home, we ___ for two hours.", v: ["wait", "waiting", "waited"], when: "BY the time Dad comes + for two hours.", what: "Ожидание будет длиться уже два часа." }),
  MC({ id: "af1-19", level: 1, t: FPC, q: "By next month they ___ here for a year.", v: ["live", "living", "lived"], when: "BY next month + for a year.", what: "Как долго — длительность до точки." }),
  MC({ id: "af1-20", level: 1, t: FPC, q: "By 5 o'clock the kids ___ outside for three hours.", v: ["play", "playing", "played"], when: "BY 5 + for three hours.", what: "Процесс продолжается уже три часа." }),
];

// ———————————————————— LEVEL 2 «Понимаю будущую ситуацию» ————————————————————
export const FUTURE_LEVEL_2: Exercise[] = [
  FB({ id: "af2-1", level: 2, t: FS, q: "It's cold in here. — Wait, I ___ (close) the window.", v: ["close", "closing", "closed"], when: "Реакция на ситуацию прямо сейчас.", what: "Решение в момент речи." }),
  MC({ id: "af2-2", level: 2, t: FS, q: "Mum has a headache. — OK, we ___ the music down.", v: ["turn", "turning", "turned"], when: "Реакция на слова мамы.", what: "Решение / предложение." }),
  FB({ id: "af2-3", level: 2, t: FS, q: "Ask Kate — I'm sure she ___ (know) the answer.", v: ["know", "knowing", "known"], when: "I'm sure — прогноз.", what: "know — глагол состояния, процесс невозможен." }),
  EF({ id: "af2-4e", level: 2, t: FS, q: "I think it will rains tomorrow.", v: ["rain", "raining", "rained"], tokens: ["I", "think", "it", "will", "rains", "tomorrow."], wrongIndex: 4, fixed: "I think it will rain tomorrow.", mistake: "После will всегда V1 без окончания -s.", category: "will_plus_s", when: "I think — прогноз.", what: "После will глагол в начальной форме." }),
  FB({ id: "af2-5", level: 2, t: FS, q: "Thanks for the book! I ___ (give) it back on Monday.", v: ["give", "giving", "given"], when: "Обещание.", what: "Событие — вернуть книгу." }),

  MC({ id: "af2-6", level: 2, t: FC, q: "Don't visit us on Sunday at 2: the whole family ___ lunch at Grandma's then.", v: ["have", "having", "had"], when: "Sunday at 2 — точка.", what: "Обед будет идти в этот момент." }),
  FB({ id: "af2-7", level: 2, t: FC, q: "When your plane lands, I ___ (wait) for you at the exit.", v: ["wait", "waiting", "waited"], when: "Момент — самолёт приземлится.", what: "Я уже буду в процессе ожидания.", timeline: { point: "самолёт сел", action: "жду у выхода", shape: "through" } }),
  EF({ id: "af2-8e", level: 2, t: FC, q: "At 8, Tom will studying.", v: ["study", "studying", "studied"], tokens: ["At", "8,", "Tom", "will", "studying."], wrongIndex: 4, fixed: "At 8, Tom will be studying.", mistake: "Процесс В момент — will BE + V-ing; без be конструкция не работает.", category: "missing_be_future_continuous", when: "AT 8 — точка в будущем.", what: "В 8 Том будет в процессе учёбы." }),
  FB({ id: "af2-9", level: 2, t: FC, q: "Tomorrow morning at this time we ___ (travel) to the mountains.", v: ["travel", "travelling", "travelled"], when: "At this time tomorrow.", what: "Процесс поездки в этот момент.", also: ["will be traveling", "'ll be traveling"] }),
  MC({ id: "af2-10", level: 2, t: FC, q: "When the guests arrive, Dad ___ in the kitchen.", v: ["cook", "cooking", "cooked"], situation: "Ужин ещё будет готовиться, когда придут гости.", when: "Момент — приход гостей.", what: "Готовка ещё в процессе." }),

  FB({ id: "af2-11", level: 2, t: FP, q: "Come at 7. I ___ (do) all my homework by then.", v: ["do", "doing", "done"], when: "By then = к 7.", what: "Все уроки будут готовы." }),
  MC({ id: "af2-12", level: 2, t: FP, q: "The train leaves at 8:05. By the time we get to the station, it ___.", v: ["leave", "leaving", "left"], when: "By the time we get there.", what: "Поезд уже уйдёт — результат." }),
  FB({ id: "af2-13", level: 2, t: FP, q: "Don't worry about the tickets: by the time you arrive, I ___ (buy) them.", v: ["buy", "buying", "bought"], when: "К твоему приезду.", what: "Билеты уже будут куплены." }),
  EF({ id: "af2-14e", level: 2, t: FP, q: "By Friday, Anna will have wrote the report.", v: ["write", "writing", "written"], tokens: ["By", "Friday,", "Anna", "will", "have", "wrote", "the", "report."], wrongIndex: 5, fixed: "By Friday, Anna will have written the report.", mistake: "После will have нужна третья форма: write → wrote → written.", category: "used_v2_instead_v3_future", when: "BY Friday — срок.", what: "Отчёт будет готов к пятнице — результат." }),
  FB({ id: "af2-15", level: 2, t: FP, q: "The party starts at 6, but by 5 we ___ (decorate) the whole room.", v: ["decorate", "decorating", "decorated"], when: "By 5.", what: "Комната будет украшена — результат.", timeline: { point: "5:00", action: "украшаем комнату", shape: "done" } }),

  MC({ id: "af2-16", level: 2, t: FPC, q: "Our bus left at 7 a.m. When we reach Moscow at 7 p.m., we ___ for twelve hours.", v: ["travel", "travelling", "travelled"], when: "Точка — прибытие в 7 p.m.", what: "Как долго: двенадцать часов в пути." }),
  FB({ id: "af2-17", level: 2, t: FPC, q: "Mark started his game at 3. By 6 he ___ (play) for three hours.", v: ["play", "playing", "played"], when: "By 6.", what: "Длительность игры к этому моменту.", timeline: { from: "3:00", point: "6:00", action: "игра", shape: "until" } }),
  EF({ id: "af2-18e", level: 2, t: FPC, q: "By 6, Tom will have studying for three hours.", v: ["study", "studying", "studied"], tokens: ["By", "6,", "Tom", "will", "have", "studying", "for", "three", "hours."], wrongIndex: 5, fixed: "By 6, Tom will have been studying for three hours.", mistake: "Длительность к моменту — will have BEEN + V-ing; пропущено been.", category: "missing_been_future_perfect_continuous", when: "BY 6 + for three hours.", what: "Как долго будет идти учёба к 6." }),
  FB({ id: "af2-19", level: 2, t: FPC, q: "When the teacher finally comes, we ___ (sit) in the classroom for half an hour.", v: ["sit", "sitting", "sat"], when: "Точка — придёт учитель.", what: "Как долго мы уже будем сидеть." }),
  MC({ id: "af2-20", level: 2, t: FPC, q: "It started raining on Monday. If it doesn't stop, by Friday it ___ for five days.", v: ["rain", "raining", "rained"], when: "By Friday.", what: "Длительность дождя — пять дней." }),
];

// ———————————————————— LEVEL 3 «Выбираю сам» ————————————————————
export const FUTURE_LEVEL_3: Exercise[] = [
  FB({ id: "af3-1", level: 3, t: FS, q: "I'm hungry. — I ___ (make) you a sandwich.", v: ["make", "making", "made"], when: "Реакция прямо сейчас.", what: "Решение / предложение помощи." }),
  TL({ id: "af3-2", level: 3, t: FS, q: "Я думаю, она придёт.", v: ["come", "coming", "come"], answer: "I think she will come.", also: ["I think she'll come."], when: "Я думаю — мнение.", what: "Прогноз, событие." }),
  FB({ id: "af3-3", level: 3, t: FS, q: "It's so late! I'm sure Mum ___ (be) angry.", v: ["be", "being", "been"], when: "I'm sure — прогноз.", what: "be — состояние, просто прогноз." }),
  EF({ id: "af3-4e", level: 3, t: FC, q: "Don't call at 7 — we will be have dinner.", v: ["have", "having", "had"], tokens: ["Don't", "call", "at", "7", "—", "we", "will", "be", "have", "dinner."], wrongIndex: 8, fixed: "Don't call at 7 — we will be having dinner.", mistake: "После will be нужен V-ing: having.", category: "wrong_ing_future_continuous", when: "AT 7 — момент.", what: "В 7 ужин будет в процессе." }),

  FB({ id: "af3-5", level: 3, t: FC, q: "This time tomorrow I ___ (sit) in the exam room.", v: ["sit", "sitting", "sat"], when: "This time tomorrow.", what: "Процесс в этот момент." }),
  TL({ id: "af3-6", level: 3, t: FC, q: "Завтра в 5 я буду спать.", v: ["sleep", "sleeping", "slept"], answer: "At 5 tomorrow I will be sleeping.", also: ["At 5 tomorrow I'll be sleeping.", "I will be sleeping at 5 tomorrow.", "I'll be sleeping at 5 tomorrow.", "Tomorrow at 5 I will be sleeping.", "Tomorrow at 5 I'll be sleeping."], when: "В 5 завтра — точка.", what: "Процесс сна в этот момент." }),
  FB({ id: "af3-7", level: 3, t: FC, q: "Don't phone Lisa at 8 — she ___ (do) her yoga then: the class goes from 7:30 to 9.", v: ["do", "doing", "done"], when: "At 8.", what: "Йога будет в процессе." }),
  FB({ id: "af3-8", level: 3, t: FC, q: "When you wake up, we ___ (drive) through the desert.", v: ["drive", "driving", "driven"], when: "Момент — ты проснёшься.", what: "Поездка будет идти." }),

  FB({ id: "af3-9", level: 3, t: FP, q: "By the end of the summer, Ben ___ (learn) to swim.", v: ["learn", "learning", "learned"], also: ["will have learnt", "'ll have learnt"], when: "By the end of the summer.", what: "Навык будет получен — результат." }),
  TL({ id: "af3-10", level: 3, t: FP, q: "К пятнице я закончу эссе.", v: ["finish", "finishing", "finished"], answer: "By Friday I will have finished the essay.", also: ["By Friday I'll have finished the essay.", "By Friday I will have finished my essay.", "By Friday I'll have finished my essay.", "I will have finished the essay by Friday.", "I'll have finished the essay by Friday."], when: "К пятнице.", what: "Эссе будет готово." }),
  EF({ id: "af3-11e", level: 3, t: FP, q: "By the time Tom will arrive, Anna will have finished.", v: ["finish", "finishing", "finished"], tokens: ["By", "the", "time", "Tom", "will arrive,", "Anna", "will", "have", "finished."], wrongIndex: 4, fixed: "By the time Tom arrives, Anna will have finished.", mistake: "После by the time / when / before будущее выражается Present Simple, а не will.", category: "future_time_clause_will", when: "By the time Tom arrives — точка в будущем.", what: "К приходу Тома Анна уже закончит." }),
  FB({ id: "af3-12", level: 3, t: FP, q: "When you come back from holiday, I ___ (paint) the fence.", v: ["paint", "painting", "painted"], situation: "К твоему возвращению забор уже будет готов.", when: "Момент — твоё возвращение.", what: "Результат: покрашенный забор." }),

  FB({ id: "af3-13", level: 3, t: FPC, q: "By midnight the students ___ (prepare) for the concert for six hours.", v: ["prepare", "preparing", "prepared"], when: "By midnight + for six hours.", what: "Как долго идёт подготовка." }),
  TL({ id: "af3-14", level: 3, t: FPC, q: "К 8 часам я буду читать уже два часа.", v: ["read", "reading", "read"], answer: "By 8 o'clock I will have been reading for two hours.", also: ["By 8 o'clock I'll have been reading for two hours.", "By 8 I will have been reading for two hours.", "By 8 I'll have been reading for two hours.", "I will have been reading for two hours by 8 o'clock.", "I'll have been reading for two hours by 8 o'clock."], when: "К 8 часам.", what: "Длительность: два часа." }),
  FB({ id: "af3-15", level: 3, t: FPC, q: "When Tom finishes the marathon, he ___ (run) for almost four hours.", v: ["run", "running", "run"], when: "Точка — финиш.", what: "Как долго он будет бежать." }),
];

// ———————————————————— FUTURE CHALLENGE: банк из 24 новых заданий ————————————————————
export const FUTURE_FINAL_BANK: Exercise[] = [
  FB({ id: "afx-1", level: 3, t: FS, q: "I've forgotten my pen! — Don't worry, I ___ (lend) you mine.", v: ["lend", "lending", "lent"], when: "Реакция сейчас.", what: "Решение / предложение." }),
  MC({ id: "afx-7", level: 3, t: FC, q: "At midday tomorrow the plane ___ over the Alps.", v: ["fly", "flying", "flown"], when: "At midday tomorrow.", what: "Процесс полёта в момент.", timeline: { point: "midday", action: "полёт над Альпами", shape: "through" } }),
  FB({ id: "afx-13", level: 3, t: FP, q: "By the time the film starts, we ___ (eat) all the popcorn.", v: ["eat", "eating", "eaten"], when: "By the time the film starts.", what: "Попкорн будет съеден — результат." }),
  MC({ id: "afx-19", level: 3, t: FPC, q: "By 4 p.m. the girls ___ tennis for two hours.", v: ["play", "playing", "played"], when: "By 4 p.m. + for two hours.", what: "Длительность к моменту.", timeline: { from: "2 p.m.", point: "4 p.m.", action: "теннис", shape: "until" } }),

  MC({ id: "afx-2", level: 3, t: FS, q: "I'm sure our team ___ the next match.", v: ["win", "winning", "won"], when: "I'm sure.", what: "Прогноз." }),
  FB({ id: "afx-8", level: 3, t: FC, q: "Don't come at 6 — we ___ (cook) dinner at that moment.", v: ["cook", "cooking", "cooked"], when: "At 6.", what: "Готовка в процессе." }),
  MC({ id: "afx-14", level: 3, t: FP, q: "By next summer my sister ___ from university.", v: ["graduate", "graduating", "graduated"], when: "By next summer.", what: "Результат — диплом." }),
  FB({ id: "afx-20", level: 3, t: FPC, q: "By the end of this year, I ___ (learn) English for seven years.", v: ["learn", "learning", "learned"], when: "By the end of this year + for seven years.", what: "Как долго." }),

  FB({ id: "afx-3", level: 3, t: FS, q: "Perhaps they ___ (move) to a new flat next year.", v: ["move", "moving", "moved"], when: "Perhaps — предположение.", what: "Событие." }),
  MC({ id: "afx-9", level: 3, t: FC, q: "This time next month I ___ in the sea.", v: ["swim", "swimming", "swum"], when: "This time next month.", what: "Процесс в момент." }),
  FB({ id: "afx-15", level: 3, t: FP, q: "By Sunday the workers ___ (repair) the road.", v: ["repair", "repairing", "repaired"], when: "By Sunday.", what: "Дорога будет отремонтирована." }),
  MC({ id: "afx-21", level: 3, t: FPC, q: "When the guests arrive, Mum ___ since early morning.", v: ["cook", "cooking", "cooked"], when: "Точка — приход гостей + since.", what: "Длительность готовки." }),

  MC({ id: "afx-4", level: 3, t: FS, q: "This bag is too heavy for you — I ___ it.", v: ["lift", "lifting", "lifted"], when: "Решение сейчас.", what: "Предложение помощи." }),
  MC({ id: "afx-10", level: 3, t: FC, q: "When Mum gets home at 5:30, the kids ___ their homework.", v: ["do", "doing", "done"], situation: "Дети сядут за уроки в 5 и будут ещё заниматься, когда придёт мама.", when: "Момент — 5:30.", what: "Уроки в процессе." }),
  MC({ id: "afx-16", level: 3, t: FP, q: "When you get this letter, I ___ in London.", v: ["arrive", "arriving", "arrived"], when: "К моменту получения письма.", what: "Я уже буду там — результат." }),
  FB({ id: "afx-22", level: 3, t: FPC, q: "By the time we get to the top, we ___ (climb) for five hours.", v: ["climb", "climbing", "climbed"], when: "By the time + for five hours.", what: "Как долго." }),

  FB({ id: "afx-5", level: 3, t: FS, q: "I don't think Sam ___ (come) to the party.", v: ["come", "coming", "come"], when: "I don't think — мнение.", what: "Прогноз." }),
  FB({ id: "afx-11", level: 3, t: FC, q: "At 11 p.m. I ___ (sleep), so text me before that.", v: ["sleep", "sleeping", "slept"], when: "At 11 p.m.", what: "Процесс сна." }),
  FB({ id: "afx-17", level: 3, t: FP, q: "By 2040 the city ___ (plant) a million trees.", v: ["plant", "planting", "planted"], when: "By 2040.", what: "Результат — миллион деревьев." }),
  FB({ id: "afx-23", level: 3, t: FPC, q: "In September she ___ (teach) at this school for twenty years.", v: ["teach", "teaching", "taught"], situation: "Она пришла в школу двадцать лет назад и продолжает работать.", when: "In September + for twenty years.", what: "Длительность к точке." }),

  MC({ id: "afx-6", level: 3, t: FS, q: "Shop assistant: Which one? — Hmm… I ___ the blue T-shirt.", v: ["take", "taking", "taken"], when: "Решение в момент выбора.", what: "Спонтанное решение." }),
  MC({ id: "afx-12", level: 3, t: FC, q: "In an hour we ___ along the river on our bikes.", v: ["ride", "riding", "ridden"], situation: "Через час поездка будет в самом разгаре.", when: "Через час — точка.", what: "Процесс в момент." }),
  MC({ id: "afx-18", level: 3, t: FP, q: "Call me at 10 — by then I ___ the report.", v: ["write", "writing", "written"], when: "By then.", what: "Отчёт будет готов." }),
  MC({ id: "afx-24", level: 3, t: FPC, q: "By the time the bus comes, I ___ in the rain for forty minutes.", v: ["stand", "standing", "stood"], when: "By the time + for forty minutes.", what: "Как долго." }),
  EF({ id: "afx-25", level: 3, t: FPC, q: "By June, I will have been learn English for a year.", v: ["learn", "learning", "learned"], tokens: ["By", "June,", "I", "will", "have", "been", "learn", "English", "for", "a", "year."], wrongIndex: 6, fixed: "By June, I will have been learning English for a year.", mistake: "После will have been нужен V-ing.", category: "wrong_ing_future_perfect_continuous", when: "BY June + for a year.", what: "Длительность учёбы к июню." }),
  EF({ id: "afx-26", level: 3, t: FP, q: "By Monday, they will have finish the bridge.", v: ["finish", "finishing", "finished"], tokens: ["By", "Monday,", "they", "will", "have", "finish", "the", "bridge."], wrongIndex: 5, fixed: "By Monday, they will have finished the bridge.", mistake: "После will have нужна третья форма (V3), а не V1.", category: "will_have_plus_v1", when: "BY Monday — срок.", what: "Мост будет достроен — результат." }),
  PAIR({ id: "afx-27", level: 3, t: FP, q: "By the time you ___ (come) back, I ___ (clean) the flat.", v: ["clean", "cleaning", "cleaned"], pairs: ["come / will have cleaned", "will come / will have cleaned", "come / will be cleaning", "will come / will clean"], answer: "come / will have cleaned", skills: ["future_time_clause"], when: "By the time you come back — после by the time нет will.", what: "К твоему возвращению квартира будет убрана — результат." }),
  PAIR({ id: "afx-28", level: 3, t: FC, q: "When Mum ___ (get) home at 6, we ___ (watch) a film.", v: ["watch", "watching", "watched"], situation: "Фильм начнётся в 5 и в 6 будет ещё идти.", pairs: ["gets / will be watching", "will get / will be watching", "gets / will have watched", "gets / will watch"], answer: "gets / will be watching", skills: ["future_time_clause"], when: "When Mum gets home — после when нет will; точка — 6 часов.", what: "Фильм в этот момент будет в процессе." }),
];

export const FUTURE_TENSE_TITLES = TITLE;
