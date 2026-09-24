/**
 * Конструкторы смешанных упражнений модуля «Все Future».
 * Структура полностью повторяет «Все Present» — её же переиспользуем для будущего All Future.
 */
import type {
  ErrorCategory,
  Exercise,
  FillBlankExercise,
  MultipleChoiceExercise,
  Reasoning,
  ReasoningStepKind,
  SentenceBuilderExercise,
  ErrorFinderExercise,
  TransformationExercise,
  TranslationExercise,
} from "@/data/types";

/** Идентификатор модуля для прогресса и localStorage. */
export const ALL_FUTURE_ID = "all-future";

export type Skill = Exercise["skill"];

export type Common = {
  id: string;
  level: 1 | 2 | 3;
  /** Какое время проверяет задание. */
  target: string;
  task?: string;
  question: string;
  situation?: string;
  hint?: string;
  explanation: string;
  rule?: string;
  category: ErrorCategory;
  skill: Skill;
  chain?: string[];
  why: [ReasoningStepKind, string][];
  result?: string;
  remember?: string;
  /** «Почему не остальные?» — пары [время, короткое объяснение]. */
  alt?: [string, string][];
  /** Разбор конкретных неверных вариантов. */
  wrong?: [string, string][];
  title?: string;
  skills?: string[];
  timeline?: import("@/data/types").TimelineSpec;
};

function buildReasoning(o: Common, answer: string): Reasoning {
  const r: Reasoning = {
    steps: o.why.map(([kind, text]) => ({ kind, text })),
    result: o.result ?? answer,
  };
  if (o.title) r.title = o.title;
  if (o.chain) r.chain = o.chain;
  if (o.remember) r.remember = o.remember;
  if (o.alt) r.alternatives = o.alt.map(([label, text]) => ({ label, text }));
  if (o.wrong) r.wrongAnswers = o.wrong.map(([a, text]) => ({ answer: a, text }));
  return r;
}

function base(o: Common, answer: string) {
  return {
    id: o.id,
    tense: ALL_FUTURE_ID,
    targetTense: o.target,
    level: o.level,
    difficulty: o.level,
    task: o.task ?? "Выбери правильный вариант",
    question: o.question,
    ...(o.situation ? { situation: o.situation } : {}),
    hint: o.hint ?? "Сначала пойми смысл ситуации, потом вспомни формулу.",
    explanation: o.explanation,
    rule: o.rule ?? "future-tenses",
    errorCategory: o.category,
    skill: o.skill,
    reasoning: buildReasoning(o, answer),
    ...(o.skills ? { skills: o.skills } : {}),
    ...(o.timeline ? { timeline: o.timeline } : {}),
  } as const;
}

export function mc(o: Common & { options: string[]; answer: string }): MultipleChoiceExercise {
  return {
    ...base(o, o.answer),
    type: "multiple-choice",
    options: o.options,
    correctAnswer: o.answer,
  };
}

export function fb(o: Common & { answer: string; also?: string[] }): FillBlankExercise {
  return {
    ...base(o, o.answer),
    type: "fill-blank",
    task: o.task ?? "Поставь глагол в правильную форму",
    correctAnswer: o.answer,
    acceptableAnswers: [o.answer, ...(o.also ?? [])],
  };
}

export function tf(o: Common & { answer: string; also?: string[] }): TransformationExercise {
  return {
    ...base(o, o.answer),
    type: "transformation",
    task: o.task ?? "Преобразуй предложение",
    correctAnswer: o.answer,
    acceptableAnswers: [o.answer, ...(o.also ?? [])],
  };
}

export function tl(o: Common & { answer: string; also?: string[] }): TranslationExercise {
  return {
    ...base(o, o.answer),
    type: "translation",
    task: o.task ?? "Переведи на английский",
    correctAnswer: o.answer,
    acceptableAnswers: [o.answer, ...(o.also ?? [])],
  };
}

export function sb(
  o: Common & { tokens: string[]; answer: string; also?: string[] },
): SentenceBuilderExercise {
  return {
    ...base(o, o.answer),
    type: "sentence-builder",
    task: o.task ?? "Собери предложение",
    tokens: o.tokens,
    correctAnswer: o.answer,
    acceptableAnswers: [o.answer, ...(o.also ?? [])],
  };
}

export function ef(
  o: Common & { tokens: string[]; wrongIndex: number; answer: string },
): ErrorFinderExercise {
  return {
    ...base(o, o.answer),
    type: "error-finder",
    task: o.task ?? "Найди ошибку — нажми на неправильное слово",
    tokens: o.tokens,
    wrongIndex: o.wrongIndex,
    correctAnswer: o.answer,
  };
}
