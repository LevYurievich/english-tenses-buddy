import { exerciseKit } from "../exercise-kit";
import type { Exercise, Reasoning } from "../types";

const { mc } = exerciseKit("compare-future-perfect-continuous", "compare-fpc");
const C = "future_perfect_vs_perfect_continuous";
const FP = "future-perfect";
const FPC = "future-perfect-continuous";
const PICK = "Выбери по смыслу";

/** Future Perfect vs Future Perfect Continuous — 15 новых заданий: 5 явных, 5 по контексту, 5 без подсказок. */
export const COMPARE_FPC_FUTURE_EXERCISES: Exercise[] = [
  mc("cfpc-1", C, "tense-choice", "By noon, Max ___ ten pages.", ["will have written", "will have been writing"], "will have written", "Сколько будет готово? — десять страниц.", "Количество результата → Future Perfect.", { difficulty: 1, task: PICK, targetTense: FP }),
  mc("cfpc-2", C, "tense-choice", "By noon, Max ___ for three hours.", ["will have been writing", "will have written"], "will have been writing", "Как долго? — три часа.", "Длительность → Future Perfect Continuous.", { difficulty: 1, task: PICK, targetTense: FPC }),
  mc("cfpc-3", C, "tense-choice", "By Sunday, we ___ the whole fence.", ["will have painted", "will have been painting"], "will have painted", "Весь забор готов.", "Готовый результат → will have painted.", { difficulty: 1, task: PICK, targetTense: FP }),
  mc("cfpc-4", C, "tense-choice", "By Sunday, we ___ the fence for three days.", ["will have been painting", "will have painted"], "will have been painting", "for three days — длительность.", "Длительность → will have been painting.", { difficulty: 1, task: PICK, targetTense: FPC }),
  mc("cfpc-5", C, "tense-choice", "By 9, the kids ___ all the pizza.", ["will have eaten", "will have been eating"], "will have eaten", "all the pizza — результат.", "Вся пицца съедена → will have eaten.", { difficulty: 1, task: PICK, targetTense: FP }),
  mc("cfpc-6", C, "tense-choice", "When Mum comes back, Dad ___ for three hours.", ["will have been cleaning", "will have cleaned"], "will have been cleaning", "Папа всё ещё убирает.", "Процесс идёт, важно как долго → will have been cleaning.", { task: PICK, targetTense: FPC, situation: "Мама вернётся в 7. Папа начнёт убирать в 4 и в 7 всё ещё будет убирать." }),
  mc("cfpc-7", C, "tense-choice", "When Mum comes back, Dad ___ the whole flat.", ["will have cleaned", "will have been cleaning"], "will have cleaned", "Уборка закончится до 7.", "Готовый результат к точке → will have cleaned.", { task: PICK, targetTense: FP, situation: "Мама вернётся в 7. Папа закончит уборку в 6." }),
  mc("cfpc-8", C, "tense-choice", "By the evening, Olya ___ five games.", ["will have played", "will have been playing"], "will have played", "Считаем партии.", "Количество к точке → will have played.", { task: PICK, targetTense: FP, situation: "Шахматный турнир идёт весь день. К вечеру Оля сыграет пять партий." }),
  mc("cfpc-9", C, "tense-choice", "By tonight, it ___ for twelve hours.", ["will have been raining", "will have rained"], "will have been raining", "Дождь не прекращается.", "Длительность процесса → will have been raining.", { task: PICK, targetTense: FPC, situation: "Дождь начался утром и идёт без остановки." }),
  mc("cfpc-10", C, "tense-choice", "By 12, you ___ for two hours, so you'll be tired.", ["will have been running", "will have run"], "will have been running", "Усталость — от долгого процесса.", "Длительность → will have been running.", { task: PICK, targetTense: FPC, situation: "Тренер: «Бег будет с 10 до 12»." }),
  mc("cfpc-11", C, "tense-choice", "By the end of the year, Liza ___ twenty books.", ["will have read", "will have been reading"], "will have read", "", "Количество готового → will have read.", { difficulty: 3, task: PICK, targetTense: FP }),
  mc("cfpc-12", C, "tense-choice", "By the end of the year, Liza ___ English for six years.", ["will have been learning", "will have learnt"], "will have been learning", "", "Длительность → will have been learning.", { difficulty: 3, task: PICK, targetTense: FPC }),
  mc("cfpc-13", C, "tense-choice", "By the time we land, we ___ for fourteen hours.", ["will have been flying", "will have flown"], "will have been flying", "", "Как долго длится полёт к посадке → will have been flying.", { difficulty: 3, task: PICK, targetTense: FPC }),
  mc("cfpc-14", C, "tense-choice", "By the time we land, we ___ over three countries.", ["will have flown", "will have been flying"], "will have flown", "", "Сколько стран позади — результат → will have flown.", { difficulty: 3, task: PICK, targetTense: FP }),
  mc("cfpc-15", "stative_future_perfect_continuous", "tense-choice", "By next week, I ___ this phone for a year.", ["will have had", "will have been having"], "will have had", "", "have = иметь — состояние, без -ing → will have had.", { difficulty: 3, task: PICK, targetTense: FP }),
];

export const COMPARE_FPC_FUTURE_REASONING: Record<string, Reasoning> = {
  "cfpc-1": {
    title: "Почему will have written?",
    steps: [
      { kind: "when", text: "By noon — будущая точка." },
      { kind: "what", text: "Вопрос: сколько будет готово? Десять страниц." },
      { kind: "tense", text: "Количество результата → Future Perfect." },
    ],
    result: "By noon, Max will have written ten pages.",
    remember: "ЧТО / СКОЛЬКО будет готово? → will have + V3. КАК ДОЛГО? → will have been + V-ing.",
    alternatives: [{ label: "will have been writing", text: "Подходит к «for three hours» — там важна длительность." }],
  },
  "cfpc-6": {
    title: "Почему will have been cleaning?",
    steps: [
      { kind: "when", text: "Точка — 7, когда вернётся мама." },
      { kind: "what", text: "Уборка всё ещё идёт; важно, как долго — три часа." },
      { kind: "tense", text: "Длительность к будущей точке → Future Perfect Continuous." },
    ],
    result: "When Mum comes back, Dad will have been cleaning for three hours.",
    remember: "Как долго уже к тому моменту? → WILL HAVE BEEN + ING",
  },
};
