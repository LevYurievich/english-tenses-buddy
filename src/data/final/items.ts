/**
 * Final Challenge — финальная проверка 12 времён.
 * Банк = существующие проверенные задания «Все 12 времён» (уровни 2–3)
 * + небольшой набор новых вопросов (15) только для финала.
 * Формат заданий — тот же CoordItem, поэтому работает прежняя диагностика ГДЕ? / ЧТО? / ФОРМА.
 */
import { CATEGORY_BY_TENSE, HINTS, type CoordItem } from "@/data/coordinates/items";
import { coordsOf, type TenseKey } from "@/data/coordinates/model";
import { A12_LEVEL_2, A12_LEVEL_3, forms } from "@/data/all12/items";

export const FINAL_ID = "final-challenge";
export const FINAL_SIZE = 30;

export type FinalKind = "write" | "choose" | "fix" | "translate" | "two";

export type FinalQuestion = {
  id: string;
  kind: FinalKind;
  /** 1 задание или 2 (два глагола в одном контексте). */
  items: CoordItem[];
  /** Для «fix»: предложение с ошибкой. Для «translate»: русская фраза. */
  prompt?: string;
  isNew: boolean;
};

type Extra = { options?: string[]; context?: string[]; also?: string[]; variants?: { answers: string[]; note: string }[] };

function f(id: string, tense: TenseKey, question: string, verb: string, answer: string, whyWhere: string, whyWhat: string, extra: Extra = {}): CoordItem {
  const { zone, meaning } = coordsOf(tense);
  return {
    id: `final-${id}`,
    level: 3,
    question,
    verb,
    correctAnswer: answer,
    acceptableAnswers: [...forms(answer), ...(extra.also ?? []).flatMap(forms)],
    tense,
    timeCoordinate: zone,
    aspectMeaning: meaning,
    skills: [`zone:${zone}`, `meaning:${meaning}`, tense],
    errorCategory: CATEGORY_BY_TENSE[tense],
    difficulty: 3,
    hint: HINTS[meaning],
    whyWhere,
    whyWhat,
    ...(extra.options ? { options: extra.options } : {}),
    context: extra.context,
    variants: extra.variants?.map((v) => ({ ...v, answers: v.answers.flatMap(forms) })),
  };
}

