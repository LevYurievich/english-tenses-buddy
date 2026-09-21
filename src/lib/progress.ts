/**
 * Локальное хранилище прогресса.
 * Слой намеренно изолирован: позже его можно заменить на серверное API
 * без изменения компонентов (интерфейс ProgressState остаётся тем же).
 */
import { useCallback, useEffect, useState } from "react";
import type { ErrorCategory } from "@/data/types";
import { TENSES } from "@/data/tenses";
import { awardAnswer, awardCorrectedMistake, awardLesson, awardTest } from "./gamification";

const STORAGE_KEY = "ets-progress-v1";
const EVENT = "ets-progress-change";

export type TenseProgress = {
  theoryDone: boolean;
  doneExercises: string[];
  correct: number;
  total: number;
  lastTestScore: number | null;
  bestTestScore: number | null;
  testTotal: number | null;
  testAttempts?: number;
  mistakes: number;
  /** Последний результат по каждому упражнению (нужно для диагностики смешанных модулей). */
  results?: Record<string, boolean>;
};

export type MistakeRecord = {
  id: string;
  tense: string;
  category: ErrorCategory;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  at: number;
};

export type ProgressState = {
  tenses: Record<string, TenseProgress>;
  mistakes: MistakeRecord[];
};

const emptyTense = (): TenseProgress => ({
  theoryDone: false,
  doneExercises: [],
  correct: 0,
  total: 0,
  lastTestScore: null,
  bestTestScore: null,
  testTotal: null,
  testAttempts: 0,
  mistakes: 0,
  results: {},
});

export const emptyState = (): ProgressState => ({ tenses: {}, mistakes: [] });

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as ProgressState;
    return { tenses: parsed.tenses ?? {}, mistakes: parsed.mistakes ?? [] };
  } catch {
    return emptyState();
  }
}

function save(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT));
}

export function updateState(updater: (s: ProgressState) => ProgressState) {
  save(updater(loadProgress()));
}

export function getTenseProgress(state: ProgressState, tenseId: string): TenseProgress {
  return state.tenses[tenseId] ?? emptyTense();
}

/** Процент прохождения времени: теория 20% + упражнения 50% + тест 30%. */
export function tensePercent(
  state: ProgressState,
  tenseId: string,
  exerciseCount: number,
  testCount: number,
): number {
  const p = getTenseProgress(state, tenseId);
  const theory = p.theoryDone ? 20 : 0;
  const ex = exerciseCount ? Math.min(1, p.doneExercises.length / exerciseCount) * 50 : 0;
  const test =
    p.bestTestScore !== null && testCount ? (p.bestTestScore / testCount) * 30 : 0;
  return Math.round(theory + ex + test);
}

export function overallPercent(state: ProgressState, perTense: Record<string, number>): number {
  const total = TENSES.reduce((sum, t) => sum + (perTense[t.id] ?? 0), 0);
  return Math.round(total / TENSES.length);
}

export function markTheoryDone(tenseId: string) {
  if (!getTenseProgress(loadProgress(), tenseId).theoryDone) awardLesson();
  updateState((s) => ({
    ...s,
    tenses: { ...s.tenses, [tenseId]: { ...getTenseProgress(s, tenseId), theoryDone: true } },
  }));
}

export function recordAnswer(params: {
  tenseId: string;
  exerciseId: string;
  correct: boolean;
  category: ErrorCategory;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
}) {
  const before = getTenseProgress(loadProgress(), params.tenseId);
  const previousResult = (before.results ?? {})[params.exerciseId];
  awardAnswer(params.correct, previousResult === undefined);
  if (params.correct && previousResult === false) awardCorrectedMistake();

  updateState((s) => {
    const prev = getTenseProgress(s, params.tenseId);
    const doneExercises = prev.doneExercises.includes(params.exerciseId)
      ? prev.doneExercises
      : [...prev.doneExercises, params.exerciseId];
    const mistakes = params.correct
      ? s.mistakes
      : [
          {
            id: `${params.exerciseId}-${Date.now()}`,
            tense: params.tenseId,
            category: params.category,
            question: params.question,
            userAnswer: params.userAnswer,
            correctAnswer: params.correctAnswer,
            explanation: params.explanation,
            at: Date.now(),
          },
          ...s.mistakes,
        ].slice(0, 200);
    return {
      mistakes,
      tenses: {
        ...s.tenses,
        [params.tenseId]: {
          ...prev,
          results: { ...(prev.results ?? {}), [params.exerciseId]: params.correct },
          doneExercises,
          correct: prev.correct + (params.correct ? 1 : 0),
          total: prev.total + 1,
          mistakes: prev.mistakes + (params.correct ? 0 : 1),
        },
      },
    };
  });
}

export function recordTest(tenseId: string, score: number, total: number) {
  awardTest(score, total);
  updateState((s) => {
    const prev = getTenseProgress(s, tenseId);
    return {
      ...s,
      tenses: {
        ...s.tenses,
        [tenseId]: {
          ...prev,
          lastTestScore: score,
          testTotal: total,
          bestTestScore: Math.max(prev.bestTestScore ?? 0, score),
          testAttempts: (prev.testAttempts ?? 0) + 1,
        },
      },
    };
  });
}

export function clearMistakes(tenseId?: string) {
  updateState((s) => ({
    ...s,
    mistakes: tenseId ? s.mistakes.filter((m) => m.tense !== tenseId) : [],
  }));
}

export function resetAll() {
  save(emptyState());
}

/** Хук с подпиской на изменения. Возвращает null до гидратации. */
export function useProgress(): ProgressState | null {
  const [state, setState] = useState<ProgressState | null>(null);
  const sync = useCallback(() => setState(loadProgress()), []);

  useEffect(() => {
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return state;
}
