import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Past Perfect.
 * Цепочка: сколько событий → что раньше → что позже →
 * нужно ли показать более раннее → Past Perfect → HAD + V3 → какая V3 → ответ.
 */
export const PAST_PERFECT_REASONING: Record<string, Reasoning> = {
  "ppf-ord-1": {
    title: "Почему раньше — торт?",
    chain: ["два события", "had eaten = раньше", "came home = позже"],
    steps: [
      { kind: "what", text: "В предложении два события прошлого." },
      { kind: "when", text: "had eaten показывает более раннее действие.", highlight: "had eaten" },
    ],
    result: "HAD EATEN ● ──── ● CAME HOME ──── NOW",
    remember: "Порядок слов ≠ порядок событий.",
    wrongDefault: "Смотри на had + V3 — именно оно показывает более раннее действие.",
  },
  "ppf-v3-1": {
    title: "Почему gone?",
    chain: ["раньше в прошлом", "Past Perfect", "HAD + V3", "go → gone"],
    steps: [
      { kind: "structure", text: "Past Perfect = HAD + V3." },
      { kind: "form", text: "go → went → gone. went — это V2." },
    ],
    result: "had gone",
    remember: "V1 → V2 → V3. После HAD всегда V3.",
    wrongAnswers: [
      { answer: "went", text: "went — вторая форма, она нужна для Past Simple: Tom went home." },
      { answer: "going", text: "going — форма с -ing, она нужна для Continuous." },
    ],
  },
  "ppf-fb-1": {
    title: "Почему had left?",
    chain: ["два события", "Tom left — раньше", "I arrived — позже", "HAD + V3", "had left"],
    steps: [
      { kind: "what", text: "События два: Том ушёл и я пришёл." },
      { kind: "when", text: "Том ушёл раньше моего прихода." },
      { kind: "tense", text: "Более раннее событие показываем через Past Perfect." },
      { kind: "form", text: "leave → left (V3) → had left." },
    ],
    result: "HAD LEFT ● ──── ● ARRIVED ──── NOW",
    remember: "РАНЬШЕ В ПРОШЛОМ → HAD + V3.",
    wrongDefault: "Нужны обе части: помощник had и третья форма глагола.",
  },
  "ppf-fb-4": {
    title: "Почему arrived + had already started?",
    chain: ["позже → Past Simple", "раньше → Past Perfect"],
    steps: [
      { kind: "when", text: "Мы пришли позже — это Past Simple: arrived." },
      { kind: "what", text: "Фильм начался раньше — Past Perfect: had started." },
      { kind: "structure", text: "already ставится между had и V3.", highlight: "already" },
    ],
    result: "When we arrived, the film had already started.",
    remember: "had + already + V3.",
  },
  "ppf-tr-3": {
    title: "Почему Had Anna seen...?",
    steps: [
      { kind: "structure", text: "В вопросе HAD выходит вперёд." },
      { kind: "form", text: "Глагол остаётся в V3: seen." },
    ],
    result: "Had Anna seen the film?",
    remember: "DID здесь не нужен: помощник уже есть — HAD.",
    wrongDefault: "Порядок: Had + кто + V3?",
  },
  "ppf-err-1": {
    title: "Почему had gone?",
    steps: [
      { kind: "form", text: "После HAD нужна третья форма, а went — вторая." },
      { kind: "structure", text: "go → went → gone." },
    ],
    result: "Tom had gone home.",
    remember: "Past Simple: went. Past Perfect: had gone.",
  },
  "ppf-ch-2": {
    title: "Почему had left?",
    chain: ["got to the bus stop — позже", "bus left — раньше", "Past Perfect"],
    steps: [
      { kind: "when", text: "Автобус уехал до моего прихода." },
      { kind: "tense", text: "Чтобы показать предшествование, берём Past Perfect." },
    ],
    result: "HAD LEFT ● ──── ● GOT TO THE STOP ──── NOW",
    whyThisTense: {
      title: "Почему не Past Simple?",
      steps: [
        {
          kind: "tense",
          text: "Past Simple просто назвал бы событие. Здесь важно, что автобус уехал раньше.",
        },
      ],
    },
  },
  "ppf-ch-3": {
    title: "Почему went?",
    steps: [
      { kind: "what", text: "События идут одно за другим по порядку." },
      { kind: "tense", text: "Подчёркивать предшествование не нужно → Past Simple." },
    ],
    result: "I ate breakfast at 8 and then I went to school.",
    remember: "Не всякие два действия в прошлом требуют Past Perfect.",
  },
  "ppf-sit-2": {
    title: "Почему hadn't eaten?",
    chain: ["was hungry — позже", "no breakfast — раньше", "had + not + V3"],
    steps: [
      { kind: "when", text: "Голод был вчера, а завтрака не было ещё раньше — утром." },
      { kind: "structure", text: "Отрицание: had not → hadn't." },
      { kind: "form", text: "eat → ate → eaten." },
    ],
    result: "Tom was very hungry because he hadn't eaten breakfast.",
  },
  "ppft-15": {
    title: "Точка отсчёта",
    steps: [
      { kind: "tense", text: "Present Perfect смотрит назад от момента СЕЙЧАС." },
      { kind: "tense", text: "Past Perfect смотрит назад от момента в ПРОШЛОМ." },
    ],
    result: "PAST ●────→ PAST ★────────→ NOW",
    remember: "PERFECT = смотрим назад от точки.",
  },
};
