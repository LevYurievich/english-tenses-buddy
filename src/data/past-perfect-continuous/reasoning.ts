import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Past Perfect Continuous.
 * Цепочка: точка отсчёта в прошлом → что шло до неё → процесс и длительность →
 * Past Perfect Continuous → HAD → BEEN → V-ING → FOR / SINCE → ответ.
 */
export const PAST_PERFECT_CONTINUOUS_REASONING: Record<string, Reasoning> = {
  "pfc-pt-1": {
    title: "Почему точка — приход мамы?",
    chain: ["процесс: sleeping", "точка прошлого: mother called", "процесс шёл ДО точки"],
    steps: [
      { kind: "when", text: "Ищем момент прошлого, до которого длился процесс.", highlight: "his mother called" },
      { kind: "what", text: "Том спал уже два часа, а потом позвонила мама." },
    ],
    result: "SLEEPING ████████ ● MOTHER CALLED",
    remember: "Точка отсчёта — это короткое событие прошлого, а не сам процесс.",
    wrongDefault: "Точка отсчёта — это момент прошлого, до которого длился процесс.",
  },
  "pfc-ch-1": {
    title: "Почему had been studying?",
    chain: ["точка: Anna arrived", "процесс до неё", "длительность 2 часа", "HAD + BEEN + V-ING"],
    steps: [
      { kind: "when", text: "Anna arrived — момент прошлого.", highlight: "arrived" },
      { kind: "what", text: "До него Том уже два часа занимался — это процесс с длительностью." },
      { kind: "tense", text: "Процесс до момента прошлого → Past Perfect Continuous." },
      { kind: "structure", text: "HAD → BEEN → V-ING." },
    ],
    result: "had been studying",
    remember: "HAD BEEN + ING = процесс шёл до того момента.",
    wrongAnswers: [
      { answer: "was studying", text: "was studying — процесс В тот момент, а нам важна длительность ДО него." },
      { answer: "had studied", text: "had studied — результат до прошлого, а здесь важно «два часа»." },
      { answer: "studied", text: "studied — просто событие прошлого, без связи с моментом прихода Анны." },
    ],
  },
  "pfc-fb-1": {
    title: "Почему had been working?",
    chain: ["Tom was tired — результат в прошлом", "причина — долгий процесс", "HAD BEEN + ING"],
    steps: [
      { kind: "when", text: "Tom was tired — состояние в прошлом." },
      { kind: "what", text: "До этого шёл длительный процесс: work all day." },
      { kind: "form", text: "work → working, значит had been working." },
    ],
    result: "had been working",
    remember: "Процесс мог закончиться, но результат виден в прошлом.",
    wrongDefault: "Нужны все три части: HAD + BEEN + V-ING.",
  },
  "pfc-sb-1": {
    title: "Почему такой порядок?",
    steps: [
      { kind: "structure", text: "Subject + had + been + V-ing + длительность." },
      { kind: "form", text: "wait → waiting." },
    ],
    result: "Tom had been waiting for an hour.",
    remember: "BEEN и V-ING всегда идут вместе.",
  },
  "pfc-tr-2": {
    title: "Почему Had Tom been waiting...?",
    steps: [
      { kind: "structure", text: "В вопросе HAD выходит вперёд, BEEN + V-ING остаются вместе." },
    ],
    result: "Had Tom been waiting for an hour?",
    remember: "Had + кто + been + V-ing ?",
    wrongDefault: "DID здесь не нужен: помощник уже есть — HAD.",
  },
  "pfc-pp-1": {
    title: "Почему had written, а не had been writing?",
    chain: ["five emails — количество", "фокус на результате", "Past Perfect"],
    steps: [
      { kind: "what", text: "Важно, сколько сделано: пять писем готовы." },
      { kind: "tense", text: "Фокус на результате → Past Perfect: had written." },
    ],
    result: "Tom had written five emails before lunch.",
    remember: "СКОЛЬКО СДЕЛАНО → результат. КАК ДОЛГО ДЕЛАЛ → процесс.",
    whyThisTense: {
      title: "Почему не Past Perfect Continuous?",
      steps: [
        { kind: "what", text: "had been writing показало бы длительность, а не количество писем." },
      ],
    },
  },
  "pfc-sit-1": {
    title: "Почему had been waiting?",
    chain: ["8:30 начало", "30 минут процесса", "9:00 автобус приехал"],
    steps: [
      { kind: "when", text: "Автобус приехал в 9:00 — это точка прошлого." },
      { kind: "what", text: "До неё ты ждал 30 минут — процесс с длительностью." },
      { kind: "structure", text: "HAD + BEEN + waiting." },
    ],
    result: "8:30 ●════════ 30 MINUTES ════════● 9:00 BUS ARRIVED",
    remember: "Есть точка прошлого + процесс до неё → Past Perfect Continuous.",
  },
  "pfc-err-1": {
    title: "Почему ошибка в had?",
    steps: [{ kind: "structure", text: "Пропущено BEEN: had studying — так нельзя." }],
    result: "I had been studying for two hours.",
    remember: "HAD → BEEN → ING. Все три части обязательны.",
  },
};
