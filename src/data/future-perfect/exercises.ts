import type { ErrorCategory, Exercise } from "../types";

const T = "future-perfect";

type Skill = Exercise["skill"];

/** Варианты ответа: без точки/вопроса, с сокращениями 'll и won't. */
export function variants(...sentences: string[]): string[] {
  const out = new Set<string>();
  for (const raw of sentences) {
    const s = raw.toLowerCase().replace(/[.?!]$/, "");
    const forms = [s];
    if (/\b(\w+) will /.test(s)) forms.push(s.replace(/\b(\w+) will /, "$1'll "));
    if (/\bwill not\b/.test(s)) forms.push(s.replace(/\bwill not\b/, "won't"));
    if (/\bwon't\b/.test(s)) forms.push(s.replace(/\bwon't\b/, "will not"));
    for (const f of forms) {
      out.add(f);
      out.add(`${f}.`);
      out.add(`${f}?`);
    }
  }
  return [...out];
}

type Extra = { situation?: string; difficulty?: 1 | 2 | 3; task?: string; targetTense?: string };

function mc(
  id: string,
  cat: ErrorCategory,
  skill: Skill,
  question: string,
  options: string[],
  correctAnswer: string,
  hint: string,
  explanation: string,
  extra: Extra = {},
): Exercise {
  return {
    id,
    tense: T,
    type: "multiple-choice",
    difficulty: extra.difficulty ?? 2,
    skill,
    task: extra.task ?? "Выбери правильный вариант",
    situation: extra.situation,
    targetTense: extra.targetTense,
    question,
    options,
    correctAnswer,
    hint,
    explanation,
    rule: "fp",
    errorCategory: cat,
  };
}

function fb(
  id: string,
  cat: ErrorCategory,
  skill: Skill,
  question: string,
  answers: string[],
  hint: string,
  explanation: string,
  extra: Extra = {},
): Exercise {
  return {
    id,
    tense: T,
    type: "fill-blank",
    difficulty: extra.difficulty ?? 2,
    skill,
    task: extra.task ?? "Раскрой скобки",
    situation: extra.situation,
    targetTense: extra.targetTense,
    question,
    correctAnswer: answers[0],
    acceptableAnswers: variants(...answers),
    hint,
    explanation,
    rule: "fp",
    errorCategory: cat,
  };
}

function tr(
  id: string,
  type: "transformation" | "translation",
  cat: ErrorCategory,
  skill: Skill,
  task: string,
  question: string,
  answers: string[],
  hint: string,
  explanation: string,
  difficulty: 1 | 2 | 3 = 2,
): Exercise {
  return {
    id,
    tense: T,
    type,
    difficulty,
    skill,
    task,
    question,
    correctAnswer: answers[0],
    acceptableAnswers: variants(...answers),
    hint,
    explanation,
    rule: "fp",
    errorCategory: cat,
  };
}

function err(
  id: string,
  cat: ErrorCategory,
  tokens: string[],
  wrongIndex: number,
  correctAnswer: string,
  hint: string,
  explanation: string,
): Exercise {
  return {
    id,
    tense: T,
    type: "error-finder",
    difficulty: 2,
    skill: "formula",
    task: "Найди ошибку",
    question: tokens.join(" "),
    tokens,
    wrongIndex,
    correctAnswer,
    hint,
    explanation,
    rule: "fp",
    errorCategory: cat,
  };
}

function build(
  id: string,
  tokens: string[],
  correctAnswer: string,
  hint: string,
  question: string,
): Exercise {
  return {
    id,
    tense: T,
    type: "sentence-builder",
    difficulty: 2,
    skill: "order",
    task: "Собери предложение",
    question,
    tokens,
    correctAnswer,
    acceptableAnswers: variants(correctAnswer),
    hint,
    explanation: correctAnswer,
    rule: "fp",
    errorCategory: "future_perfect_question_order",
  };
}

const POINT = ["NOW", "PAST", "FUTURE"];

