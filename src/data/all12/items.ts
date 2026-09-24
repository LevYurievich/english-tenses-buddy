/**
 * Банк модуля «Все 12 времён». Только данные: без UI.
 * Задания используют тот же формат, что и «Координаты времени» (CoordItem),
 * поэтому диагностика ГДЕ? / ЧТО? / ФОРМА работает одинаково.
 */
import { CATEGORY_BY_TENSE, HINTS, type CoordItem } from "@/data/coordinates/items";
import { coordsOf, type TenseKey } from "@/data/coordinates/model";

export const ALL12_ID = "all-12";

type T = TenseKey;
const PS: T = "present-simple", PC: T = "present-continuous", PP: T = "present-perfect", PPC: T = "present-perfect-continuous";
const pS: T = "past-simple", pC: T = "past-continuous", pP: T = "past-perfect", pPC: T = "past-perfect-continuous";
const FS: T = "future-simple", FC: T = "future-continuous", FP: T = "future-perfect", FPC: T = "future-perfect-continuous";

/** Полная форма + сокращённые варианты ('ll, 've, 's, 'm, 're, n't). */
export function forms(full: string): string[] {
  const out = new Set<string>([full]);
  const rules: [RegExp, string][] = [
    [/^will not /, "won't "],
    [/^will /, "'ll "],
    [/^have not /, "haven't "],
    [/^has not /, "hasn't "],
    [/^had not /, "hadn't "],
    [/^does not /, "doesn't "],
    [/^do not /, "don't "],
    [/^did not /, "didn't "],
    [/^is not /, "isn't "],
    [/^are not /, "aren't "],
    [/^was not /, "wasn't "],
    [/^were not /, "weren't "],
    [/^am not /, "'m not "],
    [/^have /, "'ve "],
    [/^has /, "'s "],
    [/^had /, "'d "],
    [/^is /, "'s "],
    [/^am /, "'m "],
    [/^are /, "'re "],
  ];
  for (const [re, rep] of rules) if (re.test(full)) out.add(full.replace(re, rep));
  for (const x of [...out]) {
    if (x.includes("travelling")) out.add(x.replace("travelling", "traveling"));
    if (x.includes("learned")) out.add(x.replace("learned", "learnt"));
  }
  return [...out];
}

type Extra = { context?: string[]; variants?: { answers: string[]; note: string }[]; also?: string[] };

function a(level: 1 | 2 | 3, n: number, tense: T, question: string, verb: string, answer: string, whyWhere: string, whyWhat: string, extra: Extra = {}): CoordItem {
  const { zone, meaning } = coordsOf(tense);
  return {
    id: `a12-l${level}-${n}`,
    level,
    question,
    verb,
    correctAnswer: answer,
    acceptableAnswers: [...forms(answer), ...(extra.also ?? []).flatMap(forms)],
    tense,
    timeCoordinate: zone,
    aspectMeaning: meaning,
    skills: [`zone:${zone}`, `meaning:${meaning}`, tense],
    errorCategory: CATEGORY_BY_TENSE[tense],
    difficulty: level,
    hint: HINTS[meaning],
    whyWhere,
    whyWhat,
    context: extra.context,
    variants: extra.variants?.map((v) => ({ ...v, answers: v.answers.flatMap(forms) })),
  };
}

/* ---------------- LEVEL 1 — НАХОЖУ КООРДИНАТЫ (24) ---------------- */

