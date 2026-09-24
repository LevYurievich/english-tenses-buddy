/**
 * «Умное повторение» — простая прозрачная логика без AI и без новых заданий:
 * больше ошибок в теме → выше приоритет. Задания берутся из существующих банков.
 * Всё хранится в localStorage.
 */
import type { Exercise } from "@/data/types";
import { cardFor, HELP_CARDS, type HelpCard } from "@/data/review-cards";
import type { ProgressState } from "./progress";
import { PRESENT_SIMPLE_EXERCISES } from "@/data/present-simple/exercises";
import { PRESENT_CONTINUOUS_EXERCISES } from "@/data/present-continuous/exercises";
import { PRESENT_PERFECT_EXERCISES } from "@/data/present-perfect/exercises";
import { PRESENT_PERFECT_CONTINUOUS_EXERCISES } from "@/data/present-perfect-continuous/exercises";
import { FOR_SINCE_EXERCISES } from "@/data/present-perfect-continuous/for-since";
import { ALL_PRESENT_TRAINING } from "@/data/all-present";
import { ALL_PAST_TRAINING } from "@/data/all-past";
import { ALL_FUTURE_TRAINING } from "@/data/all-future";
import { PAST_SIMPLE_EXERCISES } from "@/data/past-simple/exercises";
import { PAST_CONTINUOUS_EXERCISES } from "@/data/past-continuous/exercises";
import { ORDER_EXERCISES, PAST_PERFECT_EXERCISES } from "@/data/past-perfect/exercises";
import { PAST_PERFECT_CONTINUOUS_EXERCISES, POINT_EXERCISES } from "@/data/past-perfect-continuous/exercises";
import { FUTURE_SIMPLE_EXERCISES, WHY_WILL_EXERCISES } from "@/data/future-simple/exercises";
import { FUTURE_CONTINUOUS_EXERCISES, LOOK_AHEAD_EXERCISES } from "@/data/future-continuous/exercises";
import { DEADLINE_EXERCISES, FUTURE_PERFECT_EXERCISES } from "@/data/future-perfect/exercises";
import { FUTURE_PERFECT_CONTINUOUS_EXERCISES, TIMER_EXERCISES } from "@/data/future-perfect-continuous/exercises";
import { COORD_TRAINING, type CoordItem } from "@/data/coordinates/items";
import { A12_TRAINING } from "@/data/all12/items";
import { TENSE_INFO } from "@/data/coordinates/model";

export type PoolItem = { ex: Exercise; tenseId: string };

/** Задание модулей «Координаты» / «Все 12» в формате обычного упражнения. */
function fromCoord(i: CoordItem, tenseId: string): PoolItem {
  const ctx = i.context?.length ? `${i.context.join(" ")} ` : "";
  return {
    tenseId,
    ex: {
      type: "fill-blank",
      id: i.id,
      tense: tenseId,
      difficulty: i.difficulty,
      task: "Вставь форму глагола",
      question: `${ctx}${i.question.replace("___", `___ (${i.verb})`)}`,
      hint: i.hint,
      explanation: `${i.whyWhere} ${i.whyWhat}`,
      rule: `${TENSE_INFO[i.tense].title}: ${TENSE_INFO[i.tense].formula}`,
      errorCategory: i.errorCategory,
      skill: "tense-choice",
      skills: i.skills,
      correctAnswer: i.correctAnswer,
      acceptableAnswers: [...i.acceptableAnswers, ...(i.variants ?? []).flatMap((v) => v.answers)],
    },
  };
}

const tag = (list: Exercise[]): PoolItem[] => list.map((ex) => ({ ex, tenseId: ex.tense }));

let POOL_CACHE: PoolItem[] | null = null;
/** Все существующие проверенные тренировочные задания. */
export function reviewPool(): PoolItem[] {
  if (POOL_CACHE) return POOL_CACHE;
  const seen = new Set<string>();
  POOL_CACHE = [
    ...tag(PRESENT_SIMPLE_EXERCISES), ...tag(PRESENT_CONTINUOUS_EXERCISES), ...tag(PRESENT_PERFECT_EXERCISES),
    ...tag(PRESENT_PERFECT_CONTINUOUS_EXERCISES), ...tag(FOR_SINCE_EXERCISES), ...tag(ALL_PRESENT_TRAINING),
    ...tag(PAST_SIMPLE_EXERCISES), ...tag(PAST_CONTINUOUS_EXERCISES), ...tag(PAST_PERFECT_EXERCISES), ...tag(ORDER_EXERCISES),
    ...tag(PAST_PERFECT_CONTINUOUS_EXERCISES), ...tag(POINT_EXERCISES), ...tag(ALL_PAST_TRAINING),
    ...tag(FUTURE_SIMPLE_EXERCISES), ...tag(WHY_WILL_EXERCISES), ...tag(FUTURE_CONTINUOUS_EXERCISES), ...tag(LOOK_AHEAD_EXERCISES),
    ...tag(FUTURE_PERFECT_EXERCISES), ...tag(DEADLINE_EXERCISES), ...tag(FUTURE_PERFECT_CONTINUOUS_EXERCISES), ...tag(TIMER_EXERCISES),
    ...tag(ALL_FUTURE_TRAINING),
    ...COORD_TRAINING.map((i) => fromCoord(i, "coordinates")),
    ...A12_TRAINING.map((i) => fromCoord(i, "all-12")),
  ].filter((p) => (seen.has(p.ex.id) ? false : (seen.add(p.ex.id), true)));
  return POOL_CACHE;
}

