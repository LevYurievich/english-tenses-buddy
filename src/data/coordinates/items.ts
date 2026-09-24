/**
 * Банк заданий модуля «Координаты времени».
 * Каждое задание хранит метаданные: tense, timeCoordinate, aspectMeaning, skills,
 * errorCategory, difficulty — на них работает диагностика и подбор слабых мест.
 */
import type { ErrorCategory } from "@/data/types";
import { coordsOf, type Meaning, type TenseKey, type Zone } from "./model";

/* ---------------- ШАГ 1: ГДЕ? ---------------- */

export type WhereItem = { id: string; sentence: string; focus: string; answer: Zone; why: string };

const w = (id: string, sentence: string, focus: string, answer: Zone, why: string): WhereItem => ({
  id: `crd-where-${id}`,
  sentence,
  focus,
  answer,
  why,
});

export const WHERE_ITEMS: WhereItem[] = [
  w("1", "I have just finished my homework.", "have finished", "present", "Результат важен сейчас: домашка готова в момент речи. Слова now нет, но точка — настоящая."),
  w("2", "I have lost my key.", "have lost", "present", "Ключа нет сейчас — результат относится к настоящему."),
  w("3", "Anna usually walks to school.", "walks", "present", "Это обычная жизнь Анны в настоящем периоде."),
  w("4", "Look, it's snowing!", "is snowing", "present", "Look! — показываем то, что видно прямо сейчас."),
  w("5", "We have been waiting for 20 minutes.", "have been waiting", "present", "Ожидание тянется до сих пор — до настоящей точки."),
  w("6", "Tom knows the answer.", "knows", "present", "Состояние в настоящем: Том знает ответ сейчас."),
  w("7", "When Anna arrived, Tom had already left.", "had left", "past", "Точка отсчёта — момент в прошлом (Анна пришла). Слова yesterday нет, но зона — PAST."),
  w("8", "By the time Tom arrived, Anna had finished dinner.", "had finished", "past", "Главная точка — прибытие Тома в прошлом."),
  w("9", "At that moment, Tom was running home.", "was running", "past", "at that moment — конкретный момент в прошлом."),
  w("10", "We played tennis last Sunday.", "played", "past", "last Sunday — событие закончилось в прошлом."),
  w("11", "She had been working all day, so she was tired.", "had been working", "past", "Она была уставшей — точка отсчёта в прошлом."),
  w("12", "The film started at seven, and we were late.", "started", "past", "Мы опоздали — всё это уже случилось."),
  w("13", "By Friday, Anna will have completed the project.", "will have completed", "future", "Результат будет готов к пятнице — точка в будущем."),
  w("14", "By the time you arrive, I will have finished.", "will have finished", "future", "Ты ещё не пришёл — точка результата в будущем. Слова tomorrow нет."),
  w("15", "At 8 tomorrow, I will be studying.", "will be studying", "future", "Процесс в момент будущего."),
  w("16", "I think it will rain.", "will rain", "future", "Прогноз о том, что ещё не случилось."),
  w("17", "Next June, we will have been living here for five years.", "will have been living", "future", "Длительность считаем до будущей точки — июня."),
  w("18", "Don't worry, I'll call you later.", "'ll call", "future", "Обещание о будущем: later ещё не наступило."),
];

/* ---------------- ШАГ 2: ЧТО? ---------------- */

export type WhatItem = { id: string; sentence: string; focus: string; answer: Meaning; why: string };

const h = (id: string, sentence: string, focus: string, answer: Meaning, why: string): WhatItem => ({
  id: `crd-what-${id}`,
  sentence,
  focus,
  answer,
  why,
});