export const A12_LEVEL_1: CoordItem[] = [
  a(1, 1, PS, "Anna ___ to school by bus every day.", "go", "goes", "every day — обычная жизнь в настоящем.", "Регулярное действие — факт о жизни Анны."),
  a(1, 2, PS, "Water ___ at 100 degrees.", "boil", "boils", "Это правда всегда, в том числе сейчас.", "Общий факт."),
  a(1, 3, PC, "Be quiet! The baby ___.", "sleep", "is sleeping", "Be quiet! — речь о том, что происходит сейчас.", "Сон идёт в этот момент — процесс."),
  a(1, 4, PC, "Look! Tom ___ the fence.", "paint", "is painting", "Look! — видим прямо сейчас.", "Работа в процессе."),
  a(1, 5, PP, "I can't open the door. I ___ my key.", "lose", "have lost", "Не могу открыть сейчас — точка настоящая.", "Ключа нет — результат к моменту речи."),
  a(1, 6, PP, "Anna ___ her homework, so now she can play.", "finish", "has finished", "so now — точка отсчёта сейчас.", "Домашка готова — результат."),
  a(1, 7, PPC, "Tom is tired. He ___ football for two hours.", "play", "has been playing", "Он устал сейчас.", "for two hours — процесс длится до настоящего момента."),
  a(1, 8, PPC, "We ___ for the bus since 8 o'clock, and it still isn't here.", "wait", "have been waiting", "still isn't here — ожидание продолжается сейчас.", "since 8 — длительность до сейчас."),
  a(1, 9, pS, "Tom ___ a new bike last week.", "buy", "bought", "last week — прошлое.", "Просто событие, которое закончилось."),
  a(1, 10, pS, "We ___ to the zoo two days ago.", "go", "went", "two days ago — прошлое.", "Законченное событие."),
  a(1, 11, pC, "At 7 o'clock yesterday, I ___ dinner.", "have", "was having", "yesterday — прошлое.", "At 7 o'clock — процесс в конкретный момент."),
  a(1, 12, pC, "When the phone rang, Anna ___ a bath.", "take", "was taking", "Звонок был в прошлом.", "Ванна — процесс, который шёл, когда зазвонил телефон."),
  a(1, 13, pP, "When Anna arrived, Tom ___ his homework.", "finish", "had finished", "Точка — приход Анны в прошлом.", "К этой точке домашка уже была готова — результат."),
  a(1, 14, pP, "When we got to the station, the train ___.", "leave", "had left", "Мы пришли на вокзал — прошлое.", "Поезда уже не было — результат к прошлой точке."),
  a(1, 15, pPC, "Tom ___ for an hour when Anna finally arrived.", "wait", "had been waiting", "Анна пришла в прошлом.", "for an hour — длительность до прошлой точки."),
  a(1, 16, pPC, "Her eyes were red because she ___ for a long time.", "cry", "had been crying", "Глаза были красными — прошлое.", "Долгий процесс до прошлой точки."),
  a(1, 17, FS, "I think it ___ tomorrow.", "rain", "will rain", "tomorrow — будущее.", "Прогноз — просто событие в будущем."),
  a(1, 18, FS, "The bag looks heavy. I ___ you.", "help", "will help", "Помогу — после момента речи.", "Решение, принятое сейчас, — событие в будущем."),
  a(1, 19, FC, "At 10 tomorrow, we ___ a maths test.", "write", "will be writing", "tomorrow — будущее.", "At 10 — процесс в будущий момент."),
  a(1, 20, FC, "Don't call me at 8 tonight — I ___ my favourite show.", "watch", "will be watching", "at 8 tonight — будущее.", "В 8 процесс будет идти."),
  a(1, 21, FP, "By Friday, I ___ this book.", "read", "will have read", "By Friday — будущая точка.", "К пятнице книга будет прочитана — результат."),
  a(1, 22, FP, "By the time you come home, I ___ dinner.", "cook", "will have cooked", "Ты придёшь потом — будущая точка.", "Ужин будет готов к этой точке."),
  a(1, 23, FPC, "By 6 p.m., Anna ___ for three hours.", "study", "will have been studying", "By 6 p.m. — будущая точка.", "for three hours — длительность до будущей точки."),
  a(1, 24, FPC, "By next June, Tom ___ tennis for five years.", "play", "will have been playing", "By next June — будущее.", "for five years — сколько будет длиться к июню."),
];

/* ---------------- LEVEL 2 — ВЫБИРАЮ ВРЕМЯ (36) ---------------- */