/* ---------------- «Найди дедлайн» + «К дедлайну» — 6 заданий ---------------- */
export const DEADLINE_EXERCISES: Exercise[] = [
  mc(
    "fpd-1",
    "wrong_future_deadline",
    "meaning",
    "By Friday, Tom will have finished the project. — Какая здесь будущая точка?",
    ["Tom", "finish", "Friday", "now"],
    "Friday",
    "Ищи момент, к которому что-то будет готово.",
    "Точка — Friday. К пятнице проект будет готов.",
    { difficulty: 1, task: "Найди дедлайн" },
  ),
  mc(
    "fpd-2",
    "wrong_future_deadline",
    "meaning",
    "By 8 p.m., Anna will have cleaned her room. — Какая здесь будущая точка?",
    ["Anna", "8 p.m.", "her room", "clean"],
    "8 p.m.",
    "После by стоит дедлайн.",
    "Точка — 8 p.m. К этому времени комната будет убрана.",
    { difficulty: 1, task: "Найди дедлайн" },
  ),
  mc(
    "fpd-3",
    "wrong_future_deadline",
    "meaning",
    "By the end of the month, we will have saved enough money. — Какая здесь будущая точка?",
    ["we", "money", "the end of the month", "now"],
    "the end of the month",
    "К какому моменту деньги будут накоплены?",
    "Точка — конец месяца. К нему деньги уже будут собраны.",
    { difficulty: 1, task: "Найди дедлайн" },
  ),
  mc(
    "fpd-4",
    "wrong_future_deadline",
    "meaning",
    "By Friday, Tom will have finished the project. — Что к этой точке будет готово?",
    [
      "Проект будет полностью закончен.",
      "Том только начнёт проект.",
      "Том будет в процессе работы над проектом.",
    ],
    "Проект будет полностью закончен.",
    "will have finished = к точке уже закончено.",
    "К пятнице результат готов: project → finished.",
    { difficulty: 1, task: "Второй шаг: что будет готово?" },
  ),
  mc(
    "fpd-5",
    "wrong_future_deadline",
    "meaning",
    "Что будет верно к пятнице?",
    [
      "Anna will have finished the book by Friday.",
      "Anna will be reading the book on Friday.",
      "Anna has finished the book.",
    ],
    "Anna will have finished the book by Friday.",
    "Анна закончит книгу до пятницы — значит, в пятницу книга уже прочитана.",
    "К пятнице результат готов → will have finished.",
    {
      difficulty: 1,
      task: "К дедлайну",
      situation: "Сегодня понедельник. Анна читает книгу и закончит её до пятницы. ПН ● → ЧИТАЕТ → ПТ 🎯",
    },
  ),
  mc(
    "fpd-6",
    "wrong_future_deadline",
    "meaning",
    "By the time you wake up, I will have left for the airport. — Какая здесь будущая точка?",
    ["the moment you wake up", "the airport", "I", "now"],
    "the moment you wake up",
    "By the time + событие тоже может быть дедлайном.",
    "Точка — момент, когда ты проснёшься. К нему я уже уеду.",
    { difficulty: 2, task: "Найди дедлайн" },
  ),
];