export const WHAT_ITEMS: WhatItem[] = [
  h("1", "Tom plays volleyball every Saturday.", "plays", "simple", "every Saturday — регулярность, привычка. Процесс и результат не важны."),
  h("2", "We visited the museum yesterday.", "visited", "simple", "Просто событие: сходили в музей. Не важно, как долго и что стало результатом."),
  h("3", "I think you will like this book.", "will like", "simple", "Прогноз о будущем — базовый взгляд на ситуацию."),
  h("4", "The Earth goes round the Sun.", "goes", "simple", "Факт, который верен всегда."),
  h("5", "Anna opened the window and sat down.", "opened", "simple", "Цепочка событий одно за другим."),
  h("6", "At that moment, Tom was running home.", "was running", "process", "В тот момент бег шёл — показываем процесс «изнутри»."),
  h("7", "Look! The kids are playing in the snow.", "are playing", "process", "Прямо сейчас идёт процесс игры."),
  h("8", "At 8 tomorrow, I will be flying to Paris.", "will be flying", "process", "В 8 завтра полёт будет в процессе."),
  h("9", "While I was cooking, the phone rang.", "was cooking", "process", "Готовка — фон, процесс, который прервал звонок."),
  h("10", "Shh, the baby is sleeping.", "is sleeping", "process", "Сон идёт сейчас — это процесс."),
  h("11", "Tom couldn't open the door because he had lost his key.", "had lost", "result", "Ключ потерян раньше — к прошлой ситуации уже был результат: ключа нет."),
  h("12", "I have finished my homework — let's go out!", "have finished", "result", "Домашка готова сейчас — поэтому можно гулять."),
  h("13", "By Friday, Anna will have completed the project.", "will have completed", "result", "К пятнице проект будет готов — результат к точке."),
  h("14", "The room looks great — someone has cleaned it.", "has cleaned", "result", "Мы видим результат уборки сейчас."),
  h("15", "When we arrived, the train had left.", "had left", "result", "К моменту нашего прихода поезда уже не было — результат."),
  h("16", "By 6 p.m., Anna will have been studying for four hours.", "will have been studying", "duration", "Важно, КАК ДОЛГО будет идти учёба до 6 вечера."),
  h("17", "I have been waiting for you for an hour!", "have been waiting", "duration", "Ожидание длится час — до настоящего момента."),
  h("18", "Tom had been playing for three hours before his mum called him.", "had been playing", "duration", "Длительность игры до прошлой точки — звонка мамы."),
  h("19", "It has been raining since morning.", "has been raining", "duration", "since morning — процесс длится до сих пор."),
  h("20", "By June, she will have been working here for ten years.", "will have been working", "duration", "Длительность работы к будущей точке — июню."),
];

/* ---------------- УРОВНИ 1–3 И CHECKPOINT ---------------- */

export type CoordItem = {
  id: string;
  level: 1 | 2 | 3 | 4; // 4 — checkpoint
  /** Предложение с пропуском ___ */
  question: string;
  /** Подсказка-глагол в скобках, например "play" или "not / eat". */
  verb: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  /** Для заданий с выбором — варианты форм. */
  options?: string[];
  tense: TenseKey;
  timeCoordinate: Zone;
  aspectMeaning: Meaning;
  skills: string[];
  errorCategory: ErrorCategory;
  difficulty: 1 | 2 | 3;
  hint: string;
  /** Почему именно эта зона. */
  whyWhere: string;
  /** Почему именно этот смысл. */
  whyWhat: string;
  /** Контекст перед предложением (диалог, мини-ситуация). */
  context?: string[] | undefined;
  /** Допустимые варианты, которые меняют фокус: засчитываются с пояснением. */
  variants?: { answers: string[]; note: string }[] | undefined;
};

export const HINTS: Record<Meaning, string> = {
  simple: "Спроси себя: это обычность, факт или просто событие?",
  process: "Есть ли конкретный момент, в который что-то идёт?",
  result: "Что уже готово к точке отсчёта?",
  duration: "Есть ли вопрос «как долго» до точки?",
};