export const mixedPool = () => reviewPool().filter((p) => p.tenseId === "all-12");

/** Навыки заданий, которые тоже относятся к карточке. */
const CARD_SKILLS: Record<string, string[]> = {
  v3: ["v3_form"],
  "at-by": ["at_vs_by"],
  "for-since": ["for_since", "for-since"],
  "result-duration": ["result_vs_duration"],
  "ing-helper": ["ing_form", "ing", "be-form"],
  been: ["been"],
  question: ["question", "question_order"],
  negative: ["negative"],
};

export function matches(p: PoolItem, card: HelpCard): boolean {
  if (card.categories.includes(p.ex.errorCategory)) return true;
  const sk = CARD_SKILLS[card.id] ?? [];
  return sk.includes(p.ex.skill) || (p.ex.skills ?? []).some((s) => sk.includes(s));
}

export type ReviewTopic = { card: HelpCard; count: number; last: number };

/** «Что стоит повторить»: темы по числу ошибок (при равенстве — свежие выше). */
export function reviewTopics(state: ProgressState | null): ReviewTopic[] {
  const map = new Map<string, ReviewTopic>();
  (state?.mistakes ?? []).forEach((m) => {
    const card = cardFor(m.category);
    if (!card) return;
    const t = map.get(card.id) ?? { card, count: 0, last: 0 };
    t.count += 1;
    t.last = Math.max(t.last, m.at);
    map.set(card.id, t);
  });
  return [...map.values()]
    .filter((t) => reviewPool().some((p) => matches(p, t.card)))
    .sort((a, b) => b.count - a.count || b.last - a.last);
}

/* ---------------- История показов (чтобы не повторять одно и то же) ---------------- */

const KEY = "ets-review-v1";
type ReviewStore = { recent: string[]; last?: { score: number; total: number; at: number } | undefined };

export function loadReview(): ReviewStore {
  if (typeof window === "undefined") return { recent: [] };
  try {
    const s = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as ReviewStore | null;
    return { recent: s?.recent ?? [], last: s?.last };
  } catch {
    return { recent: [] };
  }
}

export function saveReviewResult(ids: string[], score: number, total: number) {
  const s = loadReview();
  const recent = [...ids, ...s.recent.filter((x) => !ids.includes(x))].slice(0, 60);
  window.localStorage.setItem(KEY, JSON.stringify({ recent, last: { score, total, at: Date.now() } }));
}

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export type ReviewQuestion = PoolItem & { topicId: string | null };

/**
 * 10 заданий: ~6–7 по главным ошибкам, ~2–3 по другим темам, остальное — смешанные из «Все 12».
 * Если тем мало — не больше 6 заданий на слабые места, остальное смешанное.
 * Сначала задания, которые давно не показывались.
 */
export function buildSession(state: ProgressState | null, focusId?: string, size = 10): ReviewQuestion[] {
  const recent = new Set(loadReview().recent);
  const used = new Set<string>();
  const out: ReviewQuestion[] = [];
  const pick = (cand: PoolItem[], n: number, topicId: string | null) => {
    const fresh = shuffle(cand.filter((p) => !used.has(p.ex.id) && !recent.has(p.ex.id)));
    const old = shuffle(cand.filter((p) => !used.has(p.ex.id) && recent.has(p.ex.id)));
    for (const p of [...fresh, ...old].slice(0, n)) {
      used.add(p.ex.id);
      out.push({ ...p, topicId });
    }
  };
  const pool = reviewPool();
  let topics = reviewTopics(state);
  if (focusId) {
    const card = HELP_CARDS.find((c) => c.id === focusId);
    if (card) topics = [{ card, count: 1, last: Date.now() }, ...topics.filter((t) => t.card.id !== focusId)];
  }
  if (topics.length) {
    const main = topics[0]!;
    const others = topics.slice(1, 3);
    const mainN = others.length ? 4 : 6;
    pick(pool.filter((p) => matches(p, main.card)), mainN, main.card.id);
    others.forEach((t, k) => pick(pool.filter((p) => matches(p, t.card)), k === 0 ? 3 : 2, t.card.id));
    if (!others.length) {
      // одна тема — не больше 6 заданий на неё
    } else {
      const extra = Math.min(7, size - 2) - out.length;
      if (extra > 0) pick(pool.filter((p) => matches(p, main.card)), extra, main.card.id);
    }
  }
  pick(mixedPool(), size - out.length, null);
  return out.slice(0, size);
}
