/**
 * Final Challenge: сборка 30 вопросов, проверка, сохранение результата.
 * Только localStorage. Переиспользует analyze / recordCoordAnswer / карточки Tensy.
 */
import { FINAL_ID, FINAL_NEW, FINAL_POOL, FINAL_SIZE, type FinalQuestion } from "@/data/final/items";
import type { CoordItem } from "@/data/coordinates/items";
import type { TenseKey } from "@/data/coordinates/model";
import { isCorrect } from "./answer-check";
import { analyze, formSkillOf, recordCoordAnswer, type Analysis, type Store } from "./coordinates-stats";
import { recordTest } from "./progress";
import { cardFor, HELP_CARDS, type HelpCard } from "@/data/review-cards";

export const FINAL_STORE: Store = { key: "ets-final-attempts-v1", event: "ets-final-change", tenseId: FINAL_ID };
const KEY = "ets-final-v1";

type Saved = { recent: string[]; last?: { at: number; answers: { id: string; answers: string[] }[] } | undefined; completed: number };

export function loadFinal(): Saved {
  if (typeof window === "undefined") return { recent: [], completed: 0 };
  try {
    const s = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as Saved | null;
    return { recent: s?.recent ?? [], last: s?.last, completed: s?.completed ?? 0 };
  } catch {
    return { recent: [], completed: 0 };
  }
}

const BASIC: TenseKey[] = ["present-simple", "past-simple", "present-perfect", "present-continuous"];
const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j]!, r[i]!];
  }
  return r;
};

/** 30 вопросов: все 12 времён, базовые до 4 раз, сложные до 2; недавние — в последнюю очередь. */
export function buildFinal(): FinalQuestion[] {
  const recent = new Set(loadFinal().recent);
  const fresh = (list: FinalQuestion[]) => [...shuffle(list.filter((q) => !recent.has(q.id))), ...shuffle(list.filter((q) => recent.has(q.id)))];
  const count = new Map<TenseKey, number>();
  const cap = (t: TenseKey) => (BASIC.includes(t) ? 4 : 2);
  const picked: FinalQuestion[] = [];
  const fits = (q: FinalQuestion) => !picked.includes(q) && q.items.every((i) => (count.get(i.tense) ?? 0) < cap(i.tense));
  const take = (q: FinalQuestion) => {
    picked.push(q);
    q.items.forEach((i) => count.set(i.tense, (count.get(i.tense) ?? 0) + 1));
  };
  // 1) 8 новых вопросов (разные типы заданий)
  fresh(FINAL_NEW).slice(0, 8).forEach((q) => fits(q) && take(q));
  // 2) каждое из 12 времён — хотя бы один раз
  const pool = fresh(FINAL_POOL);
  const tenses = [...new Set(FINAL_POOL.flatMap((q) => q.items.map((i) => i.tense)))];
  tenses.forEach((t) => {
    if (count.get(t)) return;
    const q = pool.find((x) => fits(x) && x.items.some((i) => i.tense === t));
    if (q) take(q);
  });
  // 3) добираем до 30
  for (const q of pool) {
    if (picked.length >= FINAL_SIZE) break;
    if (fits(q)) take(q);
  }
  return shuffle(picked);
}

export type ItemResult = { item: CoordItem; answer: string; analysis: Analysis };
export type QuestionResult = { q: FinalQuestion; items: ItemResult[]; correct: boolean };

export function gradeItem(item: CoordItem, answer: string): ItemResult {
  const ok = isCorrect(answer, [...item.acceptableAnswers, ...(item.variants ?? []).flatMap((v) => v.answers)]);
  return { item, answer, analysis: analyze(item, answer, ok) };
}

export function grade(q: FinalQuestion, answers: string[]): QuestionResult {
  const items = q.items.map((it, i) => gradeItem(it, answers[i] ?? ""));
  return { q, items, correct: items.every((r) => r.analysis.correct) };
}

/** Сохраняет результат: история ошибок, диагностика, тест, набор для следующей попытки. */
export function finishFinal(results: QuestionResult[], answers: { id: string; answers: string[] }[]) {
  results.forEach((r) => r.items.forEach((x) => recordCoordAnswer(x.item, x.answer, x.analysis, undefined, FINAL_STORE)));
  recordTest(FINAL_ID, results.filter((r) => r.correct).length, results.length);
  const prev = loadFinal();
  const next: Saved = { recent: answers.map((a) => a.id), last: { at: Date.now(), answers }, completed: prev.completed + 1 };
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

/** Восстанавливает последний результат после обновления страницы. */
export function restoreLast(): QuestionResult[] | null {
  const last = loadFinal().last;
  if (!last) return null;
  const byId = new Map(FINAL_POOL.map((q) => [q.id, q]));
  const out = last.answers.flatMap((a) => {
    const q = byId.get(a.id);
    return q ? [grade(q, a.answers)] : [];
  });
  return out.length ? out : null;
}

const FORM_CARD: Record<string, string> = { V3: "v3", V2: "v2", "V-ing": "ing-helper", "Вспомогательный глагол": "have-has", "Отрицание": "negative" };

export function formSkill(r: ItemResult): string {
  return formSkillOf(r.item.tense, r.answer, r.item.correctAnswer);
}

/** До 3 самых релевантных существующих карточек Tensy по ошибкам. */
export function topCards(results: QuestionResult[]): HelpCard[] {
  const map = new Map<string, { card: HelpCard; n: number }>();
  results.flatMap((r) => r.items).filter((x) => !x.analysis.correct).forEach((x) => {
    const card = x.analysis.formOk === false
      ? HELP_CARDS.find((c) => c.id === FORM_CARD[formSkill(x)]) ?? null
      : cardFor(x.analysis.highLevelError ?? x.item.errorCategory) ?? cardFor(x.item.errorCategory);
    if (!card) return;
    const e = map.get(card.id) ?? { card, n: 0 };
    e.n += 1;
    map.set(card.id, e);
  });
  return [...map.values()].sort((a, b) => b.n - a.n).slice(0, 3).map((e) => e.card);
}