export const CATEGORY_BY_TENSE: Record<TenseKey, ErrorCategory> = {
  "present-simple": "simple_vs_continuous",
  "present-continuous": "simple_vs_continuous",
  "present-perfect": "present_perfect_vs_past_simple",
  "present-perfect-continuous": "present_perfect_vs_present_perfect_continuous",
  "past-simple": "past_simple_vs_past_perfect",
  "past-continuous": "past_simple_vs_continuous",
  "past-perfect": "past_simple_vs_past_perfect",
  "past-perfect-continuous": "past_perfect_vs_past_perfect_continuous",
  "future-simple": "future_simple_vs_continuous",
  "future-continuous": "future_simple_vs_continuous",
  "future-perfect": "future_continuous_vs_future_perfect",
  "future-perfect-continuous": "future_perfect_vs_perfect_continuous",
};

function c(
  level: CoordItem["level"],
  n: number,
  tense: TenseKey,
  question: string,
  verb: string,
  answer: string | string[],
  whyWhere: string,
  whyWhat: string,
  options?: string[],
): CoordItem {
  const { zone, meaning } = coordsOf(tense);
  const answers = Array.isArray(answer) ? answer : [answer];
  const prefix = level === 4 ? "cp" : `l${level}`;
  return {
    id: `crd-${prefix}-${n}`,
    level,
    question,
    verb,
    correctAnswer: answers[0]!,
    acceptableAnswers: answers,
    ...(options ? { options } : {}),
    tense,
    timeCoordinate: zone,
    aspectMeaning: meaning,
    skills: ["time_coordinate", "aspect_meaning", `${zone}_reference`, `${meaning}_meaning`],
    errorCategory: CATEGORY_BY_TENSE[tense],
    difficulty: level === 4 ? 3 : level,
    hint: HINTS[meaning],
    whyWhere,
    whyWhat,
  };
}

export const LEVEL_1: CoordItem[] = [
  c(1, 1, "present-simple", "Tom usually ___ football on Saturdays.", "play", "plays", "usually — это его обычная жизнь сейчас.", "Регулярность, привычка."),
  c(1, 2, "present-continuous", "Look! The kids ___ in the rain.", "run", ["are running", "'re running"], "Look! — прямо сейчас.", "Бег идёт в этот момент — процесс."),
  c(1, 3, "present-perfect", "I can't open the door — I ___ my key.", "lose", ["have lost", "'ve lost"], "Не могу открыть сейчас — точка в настоящем.", "Ключа нет — важен результат."),
  c(1, 4, "present-perfect-continuous", "Anna is tired: she ___ since 9 a.m., and she is still at her desk.", "study", ["has been studying", "'s been studying"], "Она устала сейчас и всё ещё занимается.", "since 9 a.m. — процесс длится до сих пор."),
  c(1, 5, "past-simple", "Yesterday Tom ___ his grandma.", "visit", "visited", "yesterday — прошлое.", "Просто событие: навестил."),
  c(1, 6, "past-continuous", "At 7 yesterday, Tom ___ football.", "play", "was playing", "At 7 yesterday — момент в прошлом.", "В тот момент игра шла — процесс."),
  c(1, 7, "past-perfect", "Tom couldn't open the door because he ___ his key.", "lose", "had lost", "couldn't — ситуация в прошлом.", "Ключ потерян раньше — результат к прошлой точке."),
  c(1, 8, "past-perfect-continuous", "Before Tom arrived, Anna ___ for two hours.", "wait", "had been waiting", "Том пришёл в прошлом — это точка отсчёта.", "for two hours до его прихода — длительность."),
  c(1, 9, "future-simple", "Don't worry, I ___ you with your homework.", "help", ["will help", "'ll help"], "Помощь ещё впереди.", "Обещание — базовый взгляд на будущее событие."),
  c(1, 10, "future-continuous", "At 8 tomorrow evening, Tom ___ TV.", "watch", "will be watching", "At 8 tomorrow — момент в будущем.", "В тот момент будет идти процесс."),
  c(1, 11, "future-perfect", "By Friday, Anna ___ the project.", "finish", "will have finished", "By Friday — будущая точка.", "К пятнице будет готово — результат."),
  c(1, 12, "future-perfect-continuous", "By 8 tomorrow, Tom ___ for three hours.", "study", "will have been studying", "By 8 tomorrow — будущая точка.", "for three hours — длительность до точки."),
  c(1, 13, "present-simple", "Water ___ at 100 °C.", "boil", "boils", "Факт, верный всегда — настоящее.", "Научный факт."),
  c(1, 14, "present-continuous", "Be quiet, please — the baby ___ now.", "sleep", ["is sleeping", "'s sleeping"], "now — сейчас.", "Сон идёт — процесс."),
  c(1, 15, "present-perfect", "We ___ this film before, so let's choose another one.", "see", ["have seen", "'ve seen"], "Выбираем фильм сейчас.", "Опыт уже есть — результат для настоящего решения."),
  c(1, 16, "past-simple", "Last summer we ___ to Italy.", "go", "went", "Last summer — прошлое.", "Событие целиком."),
  c(1, 17, "past-continuous", "When the phone rang, Anna ___ a shower.", "take", "was taking", "Звонок был в прошлом.", "Душ шёл в момент звонка — процесс."),
  c(1, 18, "future-simple", "I think it ___ tomorrow.", "rain", ["will rain", "'ll rain"], "tomorrow — будущее.", "I think — прогноз."),
  c(1, 19, "future-perfect", "By the time you get home, I ___ dinner.", "cook", ["will have cooked", "'ll have cooked"], "Ты ещё не пришёл — будущая точка.", "Ужин будет готов — результат."),
  c(1, 20, "past-perfect", "By the time the teacher came in, the students ___ the test.", "finish", "had finished", "Учитель вошёл в прошлом.", "К этому моменту тест был готов — результат."),
];

