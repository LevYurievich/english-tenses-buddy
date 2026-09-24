import type { ErrorCategory, Exercise, Reasoning } from "../types";

const T = "compare-future-perfect";

function mc(
  id: string,
  cat: ErrorCategory,
  question: string,
  options: string[],
  correctAnswer: string,
  situation: string,
  hint: string,
  explanation: string,
  targetTense: string,
  difficulty: 1 | 2 | 3 = 2,
): Exercise {
  return {
    id,
    tense: T,
    type: "multiple-choice",
    difficulty,
    skill: "tense-choice",
    task: "Выбери по смыслу",
    situation,
    question,
    options,
    correctAnswer,
    hint,
    explanation,
    rule: "compare-fp",
    errorCategory: cat,
    targetTense,
  };
}

const FS = "future-simple";
const FC = "future-continuous";
const FP = "future-perfect";
const S = "future_simple_vs_future_perfect";
const C = "future_continuous_vs_future_perfect";

/** Future Simple vs Future Perfect — 12 новых заданий (6 + 6). */
export const COMPARE_FSP_EXERCISES: Exercise[] = [
  mc("cfp-1", S, "I'm cold. I think I ___ the window.", ["will close", "will have closed"], "will close", "Тебе холодно, ты решаешь прямо сейчас.", "Решение сейчас — никакого дедлайна.", "Future Simple: решение в момент речи → will close.", FS, 1),
  mc("cfp-2", S, "When you wake up, I ___ already.", ["will have left", "will leave"], "will have left", "Ты уедешь в 6 утра, сестра проснётся в 8.", "Отъезд будет раньше, чем она проснётся.", "К моменту пробуждения результат готов → will have left.", FP, 1),
  mc("cfp-3", S, "When you wake up, I ___.", ["will leave", "will have left"], "will leave", "Ты дождёшься, пока сестра проснётся, и только потом уйдёшь.", "Сначала она проснётся, потом ты уйдёшь.", "Событие после её пробуждения → will leave.", FS, 1),
  mc("cfp-4", S, "When we arrive, the film ___.", ["will have started", "will start"], "will have started", "Фильм начинается в 7:00, мы приедем в 7:30.", "Начало фильма — до нашего прихода.", "К нашей точке (7:30) фильм уже начнётся → will have started.", FP),
  mc("cfp-5", S, "The film ___ at 7:30, twenty minutes after we arrive.", ["will start", "will have started"], "will start", "Мы приедем в 7:10, фильм начинается в 7:30.", "Начало — после нашего прихода.", "Просто событие в 7:30 → will start.", FS),
  mc("cfp-6", S, "I think it ___ tomorrow.", ["will rain", "will have rained"], "will rain", "Ты смотришь на тучи и делаешь прогноз.", "Прогноз, без точки-дедлайна.", "Прогноз → Future Simple: will rain.", FS),
  mc("cfp-7", S, "By the tenth day, Nina ___ the whole book.", ["will have read", "will read"], "will have read", "В книге 300 страниц. Нина читает по 30 страниц в день и начала сегодня.", "Сколько будет прочитано к десятому дню?", "К точке «десятый день» результат готов → will have read.", FP),
  mc("cfp-8", S, "Don't worry, I ___ you tomorrow.", ["will help", "will have helped"], "will help", "Друг просит о помощи. Ты обещаешь.", "Обещание.", "Обещание → will help.", FS),
  mc("cfp-9", S, "By the end of the summer, Max ___ 1,000 roubles.", ["will have saved", "will save"], "will have saved", "Макс откладывает по 100 рублей в неделю — 10 недель до конца лета.", "Сколько будет накоплено к точке?", "Количество к будущему моменту → will have saved.", FP),
  mc("cfp-10", S, "Don't worry, Mum. By the time you come back, I ___ my room.", ["will have tidied", "will tidy"], "will have tidied", "Мама вернётся в 6. К этому моменту уборка должна быть полностью позади.", "К её приходу комната уже чистая.", "Результат к точке → will have tidied.", FP, 3),
  mc("cfp-11", S, "When Tim gets to the airport, the plane ___.", ["will have taken off", "will take off"], "will have taken off", "Самолёт вылетает в 10. Тим обещает приехать в аэропорт в 11.", "Вылет раньше, чем Тим приедет.", "К приезду Тима — результат: самолёт уже улетел → will have taken off.", FP, 3),
  mc("cfp-12", S, "The plane ___ an hour after Tim gets there.", ["will take off", "will have taken off"], "will take off", "Тим приедет в 9, самолёт вылетает в 10.", "Вылет — после приезда.", "Событие в будущем, без «уже к точке» → will take off.", FS, 3),
];

