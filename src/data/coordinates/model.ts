/**
 * Модуль «Координаты времени»: 3 временные зоны × 4 смысла = 12 времён.
 * Только данные и чистые функции — без UI.
 */
export const COORDINATES_ID = "coordinates";

export type Zone = "present" | "past" | "future";
export type Meaning = "simple" | "process" | "result" | "duration";
export type TenseKey = `${Zone}-${"simple" | "continuous" | "perfect" | "perfect-continuous"}`;

export const ZONES: Zone[] = ["present", "past", "future"];
export const MEANINGS: Meaning[] = ["simple", "process", "result", "duration"];

export const ZONE_INFO: Record<Zone, { label: string; short: string; icon: string; point: string }> = {
  present: { label: "PRESENT", short: "NOW", icon: "●", point: "точка отсчёта — сейчас" },
  past: { label: "PAST", short: "PAST", icon: "←", point: "точка отсчёта — в прошлом" },
  future: { label: "FUTURE", short: "FUTURE", icon: "→", point: "точка отсчёта — в будущем" },
};

export const MEANING_INFO: Record<
  Meaning,
  { label: string; aspect: string; icon: string; ru: string; question: string; describe: string }
> = {
  simple: {
    label: "FACT / EVENT",
    aspect: "SIMPLE",
    icon: "●",
    ru: "факт, событие, обычность",
    question: "Что происходит обычно или что случилось / случится?",
    describe: "ситуацию целиком — без фокуса на процессе, результате или длительности",
  },
  process: {
    label: "PROCESS",
    aspect: "CONTINUOUS",
    icon: "▬",
    ru: "процесс в момент",
    question: "Что происходит в этот момент?",
    describe: "процесс, который идёт в определённый момент",
  },
  result: {
    label: "RESULT",
    aspect: "PERFECT",
    icon: "✓",
    ru: "результат к точке",
    question: "Что уже готово к этой точке?",
    describe: "результат, который уже есть к точке отсчёта",
  },
  duration: {
    label: "PROCESS + DURATION",
    aspect: "PERFECT CONTINUOUS",
    icon: "⏱",
    ru: "процесс + длительность до точки",
    question: "Как долго процесс идёт до точки?",
    describe: "процесс, который длится какое-то время до точки отсчёта",
  },
};

const ASPECT_SUFFIX: Record<Meaning, string> = {
  simple: "simple",
  process: "continuous",
  result: "perfect",
  duration: "perfect-continuous",
};

export function tenseOf(zone: Zone, meaning: Meaning): TenseKey {
  return `${zone}-${ASPECT_SUFFIX[meaning]}` as TenseKey;
}

export function coordsOf(tense: TenseKey): { zone: Zone; meaning: Meaning } {
  const [zone, ...rest] = tense.split("-") as [Zone, ...string[]];
  const suffix = rest.join("-");
  const meaning = (Object.keys(ASPECT_SUFFIX) as Meaning[]).find((m) => ASPECT_SUFFIX[m] === suffix)!;
  return { zone, meaning };
}

export const TENSE_INFO: Record<TenseKey, { title: string; formula: string; example: string }> = {
  "present-simple": { title: "Present Simple", formula: "V1 / V1-s", example: "Tom plays football every Saturday." },
  "present-continuous": { title: "Present Continuous", formula: "am / is / are + V-ing", example: "I am studying now." },
  "present-perfect": { title: "Present Perfect", formula: "have / has + V3", example: "I have finished." },
  "present-perfect-continuous": { title: "Present Perfect Continuous", formula: "have / has been + V-ing", example: "I have been studying for two hours." },
  "past-simple": { title: "Past Simple", formula: "V2 / did + V1", example: "Tom played football last Saturday." },
  "past-continuous": { title: "Past Continuous", formula: "was / were + V-ing", example: "At 8 yesterday, I was studying." },
  "past-perfect": { title: "Past Perfect", formula: "had + V3", example: "I had finished before Tom arrived." },
  "past-perfect-continuous": { title: "Past Perfect Continuous", formula: "had been + V-ing", example: "I had been studying for two hours before Tom arrived." },
  "future-simple": { title: "Future Simple", formula: "will + V1", example: "I think Tom will play football next Saturday." },
  "future-continuous": { title: "Future Continuous", formula: "will be + V-ing", example: "At 8 tomorrow, I will be studying." },
  "future-perfect": { title: "Future Perfect", formula: "will have + V3", example: "I will have finished by 8." },
  "future-perfect-continuous": { title: "Future Perfect Continuous", formula: "will have been + V-ing", example: "By 8, I will have been studying for two hours." },
};

export const ALL_TENSES: TenseKey[] = ZONES.flatMap((z) => MEANINGS.map((m) => tenseOf(z, m)));

/** Верхнеуровневая категория ошибки координаты. */
export function zonePairCategory(a: Zone, b: Zone) {
  const pair = [a, b].sort().join("|");
  if (pair === "past|present") return "present_vs_past_reference" as const;
  if (pair === "future|present") return "present_vs_future_reference" as const;
  return "past_vs_future_reference" as const;
}

/** Верхнеуровневая категория ошибки смысла. */
export function meaningPairCategory(a: Meaning, b: Meaning) {
  const pair = [a, b].sort().join("|");
  switch (pair) {
    case "process|simple":
      return "simple_vs_continuous_global" as const;
    case "result|simple":
      return "simple_vs_perfect_global" as const;
    case "process|result":
      return "process_vs_result_global" as const;
    case "duration|result":
      return "result_vs_duration_global" as const;
    case "duration|process":
      return "continuous_vs_perfect_continuous_global" as const;
    default:
      return "wrong_aspect_selection" as const;
  }
}

export const PAIR_TITLES: Record<string, string> = {
  present_vs_past_reference: "PRESENT или PAST — где точка отсчёта",
  present_vs_future_reference: "PRESENT или FUTURE — где точка отсчёта",
  past_vs_future_reference: "PAST или FUTURE — где точка отсчёта",
  simple_vs_continuous_global: "Факт / событие или PROCESS",
  simple_vs_perfect_global: "Факт / событие или RESULT",
  process_vs_result_global: "PROCESS или RESULT",
  result_vs_duration_global: "RESULT или DURATION",
  continuous_vs_perfect_continuous_global: "PROCESS в момент или PROCESS + DURATION",
  wrong_aspect_selection: "Выбор смысла",
};