export const LEVEL_2: CoordItem[] = [
  c(2, 1, "present-simple", "My sister ___ meat — she's a vegetarian.", "not / eat", ["doesn't eat", "does not eat"], "Она вегетарианка сейчас.", "Постоянное положение дел, привычка."),
  c(2, 2, "present-simple", "The shop ___ at 9 every morning.", "open", "opens", "Расписание в настоящем.", "Регулярность."),
  c(2, 3, "present-continuous", "Can you call back later? I ___ dinner right now.", "cook", ["am cooking", "'m cooking"], "right now — сейчас.", "Процесс в момент речи."),
  c(2, 4, "present-continuous", "Shh! Dad ___ on the phone.", "talk", ["is talking", "'s talking"], "Shh! — это происходит сейчас.", "Разговор идёт — процесс."),
  c(2, 5, "present-perfect", "Oh no! Somebody ___ the window. Look at the glass on the floor!", "break", ["has broken", "'s broken"], "Мы видим стекло сейчас.", "Результат виден — окно разбито."),
  c(2, 6, "present-perfect", "Tom ___ his homework, so he can go out now.", "already / do", ["has already done", "'s already done"], "now — он может идти сейчас.", "Домашка готова — результат."),
  c(2, 7, "present-perfect-continuous", "My hands are dirty because I ___ the fence all morning.", "paint", ["have been painting", "'ve been painting"], "Руки грязные сейчас.", "Процесс длился всё утро до настоящего."),
  c(2, 8, "present-perfect-continuous", "We ___ for the bus for twenty minutes, and it still isn't here.", "wait", ["have been waiting", "'ve been waiting"], "Автобуса нет до сих пор.", "for twenty minutes — длительность до сейчас."),
  c(2, 9, "past-simple", "Anna ___ a new phone two days ago.", "buy", "bought", "two days ago — прошлое.", "Событие."),
  c(2, 10, "past-simple", "Tom got up, ___ a shower and went to school.", "have", "had", "Утро уже прошло.", "Цепочка событий по порядку."),
  c(2, 11, "past-continuous", "While Tom ___, Anna was reading.", "cook", "was cooking", "Вся сцена в прошлом.", "Два процесса идут параллельно."),
  c(2, 12, "past-continuous", "I saw you in the park yesterday. You ___ with your dog.", "run", "were running", "yesterday — прошлое.", "Когда я тебя увидел, бег шёл — процесс."),
  c(2, 13, "past-perfect", "We were too late: when we got to the station, the train ___.", "leave", "had left", "Мы пришли на вокзал в прошлом.", "К этому моменту поезд уже ушёл — результат."),
  c(2, 14, "past-perfect", "Anna didn't want to watch the film because she ___ it before.", "see", "had seen", "Не хотела — прошлая ситуация.", "Опыт был раньше этой точки — результат."),
  c(2, 15, "past-perfect-continuous", "Tom was out of breath because he ___.", "run", "had been running", "Задыхался в прошлом.", "Долгий процесс до этой точки объясняет состояние."),
  c(2, 16, "past-perfect-continuous", "When I found my brother, he ___ video games for five hours.", "play", "had been playing", "Я нашёл его в прошлом.", "for five hours — длительность до точки."),
  c(2, 17, "future-simple", "It's cold in here. — OK, I ___ the window.", "close", ["will close", "'ll close"], "Закрою — после этой реплики.", "Решение, принятое в момент речи."),
  c(2, 18, "future-simple", "I promise I ___ anyone.", "not / tell", ["won't tell", "will not tell"], "Обещание о будущем.", "Обещание — базовый взгляд."),
  c(2, 19, "future-continuous", "Don't call me at 9 tomorrow — I ___ to London then.", "fly", ["will be flying", "'ll be flying"], "at 9 tomorrow — будущий момент.", "В этот момент полёт будет идти."),
  c(2, 20, "future-continuous", "This time next week, we ___ on the beach.", "lie", ["will be lying", "'ll be lying"], "This time next week — будущее.", "Процесс в тот момент."),
  c(2, 21, "future-perfect", "Come at 6. By then I ___ my homework.", "finish", ["will have finished", "'ll have finished"], "By then (6 часов) — будущая точка.", "Домашка будет готова — результат."),
  c(2, 22, "future-perfect", "By the end of the year, Anna ___ 30 books.", "read", ["will have read", "'ll have read"], "Конец года ещё впереди.", "Сколько будет готово — результат (30 книг)."),
  c(2, 23, "future-perfect-continuous", "By 5 p.m., the kids ___ for two hours, so they'll be very hungry.", "swim", "will have been swimming", "By 5 p.m. — будущая точка.", "for two hours — длительность до точки."),
  c(2, 24, "future-perfect-continuous", "By the time you arrive, I ___ for an hour.", "wait", ["will have been waiting", "'ll have been waiting"], "Ты ещё не пришёл — будущее.", "Как долго я буду ждать до твоего прихода."),
];