/* ---------------- Основная тренировка — 35 заданий ---------------- */
export const FUTURE_PERFECT_EXERCISES: Exercise[] = [
  // WILL HAVE + V3 — 5
  fb("fp-f1", "missing_have_future_perfect", "formula", "By 8 p.m., Tom ___ (finish) his homework.", ["will have finished"], "WILL + HAVE + V3.", "8 p.m. — будущая точка, к ней домашка готова → will have finished.", { difficulty: 1 }),
  fb("fp-f2", "wrong_v3_future_perfect", "verb-form", "By Friday, Anna ___ (write) five pages.", ["will have written"], "write — wrote — written.", "Нужна V3: will have written.", { difficulty: 1 }),
  fb("fp-f3", "missing_have_future_perfect", "formula", "By next June, they ___ (build) the new bridge.", ["will have built"], "build — built — built.", "К июню мост будет построен → will have built.", { situation: "Мост строят уже год, работы закончат весной." }),
  fb("fp-f4", "wrong_future_deadline", "situation", "By the time we get to the cinema, the film ___ (start).", ["will have started", "will already have started", "will have already started"], "Фильм начнётся раньше, чем мы приедем.", "Начало фильма (7:00) произойдёт до нашего прихода (7:20) → will have started.", { situation: "Мы опаздываем: фильм начинается в 7:00, а приедем мы в 7:20." }),
  fb("fp-f5", "missing_have_future_perfect", "formula", "By the end of the year, I ___ (read) twenty books.", ["will have read"], "Сколько будет готово к концу года?", "Количество к будущей точке → will have read (read — read — read).", { situation: "Сейчас сентябрь. Я прочитала 16 книг и читаю по одной в месяц." }),
  // V3 — 5
  mc("fp-v1", "used_v2_instead_v3_future", "verb-form", "By tomorrow, she will have ___ home. (go)", ["went", "gone", "go", "going"], "gone", "После have — V3.", "go — went — gone. went — это V2.", { difficulty: 1 }),
  mc("fp-v2", "used_v2_instead_v3_future", "verb-form", "By 9, the kids will have ___ dinner. (eat)", ["ate", "eaten", "eat", "eating"], "eaten", "eat — ate — eaten.", "После will have нужна V3: eaten.", { difficulty: 1 }),
  mc("fp-v3", "wrong_v3_future_perfect", "verb-form", "By Monday, I will have ___ the letter. (send)", ["sended", "sent", "send", "sending"], "sent", "send — неправильный глагол.", "send — sent — sent. «sended» не существует.", { difficulty: 1 }),
  mc("fp-v4", "wrong_v3_future_perfect", "verb-form", "By noon, they will have ___ the tickets. (buy)", ["buyed", "buy", "bought", "buying"], "bought", "buy — bought — bought.", "V3 от buy — bought.", { difficulty: 1 }),
  mc("fp-v5", "will_have_plus_v1", "verb-form", "By 10 a.m., the train will have ___ the station. (leave)", ["leave", "leaved", "left", "leaving"], "left", "После have нельзя V1.", "leave — left — left → will have left."),
  // Отрицание / вопрос — 4
  tr("fp-q1", "transformation", "future_perfect_question_order", "question", "Сделай вопрос", "Tom will have finished by 8.", ["Will Tom have finished by 8?"], "WILL выходит вперёд, have + V3 остаются вместе.", "Will + Tom + have finished + by 8?", 1),
  tr("fp-q2", "transformation", "future_perfect_question_order", "question", "Сделай вопрос", "They will have arrived by noon.", ["Will they have arrived by noon?"], "Will + кто + have + V3?", "Will they have arrived by noon?"),
  tr("fp-n1", "transformation", "missing_have_future_perfect", "negative", "Сделай отрицание", "Anna will have completed the work by Friday.", ["Anna won't have completed the work by Friday.", "Anna will not have completed the work by Friday."], "won't + have + V3.", "Anna won't (will not) have completed the work by Friday.", 1),
  tr("fp-n2", "transformation", "missing_have_future_perfect", "negative", "Сделай отрицание", "We will have painted the fence by Sunday.", ["We won't have painted the fence by Sunday.", "We will not have painted the fence by Sunday."], "have остаётся после won't.", "We won't have painted the fence by Sunday."),
  // Timeline / deadline — 4
  mc("fp-t1", "wrong_future_deadline", "meaning", "Какое предложение описывает эту линию?", ["By Friday, Tom will have finished the project.", "On Friday, Tom will be finishing the project.", "Tom finished the project on Friday."], "By Friday, Tom will have finished the project.", "✓ ГОТОВО стоит до флажка.", "К пятнице результат уже готов → will have finished.", { situation: "NOW ● — ТОМ РАБОТАЕТ НАД ПРОЕКТОМ — ✓ ГОТОВО (ЧТ) — ПТ 🎯", task: "Прочитай timeline" }),
  fb("fp-t2", "wrong_future_deadline", "situation", "By the time we get to the airport, the plane ___ (land).", ["will have landed", "will already have landed", "will have already landed"], "Посадка в 13:00, мы приедем в 14:00.", "Посадка случится до нашей точки (14:00) → will have landed.", { situation: "NOW 10:00 ● — 13:00 ✈ ПОСАДКА — 14:00 🎯 МЫ В АЭРОПОРТУ", task: "Прочитай timeline" }),
  mc("fp-t3", "wrong_future_deadline", "situation", "By 7, Mum ___ dinner.", ["will have cooked", "will be cooking", "cooks"], "will have cooked", "В 6 ужин уже готов, а точка — 7.", "Готовка закончится в 6, раньше точки 7 → will have cooked.", { situation: "Сейчас 3 часа. Мама начнёт готовить в 5 и закончит в 6. Гости придут в 7 🎯.", task: "Прочитай timeline" }),
  mc("fp-t4", "future_time_clause_will", "formula", "By the time you ___ back, I will have cleaned the flat.", ["come", "will come", "will have come"], "come", "После by the time — Present Simple, даже про будущее.", "В части с by the time не ставим will: by the time you come back.", { situation: "Ты вернёшься вечером — это точка. Уборка будет готова раньше." }),
  // Future Simple vs Future Perfect — 4
  mc("fp-s1", "future_simple_vs_future_perfect", "tense-choice", "Tonight I ___ the article about space.", ["will read", "will have read"], "will read", "Здесь нет точки, к которой нужен готовый результат.", "Просто будущее действие → will read. Future Perfect нужен только с дедлайном.", { situation: "Ты рассказываешь другу, чем займёшься вечером." }),
  mc("fp-s2", "at_vs_by", "tense-choice", "Don't worry! I ___ the report ___ 9 a.m.", ["will have written … by", "will write … at"], "will have written … by", "В 9 отчёт должен быть уже готов, а не только начат.", "К 9 результат готов → will have written … by. «will write at 9» — начну писать в 9.", { situation: "Начальнику отчёт нужен в 9 утра — к этому времени он должен лежать на столе." }),
  mc("fp-s3", "future_simple_vs_future_perfect", "tense-choice", "The phone is ringing. I ___ it.", ["will answer", "will have answered"], "will answer", "Решение прямо сейчас.", "Спонтанное решение → Future Simple: I'll answer it."),
  mc("fp-s4", "future_simple_vs_future_perfect", "tense-choice", "By 10 a.m. tomorrow, we ___ Moscow.", ["will have left", "will leave"], "will have left", "Выезд в 6, а точка — 10.", "К 10 мы уже уедем → will have left.", { situation: "Завтра мы выезжаем из Москвы в 6 утра." }),
  // Future Continuous vs Future Perfect — 4
  mc("fp-c1", "future_continuous_vs_future_perfect", "tense-choice", "At 8 p.m., Anna ___ the report.", ["will be writing", "will have written"], "will be writing", "В 8 она ещё в процессе.", "В момент 8 — процесс → will be writing.", { situation: "Анна будет работать над отчётом с 7 до 10 вечера." }),
  mc("fp-c2", "future_continuous_vs_future_perfect", "tense-choice", "By 8 p.m., Anna ___ the report.", ["will have written", "will be writing"], "will have written", "К 8 отчёт полностью готов.", "К моменту 8 — результат → will have written.", { situation: "Анна закончит отчёт в 7 вечера." }),
  mc("fp-c3", "future_continuous_vs_future_perfect", "tense-choice", "At 8, we ___ the film.", ["will be watching", "will have seen", "will see"], "will be watching", "8 — середина фильма.", "Фильм идёт с 7 до 9. В 8 — процесс → will be watching.", { situation: "Завтра фильм в кино идёт с 7 до 9 вечера." }),
  mc("fp-c4", "future_continuous_vs_future_perfect", "tense-choice", "By 10, we ___ the film.", ["will have seen", "will be watching", "will see"], "will have seen", "Фильм закончится в 9.", "К 10 фильм уже позади → will have seen.", { situation: "Завтра фильм в кино идёт с 7 до 9 вечера." }),
  // Найди ошибку — 3
  err("fp-e1", "wrong_have_has_future_perfect", ["She", "will", "has", "finished", "by", "Friday."], 2, "She will have finished by Friday.", "После will всегда have.", "will + have, никогда will has."),
  err("fp-e2", "used_v2_instead_v3_future", ["Tom", "will", "have", "went", "home", "by", "then."], 3, "Tom will have gone home by then.", "went — это V2.", "go — went — gone → will have gone."),
  err("fp-e3", "will_have_plus_v1", ["They", "will", "have", "finish", "the", "work."], 3, "They will have finished the work.", "После have — V3.", "finish → finished: will have finished."),
  // Собери предложение — 2
  build("fp-b1", ["By Friday,", "Tom", "will", "have", "finished", "the project"], "By Friday, Tom will have finished the project.", "Дедлайн → кто → will → have → V3 → что.", "к пятнице Том закончит проект"),
  build("fp-b2", ["Will", "you", "have", "done", "your homework", "by 9"], "Will you have done your homework by 9?", "Will → кто → have → V3?", "вопрос: сделаешь ли ты домашку к 9?"),
  // Перевод — 2
  tr("fp-tr1", "translation", "missing_have_future_perfect", "translation", "Переведи на английский", "К 8 часам Том закончит домашнее задание.", ["By 8, Tom will have finished his homework.", "By 8 o'clock, Tom will have finished his homework.", "By 8 p.m., Tom will have finished his homework.", "By 8 Tom will have finished his homework.", "Tom will have finished his homework by 8.", "Tom will have finished his homework by 8 o'clock.", "Tom will have done his homework by 8."], "К точке 8 результат готов.", "By 8, Tom will have finished his homework."),
  tr("fp-tr2", "translation", "wrong_v3_future_perfect", "translation", "Переведи на английский", "К пятнице мы уже купим билеты.", ["By Friday, we will have bought the tickets.", "By Friday we will have bought the tickets.", "By Friday, we will already have bought the tickets.", "By Friday, we will have already bought the tickets.", "We will have bought the tickets by Friday.", "We will already have bought the tickets by Friday."], "buy — bought — bought.", "By Friday, we will have bought the tickets."),
  // Ситуационные — 2
  fb("fp-sit1", "wrong_future_deadline", "situation", "By the time his friend arrives, Tom ___ (finish) his homework.", ["will have finished", "will already have finished", "will have already finished"], "Домашка закончится в 5, друг придёт в 6.", "К приходу друга результат готов → will have finished.", { situation: "Сейчас 3 часа. Том делает домашнее задание и закончит его в 5. Друг придёт в 6." }),
  mc("fp-sit2", "future_continuous_vs_future_perfect", "situation", "Anna ___ dinner before the guests arrive.", ["will have prepared", "will be preparing", "has prepared"], "will have prepared", "Ужин должен быть полностью готов ДО прихода.", "Результат к моменту прихода гостей → will have prepared.", { situation: "Гости придут в 7. Анна хочет, чтобы ужин был полностью готов до их прихода." }),
];