export const A12_LEVEL_2: CoordItem[] = [
  a(2, 1, PS, "My dad ___ coffee every morning.", "drink", "drinks", "every morning — обычная жизнь сейчас.", "Привычка — факт."),
  a(2, 2, PS, "Tom ___ spicy food.", "not / like", "does not like", "Вкусы Тома — в настоящем.", "Состояние, факт: like не бывает процессом."),
  a(2, 3, PS, "The shop ___ at 9 a.m. on weekdays.", "open", "opens", "on weekdays — обычный порядок сейчас.", "Регулярный факт."),
  a(2, 4, PC, "Mum can't come to the phone — she ___ a shower right now.", "have", "is having", "right now — сейчас.", "Процесс в этот момент."),
  a(2, 5, PC, "Listen! Someone ___ the piano.", "play", "is playing", "Listen! — слышим сейчас.", "Процесс идёт."),
  a(2, 6, PC, "I ___ — I'm just resting my eyes.", "not / sleep", "am not sleeping", "Речь о том, что сейчас.", "Отрицаем процесс в этот момент."),
  a(2, 7, PP, "Look! Someone ___ my sandwich!", "eat", "has eaten", "Look! — смотрим сейчас.", "Бутерброда нет — видим результат."),
  a(2, 8, PP, "We ___ this film, let's watch another one.", "already / see", "have already seen", "let's watch — решаем сейчас.", "Фильм уже видели — результат к сейчас."),
  a(2, 9, PP, "Tom ___ his leg, so he can't play today.", "break", "has broken", "can't play today — сейчас.", "Нога сломана — результат."),
  a(2, 10, PPC, "— Why are your hands dirty? — I ___ in the garden.", "work", "have been working", "Руки грязные сейчас.", "Видим след процесса, который шёл до сейчас.", { variants: [{ answers: ["was working"], note: "was working ставит точку в прошлом, а грязные руки — это сейчас." }].slice(0, 0) }),
  a(2, 11, PPC, "It ___ since morning, and the streets are wet.", "rain", "has been raining", "streets are wet — сейчас.", "since morning — длительность до сейчас."),
  a(2, 12, PPC, "— How long have you been learning English? — I ___ it for four years.", "learn", "have been learning", "Вопрос о сейчас.", "for four years — длительность до сейчас."),
  a(2, 13, pS, "Anna ___ me a postcard from Spain last summer.", "send", "sent", "last summer — прошлое.", "Законченное событие."),
  a(2, 14, pS, "We ___ TV yesterday.", "not / watch", "did not watch", "yesterday — прошлое.", "Просто факт о вчерашнем дне."),
  a(2, 15, pS, "Tom ___ his homework, had dinner and went to bed.", "do", "did", "Цепочка прошлых событий.", "События по порядку — Simple."),
  a(2, 16, pC, "— What were you doing at 9 last night? — I ___ a book.", "read", "was reading", "at 9 last night — прошлое.", "Процесс в тот момент."),
  a(2, 17, pC, "While we ___ in the park, it started to rain.", "walk", "were walking", "Дождь начался в прошлом.", "while — фон, процесс."),
  a(2, 18, pC, "The sun ___ when we left the house.", "shine", "was shining", "Мы вышли в прошлом.", "Солнце светило в тот момент — процесс-фон."),
  a(2, 19, pP, "Tom couldn't pay because he ___ his wallet at home.", "leave", "had left", "couldn't pay — прошлое.", "Кошелёк оставлен ещё раньше — результат к прошлой точке."),
  a(2, 20, pP, "When I turned on the TV, the match ___.", "already / finish", "had already finished", "Включил телевизор — прошлое.", "Матч к этой точке уже закончился — результат."),
  a(2, 21, pP, "Anna was hungry because she ___ all day.", "not / eat", "had not eaten", "was hungry — прошлое.", "Не ела до прошлой точки — результат: голодна."),
  a(2, 22, pPC, "The ground was wet. It ___ all night.", "rain", "had been raining", "was wet — прошлое.", "all night — длительность до прошлой точки."),
  a(2, 23, pPC, "Tom was out of breath because he ___.", "run", "had been running", "was out of breath — прошлое.", "Процесс шёл до прошлой точки, и виден его след."),
  a(2, 24, pPC, "We ___ for two hours before we found the hotel.", "walk", "had been walking", "Нашли отель в прошлом.", "for two hours — длительность до прошлой точки.", { variants: [{ answers: ["had walked"], note: "had walked говорит о результате (путь пройден), а had been walking — о том, как долго шёл процесс." }] }),
  a(2, 25, FS, "— We have no milk. — Really? I ___ some.", "buy", "will buy", "Куплю — после момента речи.", "Решение в момент речи."),
  a(2, 26, FS, "I'm sure you ___ the test.", "pass", "will pass", "Тест впереди.", "Уверенный прогноз — событие."),
  a(2, 27, FS, "Maybe we ___ to the sea next summer.", "go", "will go", "next summer — будущее.", "Предположение — событие."),
  a(2, 28, FC, "This time next week, I ___ on the beach.", "lie", "will be lying", "next week — будущее.", "This time — процесс в будущий момент."),
  a(2, 29, FC, "At noon tomorrow, the kids ___ lunch.", "have", "will be having", "tomorrow — будущее.", "At noon — процесс в момент."),
  a(2, 30, FC, "Don't come at 5 — we ___ the room then.", "clean", "will be cleaning", "at 5 — будущее.", "then — в тот момент уборка будет идти."),
  a(2, 31, FP, "By 2040, scientists ___ a cure for this illness.", "find", "will have found", "By 2040 — будущая точка.", "Результат к точке."),
  a(2, 32, FP, "Hurry! By the time we get there, the film ___.", "start", "will have started", "Доберёмся потом — будущее.", "Фильм уже начнётся к этой точке — результат."),
  a(2, 33, FP, "I ___ this essay by tomorrow morning.", "finish", "will have finished", "by tomorrow morning — будущая точка.", "Эссе будет готово — результат."),
  a(2, 34, FPC, "By the end of the day, Tom ___ for ten hours.", "drive", "will have been driving", "By the end of the day — будущее.", "for ten hours — длительность до точки."),
  a(2, 35, FPC, "When Mum comes home at 7, the kids ___ games for three hours.", "play", "will have been playing", "Мама придёт в 7 — будущая точка.", "for three hours — сколько будет длиться процесс."),
  a(2, 36, FPC, "By December, we ___ on this project for a year.", "work", "will have been working", "By December — будущее.", "for a year — длительность до точки."),
];

/* ---------------- LEVEL 3 — ЧИТАЮ КОНТЕКСТ (36) ---------------- */