export const LEVEL_3: CoordItem[] = [
  c(3, 1, "present-simple", "Anna ___ three languages.", "speak", "speaks", "Её умения сейчас.", "Факт, постоянное состояние."),
  c(3, 2, "present-simple", "Tom never ___ coffee.", "drink", "drinks", "never — его обычная жизнь.", "Привычка (точнее, её отсутствие)."),
  c(3, 3, "present-continuous", "Where is Tom? — He ___ a shower.", "have", ["is having", "'s having"], "Где он — сейчас.", "Процесс в момент речи."),
  c(3, 4, "present-continuous", "Listen! Someone ___ the piano.", "play", "is playing", "Listen! — сейчас.", "Звук слышен — процесс идёт.", ["plays", "is playing", "has played", "played"]),
  c(3, 5, "present-perfect", "I ___ my phone. Can you help me find it?", "lose", ["have lost", "'ve lost"], "Помоги найти — сейчас.", "Телефона нет — результат."),
  c(3, 6, "present-perfect", "She ___ to Paris, but she really wants to go.", "never / be", ["has never been", "'s never been"], "Её опыт к настоящему моменту.", "Опыта нет — результат для «сейчас»."),
  c(3, 7, "present-perfect-continuous", "It ___ since the morning, and the streets are wet.", "rain", ["has been raining", "'s been raining"], "Улицы мокрые сейчас.", "since the morning — длительность до сейчас."),
  c(3, 8, "present-perfect-continuous", "I ___ English for five years, and I still love it.", "learn", "have been learning", "still — до сих пор.", "for five years — длительность до сейчас.", ["learn", "am learning", "have been learning", "learned"]),
  c(3, 9, "past-simple", "Shakespeare ___ Hamlet.", "write", "wrote", "Шекспир жил давно — прошлое.", "Событие-факт из прошлого."),
  c(3, 10, "past-simple", "We ___ a great film last night.", "watch", "watched", "last night — прошлое.", "Просто событие.", ["watched", "have watched", "were watching", "had watched"]),
  c(3, 11, "past-continuous", "At midnight, Anna ___.", "still / study", "was still studying", "Полночь уже прошла.", "В тот момент учёба шла — процесс."),
  c(3, 12, "past-continuous", "The sun ___ when we left the house.", "shine", "was shining", "Мы вышли в прошлом.", "Солнце светило фоном — процесс."),
  c(3, 13, "past-perfect", "Tom was upset. Somebody ___ his bike.", "steal", "had stolen", "Был расстроен — прошлое.", "Кража случилась раньше — результат к прошлой точке."),
  c(3, 14, "past-perfect", "When Anna came back, her friends ___ all the pizza.", "eat", "had eaten", "Анна вернулась в прошлом.", "Пиццы уже не было — результат.", ["ate", "have eaten", "were eating", "had eaten"]),
  c(3, 15, "past-perfect-continuous", "Her eyes were red because she ___.", "cry", "had been crying", "Глаза были красными — прошлое.", "Долгий процесс до точки объясняет состояние."),
  c(3, 16, "past-perfect-continuous", "By the time the bus came, we ___ in the rain for 40 minutes.", "stand", "had been standing", "Автобус пришёл в прошлом.", "for 40 minutes — длительность до точки."),
  c(3, 17, "future-simple", "I'm sure you ___ the exam.", "pass", ["will pass", "'ll pass"], "Экзамен впереди.", "I'm sure — уверенный прогноз."),
  c(3, 18, "future-simple", "The phone is ringing. — I ___ it!", "get", "'ll get", "Отвечу через секунду — будущее.", "Решение в момент речи.", ["get", "'ll get", "'m getting", "'ve got"]),
  c(3, 19, "future-continuous", "Tomorrow at noon, I ___ in the dentist's chair.", "sit", ["will be sitting", "'ll be sitting"], "Tomorrow at noon — будущий момент.", "Процесс в этот момент."),
  c(3, 20, "future-continuous", "Please don't phone after 10 — we ___.", "sleep", ["will be sleeping", "'ll be sleeping"], "after 10 — будущее время.", "В тот момент будет идти сон."),
  c(3, 21, "future-perfect", "The builders ___ the house by next summer.", "finish", "will have finished", "by next summer — будущая точка.", "Дом будет готов — результат."),
  c(3, 22, "future-perfect", "By the time we get to the cinema, the film ___.", "start", "will have started", "Мы ещё едем — будущее.", "К нашему приходу начало уже будет — результат.", ["will start", "will be starting", "will have started", "starts"]),
  c(3, 23, "future-perfect-continuous", "By midnight, Anna ___ for ten hours without a break.", "drive", "will have been driving", "By midnight — будущая точка.", "for ten hours — длительность до точки."),
  c(3, 24, "future-perfect-continuous", "By the end of the lesson, we ___ this test for 90 minutes.", "write", "will have been writing", "Урок ещё идёт — точка впереди.", "for 90 minutes — длительность до точки."),
];

