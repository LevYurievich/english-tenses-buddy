import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Future Continuous.
 * Цепочка: КОГДА? → будущее → есть ли конкретный момент? → ДА →
 * событие или ПРОЦЕСС в этот момент? → ПРОЦЕСС → WILL → BE → V-ING → ответ.
 */
export const FUTURE_CONTINUOUS_REASONING: Record<string, Reasoning> = {
  "fc-form-1": {
    title: "Почему will be sleeping?",
    chain: ["9 tomorrow", "момент будущего", "процесс", "WILL", "BE", "V-ING", "will be sleeping"],
    steps: [
      { kind: "when", text: "Действие относится к будущему: 9 tomorrow.", highlight: "at 9 tomorrow" },
      { kind: "what", text: "Есть конкретный момент, и нас интересует, что будет происходить в нём." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
      { kind: "structure", text: "WILL → BE → ING. BE нельзя потерять." },
      { kind: "form", text: "sleep → sleeping.", highlight: "sleeping" },
    ],
    result: "At 9 tomorrow, Tom will be sleeping.",
    remember: "WILL → BE → ING",
    wrongAnswers: [
      { answer: "will sleeping", text: "Пропущено be: will be sleeping." },
      { answer: "will be sleep", text: "После be нужна форма -ing: sleeping." },
      { answer: "will sleep", text: "Future Simple сообщает о событии. Здесь важен процесс в 9 часов." },
    ],
  },
  "fc-form-2": {
    title: "Почему will be taking?",
    steps: [
      { kind: "when", text: "10 tomorrow morning — точка в будущем.", highlight: "at 10 tomorrow morning" },
      { kind: "what", text: "Вокруг этой точки идёт процесс: экзамен." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
      { kind: "form", text: "take → taking (немая e уходит)." },
    ],
    result: "At 10 tomorrow morning, Tom will be taking an exam.",
    remember: "Точка будущего + процесс вокруг неё.",
  },
  "fc-form-4": {
    title: "Почему will be running?",
    steps: [
      { kind: "when", text: "At this time next week — момент будущего." },
      { kind: "tense", text: "Смотрим, что будет в процессе → Future Continuous." },
      { kind: "form", text: "run → running: согласная удваивается." },
    ],
    result: "At this time next week, I will be running a marathon.",
    remember: "run → running, make → making, lie → lying.",
    wrongDefault: "Проверь написание -ing и не потеряй be.",
  },
  "fc-choice-1": {
    title: "Почему will be flying?",
    chain: ["this time tomorrow", "момент", "процесс", "will be flying"],
    steps: [
      { kind: "when", text: "This time tomorrow задаёт конкретный момент будущего." },
      { kind: "what", text: "Мы смотрим на процесс полёта в этот момент." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
      { kind: "form", text: "will + be + flying." },
    ],
    result: "This time tomorrow, we will be flying to Spain.",
    wrongAnswers: [
      { answer: "will fly", text: "Это сообщение о событии, а здесь важен процесс в конкретный момент." },
      { answer: "will have flown", text: "Это другая конструкция: действие завершено к моменту." },
      { answer: "are fly", text: "Такой формы не существует." },
    ],
    alternatives: [
      { label: "Future Simple", text: "Подошло бы, если бы мы просто сообщали о поездке: We'll fly to Spain tomorrow." },
    ],
  },
  "fc-choice-3": {
    title: "Почему will be driving?",
    steps: [
      { kind: "when", text: "Назван момент: at 9.", highlight: "at 9" },
      { kind: "what", text: "Человек ожидает быть в процессе поездки домой." },
      { kind: "tense", text: "Ожидаемый ход событий вокруг момента → Future Continuous." },
      { kind: "form", text: "drive → driving." },
    ],
    result: "Don't call me at 9. I'll be driving home.",
    remember: "Процесс в момент будущего, а не длина действия.",
  },
  "fc-q-1": {
    title: "Почему Will Tom be studying?",
    steps: [
      { kind: "structure", text: "В вопросе WILL выходит вперёд.", highlight: "Will" },
      { kind: "form", text: "BE + V-ING остаются вместе и не меняются." },
    ],
    result: "Will Tom be studying at 8?",
    remember: "Will + кто + be + V-ing ?",
    wrongDefault: "Порядок: Will + подлежащее + be + V-ing.",
  },
  "fc-q-3": {
    title: "Почему What will you be doing?",
    steps: [
      { kind: "structure", text: "Question word + will + subject + be + V-ing ?" },
      { kind: "form", text: "be нельзя пропустить: be doing." },
    ],
    result: "What will you be doing at 8 tomorrow?",
  },
  "fc-neg-1": {
    title: "Почему won't be working?",
    steps: [
      { kind: "structure", text: "Отрицание: subject + will not + be + V-ing." },
      { kind: "form", text: "will not сокращается в won't, be остаётся на месте." },
    ],
    result: "I won't be working tomorrow morning.",
    remember: "won't be + V-ing. Полная форма will not be тоже правильна.",
  },
  "fc-neg-3": {
    title: "Почему won't be running?",
    steps: [{ kind: "form", text: "not прячется внутри won't, а be + V-ing не распадаются." }],
    result: "At 5 tomorrow, they won't be running in the park.",
    wrongAnswers: [
      { answer: "will be not running", text: "not не ставится после be в этой конструкции." },
      { answer: "won't running", text: "Потерян be: won't be running." },
    ],
  },
  "fc-tl-2": {
    title: "Почему will be watching?",
    chain: ["фильм 7:30–9:30", "смотрим на 8:00", "процесс", "will be watching"],
    steps: [
      { kind: "when", text: "Фильм начинается в 7:30 и заканчивается в 9:30." },
      { kind: "what", text: "В 8:00 действие уже идёт — оно в процессе.", highlight: "at 8 p.m." },
      { kind: "tense", text: "Процесс вокруг момента → Future Continuous." },
    ],
    result: "At 8 p.m., I will be watching a film.",
    remember: "Действие не обязано начинаться точно в указанное время.",
  },
  "fc-vs-1": {
    title: "Почему will answer, а не will be answering?",
    steps: [
      { kind: "when", text: "Телефон звонит сейчас, ответ будет в ближайший момент." },
      { kind: "what", text: "Это решение, принятое в момент речи, — событие." },
      { kind: "tense", text: "Событие / решение → Future Simple." },
    ],
    result: "The phone is ringing. I'll answer it.",
    whyThisTense: {
      title: "Почему не Future Continuous?",
      steps: [
        { kind: "tense", text: "Нет конкретного будущего момента, в который мы заглядываем." },
      ],
    },
    alternatives: [
      { label: "Future Continuous", text: "Понадобился бы, если бы был момент: At 8 I'll be talking to Tom." },
    ],
  },
  "fc-vs-2": {
    title: "Почему will be having?",
    steps: [
      { kind: "when", text: "Назван момент: at 7." },
      { kind: "what", text: "В 7 часов ужин будет идти." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
    ],
    result: "Don't call me at 7. I'll be having dinner.",
    alternatives: [
      { label: "Future Simple", text: "I'll have dinner at 7 звучало бы как сообщение о событии, а не взгляд на процесс." },
    ],
  },
  "fc-vs-3": {
    title: "Почему will play?",
    steps: [
      { kind: "what", text: "I think показывает прогноз.", highlight: "I think" },
      { kind: "tense", text: "Прогноз о будущем → Future Simple." },
    ],
    result: "I think Tom will play well tomorrow.",
    remember: "Дело не в длине действия, а в фокусе: событие или процесс в момент.",
  },
  "fc-vs-4": {
    title: "Почему will be playing?",
    steps: [
      { kind: "when", text: "At 3 tomorrow — конкретная точка будущего." },
      { kind: "what", text: "Матч уже идёт в этот момент." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
    ],
    result: "At 3 tomorrow, Tom will be playing in the final.",
  },
  "fc-err-1": {
    title: "Где ошибка?",
    steps: [
      { kind: "structure", text: "Между will и watching пропущен be." },
      { kind: "form", text: "Формула: WILL + BE + V-ING." },
    ],
    result: "At 8, I will be watching TV.",
    remember: "BE нельзя потерять.",
  },
  "fc-err-3": {
    title: "Где ошибка?",
    steps: [
      { kind: "form", text: "После will не бывает is / am / are — только базовая форма be." },
    ],
    result: "Tom will be studying at 8.",
    remember: "Present → am/is/are, Past → was/were, Future → will be.",
  },
  "fc-tr-2": {
    title: "Почему I'll be driving home?",
    steps: [
      { kind: "when", text: "Назван момент: в 9." },
      { kind: "tense", text: "В этот момент поездка будет в процессе → Future Continuous." },
      { kind: "form", text: "drive → driving." },
    ],
    result: "Don't call me at 9. I'll be driving home.",
  },
  "fcl-1": {
    title: "Почему will be having dinner?",
    steps: [
      { kind: "when", text: "Ужин идёт с 7:00 до 8:00, смотрим на 7:30." },
      { kind: "what", text: "В 7:30 ужин в процессе." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
    ],
    result: "He will be having dinner.",
  },
  "fcl-5": {
    title: "Что увидит камера?",
    chain: ["камера на 8 p.m.", "занятие идёт 7–9", "процесс", "will be studying"],
    steps: [
      { kind: "when", text: "Ставим камеру на 8 вечера." },
      { kind: "what", text: "Занятие началось в 7 и закончится в 9 — в 8 оно идёт." },
      { kind: "tense", text: "Процесс в момент будущего → Future Continuous." },
    ],
    result: "Tom will be studying.",
  },
  "fcf-3": {
    title: "Почему will be playing?",
    steps: [
      { kind: "when", text: "At 5 tomorrow — момент будущего." },
      { kind: "tense", text: "CONTINUOUS = процесс. Меняется только время." },
      { kind: "form", text: "Future: will be + V-ing." },
    ],
    result: "At 5 tomorrow, Tom will be playing football.",
    remember: "NOW → am/is/are + ING · THEN → was/were + ING · FUTURE → will be + ING",
  },
  "fcf-9": {
    title: "Почему will be cleaning?",
    steps: [
      { kind: "when", text: "At 7 tomorrow evening — момент будущего." },
      { kind: "tense", text: "Идея «процесс» остаётся, меняется время." },
    ],
    result: "At 7 tomorrow evening, Anna will be cleaning her room.",
  },
};