/* ---------------- Perfect family — 9 заданий ---------------- */
export const PERFECT_FAMILY_EXERCISES: Exercise[] = [
  mc("pf-n1", "perfect_family_confusion", "tense-choice", "Look! Tom ___ his homework. It's on the table.", ["has finished", "had finished", "will have finished"], "has finished", "Результат виден сейчас.", "Точка — NOW → have/has + V3: has finished.", { targetTense: "present-perfect", task: "Perfect family: NOW" }),
  mc("pf-n2", "perfect_family_confusion", "meaning", "Someone has washed the dishes. — Относительно какого момента рассматривается результат?", POINT, "NOW", "Мама видит чистую кухню прямо сейчас.", "Результат есть сейчас → NOW → Present Perfect.", { targetTense: "present-perfect", task: "Где точка отсчёта?", situation: "Мама заходит на кухню и видит чистую посуду." }),
  fb("pf-n3", "perfect_family_confusion", "tense-choice", "I ___ (lose) my keys, so I can't open the door now.", ["have lost", "'ve lost"], "Результат — сейчас не могу открыть.", "NOW → have lost.", { targetTense: "present-perfect", task: "Perfect family: NOW" }),
  fb("pf-p1", "perfect_family_confusion", "tense-choice", "Tom ___ (finish) his homework before his friend arrived.", ["had finished"], "Точка — приход друга в прошлом.", "PAST → had + V3: had finished.", { targetTense: "past-perfect", task: "Perfect family: PAST" }),
  mc("pf-p2", "perfect_family_confusion", "meaning", "When we got to the station, the train had left. — Относительно какого момента рассматривается результат?", POINT, "PAST", "Момент, когда мы пришли на вокзал, — уже в прошлом.", "Точка в прошлом → PAST → Past Perfect.", { targetTense: "past-perfect", task: "Где точка отсчёта?" }),
  mc("pf-p3", "perfect_family_confusion", "tense-choice", "By the time the teacher came in, the students ___ the test.", ["had written", "have written", "will have written"], "had written", "came — прошлое.", "К моменту в прошлом → had written.", { targetTense: "past-perfect", task: "Perfect family: PAST" }),
  fb("pf-f1", "perfect_family_confusion", "tense-choice", "Tom ___ (finish) his homework by 8 tonight.", ["will have finished"], "8 tonight — будущая точка.", "FUTURE → will have + V3: will have finished. Сравни: has finished (NOW) · had finished (PAST) · will have finished (FUTURE).", { targetTense: "future-perfect", task: "Perfect family: FUTURE" }),
  mc("pf-f2", "perfect_family_confusion", "meaning", "By next summer, Anna will have learnt to swim. — Относительно какого момента рассматривается результат?", POINT, "FUTURE", "next summer — впереди.", "Точка в будущем → FUTURE → Future Perfect.", { targetTense: "future-perfect", task: "Где точка отсчёта?" }),
  mc("pf-f3", "perfect_family_confusion", "tense-choice", "By the time you come back, I ___ the flat.", ["will have cleaned", "had cleaned", "have cleaned"], "will have cleaned", "you come back — будущее (после by the time Present Simple).", "К будущей точке → will have cleaned.", { targetTense: "future-perfect", task: "Perfect family: FUTURE" }),
];