export const CHECKPOINT: CoordItem[] = [
  c(4, 1, "present-simple", "My dad ___ to work by bus every day.", "go", "goes", "every day — его обычная жизнь.", "Регулярность."),
  c(4, 2, "present-continuous", "Turn the TV down! I ___ to sleep.", "try", ["am trying", "'m trying"], "Выключи сейчас.", "Процесс в момент речи."),
  c(4, 3, "present-perfect", "The kids ___ all the cookies — the box is empty.", "eat", ["have eaten", "'ve eaten"], "Коробка пустая сейчас.", "Результат виден."),
  c(4, 4, "present-perfect-continuous", "I ___ the house since 8 a.m., and I'm not done yet.", "clean", ["have been cleaning", "'ve been cleaning"], "not done yet — до сих пор.", "since 8 a.m. — длительность."),
  c(4, 5, "past-simple", "Columbus ___ America in 1492.", "reach", "reached", "1492 — прошлое.", "Историческое событие."),
  c(4, 6, "past-continuous", "What were you doing at 10 last night? — I ___ a film.", "watch", "was watching", "at 10 last night — момент в прошлом.", "Процесс в тот момент."),
  c(4, 7, "past-perfect", "When the police arrived, the thief ___.", "escape", "had escaped", "Полиция приехала в прошлом.", "Вора уже не было — результат."),
  c(4, 8, "past-perfect-continuous", "Tom's clothes were wet because he ___ in the rain for an hour.", "walk", "had been walking", "Одежда была мокрой — прошлое.", "for an hour — длительность до точки."),
  c(4, 9, "future-simple", "You look thirsty. I ___ you some water.", "bring", ["will bring", "'ll bring"], "Принесу — сейчас решу, сделаю потом.", "Предложение помощи, решение в момент речи."),
  c(4, 10, "future-continuous", "At this time tomorrow, Anna ___ to Moscow.", "travel", ["will be travelling", "will be traveling", "'ll be travelling", "'ll be traveling"], "At this time tomorrow — будущий момент.", "Процесс в тот момент."),
  c(4, 11, "future-perfect", "By the time you wake up, I ___ for work.", "leave", ["will have left", "'ll have left"], "Ты ещё спишь — будущее.", "К точке меня уже не будет — результат."),
  c(4, 12, "future-perfect-continuous", "By 10 p.m., the band ___ for three hours.", "play", "will have been playing", "By 10 p.m. — будущая точка.", "for three hours — длительность до точки."),
];

