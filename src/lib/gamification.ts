/**
 * Лёгкая геймификация: XP, уровни, серия дней и дневная цель.
 * Хранится отдельным ключом localStorage, чтобы не трогать существующий прогресс.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ets-game-v1";
const EVENT = "ets-game-change";

export type GameState = {
  xp: number;
  /** Дата последней учебной активности в формате YYYY-MM-DD. */
  lastStudyDate: string | null;
  currentStreak: number;
  bestStreak: number;
  daily: { date: string; count: number };
  dailyGoal: number;
  achievements: string[];
  /** Текущая серия правильных ответов подряд. */
  answerStreak: number;
  /** Лучшая серия правильных ответов подряд. */
  bestAnswerStreak: number;
  /** Сколько ошибок разобрано повторно (правильный ответ после ошибки). */
  correctedMistakes: number;
};

export const XP_ANSWER = 5;
export const XP_LESSON = 20;
export const XP_TEST = 30;
export const XP_PERFECT_TEST = 25;

export const LEVELS = [
  { level: 1, title: "Новичок во времени", min: 0 },
  { level: 2, title: "Исследователь времени", min: 150 },
  { level: 3, title: "Знаток Present", min: 400 },
  { level: 4, title: "Путешественник во времени", min: 800 },
  { level: 5, title: "Хранитель времени", min: 1400 },
];

export const emptyGame = (): GameState => ({
  xp: 0,
  lastStudyDate: null,
  currentStreak: 0,
  bestStreak: 0,
  daily: { date: "", count: 0 },
  dailyGoal: 10,
  achievements: [],
  answerStreak: 0,
  bestAnswerStreak: 0,
  correctedMistakes: 0,
});

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = new Date(`${b}T00:00:00Z`).getTime() - new Date(`${a}T00:00:00Z`).getTime();
  return Math.round(ms / 86_400_000);
}

/** Читает состояние и безопасно дополняет недостающие поля (обратная совместимость). */
export function loadGame(): GameState {
  if (typeof window === "undefined") return emptyGame();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyGame();
    return { ...emptyGame(), ...(JSON.parse(raw) as Partial<GameState>) };
  } catch {
    return emptyGame();
  }
}

function save(state: GameState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT));
}

export function updateGame(updater: (g: GameState) => GameState) {
  save(updater(loadGame()));
}

export function levelFor(xp: number) {
  const current = [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0]!;
  const next = LEVELS.find((l) => l.min > xp) ?? null;
  const span = next ? next.min - current.min : 1;
  const progress = next ? Math.round(((xp - current.min) / span) * 100) : 100;
  return { ...current, next, progress };
}

/** Отмечает учебную активность: серия дней и дневная цель. Открытие приложения не считается. */
function withActivity(g: GameState, tasks = 1): GameState {
  const date = today();
  const last = g.lastStudyDate;
  let currentStreak = g.currentStreak;
  if (last !== date) {
    currentStreak = last && daysBetween(last, date) === 1 ? currentStreak + 1 : 1;
  }
  if (currentStreak < 1) currentStreak = 1;
  const daily =
    g.daily.date === date
      ? { date, count: g.daily.count + tasks }
      : { date, count: tasks };
  return {
    ...g,
    lastStudyDate: date,
    currentStreak,
    bestStreak: Math.max(g.bestStreak, currentStreak),
    daily,
  };
}

/** Ответ на задание. XP начисляется только за первый правильный ответ на задание. */
export function awardAnswer(correct: boolean, countXp = true) {
  updateGame((g) => {
    const next = withActivity(g, 1);
    const answerStreak = correct ? next.answerStreak + 1 : 0;
    return {
      ...next,
      xp: next.xp + (correct && countXp ? XP_ANSWER : 0),
      answerStreak,
      bestAnswerStreak: Math.max(next.bestAnswerStreak, answerStreak),
    };
  });
}

/** Правильный ответ после ранее сделанной ошибки в этом же задании. */
export function awardCorrectedMistake() {
  updateGame((g) => ({ ...g, correctedMistakes: g.correctedMistakes + 1 }));
}

export function awardLesson() {
  updateGame((g) => ({ ...withActivity(g, 0), xp: g.xp + XP_LESSON }));
}

export function awardTest(score: number, total: number) {
  updateGame((g) => {
    const next = withActivity(g, 0);
    const perfect = total > 0 && score === total ? XP_PERFECT_TEST : 0;
    return { ...next, xp: next.xp + XP_TEST + perfect };
  });
}

export function unlockAchievements(ids: string[]) {
  if (!ids.length) return;
  updateGame((g) => ({
    ...g,
    achievements: [...new Set([...g.achievements, ...ids])],
  }));
}

export function setDailyGoal(goal: number) {
  updateGame((g) => ({ ...g, dailyGoal: goal }));
}

export function resetGame() {
  save(emptyGame());
}

/** Хук с подпиской. Возвращает null до гидратации, чтобы не ломать SSR. */
export function useGame(): GameState | null {
  const [state, setState] = useState<GameState | null>(null);
  const sync = useCallback(() => setState(loadGame()), []);
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