export const A12_LEVEL_3: CoordItem[] = [
  a(3, 1, PS, "— He ___ in a hospital. He's a doctor.", "work", "works", "Речь о жизни брата сейчас.", "Профессия — постоянный факт.", { context: ["— What does your brother do?"] }),
  a(3, 2, PS, "She ___ meat.", "not / eat", "does not eat", "Анна вегетарианка сейчас.", "Постоянная привычка.", { context: ["Anna is a vegetarian."] }),
  a(3, 3, PS, "He ___ home at 7:30 every morning.", "leave", "leaves", "every morning — обычная жизнь.", "Регулярное действие.", { context: ["Tom is always on time."] }),
  a(3, 4, PC, "— Sorry, she ___ a shower at the moment.", "take", "is taking", "at the moment — сейчас.", "Процесс в момент речи.", { context: ["— Can I speak to Anna?"] }),
  a(3, 5, PC, "But this week he ___ by bus because his bike is broken.", "go", "is going", "this week — настоящий период.", "Временная ситуация — процесс, а не обычность.", { context: ["Tom usually walks to school."] }),
  a(3, 6, PC, "— The neighbours ___ their flat.", "repair", "are repairing", "Шум слышен сейчас.", "Процесс идёт.", { context: ["— What's that noise?"] }),
  a(3, 7, PP, "She thinks she ___ them at school.", "leave", "has left", "Ключей нет сейчас.", "Важен результат: ключей нет.", { context: ["Anna can't find her keys."], variants: [{ answers: ["left"], note: "left просто сообщает о событии в прошлом; has left подчёркивает результат сейчас — ключей нет." }] }),
  a(3, 8, PP, "— No, he ___ home. Look, his bag is here.", "come", "has come", "Сумка здесь сейчас.", "Он уже дома — результат.", { context: ["— Is Tom still at school?"] }),
  a(3, 9, PP, "Mum ___ it.", "clean", "has cleaned", "Кухня выглядит чистой сейчас.", "Видим результат уборки.", { context: ["The kitchen looks clean and shiny."] }),
  a(3, 10, PPC, "— I ___ for the test for three hours.", "study", "have been studying", "Устал сейчас.", "for three hours — длительность до сейчас.", { context: ["— Why are you tired?"] }),
  a(3, 11, PPC, "— I know. I ___ at the screen all afternoon.", "look", "have been looking", "Глаза красные сейчас.", "all afternoon — долгий процесс до сейчас.", { context: ["— Your eyes are red."] }),
  a(3, 12, PPC, "She ___ the piano for six years.", "play", "has been playing", "Ей двенадцать сейчас.", "for six years — длительность до сейчас.", { context: ["Anna started playing the piano when she was six. She is twelve now."], variants: [{ answers: ["has played"], note: "has played тоже возможно, но звучит как итог; has been playing подчёркивает, что она играет до сих пор." }] }),
  a(3, 13, pS, "— I ___ my grandma in the village.", "visit", "visited", "on Saturday — прошлое.", "Событие.", { context: ["— Where were you on Saturday?"] }),
  a(3, 14, pS, "He ___ it Rex.", "call", "called", "День рождения был в прошлом.", "Событие.", { context: ["Tom's parents gave him a dog for his birthday."] }),
  a(3, 15, pS, "— Yes, but it ___ very long.", "be", "was", "Фильм уже посмотрели.", "Факт о прошлом.", { context: ["— Did you like the film?"] }),
  a(3, 16, pC, "She ___ home when two cars crashed.", "walk", "was walking", "yesterday — прошлое.", "Процесс-фон, который прервало событие.", { context: ["Anna saw an accident yesterday."] }),
  a(3, 17, pC, "— Sorry, I ___ football.", "play", "was playing", "Звонок в 6 был в прошлом.", "В тот момент шёл процесс.", { context: ["— Why didn't you answer my call at 6?"] }),
  a(3, 18, pC, "Birds ___ and the sun was shining.", "sing", "were singing", "It was — прошлое.", "Описание фона — процесс.", { context: ["It was a beautiful morning."] }),
  a(3, 19, pP, "When Tom got there, the film ___.", "start", "had started", "Том пришёл в прошлом.", "Фильм начался ещё раньше — результат к точке.", { context: ["Tom got to the cinema at 7:15. The film started at 7."], also: ["had already started"] }),
  a(3, 20, pP, "She ___ it the week before.", "see", "had seen", "Мы звали её в прошлом.", "Фильм уже был просмотрен к той точке.", { context: ["Anna didn't want to see the film with us."] }),
  a(3, 21, pP, "Someone ___ it.", "take", "had taken", "Мы вернулись в прошлом.", "Телефона уже не было — результат.", { context: ["We went back to the café, but my phone wasn't there."] }),
  a(3, 22, pPC, "Tom ___ for an hour when Anna arrived.", "wait", "had been waiting", "Анна пришла в прошлом.", "for an hour — длительность до прошлой точки.", { context: ["Tom started waiting at 4. Anna arrived at 5. He was still there."] }),
  a(3, 23, pPC, "Dad ___ pancakes, and some of them had burnt.", "make", "had been making", "Я пришёл в прошлом.", "Видим след процесса, который шёл до прошлой точки.", { context: ["When I came home, the kitchen was full of smoke."] }),
  a(3, 24, pPC, "They ___ in the mud all afternoon.", "play", "had been playing", "Дети были грязные — прошлое.", "all afternoon — длительность до прошлой точки.", { context: ["The children were dirty and happy."] }),
  a(3, 25, FS, "— I ___ the window.", "close", "will close", "Закрою после момента речи.", "Решение прямо сейчас.", { context: ["— It's cold in here."] }),
  a(3, 26, FS, "— I'm sure the kids ___ her.", "like", "will like", "Это будет потом.", "Прогноз.", { context: ["— What do you think about the new teacher?"] }),
  a(3, 27, FS, "— Don't worry, I ___ it to you.", "explain", "will explain", "Объясню после.", "Обещание помочь.", { context: ["— I don't understand this exercise."] }),
  a(3, 28, FC, "— Better not. He ___ his exam then.", "take", "will be taking", "at 8 — будущее.", "then — в тот момент экзамен будет идти.", { context: ["— Can I call Tom at 8?"] }),
  a(3, 29, FC, "At 10 a.m., we ___ over the sea.", "fly", "will be flying", "Рейс завтра.", "В 10 полёт будет в процессе.", { context: ["Our flight leaves at 9 a.m. tomorrow."] }),
  a(3, 30, FC, "— I can't. At 3, I ___ after my little brother.", "look", "will be looking", "on Sunday — будущее.", "В 3 процесс будет идти.", { context: ["— Let's meet at the café at 3 on Sunday."] }),
  a(3, 31, FP, "By 8, she ___ everything.", "prepare", "will have prepared", "By 8 — будущая точка.", "Всё будет готово — результат.", { context: ["The party starts at 8. Anna is cooking now."] }),
  a(3, 32, FP, "By Friday evening, he ___ the whole book.", "read", "will have read", "By Friday evening — будущее.", "Книга будет прочитана — результат.", { context: ["Tom reads 20 pages a day. His book has 100 pages. He starts on Monday."] }),
  a(3, 33, FP, "— Yes. By then, I ___ my homework.", "do", "will have done", "By then (6) — будущая точка.", "Домашка будет готова — результат.", { context: ["— Can we meet at 6?"] }),
  a(3, 34, FPC, "By 7, she ___ for three hours.", "work", "will have been working", "By 7 — будущая точка.", "for three hours — длительность.", { context: ["Anna started her homework at 4."] }),
  a(3, 35, FPC, "By noon, the runners ___ for three hours.", "run", "will have been running", "By noon — будущая точка.", "for three hours — длительность.", { context: ["The marathon starts at 9 a.m. tomorrow."] }),
  a(3, 36, FPC, "By 2030, he ___ there for ten years.", "live", "will have been living", "By 2030 — будущее.", "for ten years — длительность до точки.", { context: ["Tom moved to London in 2020."], variants: [{ answers: ["will have lived"], note: "will have lived подводит итог, а will have been living подчёркивает, что он живёт там до сих пор." }] }),
];

