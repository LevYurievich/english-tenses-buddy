import type { Reasoning } from "../types";

/** «Почему?» для Future Perfect Continuous: точка → старт → длительность → WILL HAVE BEEN + ING. */
export const FUTURE_PERFECT_CONTINUOUS_REASONING: Record<string, Reasoning> = {
  "fpc-f1": {
    title: "Почему will have been studying?",
    chain: ["6 p.m.", "будущая точка", "процесс идёт", "как долго? 3 часа", "WILL → HAVE → BEEN → ING"],
    steps: [
      { kind: "when", text: "By 6 p.m. — будущая точка.", highlight: "By 6 p.m." },
      { kind: "what", text: "К 6 процесс будет идти уже три часа — важна длительность." },
      { kind: "tense", text: "Длительность к будущей точке → Future Perfect Continuous." },
      { kind: "structure", text: "WILL + HAVE + BEEN + V-ING." },
      { kind: "form", text: "study → studying." },
    ],
    result: "By 6 p.m., Tom will have been studying for three hours.",
    remember: "WILL → HAVE → BEEN → ING",
    wrongAnswers: [
      { answer: "will have studying", text: "Пропущено been." },
      { answer: "will have studied", text: "Future Perfect — про готовый результат. Здесь важно «как долго»." },
      { answer: "will be studying", text: "Это процесс в момент 6, без длительности." },
    ],
  },
  "fpc-p1": {
    title: "Почему will have read, а не will have been reading?",
    steps: [
      { kind: "when", text: "By 6 — будущая точка." },
      { kind: "what", text: "Считаем результат: три главы." },
      { kind: "tense", text: "Сколько будет готово → Future Perfect." },
    ],
    result: "By 6, Tom will have read three chapters.",
    remember: "Сколько сделано? → Perfect. Как долго? → Perfect Continuous.",
    alternatives: [{ label: "will have been reading", text: "Нужен был бы отрезок: for three hours." }],
  },
  "fpc-p5": {
    title: "Почему will have known?",
    steps: [
      { kind: "what", text: "know — глагол состояния, у него нет процесса." },
      { kind: "tense", text: "Вместо Perfect Continuous берём Future Perfect." },
    ],
    result: "By next month, I will have known Anna for five years.",
    remember: "know, be, have (иметь), like — без -ing.",
  },
  "fpc-c1": {
    title: "Почему will be studying?",
    steps: [
      { kind: "when", text: "At 6 p.m. — момент." },
      { kind: "what", text: "Спрашиваем, что происходит в этот момент, а не как долго." },
      { kind: "tense", text: "Процесс в момент → Future Continuous." },
    ],
    result: "At 6 p.m., Tom will be studying.",
    alternatives: [{ label: "will have been studying", text: "Нужна длительность: By 6, … for three hours." }],
  },
};
