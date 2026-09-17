import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Present Simple.
 * Ключ — id упражнения. Новые блоки добавляются сюда, компоненты менять не нужно.
 */
export const PRESENT_SIMPLE_REASONING: Record<string, Reasoning> = {
  "ps-mc-1": {
    title: "Почему plays?",
    chain: ["every Sunday", "регулярно", "Present Simple", "he + V1+s", "plays"],
    steps: [
      { kind: "when", text: "Every Sunday = каждое воскресенье. Это регулярное действие.", highlight: "every Sunday" },
      { kind: "tense", text: "Для регулярных действий нужен Present Simple." },
      { kind: "who", text: "Tom = he." },
      { kind: "form", text: "После he / she / it к глаголу добавляем -s / -es: play → plays." },
    ],
    result: "Tom plays football every Sunday.",
    wrongAnswers: [
      { answer: "play", text: "play — форма для I / you / we / they. Tom = he, поэтому нужна -s." },
      { answer: "is playing", text: "is playing — Present Continuous, действие прямо сейчас. А тут «каждое воскресенье»." },
      { answer: "played", text: "played — прошедшее время. Every Sunday говорит о настоящем, о привычке." },
    ],
  },
  "ps-mc-2": {
    title: "Почему play?",
    chain: ["every weekend", "регулярно", "Present Simple", "they + V1", "play"],
    steps: [
      { kind: "when", text: "Every weekend = каждые выходные, регулярное действие.", highlight: "every weekend" },
      { kind: "who", text: "My friends = they." },
      { kind: "form", text: "После I / you / we / they глагол стоит в начальной форме V1, без -s." },
    ],
    result: "My friends play computer games every weekend.",
    wrongDefault: "Окончание -s нужно только для he / she / it. My friends = they → play.",
  },
  "ps-mc-3": {
    title: "Почему doesn't drink?",
    chain: ["she", "отрицание", "Present Simple", "doesn't + V1", "doesn't drink"],
    steps: [
      { kind: "what", text: "Нужно отрицание: она не пьёт кофе вечером." },
      { kind: "who", text: "She → помощник does." },
      { kind: "structure", text: "Схема отрицания: подлежащее + doesn't + V1." },
      { kind: "form", text: "DOES уже показывает третье лицо, поэтому глагол возвращается в V1: drink." },
    ],
    result: "She doesn't drink coffee in the evening.",
    remember: "DOES забирает S себе.",
    wrongAnswers: [
      { answer: "don't drink", text: "don't — для I / you / we / they. She → doesn't." },
      { answer: "doesn't drinks", text: "После doesn't глагол без -s: doesn't drink." },
      { answer: "not drink", text: "В Present Simple нельзя просто добавить not — нужен помощник do / does." },
    ],
  },
  "ps-fb-1": {
    title: "Почему watches?",
    chain: ["every evening", "регулярно", "Present Simple", "she + V1+es", "watches"],
    steps: [
      { kind: "when", text: "Every evening = каждый вечер → привычка.", highlight: "every evening" },
      { kind: "who", text: "My sister = she." },
      { kind: "form", text: "После she нужна -s. Глагол на -ch получает -es: watch → watches." },
    ],
    result: "My sister watches TV every evening.",
    wrongDefault: "Проверь окончание: после -ch, -sh, -x, -s, -o добавляем -es, а не просто -s.",
  },
  "ps-fb-2": {
    title: "Почему go?",
    chain: ["on Mondays", "регулярно", "Present Simple", "we + V1", "go"],
    steps: [
      { kind: "when", text: "On Mondays = по понедельникам, регулярное действие.", highlight: "on Mondays" },
      { kind: "who", text: "We — не he / she / it." },
      { kind: "form", text: "Значит глагол остаётся в V1: go." },
    ],
    result: "We go to the park on Mondays.",
    wrongDefault: "goes — форма для he / she / it. С we нужна начальная форма go.",
  },
  "ps-fb-3": {
    title: "Почему studies?",
    chain: ["twice a week", "регулярно", "Present Simple", "he + V1+ies", "studies"],
    steps: [
      { kind: "when", text: "Twice a week = дважды в неделю → регулярно.", highlight: "twice a week" },
      { kind: "who", text: "My dad = he → нужна форма с -s." },
      { kind: "form", text: "Согласная + y: y меняется на i и добавляем -es: study → studies." },
    ],
    result: "My dad studies Spanish twice a week.",
    wrongDefault: "«studys» не бывает: после согласной y превращается в i → studies.",
  },
  "ps-neg-1": {
    title: "Почему doesn't like?",
    chain: ["he", "отрицание", "Present Simple", "doesn't + V1", "doesn't like"],
    steps: [
      { kind: "what", text: "Превращаем утверждение в отрицание." },
      { kind: "who", text: "He → помощник does." },
      { kind: "form", text: "Появился doesn't → смысловой глагол теряет -s и возвращается в V1: like." },
    ],
    result: "He doesn't like milk.",
    remember: "DOES забирает S себе.",
    wrongDefault: "Частая ошибка — «doesn't likes». Окончание -s уже внутри does.",
  },
  "ps-neg-2": {
    title: "Почему don't live?",
    chain: ["they", "отрицание", "Present Simple", "don't + V1", "don't live"],
    steps: [
      { kind: "who", text: "They — не третье лицо, значит помощник don't." },
      { kind: "structure", text: "Схема: подлежащее + don't + V1 + остальное." },
    ],
    result: "They don't live in London.",
    wrongDefault: "doesn't — только для he / she / it. They → don't.",
  },
  "ps-q-1": {
    title: "Почему Do they live...?",
    chain: ["they", "вопрос", "Present Simple", "Do + подлежащее + V1", "Do they live?"],
    steps: [
      { kind: "what", text: "Нужен общий вопрос — ответ да / нет." },
      { kind: "who", text: "They → помощник Do." },
      { kind: "structure", text: "Do + подлежащее + V1 + остальное?" },
    ],
    result: "Do they live in London?",
    wrongDefault: "В английском вопросе помощник Do / Does стоит на первом месте, одной интонации мало.",
  },
  "ps-q-2": {
    title: "Почему Does Mary like...?",
    chain: ["Mary = she", "вопрос", "Present Simple", "Does + V1", "Does Mary like?"],
    steps: [
      { kind: "who", text: "Mary = she → помощник Does." },
      { kind: "structure", text: "Does + подлежащее + V1 + остальное?" },
      { kind: "form", text: "Does уже выполняет грамматическую работу, поэтому глагол в начальной форме: like." },
    ],
    result: "Does Mary like cats?",
    remember: "DOES забирает S себе.",
    wrongDefault: "«Does Mary likes cats?» — лишняя -s. Она уже есть в does.",
  },
  "ps-err-1": {
    title: "Почему ошибка в слове likes?",
    chain: ["Does в начале", "вопрос", "Present Simple", "Does + V1", "like"],
    steps: [
      { kind: "what", text: "В предложении уже есть Does — значит это вопрос для he / she / it.", highlight: "Does" },
      { kind: "form", text: "После Does смысловой глагол используется в начальной форме V1." },
    ],
    result: "Does Mary like cats?",
    remember: "DOES забирает S себе.",
    wrongDefault: "Ошибка именно в глаголе: likes → like. Слова Does и Mary стоят правильно.",
  },
  "ps-err-2": {
    title: "Почему ошибка в слове don't?",
    chain: ["He", "отрицание", "Present Simple", "doesn't + V1", "doesn't play"],
    steps: [
      { kind: "who", text: "He — третье лицо единственного числа." },
      { kind: "structure", text: "Для he / she / it помощник — does, в отрицании doesn't." },
    ],
    result: "He doesn't play tennis.",
    wrongDefault: "Глагол play стоит правильно (V1). Ошибка в помощнике: don't → doesn't.",
  },
  "ps-err-3": {
    title: "Почему ошибка в слове go?",
    chain: ["every day", "регулярно", "Present Simple", "he + V1+es", "goes"],
    steps: [
      { kind: "when", text: "Every day = каждый день → Present Simple.", highlight: "every day" },
      { kind: "who", text: "My brother = he." },
      { kind: "form", text: "Глагол go после he получает -es: goes." },
    ],
    result: "My brother goes to school every day.",
    wrongDefault: "Ошибка в глаголе: go → goes. Остальные слова на своих местах.",
  },
  "ps-build-1": {
    title: "Почему такой порядок слов?",
    chain: ["кто", "что делает", "куда", "когда", "готово"],
    steps: [
      { kind: "who", text: "Сначала подлежащее: Anna." },
      { kind: "form", text: "Anna = she → goes." },
      { kind: "structure", text: "Потом дополнение и место: to school. Время — в конце: every day." },
    ],
    result: "Anna goes to school every day.",
    wrongDefault: "В английском порядок слов строгий: кто → что делает → что / куда → когда.",
  },
  "ps-build-2": {
    title: "Почему usually перед have?",
    chain: ["usually", "частотность", "Present Simple", "перед глаголом", "We usually have"],
    steps: [
      { kind: "when", text: "Usually = обычно, наречие частотности.", highlight: "usually" },
      { kind: "structure", text: "Такие наречия (always, usually, often) стоят перед смысловым глаголом." },
      { kind: "form", text: "We → глагол в V1: have. Время «at 8» — в конце." },
    ],
    result: "We usually have breakfast at 8.",
    wrongDefault: "Наречие частотности не ставят в конец: правильно We usually have breakfast at 8.",
  },
  "ps-constructor-1": {
    title: "Почему Does she play...?",
    chain: ["вопрос", "she", "Present Simple", "Does + V1", "Does she play?"],
    steps: [
      { kind: "what", text: "Нужен общий вопрос." },
      { kind: "who", text: "She → помощник Does на первом месте." },
      { kind: "structure", text: "Does + подлежащее + V1 + дополнение?" },
    ],
    result: "Does she play tennis?",
    remember: "DOES забирает S себе.",
    wrongDefault: "Проверь порядок: помощник Does идёт первым, глагол — без -s.",
  },
  "ps-constructor-2": {
    title: "Почему He doesn't like...?",
    chain: ["отрицание", "he", "Present Simple", "doesn't + V1", "He doesn't like milk."],
    steps: [
      { kind: "who", text: "He → помощник does." },
      { kind: "structure", text: "Схема отрицания: подлежащее + doesn't + V1 + дополнение." },
    ],
    result: "He doesn't like milk.",
    wrongDefault: "Сначала подлежащее, потом doesn't, затем глагол в V1.",
  },
  "ps-tr-1": {
    title: "Почему My sister reads...?",
    chain: ["каждый день", "регулярно", "Present Simple", "she + V1+s", "reads"],
    steps: [
      { kind: "when", text: "«Каждый день» = every day → регулярное действие.", highlight: "every day" },
      { kind: "who", text: "Моя сестра = my sister = she." },
      { kind: "form", text: "После she глагол с -s: reads. Время обычно ставим в конец." },
    ],
    result: "My sister reads books every day.",
    wrongDefault: "Проверь две вещи: форму глагола (reads) и место «every day» — в конце предложения.",
  },
  "ps-tr-2": {
    title: "Почему He doesn't play football?",
    chain: ["отрицание", "he", "Present Simple", "doesn't + V1", "He doesn't play football."],
    steps: [
      { kind: "what", text: "«Не играет» — это отрицание." },
      { kind: "who", text: "Он = he → помощник does." },
      { kind: "form", text: "После doesn't глагол в V1: play." },
    ],
    result: "He doesn't play football.",
    wrongDefault: "В английском отрицании нужен помощник: He doesn't play, а не He not play.",
  },

  // --- мини-тест ---
  "ps-test-1": {
    title: "Почему listens?",
    chain: ["in the morning", "привычка", "Present Simple", "she + V1+s", "listens"],
    steps: [
      { kind: "when", text: "In the morning = по утрам, привычное действие.", highlight: "in the morning" },
      { kind: "who", text: "Kate = she." },
      { kind: "form", text: "После she добавляем -s: listens." },
    ],
    result: "Kate listens to music in the morning.",
    wrongDefault: "Kate = she, поэтому нужна форма с -s: listens.",
  },
  "ps-test-2": {
    title: "Почему fixes?",
    chain: ["at the weekend", "регулярно", "Present Simple", "he + V1+es", "fixes"],
    steps: [
      { kind: "who", text: "He → нужна форма с окончанием." },
      { kind: "form", text: "Глаголы на -x получают -es: fix → fixes." },
    ],
    result: "He fixes bikes at the weekend.",
    wrongDefault: "После -x пишем -es: fixes, а не fixs.",
  },
  "ps-test-3": {
    title: "Почему doesn't work?",
    chain: ["she", "отрицание", "Present Simple", "doesn't + V1", "doesn't work"],
    steps: [
      { kind: "who", text: "She → помощник does." },
      { kind: "form", text: "После doesn't глагол теряет -s: work." },
    ],
    result: "She doesn't work on Saturdays.",
    remember: "DOES забирает S себе.",
    wrongDefault: "«doesn't works» — лишняя -s. Она уже внутри does.",
  },
  "ps-test-4": {
    title: "Почему Do you speak...?",
    chain: ["you", "вопрос", "Present Simple", "Do + V1", "Do you speak French?"],
    steps: [
      { kind: "who", text: "You → помощник Do." },
      { kind: "structure", text: "Do + подлежащее + V1 + остальное?" },
    ],
    result: "Do you speak French?",
    wrongDefault: "Вопрос начинается с помощника Do, а глагол остаётся в V1.",
  },
  "ps-test-5": {
    title: "Почему ошибка в слове plays?",
    chain: ["Does в начале", "вопрос", "Present Simple", "Does + V1", "play"],
    steps: [
      { kind: "what", text: "Предложение начинается с Does → это вопрос.", highlight: "Does" },
      { kind: "form", text: "После Does смысловой глагол в начальной форме: play." },
    ],
    result: "Does your brother play chess?",
    remember: "DOES забирает S себе.",
    wrongDefault: "Ошибка в глаголе plays: после Does нужна форма play.",
  },
  "ps-test-6": {
    title: "Почему My mum often bakes?",
    chain: ["often", "частотность", "Present Simple", "перед глаголом", "often bakes"],
    steps: [
      { kind: "when", text: "Often = часто, наречие частотности.", highlight: "often" },
      { kind: "structure", text: "Оно стоит перед смысловым глаголом." },
      { kind: "form", text: "My mum = she → bakes." },
    ],
    result: "My mum often bakes cakes.",
    wrongDefault: "Наречие often ставим между подлежащим и глаголом.",
  },
  "ps-test-7": {
    title: "Почему don't watch?",
    chain: ["they", "отрицание", "Present Simple", "don't + V1", "don't watch"],
    steps: [
      { kind: "who", text: "My parents = they." },
      { kind: "structure", text: "Для they помощник don't, глагол в V1." },
    ],
    result: "My parents don't watch TV in the morning.",
    wrongDefault: "doesn't — только для одного человека (he / she / it). Тут they → don't.",
  },
  "ps-test-8": {
    title: "Почему leaves?",
    chain: ["расписание", "регулярно", "Present Simple", "it + V1+s", "leaves"],
    steps: [
      { kind: "when", text: "Every morning и расписание поезда → постоянное, регулярное действие.", highlight: "every morning" },
      { kind: "who", text: "The train = it." },
      { kind: "form", text: "После it добавляем -s: leaves." },
    ],
    result: "The train leaves at seven every morning.",
    wrongDefault: "Расписания всегда в Present Simple, а the train = it → leaves.",
  },
  "ps-test-9": {
    title: "Почему Do you play chess?",
    chain: ["вопрос", "you", "Present Simple", "Do + V1", "Do you play chess?"],
    steps: [
      { kind: "what", text: "«Ты играешь?» — общий вопрос." },
      { kind: "who", text: "Ты = you → помощник Do." },
      { kind: "structure", text: "Do + you + V1 + дополнение?" },
    ],
    result: "Do you play chess?",
    wrongDefault: "Без помощника Do вопроса не получится: You play chess? — так не говорят в упражнениях.",
  },
  "ps-test-10": {
    title: "Почему Does he live...?",
    chain: ["вопрос", "he", "Present Simple", "Does + V1", "Does he live in Moscow?"],
    steps: [
      { kind: "who", text: "Он = he → помощник Does." },
      { kind: "structure", text: "Does + подлежащее + V1 + место?" },
      { kind: "form", text: "Глагол без -s: live." },
    ],
    result: "Does he live in Moscow?",
    remember: "DOES забирает S себе.",
    wrongDefault: "Порядок: Does → he → live → in Moscow?",
  },
};