/* ---------------- LEVEL 4 — ПЕРЕКЛЮЧАЮСЬ (24 сценария) ---------------- */

export type ScenarioBlank = { verb: string; answer: string; tense: T; why: string; also?: string[]; variant?: { answers: string[]; note: string } };
export type ScenarioLine = { text: string; blank?: ScenarioBlank };
export type Scenario = { id: string; lines: ScenarioLine[] };

const L = (text: string, verb?: string, answer?: string, tense?: T, why?: string, more: Partial<ScenarioBlank> = {}): ScenarioLine =>
  verb && answer && tense ? { text, blank: { verb, answer, tense, why: why ?? "", ...more } } : { text };

const sc = (n: number, ...lines: ScenarioLine[]): Scenario => ({ id: `a12-l4-${n}`, lines });

export const A12_LEVEL_4: Scenario[] = [
  sc(1, L("Every Saturday, Tom ___ football.", "play", "plays", PS, "Every Saturday — обычная жизнь."), L("Today he can't play because he ___ his leg yesterday.", "hurt", "hurt", pS, "yesterday — событие в прошлом."), L("He ___ at home now.", "rest", "is resting", PC, "now — процесс сейчас.")),
  sc(2, L("Anna ___ for the exam for two hours when her friend called.", "study", "had been studying", pPC, "Длительность до прошлой точки — звонка."), L("She answered the phone and said:"), L("“I ___ you back later.", "call", "will call", FS, "Решение сейчас — событие потом."), L("I ___ right now.”", "study", "am studying", PC, "right now — процесс в момент речи.")),
  sc(3, L("I ___ my project, so now I'm free.", "finish", "have finished", PP, "Результат сейчас: я свободен."), L("Yesterday I ___ to bed very late because of it.", "go", "went", pS, "yesterday — событие."), L("Tomorrow I ___ to bed early.", "go", "will go", FS, "tomorrow — событие в будущем.")),
  sc(4, L("Last year, Tom ___ to swim.", "learn", "learned", pS, "Last year — событие в прошлом."), L("Now he ___ to the pool twice a week.", "go", "goes", PS, "twice a week — обычность сейчас."), L("Next summer, he ___ in a real competition.", "swim", "will swim", FS, "Next summer — событие в будущем.", { variant: { answers: ["is swimming"], note: "is swimming тоже возможно — так говорят о заранее договорённом плане." } })),
  sc(5, L("When I came home, Mum ___ dinner.", "cook", "was cooking", pC, "Процесс в момент, когда я пришёл."), L("She ___ since five o'clock, so the kitchen smelled great.", "cook", "had been cooking", pPC, "since five — длительность до прошлой точки."), L("Now we ___ together.", "eat", "are eating", PC, "Now — процесс сейчас.")),
  sc(6, L("— Where's Anna? — She ___ to the shop.", "go", "has gone", PP, "Её нет сейчас — результат."), L("She ___ at five.", "leave", "left", pS, "at five — событие в прошлом."), L("She ___ back in ten minutes.", "be", "will be", FS, "in ten minutes — будущее.")),
  sc(7, L("By the time the guests arrived, we ___ the house.", "clean", "had cleaned", pP, "Результат к прошлой точке."), L("Everyone ___ a great time.", "have", "had", pS, "Событие вечеринки в прошлом."), L("Next year, we ___ a party again.", "have", "will have", FS, "Next year — событие в будущем.")),
  sc(8, L("Last month, Tom's family ___ a new flat.", "buy", "bought", pS, "Last month — событие."), L("Right now they ___ their things.", "pack", "are packing", PC, "Right now — процесс."), L("By next month, they ___ there.", "move", "will have moved", FP, "Результат к будущей точке.")),
  sc(9, L("— I called you at 8 yesterday. — Sorry, I ___ a shower.", "take", "was taking", pC, "Процесс в прошлый момент."), L("— What are you doing now? — I ___ my bag for the trip.", "pack", "am packing", PC, "now — процесс."), L("— Great! By the time you get back, I ___ your present.", "buy", "will have bought", FP, "Результат к будущей точке.")),
  sc(10, L("At this time tomorrow, I ___ to the mountains.", "travel", "will be travelling", FC, "Процесс в будущий момент."), L("I ___ there before.", "never / be", "have never been", PP, "Опыт к сейчас."), L("My friends ___ there last year.", "go", "went", pS, "last year — событие.")),
  sc(11, L("The children ___ in the garden for an hour when it started to rain.", "play", "had been playing", pPC, "Длительность до прошлой точки."), L("They ___ inside.", "run", "ran", pS, "Событие после дождя."), L("Now they ___ cartoons.", "watch", "are watching", PC, "Now — процесс.")),
  sc(12, L("Anna usually ___ to school.", "walk", "walks", PS, "usually — обычность."), L("But yesterday it ___ hard, so she took a taxi.", "rain", "was raining", pC, "Фон-процесс в прошлом.", { also: ["rained"] }), L("Tomorrow her dad ___ her.", "drive", "will drive", FS, "tomorrow — событие.")),
  sc(13, L("Tom ___ his phone.", "lose", "has lost", PP, "Телефона нет сейчас — результат."), L("He ___ for it for twenty minutes.", "look", "has been looking", PPC, "for twenty minutes — длительность до сейчас."), L("He last ___ it on the bus.", "see", "saw", pS, "Событие в прошлом.")),
  sc(14, L("My sister ___ at university since 2023.", "study", "has been studying", PPC, "since 2023 — длительность до сейчас."), L("By 2027, she ___ her course.", "finish", "will have finished", FP, "Результат к будущей точке."), L("By then, she ___ there for four years.", "study", "will have been studying", FPC, "Длительность к будущей точке.")),
  sc(15, L("Yesterday, while I ___ the dishes, I broke a plate.", "wash", "was washing", pC, "while — процесс-фон."), L("Mum ___ yet.", "not / notice", "has not noticed", PP, "yet — результата пока нет к сейчас."), L("I think I ___ her tonight.", "tell", "will tell", FS, "Решение о будущем.")),
  sc(16, L("Every summer, we ___ to my grandma's.", "go", "go", PS, "Every summer — обычность."), L("Last summer, we ___ there for a month.", "stay", "stayed", pS, "Законченный период в прошлом."), L("This summer, we ___ there for two weeks.", "stay", "will stay", FS, "Будущее событие.", { variant: { answers: ["are staying"], note: "are staying тоже возможно — так говорят о договорённом плане." } })),
  sc(17, L("When I woke up, it ___.", "snow", "was snowing", pC, "Процесс в прошлый момент."), L("It ___ all night, so everything was white.", "snow", "had been snowing", pPC, "Длительность до прошлой точки."), L("Now the sun ___.", "shine", "is shining", PC, "Now — процесс.")),
  sc(18, L("— Are you ready? — Almost. I ___ my essay.", "just / finish", "have just finished", PP, "Результат к сейчас."), L("I ___ on it since morning.", "work", "have been working", PPC, "since morning — длительность."), L("Tomorrow the teacher ___ it.", "check", "will check", FS, "tomorrow — событие.")),
  sc(19, L("Tom ___ the tickets two weeks ago.", "buy", "bought", pS, "two weeks ago — событие."), L("But when we arrived at the stadium, the match ___.", "already / start", "had already started", pP, "Результат к прошлой точке."), L("At half-time, our team ___.", "lose", "was losing", pC, "Процесс в прошлый момент.")),
  sc(20, L("Anna ___ English for five years.", "learn", "has been learning", PPC, "Длительность до сейчас."), L("Next year, she ___ an international exam.", "take", "will take", FS, "Событие в будущем."), L("By then, she ___ English for six years.", "learn", "will have been learning", FPC, "Длительность к будущей точке.")),
  sc(21, L("Don't call me at 9 tonight. I ___ a film with my family.", "watch", "will be watching", FC, "Процесс в будущий момент."), L("By 11, the film ___.", "end", "will have ended", FP, "Результат к будущей точке."), L("Then I ___ you.", "call", "will call", FS, "Событие в будущем.")),
  sc(22, L("Tom was tired yesterday because he ___ all day.", "work", "had been working", pPC, "Длительность до прошлой точки."), L("He ___ to bed at 9.", "go", "went", pS, "Событие."), L("Today he ___ much better.", "feel", "feels", PS, "Состояние сейчас.", { also: ["is feeling"] })),
  sc(23, L("Look! Our cat ___ onto the roof.", "climb", "has climbed", PP, "Кот на крыше сейчас — результат."), L("It ___ the birds there every morning.", "watch", "watches", PS, "every morning — обычность."), L("Yesterday it ___ down on its own.", "come", "came", pS, "Событие.")),
  sc(24, L("An hour ago, we ___ a huge mess in the flat.", "find", "found", pS, "An hour ago — событие."), L("Right now we ___ the floor.", "wash", "are washing", PC, "Right now — процесс."), L("By the time Mum gets home, we ___ everything.", "tidy", "will have tidied", FP, "Результат к будущей точке.")),
];