/* ---------------- Итоговый тест — 15 новых заданий ---------------- */
export const FUTURE_PERFECT_TEST: Exercise[] = [
  fb("fpt-1", "missing_have_future_perfect", "formula", "By 6 p.m., the workers ___ (repair) the road.", ["will have repaired"], "", "will have repaired.", { task: "Раскрой скобки", situation: "Дорогу ремонтируют с утра, закончат к обеду." }),
  fb("fpt-2", "wrong_v3_future_perfect", "verb-form", "By Sunday, Max ___ (spend) all his pocket money.", ["will have spent"], "", "spend — spent — spent → will have spent.", { situation: "Макс тратит карманные деньги каждый день, к выходным не останется ничего." }),
  mc("fpt-3", "used_v2_instead_v3_future", "verb-form", "By Saturday, the kids will have ___ the whole cake.", ["ate", "eaten", "eat", "eating"], "eaten", "", "eat — ate — eaten."),
  mc("fpt-4", "wrong_have_has_future_perfect", "formula", "By 2030, scientists ___ a new medicine.", ["will has found", "will have find", "will have found", "will found"], "will have found", "", "will + have + V3 (find — found — found)."),
  tr("fpt-5", "transformation", "missing_have_future_perfect", "negative", "Сделай отрицание", "The shop will have closed by 9.", ["The shop won't have closed by 9.", "The shop will not have closed by 9."], "", "won't + have + V3."),
  tr("fpt-6", "transformation", "future_perfect_question_order", "question", "Сделай вопрос", "She will have packed her bag by 7.", ["Will she have packed her bag by 7?"], "", "Will + she + have packed …?"),
  err("fpt-7", "wrong_have_has_future_perfect", ["Will", "Tom", "has", "finished", "by", "then?"], 2, "Will Tom have finished by then?", "", "После will — have: Will Tom have finished?"),
  mc("fpt-8", "wrong_future_deadline", "situation", "By his birthday, Grandma ___ the sweater.", ["will have knitted", "will be knitting", "knits"], "will have knitted", "", "Свитер будет готов в августе — раньше сентябрьской точки.", { situation: "Сейчас май. Бабушка вяжет свитер и закончит его в августе. День рождения внука — в сентябре." }),
  mc("fpt-9", "at_vs_by", "situation", "When we arrive at 10:30, the tour ___.", ["will have started", "will start", "is starting"], "will have started", "", "Экскурсия началась в 10:00 — до нашей точки 10:30.", { situation: "Экскурсия начинается в 10:00. Мы приезжаем в 10:30." }),
  fb("fpt-10", "future_time_clause_will", "formula", "By the time Dad ___ (get) home, we will have decorated the room.", ["gets"], "", "После by the time — Present Simple: gets.", { situation: "Папа вернётся вечером — к этому моменту комната будет украшена." }),
  mc("fpt-11", "future_simple_vs_future_perfect", "tense-choice", "OK, I ___ you with maths.", ["will help", "will have helped"], "will help", "", "Решение сейчас, дедлайна нет → will help.", { situation: "Друг просит помочь с математикой. Ты сразу соглашаешься." }),
  mc("fpt-12", "future_simple_vs_future_perfect", "tense-choice", "The concert ___ at 7 tonight, so let's meet at 6:30.", ["will start", "will have started"], "will start", "", "Просто событие в будущем в 7 → will start. Результата «к точке» нет.", { situation: "Ты сообщаешь другу, когда концерт." }),
  mc("fpt-13", "future_continuous_vs_future_perfect", "tense-choice", "At 4:30 tomorrow, Tim ___.", ["will be swimming", "will have swum", "will swim"], "will be swimming", "", "В 4:30 урок идёт → процесс.", { situation: "Завтра у Тима урок плавания с 4 до 5." }),
  mc("fpt-14", "future_continuous_vs_future_perfect", "tense-choice", "By 5:30 tomorrow, Tim ___ twenty laps.", ["will have swum", "will be swimming", "swims"], "will have swum", "", "Урок закончится в 5, к 5:30 двадцать кругов позади.", { situation: "Завтра у Тима урок плавания с 4 до 5. За урок он проплывает 20 кругов." }),
  mc("fpt-15", "perfect_family_confusion", "tense-choice", "Mum ___ a pie before the guests arrived.", ["had baked", "has baked", "will have baked"], "had baked", "", "Точка — прошлое (arrived) → had + V3.", { situation: "Вчера, когда пришли гости, пирог уже был готов." }),
];
