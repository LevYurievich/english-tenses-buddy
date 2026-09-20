export type TenseGroup = "present" | "past" | "future";

export type ErrorCategory =
  | "third_person_s"
  | "do_does"
  | "word_order"
  | "negative"
  | "question"
  | "verb_form"
  | "tense_choice"
  | "translation"
  // --- Present Continuous ---
  | "missing_be"
  | "wrong_be"
  | "missing_ing"
  | "question_word_order"
  | "negative_position"
  | "ing_spelling"
  // --- Present Perfect ---
  | "wrong_have_has"
  | "missing_have_has"
  | "wrong_v3"
  | "used_v2_instead_v3"
  | "negative_form"
  | "already_position"
  | "yet_usage"
  | "present_perfect_vs_past_simple"
  // --- Present Perfect Continuous ---
  | "missing_been"
  | "wrong_word_order"
  | "wrong_for_since"
  | "wrong_tense_duration"
  | "present_perfect_vs_present_perfect_continuous"
  // --- Смешанный модуль «Все Present» ---
  | "simple_vs_continuous"
  | "simple_vs_perfect"
  | "continuous_vs_perfect"
  | "perfect_vs_perfect_continuous"
  | "present_tense_selection"
  | "auxiliary_error"
  | "verb_form_error"
  | "word_order_error"
  | "for_since_error";

export type Difficulty = 1 | 2 | 3;

export type ExerciseType =
  | "multiple-choice"
  | "fill-blank"
  | "sentence-builder"
  | "transformation"
  | "error-finder"
  | "translation"
  | "constructor";

/**
 * Универсальная структура объяснения «Почему?» — подходит для всех 12 времён.
 * Хранится отдельно от UI, тексты заранее подготовлены (без генерации в реальном времени).
 */
export type ReasoningStepKind =
  /** Когда происходит действие? */
  | "when"
  /** Что происходит? */
  | "what"
  /** Какое время подходит? */
  | "tense"
  /** Кто выполняет действие? */
  | "who"
  /** Какая нужна конструкция? */
  | "structure"
  /** Какая форма глагола нужна? */
  | "form";

export type ReasoningStep = {
  kind: ReasoningStepKind;
  /** Необязательный свой заголовок вместо стандартного вопроса. */
  title?: string;
  text: string;
  /** Ключевое слово-признак в предложении. */
  highlight?: string;
};

export type Reasoning = {
  /** «Почему plays?» — если не задано, собирается из правильного ответа. */
  title?: string;
  /** Короткая цепочка: Признак → Значение → Время → Формула → Ответ. */
  chain?: string[];
  steps: ReasoningStep[];
  /** Итоговое предложение. */
  result: string;
  /** «Запомни: DOES забирает S себе.» */
  remember?: string;
  /** Разбор конкретных неверных вариантов. */
  wrongAnswers?: { answer: string; text: string }[];
  /** Общее объяснение ошибки, если конкретный вариант не найден. */
  wrongDefault?: string;
  /**
   * LEVEL 2 — «Почему именно это время, а не другое?».
   * Нужен в сравнительных и смешанных упражнениях.
   */
  whyThisTense?: {
    title?: string;
    steps: ReasoningStep[];
  };
  /** «Почему не остальные времена?» — короткие ответы для смешанных заданий. */
  alternatives?: { label: string; text: string }[];
};

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
  /** Пошаговое объяснение «Почему?». Можно задать здесь или в файле reasoning.ts времени. */
  reasoning?: Reasoning;
  /** Короткая ситуация на русском («Пойми ситуацию»). Показывается над заданием. */
  situation?: string;
  /** Группа для статистики мини-теста. */
  skill:
    | "statement"
    | "negative"
    | "question"
    | "verb-form"
    | "order"
    | "translation"
    | "be-form"
    | "ing"
    | "tense-choice"
    | "situation"
    | "been"
    | "for-since"
    | "meaning"
    | "formula";
  /** Какое время проверяет задание (нужно для диагностики смешанных модулей). */
  targetTense?: string;
  /** Уровень смешанного модуля: 1 — с подсказками, 2 — по ситуации, 3 — без подсказок. */
  level?: 1 | 2 | 3;
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