/** Каждый пропуск сценария — отдельное проверяемое задание. */
export function scenarioItems(s: Scenario): CoordItem[] {
  return s.lines.flatMap((l, k) => {
    if (!l.blank) return [];
    const b = l.blank;
    const { zone, meaning } = coordsOf(b.tense);
    return [{
      id: `${s.id}-${k}`,
      level: 3 as const,
      question: l.text,
      verb: b.verb,
      correctAnswer: b.answer,
      acceptableAnswers: [...forms(b.answer), ...(b.also ?? []).flatMap(forms)],
      tense: b.tense,
      timeCoordinate: zone,
      aspectMeaning: meaning,
      skills: [`zone:${zone}`, `meaning:${meaning}`, b.tense, "switch"],
      errorCategory: CATEGORY_BY_TENSE[b.tense],
      difficulty: 3 as const,
      hint: HINTS[meaning],
      whyWhere: b.why,
      whyWhat: b.why,
      variants: b.variant ? [{ ...b.variant, answers: b.variant.answers.flatMap(forms) }] : undefined,
    }];
  });
}

/* ---------------- ЛАБОРАТОРИЯ: что изменилось / передвинь точку / исправь мышление ---------------- */

export type LabItem = {
  id: string;
  kind: "what-changed" | "move-point" | "fix-thinking";
  source: string[];
  prompt: string;
  options: string[];
  answer: string;
  why: string;
  examples?: string[];
};

