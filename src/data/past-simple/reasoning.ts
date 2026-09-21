import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Past Simple.
 * Цепочка: КОГДА? → закончилось ли? → Past Simple → утверждение/вопрос/отрицание →
 * V2 или DID + V1 → правильная форма.
 */
export const PAST_SIMPLE_REASONING: Record<string, Reasoning> = {
  "pst-v2-1": {
    title: "Почему went?",
    chain: ["Past Simple", "утверждение", "V2", "went"],
    steps: [
      { kind: "tense", text: "Past Simple в утверждении берёт вторую форму глагола." },
      { kind: "form", text: "go → went → gone. V2 — это went.", highlight: "went" },
    ],
    result: "go → went → gone",
    remember: "Past Simple → смотри V2.",
    wrongAnswers: [
      { answer: "gone", text: "gone — это V3. Она нужна для Present Perfect: I have gone." },
      { answer: "going", text: "going — это форма с -ing, она нужна для Continuous." },
      { answer: "go", text: "go — это V1. Она нужна после DID или DIDN'T." },
    ],
  },
  "pst-v2-2": {
    title: "Почему saw?",
    steps: [
      { kind: "tense", text: "Утверждение в Past Simple → V2." },
      { kind: "form", text: "see → saw → seen. Вторая форма — saw.", highlight: "saw" },
    ],
    result: "see → saw → seen",
    remember: "V2 — Past Simple, V3 — Present Perfect.",
    wrongAnswers: [{ answer: "seen", text: "seen — V3: I have seen. Для Past Simple нужна saw." }],
  },
  "pst-fb-1": {
    title: "Почему saw?",
    chain: ["yesterday", "закончилось", "Past Simple", "V2", "saw"],
    steps: [
      { kind: "when", text: "Слово yesterday говорит о вчерашнем дне.", highlight: "yesterday" },
      { kind: "what", text: "Действие произошло и закончилось." },
      { kind: "tense", text: "Значит, нужен Past Simple." },
      { kind: "structure", text: "Это утверждение → Subject + V2." },
      { kind: "form", text: "see → saw.", highlight: "saw" },
    ],
    result: "Yesterday I saw Anna.",
    remember: "Утверждение в прошлом → V2.",
    wrongDefault: "Здесь нужна вторая форма глагола: see → saw.",
  },
  "pst-fb-2": {
    title: "Почему studied?",
    steps: [
      { kind: "when", text: "last year — законченный период в прошлом.", highlight: "last year" },
      { kind: "tense", text: "Past Simple, утверждение → V2." },
      { kind: "form", text: "study — правильный глагол, согласная + y → studied." },
    ],
    result: "She studied French last year.",
    remember: "Согласная + y → -ied.",
  },
  "pst-fb-3": {
    title: "Почему stopped?",
    steps: [
      { kind: "tense", text: "Законченное действие в прошлом → Past Simple." },
      { kind: "form", text: "В коротком слове последняя согласная удваивается: stop → stopped." },
    ],
    result: "We stopped near the old bridge.",
  },
  "pst-did-1": {
    title: "Почему go?",
    chain: ["вопрос", "DID", "V1", "go"],
    steps: [
      { kind: "structure", text: "Это вопрос: Did + подлежащее + V1.", highlight: "Did" },
      { kind: "when", text: "DID уже показывает прошлое." },
      { kind: "form", text: "Поэтому смысловой глагол возвращается в V1: go." },
    ],
    result: "Did Tom go to school yesterday?",
    remember: "DID ЗАБИРАЕТ ПРОШЛОЕ СЕБЕ.",
    wrongAnswers: [
      { answer: "went", text: "После DID нельзя ставить V2: Did Tom went — ошибка." },
      { answer: "gone", text: "gone — V3, она работает только с have / has." },
    ],
  },
  "pst-did-3": {
    title: "Почему buy?",
    steps: [
      { kind: "structure", text: "Question word + DID + subject + V1." },
      { kind: "form", text: "Прошлое уже показал did, поэтому buy остаётся в V1." },
    ],
    result: "Where did she buy the tickets?",
    remember: "DID → V1.",
  },
  "pst-q-1": {
    title: "Почему Did Tom play?",
    chain: ["утверждение played", "вопрос", "DID + V1", "play"],
    steps: [
      { kind: "structure", text: "Вопрос в Past Simple: Did + подлежащее + V1 ?" },
      { kind: "form", text: "played → play, потому что DID уже показал прошлое." },
    ],
    result: "Did Tom play football?",
    remember: "Did Tom played — так нельзя.",
    wrongDefault: "Не забудь вернуть глагол в V1: Did Tom play football?",
  },
  "pst-neg-1": {
    title: "Почему didn't watch?",
    steps: [
      { kind: "structure", text: "Отрицание: Subject + didn't + V1." },
      { kind: "form", text: "watched → watch, прошлое уже внутри didn't." },
    ],
    result: "She didn't watch the film.",
    remember: "После DIDN'T — только V1.",
    wrongDefault: "После didn't глагол стоит в V1: didn't watch.",
  },
  "pst-neg-2": {
    title: "Почему didn't see?",
    steps: [
      { kind: "structure", text: "Отрицание в прошлом: didn't + V1." },
      { kind: "form", text: "saw → see." },
    ],
    result: "I didn't see him at the station.",
    remember: "I didn't saw — частая ошибка.",
  },
  "pst-be-1": {
    title: "Почему were?",
    steps: [
      { kind: "who", text: "Подлежащее — they.", highlight: "They" },
      { kind: "form", text: "I / he / she / it → was, you / we / they → were." },
    ],
    result: "They were at home yesterday evening.",
    remember: "WAS / WERE работают сами, DID им не нужен.",
    wrongAnswers: [
      { answer: "was", text: "was идёт с I, he, she, it. С they нужно were." },
      { answer: "did be", text: "Такой формы нет: BE строит прошлое сам — was / were." },
    ],
  },
  "pst-be-3": {
    title: "Почему Was?",
    steps: [
      { kind: "structure", text: "С глаголом BE вопрос строится без DID." },
      { kind: "who", text: "she → was." },
    ],
    result: "Was she at home last night?",
    remember: "Did she be — так не говорят.",
  },
  "pst-err-1": {
    title: "Почему go, а не went?",
    steps: [
      { kind: "structure", text: "В предложении есть Did — это вопрос." },
      { kind: "form", text: "После DID глагол возвращается в V1: went → go." },
    ],
    result: "Did you go there?",
    remember: "DID ЗАБИРАЕТ ПРОШЛОЕ СЕБЕ.",
  },
  "pst-err-4": {
    title: "Почему went?",
    steps: [
      { kind: "form", text: "go — неправильный глагол, у него нет окончания -ed." },
      { kind: "form", text: "go → went → gone." },
    ],
    result: "She went home.",
    remember: "Неправильные глаголы учим таблицей V1 → V2 → V3.",
  },
  "pst-sit-1": {
    title: "Почему visited?",
    chain: ["поездка закончилась", "Past Simple", "V2", "visited"],
    steps: [
      { kind: "what", text: "Поездка уже закончилась, ты рассказываешь о ней как о прошлом." },
      { kind: "tense", text: "Законченная ситуация в прошлом → Past Simple." },
      { kind: "form", text: "visit — правильный глагол: visited." },
    ],
    result: "We visited a lot of interesting places.",
    remember: "Слов-маркеров может не быть — смотри на смысл.",
  },
  "pst-sit-3": {
    title: "Почему didn't find?",
    steps: [
      { kind: "structure", text: "Нужно отрицание в прошлом: didn't + V1." },
      { kind: "form", text: "find остаётся в V1." },
    ],
    result: "I didn't find my keys, so I came home late.",
    remember: "I didn't found — ошибка.",
  },
  "pst-seq-1": {
    title: "Почему had?",
    steps: [
      { kind: "what", text: "Это цепочка событий: got up → had breakfast → went to school." },
      { kind: "tense", text: "Все действия в Past Simple." },
      { kind: "form", text: "have → had." },
    ],
    result: "Yesterday Anna got up, had breakfast and went to school.",
  },
  "pst-t-14": {
    title: "Почему lost?",
    steps: [
      { kind: "when", text: "Назван момент в прошлом: two days ago.", highlight: "two days ago" },
      { kind: "what", text: "Ситуация закончилась — ключи уже нашлись." },
      { kind: "tense", text: "Значит, Past Simple." },
      { kind: "form", text: "lose → lost." },
    ],
    result: "I lost my keys two days ago.",
    remember: "Точное время в прошлом → Past Simple, а не Present Perfect.",
    alternatives: [
      { label: "have lost", text: "Present Perfect не используют с точным временем в прошлом." },
      { label: "lose", text: "V1 — это настоящее время." },
    ],
  },
  "pst-t-15": {
    title: "Почему played?",
    steps: [
      { kind: "when", text: "When I was a child — период в прошлом, который закончился." },
      { kind: "what", text: "Повторяющиеся действия, но в прошлом." },
      { kind: "tense", text: "Past Simple: played." },
    ],
    result: "When I was a child, I played football every day.",
    remember: "every day не означает автоматически Present Simple — решает контекст.",
  },
};
