export type TenseGroup = "present" | "past" | "future";

export type ErrorCategory =
  | "third_person_s"
  | "do_does"
  | "word_order"
  | "negative"
  | "question"
  | "verb_form"
  | "tense_choice"
  | "translation";

export type Difficulty = 1 | 2 | 3;

export type ExerciseType =
  | "multiple-choice"
  | "fill-blank"
  | "sentence-builder"
  | "transformation"
  | "error-finder"
  | "translation"
  | "constructor";

type Base = {
  id: string;
  tense: string;
  difficulty: Difficulty;
  /** Условие задания на русском. */
  task: string;
  /** Материал задания (предложение с пропуском и т.п.). */
  question: string;
  hint: string;
  explanation: string;
  rule: string;
  errorCategory: ErrorCategory;
  /** Группа для статистики мини-теста. */
  skill: "statement" | "negative" | "question" | "verb-form" | "order" | "translation";
};

export type MultipleChoiceExercise = Base & {
  type: "multiple-choice";
  options: string[];
  correctAnswer: string;
};

export type FillBlankExercise = Base & {
  type: "fill-blank";
  correctAnswer: string;
  acceptableAnswers: string[];
};

export type TransformationExercise = Base & {
  type: "transformation";
  correctAnswer: string;
  acceptableAnswers: string[];
};

export type TranslationExercise = Base & {
  type: "translation";
  correctAnswer: string;
  acceptableAnswers: string[];
};

export type ErrorFinderExercise = Base & {
  type: "error-finder";
  /** Слова предложения; пользователь выбирает ошибочное. */
  tokens: string[];
  wrongIndex: number;
  correctAnswer: string;
};

export type SentenceBuilderExercise = Base & {
  type: "sentence-builder";
  tokens: string[];
  correctAnswer: string;
  acceptableAnswers: string[];
};

export type ConstructorExercise = Base & {
  type: "constructor";
  tokens: string[];
  correctAnswer: string;
  acceptableAnswers: string[];
  /** Разбор собранного предложения по ролям. */
  breakdown: { text: string; role: GrammarRole; note: string }[];
};

export type GrammarRole = "subject" | "aux" | "verb" | "marker" | "object";

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | SentenceBuilderExercise
  | TransformationExercise
  | ErrorFinderExercise
  | TranslationExercise
  | ConstructorExercise;