export const A12_LAB: LabItem[] = [
  { id: "a12-lab-1", kind: "what-changed", source: ["Tom is working.", "Tom has been working for three hours."], prompt: "Что изменилось?", options: ["Зона: PRESENT → PAST", "Смысл: процесс сейчас → длительность процесса до сейчас", "Смысл: процесс → результат"], answer: "Смысл: процесс сейчас → длительность процесса до сейчас", why: "Обе фразы в PRESENT. В первой важен процесс сейчас, во второй — как долго он идёт до сейчас." },
  { id: "a12-lab-2", kind: "what-changed", source: ["At 8 yesterday, Tom was working.", "By 8 yesterday, Tom had finished the work."], prompt: "Что изменилось?", options: ["Смысл: процесс в прошлый момент → результат к прошлой точке", "Зона: PAST → PRESENT", "Смысл: событие → процесс"], answer: "Смысл: процесс в прошлый момент → результат к прошлой точке", why: "Зона одна — PAST. AT 8 — процесс в момент, BY 8 — что уже готово к моменту." },
  { id: "a12-lab-3", kind: "what-changed", source: ["I have finished the report.", "I will have finished the report by Friday."], prompt: "Что изменилось?", options: ["Смысл: результат → процесс", "Зона: PRESENT → FUTURE, смысл тот же — результат", "Ничего"], answer: "Зона: PRESENT → FUTURE, смысл тот же — результат", why: "Смысл «результат» остался, передвинулась только точка отсчёта." },
  { id: "a12-lab-4", kind: "what-changed", source: ["Anna reads a lot.", "Anna is reading a lot this month."], prompt: "Что изменилось?", options: ["Смысл: обычность → временный процесс", "Зона: PRESENT → FUTURE", "Смысл: факт → результат"], answer: "Смысл: обычность → временный процесс", why: "Обе фразы в PRESENT. Первая — постоянная привычка, вторая — временный процесс в этот период." },
  { id: "a12-lab-5", kind: "move-point", source: ["I am studying now."], prompt: "Перенеси процесс в 8 вчера.", options: ["I studied at 8 yesterday.", "I was studying at 8 yesterday.", "I had studied at 8 yesterday."], answer: "I was studying at 8 yesterday.", why: "Смысл «процесс» сохраняем, меняем только зону: am → was." },
  { id: "a12-lab-6", kind: "move-point", source: ["I am studying now."], prompt: "Перенеси процесс в 8 завтра.", options: ["I will study at 8 tomorrow.", "I will be studying at 8 tomorrow.", "I will have studied at 8 tomorrow."], answer: "I will be studying at 8 tomorrow.", why: "Процесс в будущий момент: am → will be." },
  { id: "a12-lab-7", kind: "move-point", source: ["I have finished the report."], prompt: "Перенеси точку результата в прошлое (до прихода Тома).", options: ["I finished the report before Tom arrived.", "I had finished the report before Tom arrived.", "I was finishing the report before Tom arrived."], answer: "I had finished the report before Tom arrived.", why: "Результат к прошлой точке: have → had." },
  { id: "a12-lab-8", kind: "move-point", source: ["I have been studying for two hours."], prompt: "Перенеси длительность в будущее (к 8).", options: ["By 8, I will be studying for two hours.", "By 8, I will have studied for two hours.", "By 8, I will have been studying for two hours."], answer: "By 8, I will have been studying for two hours.", why: "Длительность к будущей точке: have been → will have been." },
  { id: "a12-lab-9", kind: "fix-thinking", source: ["«В предложении есть yesterday — значит, всегда Past Simple»."], prompt: "Верно?", options: ["Да, всегда", "Нет: yesterday находит зону PAST, но не выбирает смысл"], answer: "Нет: yesterday находит зону PAST, но не выбирает смысл", why: "yesterday помогает найти PAST-зону, но смысл выбираешь ты.", examples: ["At 8 yesterday, I was studying.", "By 8 yesterday, I had finished.", "Yesterday I had been studying for two hours when Tom arrived."] },
  { id: "a12-lab-10", kind: "fix-thinking", source: ["«Есть FOR — значит, Perfect Continuous»."], prompt: "Верно?", options: ["Да, всегда", "Нет: for показывает длительность, но время зависит от точки и смысла"], answer: "Нет: for показывает длительность, но время зависит от точки и смысла", why: "for бывает в разных временах — решает смысл.", examples: ["I lived in Paris for two years. (закончилось)", "I have known him for years. (know — не процесс)", "We will stay there for a week."] },
  { id: "a12-lab-11", kind: "fix-thinking", source: ["«Есть when — значит, Past Continuous»."], prompt: "Верно?", options: ["Да, всегда", "Нет: when просто задаёт точку; что было в ней — решает смысл"], answer: "Нет: when просто задаёт точку; что было в ней — решает смысл", why: "when — это точка отсчёта, а не ответ.", examples: ["When Anna arrived, Tom was cooking.", "When Anna arrived, Tom had cooked dinner.", "When Anna arrives, we will eat."] },
  { id: "a12-lab-12", kind: "fix-thinking", source: ["«Есть now — значит, Present Continuous»."], prompt: "Верно?", options: ["Да, всегда", "Нет: now даёт зону PRESENT, а смысл может быть другим"], answer: "Нет: now даёт зону PRESENT, а смысл может быть другим", why: "now указывает на настоящее, но важен смысл.", examples: ["I know the answer now.", "I have finished now — let's go.", "I have been waiting for an hour now."] },
];