/** Новые вопросы только для Final Challenge (15 вопросов, 17 глаголов). Проверены вручную. */
export const FINAL_NEW: FinalQuestion[] = [
  { id: "fn-1", kind: "write", isNew: true, items: [f("1", "past-perfect", "Tom ___ his homework, so they could leave immediately.", "finish", "had finished", "Анна пришла — это точка в прошлом.", "К её приходу домашка уже была готова — результат к прошлой точке.", { context: ["When Anna arrived,"] })] },
  { id: "fn-2", kind: "choose", isNew: true, items: [f("2", "future-continuous", "— Better not. He ___ his English lesson then.", "have", "will be having", "8 вечера сегодня — момент в будущем.", "В этот момент урок будет идти — процесс в момент.", { options: ["will have", "will be having", "will have had", "is having"], context: ["— Can I call Tom at 8 tonight?"] })] },
  { id: "fn-3", kind: "write", isNew: true, items: [f("3", "present-perfect-continuous", "Anna looks tired because she ___ for the test for three hours.", "study", "has been studying", "Она выглядит уставшей сейчас.", "Учёба длится три часа до настоящего момента — процесс + длительность.")] },
  { id: "fn-4", kind: "write", isNew: true, items: [f("4", "future-perfect-continuous", "By 1 p.m., the runners ___ for four hours.", "run", "will have been running", "Забег будет завтра — точка в будущем (1 p.m.).", "Важно, как долго бег будет идти к этой точке — четыре часа.", { context: ["The marathon starts at 9 a.m. tomorrow."] })] },
  { id: "fn-5", kind: "choose", isNew: true, items: [f("5", "future-perfect", "By the time his mum arrives at the airport, the plane ___.", "land", "will have landed", "Мама приедет в будущем — это точка отсчёта.", "К её приезду самолёт уже сядет — результат к будущей точке.", { options: ["will land", "will be landing", "will have landed", "has landed"], context: ["Tom's plane lands at 6 p.m. His mum will get to the airport at 7."] })] },
  { id: "fn-6", kind: "write", isNew: true, items: [f("6", "past-perfect-continuous", "She told me she ___ for almost an hour.", "cry", "had been crying", "Я увидел её в прошлом — точка в прошлом.", "Плач длился почти час до этой точки — процесс + длительность.", { context: ["Anna's eyes were red when I saw her."] })] },
  { id: "fn-7", kind: "choose", isNew: true, items: [f("7", "past-continuous", "He ___ a book and didn't notice me.", "read", "was reading", "Я видел его утром — момент в прошлом.", "В тот момент чтение шло — процесс, поэтому он меня не заметил.", { options: ["read", "was reading", "had read", "has been reading"], context: ["I saw Tom at the bus stop this morning."] })] },
  { id: "fn-8", kind: "fix", isNew: true, prompt: "By the time we got to the cinema, the film already started.", items: [f("8", "past-perfect", "By the time we got to the cinema, the film ___.", "start", "had started", "Мы пришли в кино — точка в прошлом.", "Фильм начался раньше нашего прихода — результат к прошлой точке.", { also: ["had already started"] })] },
  { id: "fn-9", kind: "fix", isNew: true, prompt: "My brother work in a bank. He likes his job.", items: [f("9", "present-simple", "My brother ___ in a bank. He likes his job.", "work", "works", "Речь о жизни брата сейчас.", "Работа — постоянный факт. He / she / it + S.")] },
  { id: "fn-10", kind: "translate", isNew: true, prompt: "Я думаю, тебе понравится этот фильм.", items: [f("10", "future-simple", "I think you ___ this film.", "like", "will like", "Фильм ещё не посмотрели — будущее.", "I think — прогноз, просто событие в будущем.")] },
  { id: "fn-11", kind: "translate", isNew: true, prompt: "Мама сейчас готовит ужин, не мешай ей.", items: [f("11", "present-continuous", "Mum ___ dinner, so don't disturb her.", "cook", "is cooking", "Не мешай ей — речь о том, что происходит сейчас.", "Готовка идёт в этот момент — процесс.")] },
  { id: "fn-12", kind: "translate", isNew: true, prompt: "Я потерял ключи, поэтому не могу открыть дверь.", items: [f("12", "present-perfect", "I ___ my keys, so I can't open the door.", "lose", "have lost", "Не могу открыть дверь сейчас.", "Важен результат сейчас: ключей нет.", { variants: [{ answers: ["lost"], note: "lost просто сообщает о событии; have lost подчёркивает результат сейчас — ключей нет." }] })] },
  {
    id: "fn-13", kind: "two", isNew: true,
    items: [
      f("13a", "past-continuous", "While Anna ___ home, ...", "walk", "was walking", "Всё произошло в прошлом.", "Прогулка — фон, процесс, который шёл.", { context: ["While Anna ___ (walk) home, it ___ (start) to rain."] }),
      { ...f("13b", "past-simple", "..., it ___ to rain.", "start", "started", "Дождь начался в прошлом.", "Короткое событие на фоне процесса.", { context: ["While Anna ___ (walk) home, it ___ (start) to rain."] }), errorCategory: "past_simple_vs_continuous" },
    ],
  },
  {
    id: "fn-14", kind: "two", isNew: true,
    items: [
      f("14a", "present-perfect-continuous", "Tom ___ in London since 2020.", "live", "has been living", "Он живёт там до сих пор — точка сейчас.", "since 2020 — длительность до настоящего момента.", { context: ["Tom ___ (live) in London since 2020. He ___ (move) there with his parents."], variants: [{ answers: ["has lived"], note: "has lived тоже возможно: звучит как итог; has been living подчёркивает, что процесс продолжается." }] }),
      f("14b", "past-simple", "He ___ there with his parents.", "move", "moved", "Переезд — событие в прошлом (в 2020).", "Просто событие, которое закончилось.", { context: ["Tom ___ (live) in London since 2020. He ___ (move) there with his parents."] }),
    ],
  },
  { id: "fn-15", kind: "write", isNew: true, items: [f("15", "past-simple", "— I ___ off my bike last week.", "fall", "fell", "Неделю назад — событие в прошлом.", "Просто событие. Гипс — следствие, но вопрос «что случилось тогда?».", { context: ["— Why is your arm in a cast?"] })] }
];

/** Существующие задания «Все 12 времён» (уровни 2–3) — без обучающих подсказок. */
export const FINAL_REUSED: FinalQuestion[] = [...A12_LEVEL_2, ...A12_LEVEL_3].map((item) => ({
  id: `fr-${item.id}`,
  kind: item.options?.length ? "choose" : "write",
  items: [item],
  isNew: false,
}));

export const FINAL_POOL: FinalQuestion[] = [...FINAL_NEW, ...FINAL_REUSED];