export const COORD_LEVELS: { id: 1 | 2 | 3; items: CoordItem[] }[] = [
  { id: 1, items: LEVEL_1 },
  { id: 2, items: LEVEL_2 },
  { id: 3, items: LEVEL_3 },
];

export const COORD_TRAINING: CoordItem[] = [...LEVEL_1, ...LEVEL_2, ...LEVEL_3];

/* ---------------- МАСТЕРСКАЯ: новые типы ---------------- */

export type WorkshopItem = {
  id: string;
  kind: "change-zone" | "change-meaning" | "odd-one" | "which-question";
  prompt: string;
  source?: string;
  options: string[];
  answer: string;
  why: string;
};

export const WORKSHOP: WorkshopItem[] = [
  { id: "crd-ws-1", kind: "change-zone", source: "At 8 yesterday, Tom was studying.  (PAST + PROCESS)", prompt: "Перенеси тот же процесс в FUTURE.", options: ["At 8 tomorrow, Tom will study.", "At 8 tomorrow, Tom will be studying.", "By 8 tomorrow, Tom will have studied."], answer: "At 8 tomorrow, Tom will be studying.", why: "Смысл PROCESS остался, поменялась только точка: was studying → will be studying." },
  { id: "crd-ws-2", kind: "change-zone", source: "I have been waiting for two hours.  (NOW + DURATION)", prompt: "Перенеси точку отсчёта в PAST.", options: ["I waited for two hours before Tom arrived.", "I was waiting for two hours before Tom arrived.", "I had been waiting for two hours before Tom arrived."], answer: "I had been waiting for two hours before Tom arrived.", why: "DURATION до точки остаётся, точка — приход Тома в прошлом: have been → had been." },
  { id: "crd-ws-3", kind: "change-zone", source: "Tom has finished.  (NOW + RESULT)", prompt: "Перенеси результат к будущей точке «by 8».", options: ["Tom will finish by 8.", "Tom will have finished by 8.", "Tom will be finishing by 8."], answer: "Tom will have finished by 8.", why: "RESULT к точке: has finished → will have finished." },
  { id: "crd-ws-4", kind: "change-meaning", source: "At 8, Tom will be writing.  (FUTURE + PROCESS)", prompt: "Поменяй фокус на RESULT к 8.", options: ["By 8, Tom will have written the report.", "By 8, Tom will be writing the report.", "By 8, Tom will write the report."], answer: "By 8, Tom will have written the report.", why: "Зона та же — FUTURE. Теперь важно, что будет готово: will have + V3." },
  { id: "crd-ws-5", kind: "change-meaning", source: "At 8, Tom will be writing.  (FUTURE + PROCESS)", prompt: "Поменяй фокус на DURATION к 8.", options: ["By 8, Tom will have written for three hours.", "By 8, Tom will have been writing for three hours.", "At 8, Tom will be writing for three hours."], answer: "By 8, Tom will have been writing for three hours.", why: "Как долго процесс идёт до 8 — will have been + V-ing." },
  { id: "crd-ws-6", kind: "change-meaning", source: "At 5 yesterday, Anna was reading.  (PAST + PROCESS)", prompt: "Поменяй фокус на RESULT к ужину.", options: ["By dinner, Anna had read three chapters.", "By dinner, Anna was reading three chapters.", "By dinner, Anna has read three chapters."], answer: "By dinner, Anna had read three chapters.", why: "PAST остаётся, важен результат к прошлой точке: had + V3." },
  { id: "crd-ws-7", kind: "odd-one", prompt: "Какое предложение построено вокруг ДРУГОГО смысла?", options: ["I am studying now.", "I was studying at 8 yesterday.", "I will be studying at 8 tomorrow.", "I have finished my homework."], answer: "I have finished my homework.", why: "Первые три — PROCESS в разных зонах. Последнее — RESULT." },
  { id: "crd-ws-8", kind: "odd-one", prompt: "Какое предложение построено вокруг ДРУГОГО смысла?", options: ["I had finished before Tom came.", "She has finished her essay.", "They will have finished by 6.", "We were playing at 6."], answer: "We were playing at 6.", why: "Три предложения — RESULT к точке. We were playing — PROCESS." },
  { id: "crd-ws-9", kind: "odd-one", prompt: "Какое предложение построено вокруг ДРУГОГО смысла?", options: ["She has been running for an hour.", "They had been waiting for ages.", "By 5, he will have been working for 8 hours.", "I played football yesterday."], answer: "I played football yesterday.", why: "Три — PROCESS + DURATION. Последнее — просто событие (Simple)." },
  { id: "crd-ws-10", kind: "which-question", source: "When Anna came in, Tom ___ (fix) his bike.", prompt: "Какой вопрос поможет выбрать время?", options: ["Что происходит обычно?", "Что происходило в тот момент?", "Что будет готово к моменту?", "Как долго процесс идёт до точки?"], answer: "Что происходило в тот момент?", why: "Анна вошла — момент в прошлом. Спрашиваем про процесс в этот момент → was fixing." },
  { id: "crd-ws-11", kind: "which-question", source: "By Monday, I ___ (read) the whole book.", prompt: "Какой вопрос поможет выбрать время?", options: ["Что будет готово к моменту?", "Что происходит в этот момент?", "Что произошло раньше?", "Как долго процесс идёт до точки?"], answer: "Что будет готово к моменту?", why: "the whole book — объём, результат к понедельнику → will have read." },
  { id: "crd-ws-12", kind: "which-question", source: "My legs hurt. I ___ (walk) for five hours!", prompt: "Какой вопрос поможет выбрать время?", options: ["Какой результат важен сейчас?", "Как долго процесс идёт до точки?", "Что происходит обычно?", "Что произошло раньше?"], answer: "Как долго процесс идёт до точки?", why: "for five hours до сейчас — длительность → have been walking." },
];

export const COORD_ALL_COUNT =
  WHERE_ITEMS.length + WHAT_ITEMS.length + COORD_TRAINING.length + WORKSHOP.length;