/** Ловушки слов-маркеров: слово помогает понять контекст, но не выбирает время. */
export const MARKER_TRAPS: { word: string; helps: string; examples: string[] }[] = [
  { word: "now", helps: "подсказывает зону PRESENT", examples: ["I am reading now.", "I know it now.", "I have finished now."] },
  { word: "yesterday", helps: "подсказывает зону PAST", examples: ["I played yesterday.", "At 5 yesterday, I was playing."] },
  { word: "tomorrow", helps: "подсказывает зону FUTURE", examples: ["I will call tomorrow.", "At 5 tomorrow, I will be flying."] },
  { word: "for", helps: "показывает длительность", examples: ["I have been waiting for an hour.", "I lived there for a year."] },
  { word: "since", helps: "показывает начало периода", examples: ["I have known her since 2020.", "It has been raining since 6."] },
  { word: "already", helps: "намекает на результат", examples: ["I have already eaten.", "She had already left."] },
  { word: "when", helps: "задаёт точку отсчёта", examples: ["When I came, he was sleeping.", "When I came, he had left."] },
  { word: "while", helps: "обычно фон-процесс", examples: ["While I was cooking, he called.", "While you wait, I'll make tea."] },
  { word: "by", helps: "«к моменту» — часто результат", examples: ["By 8, I will have finished.", "By 8, I will have been working for 3 hours."] },
];

export const A12_TRAINING: CoordItem[] = [...A12_LEVEL_1, ...A12_LEVEL_2, ...A12_LEVEL_3];
export const A12_SCENARIO_ITEMS: CoordItem[] = A12_LEVEL_4.flatMap(scenarioItems);
export const A12_ALL_COUNT = A12_TRAINING.length + A12_SCENARIO_ITEMS.length + A12_LAB.length;
