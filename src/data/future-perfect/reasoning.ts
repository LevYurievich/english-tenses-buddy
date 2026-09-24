import type { Reasoning } from "../types";

/**
 * «Почему?» для Future Perfect.
 * Цепочка: будущая точка → что к ней будет готово → результат → WILL → HAVE → V3.
 */
export const FUTURE_PERFECT_REASONING: Record<string, Reasoning> = {
  "fp-f1": {
    title: "Почему will have finished?",
    chain: ["8 p.m.", "будущая точка", "домашка готова", "результат", "WILL → HAVE → V3", "finished"],
    steps: [
      { kind: "when", text: "8 p.m. — будущая точка (дедлайн).", highlight: "By 8 p.m." },
      { kind: "what", text: "К этой точке домашнее задание будет закончено." },
      { kind: "tense", text: "Результат к будущей точке → Future Perfect." },
      { kind: "structure", text: "WILL + HAVE + V3. После will всегда have, не has." },
      { kind: "form", text: "finish → finished.", highlight: "finished" },
    ],
    result: "By 8 p.m., Tom will have finished his homework.",
    remember: "WILL → HAVE → V3",
    wrongAnswers: [
      { answer: "will has finished", text: "После will всегда have." },
      { answer: "will have finish", text: "После have нужна V3: finished." },
      { answer: "will finish", text: "Future Simple сообщает о событии. Здесь важен готовый результат к 8." },
      { answer: "will be finishing", text: "Это процесс в момент 8. А нам важно, что к 8 всё уже готово." },
    ],
  },
  "fp-f2": {
    title: "Почему will have written?",
    chain: ["write (V1)", "wrote (V2)", "written (V3)", "will have written"],
    steps: [
      { kind: "when", text: "By Friday — будущая точка." },
      { kind: "what", text: "К пятнице пять страниц будут готовы." },
      { kind: "form", text: "write — wrote — written. После have — V3." },
    ],
    result: "By Friday, Anna will have written five pages.",
    remember: "После HAVE — только V3.",
    wrongAnswers: [{ answer: "will have wrote", text: "wrote — это V2. Нужна V3: written." }],
  },
  "fp-c1": {
    title: "Почему will be writing, а не will have written?",
    steps: [
      { kind: "when", text: "At 8 p.m. — точка в будущем." },
      { kind: "what", text: "В 8 Анна ещё работает — отчёт не готов." },
      { kind: "tense", text: "В МОМЕНТ → процесс → Future Continuous." },
    ],
    result: "At 8 p.m., Anna will be writing the report.",
    remember: "В момент? → процесс. К моменту? → результат.",
    alternatives: [
      { label: "Future Perfect", text: "will have written — отчёт уже был бы готов к 8. Но работа идёт до 10." },
    ],
  },
  "fp-c2": {
    title: "Почему не Future Continuous?",
    steps: [
      { kind: "when", text: "By 8 p.m. — дедлайн." },
      { kind: "what", text: "Отчёт закончен в 7 — к 8 он полностью готов." },
      { kind: "tense", text: "К МОМЕНТУ → результат → Future Perfect." },
    ],
    result: "By 8 p.m., Anna will have written the report.",
    remember: "Future Continuous — что будет происходить. Future Perfect — что уже будет готово.",
    alternatives: [
      { label: "will be writing", text: "Описывало бы процесс в 8. Но в 8 работа уже закончена." },
    ],
  },
  "fp-t4": {
    title: "Почему come, а не will come?",
    steps: [
      { kind: "when", text: "Ты вернёшься в будущем — это точка." },
      { kind: "structure", text: "После by the time / when / before / after про будущее ставим Present Simple." },
      { kind: "form", text: "В главной части — will have cleaned, в части с by the time — come." },
    ],
    result: "By the time you come back, I will have cleaned the flat.",
    remember: "Будущий смысл ≠ will в каждой части предложения.",
  },
  "fp-s2": {
    title: "Почему by и will have written?",
    steps: [
      { kind: "when", text: "9 a.m. — момент, когда отчёт нужен." },
      { kind: "what", text: "В 9 отчёт должен быть уже готов." },
      { kind: "tense", text: "BY 9 = не позже 9 → результат → Future Perfect." },
    ],
    result: "I will have written the report by 9 a.m.",
    remember: "AT 8 — в этот момент. BY 8 — не позже 8, к этому моменту.",
    alternatives: [{ label: "will write … at 9", text: "Значит: начну писать в 9. Начальнику это не подходит." }],
  },
};
