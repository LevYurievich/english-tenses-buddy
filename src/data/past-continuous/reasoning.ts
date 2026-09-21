import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Past Continuous.
 * Цепочка: КОГДА? → процесс или факт? → Past Continuous → кто? →
 * WAS / WERE → V-ing → ответ.
 */
export const PAST_CONTINUOUS_REASONING: Record<string, Reasoning> = {
  "pc-be-1": {
    title: "Почему were?",
    chain: ["момент прошлого", "процесс", "Past Continuous", "they → were", "were watching"],
    steps: [
      { kind: "when", text: "At 8 p.m. — конкретный момент прошлого.", highlight: "at 8 p.m." },
      { kind: "what", text: "Мы смотрим внутрь момента: телевизор смотрели в процессе." },
      { kind: "who", text: "They → were." },
    ],
    result: "They were watching TV at 8 p.m.",
    remember: "WAS / WERE + ING = был в процессе.",
    wrongAnswers: [
      { answer: "was", text: "was идёт с I, he, she, it. С they нужен were." },
      { answer: "did", text: "DID — помощник Past Simple. В Past Continuous он не нужен." },
      { answer: "are", text: "are — настоящее время. Речь о вчерашнем вечере." },
    ],
  },
  "pc-be-2": {
    title: "Почему was?",
    steps: [
      { kind: "who", text: "Tom = he → was.", highlight: "Tom" },
      { kind: "form", text: "was + sleeping." },
    ],
    result: "Tom was sleeping at 9 p.m.",
    wrongAnswers: [{ answer: "were", text: "were идёт с you, we, they. Tom = he → was." }],
  },
  "pc-fb-1": {
    title: "Почему was doing?",
    chain: ["at 6 p.m.", "процесс", "Past Continuous", "Anna → was", "was doing"],
    steps: [
      { kind: "when", text: "At 6 p.m. — конкретный момент вчерашнего дня." },
      { kind: "what", text: "Домашняя работа была в процессе." },
      { kind: "who", text: "Anna = she → was." },
      { kind: "form", text: "do → doing." },
    ],
    result: "At 6 p.m. Anna was doing her homework.",
    remember: "WAS / WERE + V-ING.",
    wrongDefault: "Нужны обе части: помощник was и глагол с -ing → was doing.",
  },
  "pc-fb-4": {
    title: "Почему was running?",
    steps: [
      { kind: "who", text: "Tom = he → was." },
      { kind: "form", text: "run — короткое слово, согласная удваивается: running." },
    ],
    result: "At 7 a.m. Tom was running in the park.",
    remember: "run → running, sit → sitting.",
  },
  "pc-sb-3": {
    title: "Почему Was Anna reading?",
    steps: [
      { kind: "structure", text: "В вопросе WAS / WERE выходит вперёд." },
      { kind: "form", text: "Глагол остаётся с -ing: reading." },
    ],
    result: "Was Anna reading?",
    remember: "Помощник уже есть — DID не нужен.",
  },
  "pc-tr-1": {
    title: "Почему weren't playing?",
    steps: [
      { kind: "structure", text: "Отрицание: was / were + not + V-ing." },
      { kind: "form", text: "were + not = weren't, playing остаётся с -ing." },
    ],
    result: "They weren't playing football.",
    wrongDefault: "didn't play — это Past Simple. Здесь описывается процесс.",
  },
  "pc-tr-3": {
    title: "Почему Was Anna reading?",
    steps: [
      { kind: "structure", text: "Вопрос: Was / Were + кто + V-ing?" },
      { kind: "form", text: "Was Anna reading?" },
    ],
    result: "Was Anna reading?",
    remember: "WAS / WERE выходит вперёд.",
  },
  "pc-err-4": {
    title: "Почему Was, а не Did?",
    steps: [
      { kind: "structure", text: "В Past Continuous помощник — was / were." },
      { kind: "form", text: "Was she watching TV?" },
    ],
    result: "Was she watching TV?",
    remember: "DID нужен только Past Simple: Did she watch TV?",
  },
  "pc-ch-1": {
    title: "Почему was reading?",
    chain: ["at 9 p.m.", "момент", "процесс", "Past Continuous", "was reading"],
    steps: [
      { kind: "when", text: "At 9 p.m. yesterday — точка внутри прошлого." },
      { kind: "what", text: "Важно, что происходило в этот момент, а не итог." },
      { kind: "form", text: "I → was, read → reading." },
    ],
    result: "At 9 p.m. yesterday I was reading a book.",
    whyThisTense: {
      steps: [{ kind: "tense", text: "Мы заглядываем внутрь момента → процесс → Past Continuous." }],
    },
    alternatives: [
      { label: "Past Simple", text: "read сказало бы, что книга прочитана как факт." },
    ],
  },
  "pc-ch-2": {
    title: "Почему read?",
    steps: [
      { kind: "what", text: "Книга прочитана целиком — действие завершилось." },
      { kind: "tense", text: "Законченный факт → Past Simple." },
      { kind: "form", text: "read → read (V2 совпадает с V1 по написанию)." },
    ],
    result: "Yesterday I read the whole book.",
    alternatives: [
      { label: "Past Continuous", text: "was reading означало бы процесс без итога." },
    ],
  },
  "pc-ch-3": {
    title: "Почему started?",
    chain: ["процесс was walking", "событие", "Past Simple", "started"],
    steps: [
      { kind: "what", text: "Прогулка — длинный фон, дождь — короткое событие." },
      { kind: "tense", text: "Событие внутри процесса → Past Simple." },
    ],
    result: "I was walking home when it started to rain.",
    remember: "████ процесс + ● событие.",
  },
  "pc-ww-2": {
    title: "Почему rang?",
    steps: [
      { kind: "what", text: "Сон — процесс, звонок — момент." },
      { kind: "form", text: "ring → rang (V2)." },
    ],
    result: "I was sleeping when the phone rang.",
    remember: "when часто вводит событие, но решает смысл.",
  },
  "pc-sit-1": {
    title: "Почему was taking?",
    steps: [
      { kind: "when", text: "At 8 p.m. — конкретный момент." },
      { kind: "what", text: "Друг был в процессе — поэтому не ответил." },
      { kind: "form", text: "He → was, take → taking." },
    ],
    result: "He was taking a shower at 8 p.m.",
  },
  "pc-sit-2": {
    title: "Почему два was/were + ing?",
    steps: [
      { kind: "what", text: "Два действия шли одновременно." },
      { kind: "structure", text: "Оба — процессы: was cooking ↔ was watching." },
    ],
    result: "Mum was cooking dinner while Dad was watching TV.",
    remember: "PROCESS ↔ PROCESS.",
  },
  "pct-11": {
    title: "Почему arrived?",
    steps: [
      { kind: "what", text: "Ужин — фон, приход гостей — событие." },
      { kind: "tense", text: "Событие → Past Simple: arrived." },
    ],
    result: "We were having dinner when our guests arrived.",
  },
  "pct-15": {
    title: "Почему was watching, came?",
    steps: [
      { kind: "what", text: "Телевизор — процесс, приход мамы — событие." },
      { kind: "form", text: "was watching (процесс) + came (V2, событие)." },
    ],
    result: "I was watching TV when Mum came in.",
  },
};