/** Future Continuous vs Future Perfect — 10 новых заданий. */
export const COMPARE_FCP_EXERCISES: Exercise[] = [
  mc("cfcp-1", C, "At 11 tomorrow, Max ___ the fence.", ["will be painting", "will have painted"], "will be painting", "Завтра Макс красит забор с 10 до 12.", "В 11 — середина работы.", "В момент → процесс → will be painting.", FC, 1),
  mc("cfcp-2", C, "By 1 p.m. tomorrow, Max ___ the fence.", ["will have painted", "will be painting"], "will have painted", "Завтра Макс красит забор с 10 до 12.", "В 12 работа закончится.", "К моменту → результат → will have painted.", FP, 1),
  mc("cfcp-3", C, "At 8, the band ___.", ["will be playing", "will have played"], "will be playing", "Концерт идёт с 7 до 9:30.", "8 — внутри концерта.", "Процесс в момент 8 → will be playing.", FC),
  mc("cfcp-4", C, "By 10, the band ___ all their songs.", ["will have played", "will be playing"], "will have played", "Концерт идёт с 7 до 9:30.", "К 10 концерт позади.", "Результат к моменту 10 → will have played.", FP),
  mc("cfcp-5", C, "Don't call me at 10 — I ___ my exam.", ["will be taking", "will have taken"], "will be taking", "Экзамен идёт с 9 до 11.", "В 10 ты ещё пишешь.", "В момент звонка — процесс → will be taking.", FC),
  mc("cfcp-6", C, "Call me at 12 — I ___ my exam by then.", ["will have finished", "will be finishing"], "will have finished", "Экзамен идёт с 9 до 11.", "К 12 экзамен позади.", "Результат к моменту → will have finished.", FP),
  mc("cfcp-7", C, "When we get home at 6, Dad ___ dinner.", ["will be cooking", "will have cooked"], "will be cooking", "Папа начнёт готовить в 5:30 и закончит в 6:30.", "В 6 он ещё у плиты.", "В момент нашего прихода — процесс → will be cooking.", FC, 3),
  mc("cfcp-8", C, "When we get home at 6, Dad ___ dinner.", ["will have cooked", "will be cooking"], "will have cooked", "Папа начнёт готовить в 5 и закончит в 5:30.", "В 6 ужин уже готов.", "К моменту прихода — результат → will have cooked.", FP, 3),
  mc("cfcp-9", C, "When her friends call at 8, Liza ___ her project.", ["will have finished", "will be finishing"], "will have finished", "Лиза весь день делает проект. В 7 он будет полностью готов.", "В 8 работа уже позади.", "Результат к звонку → will have finished.", FP, 3),
  mc("cfcp-10", C, "At 4 p.m., we ___ over the sea.", ["will be flying", "will have flown"], "will be flying", "Самолёт летит с 14:00 до 18:00.", "16:00 — середина полёта.", "Процесс в момент → will be flying.", FC, 3),
];

export const COMPARE_FP_EXERCISES: Exercise[] = [...COMPARE_FSP_EXERCISES, ...COMPARE_FCP_EXERCISES];

export const COMPARE_FP_REASONING: Record<string, Reasoning> = {
  "cfp-2": {
    title: "Почему will have left?",
    chain: ["точка: ты проснёшься", "отъезд раньше", "результат к точке", "WILL HAVE + V3"],
    steps: [
      { kind: "when", text: "Будущая точка — момент, когда сестра проснётся (8:00)." },
      { kind: "what", text: "Отъезд в 6:00 — раньше точки. К 8 результат готов: меня уже нет." },
      { kind: "tense", text: "Результат к будущей точке → Future Perfect." },
      { kind: "form", text: "leave — left — left → will have left." },
    ],
    result: "When you wake up, I will have left already.",
    remember: "Future Simple — что произойдёт. Future Perfect — что уже будет готово к точке.",
    alternatives: [{ label: "will leave", text: "Значило бы: сначала ты проснёшься, потом я уйду." }],
  },
  "cfcp-7": {
    title: "Почему will be cooking?",
    steps: [
      { kind: "when", text: "Точка — 6:00, когда мы придём." },
      { kind: "what", text: "Готовка идёт с 5:30 до 6:30 — в 6 она в процессе." },
      { kind: "tense", text: "В МОМЕНТ → процесс → Future Continuous." },
    ],
    result: "When we get home at 6, Dad will be cooking dinner.",
    remember: "В момент? → процесс. К моменту? → результат.",
    alternatives: [{ label: "will have cooked", text: "Подошло бы, если бы папа закончил до 6 (см. следующее задание)." }],
  },
};
