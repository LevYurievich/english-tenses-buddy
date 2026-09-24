/**
 * Диагностика модуля «Координаты времени».
 * Отдельный ключ localStorage (обратная совместимость: старый прогресс не трогаем).
 * Ошибки делятся на три типа: координаты, смысла и формы глагола.
 */
import { useEffect, useState } from "react";
import { normalize } from "./answer-check";
import { recordAnswer } from "./progress";
import {
  ALL_TENSES,
  COORDINATES_ID,
  coordsOf,
  MEANINGS,
  MEANING_INFO,
  meaningPairCategory,
  PAIR_TITLES,
  TENSE_INFO,
  ZONES,
  ZONE_INFO,
  zonePairCategory,
  type Meaning,
  type TenseKey,
  type Zone,
} from "@/data/coordinates/model";
import { COORD_TRAINING, type CoordItem } from "@/data/coordinates/items";
import type { ErrorCategory } from "@/data/types";

const KEY = "ets-coordinates-v1";
const EVENT = "ets-coordinates-change";

export type Attempt = {
  source: "where" | "what" | "level" | "checkpoint" | "workshop" | "all12";
  /** Какая часть формы подвела (только при formOk === false). */
  formSkill?: string;
  correct: boolean;
  targetZone?: Zone;
  targetMeaning?: Meaning;
  target?: TenseKey;
  chosenZone?: Zone | null;
  chosenMeaning?: Meaning | null;
  chosen?: TenseKey | null;
  /** null — нельзя определить (форма не распознана). */
  coordOk?: boolean | null;
  meaningOk?: boolean | null;
  formOk?: boolean | null;
  highLevelError?: ErrorCategory | null;
  errorCategory?: ErrorCategory;
  at: number;
};

export type CoordState = { attempts: Record<string, Attempt> };

/** Хранилище попыток: модуль координат и All 12 используют одну логику, но разные ключи. */
export type Store = { key: string; event: string; tenseId: string };
export const COORD_STORE: Store = { key: KEY, event: EVENT, tenseId: COORDINATES_ID };

export function loadCoord(): CoordState {
  return loadStore(COORD_STORE);
}

export function loadStore(store: Store): CoordState {
  if (typeof window === "undefined") return { attempts: {} };
  try {
    const raw = window.localStorage.getItem(store.key);
    const parsed = raw ? (JSON.parse(raw) as CoordState) : null;
    return { attempts: parsed?.attempts ?? {} };
  } catch {
    return { attempts: {} };
  }
}

function saveAttempt(id: string, a: Attempt, store: Store = COORD_STORE) {
  const s = loadStore(store);
  s.attempts[id] = a;
  window.localStorage.setItem(store.key, JSON.stringify(s));
  window.dispatchEvent(new Event(store.event));
}

export function useCoord(): CoordState | null {
  return useStore(COORD_STORE);
}

export function useStore(store: Store): CoordState | null {
  const [s, set] = useState<CoordState | null>(null);
  useEffect(() => {
    const on = () => set(loadStore(store));
    on();
    window.addEventListener(store.event, on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener(store.event, on);
      window.removeEventListener("storage", on);
    };
  }, [store]);
  return s;
}

/** Какая часть формы подвела, если время выбрано верно. */
export function formSkillOf(tense: TenseKey, user: string, correct: string): string {
  const aux = (x: string) =>
    normalize(x)
      .split(" ")
      .filter((w) => ["am", "is", "are", "was", "were", "have", "has", "had", "been", "will", "be", "do", "does", "did", "not"].includes(w))
      .join(" ");
  if (aux(user) !== aux(correct)) {
    if (/\bnot\b|n't/.test(correct) !== /\bnot\b|n't/.test(user)) return "Отрицание";
    return "Вспомогательный глагол";
  }
  const { zone, meaning } = coordsOf(tense);
  if (meaning === "process" || meaning === "duration") return "V-ing";
  if (meaning === "result") return "V3";
  if (zone === "past") return "V2";
  return "V1";
}

/* ---------------- Распознавание времени по форме ---------------- */

const V2: Record<string, string> = {
  go: "went", see: "saw", eat: "ate", buy: "bought", have: "had", write: "wrote", take: "took",
  lose: "lost", break: "broke", read: "read", run: "ran", swim: "swam", drive: "drove", steal: "stole",
  leave: "left", sit: "sat", lie: "lay", get: "got", bring: "brought", speak: "spoke", drink: "drank",
  tell: "told", fly: "flew", stand: "stood", do: "did", be: "was", make: "made",
};

/** Определяет, какое время выбрал ученик по введённой форме. null — не распознано. */
export function classifyForm(answer: string, verb: string): TenseKey | null {
  let s = ` ${normalize(answer)} `;
  s = s
    .replace(/won't/g, "will not")
    .replace(/can't/g, "can not")
    .replace(/n't/g, " not")
    .replace(/'ll/g, " will")
    .replace(/'ve/g, " have")
    .replace(/'m/g, " am")
    .replace(/'re/g, " are")
    .replace(/'d/g, " had")
    .replace(/'s been/g, " has been")
    .replace(/'s (\w+ing)\b/g, " is $1")
    .replace(/'s /g, " has ")
    .replace(/\b(not|already|still|never|just|ever|always)\b/g, " ")
    .replace(/\s+/g, " ");
  const has = (re: RegExp) => re.test(s);
  if (has(/\bwill have been \w+ing\b/)) return "future-perfect-continuous";
  if (has(/\bwill have \w+/)) return "future-perfect";
  if (has(/\bwill be \w+ing\b/)) return "future-continuous";
  if (has(/\bwill \w+/)) return "future-simple";
  if (has(/\bhad been \w+ing\b/)) return "past-perfect-continuous";
  if (has(/\b(was|were) \w+ing\b/)) return "past-continuous";
  if (has(/\b(have|has) been \w+ing\b/)) return "present-perfect-continuous";
  if (has(/\b(have|has) \w+/)) return "present-perfect";
  if (has(/\b(am|is|are) \w+ing\b/)) return "present-continuous";
  if (has(/\bhad \w+/)) return "past-perfect";
  if (has(/\bdid\b/)) return "past-simple";
  if (has(/\b(do|does)\b/)) return "present-simple";
  const base = verb.split("/").pop()!.trim();
  const words = s.trim().split(" ");
  const last = words[words.length - 1] ?? "";
  if (last === V2[base] || (last.endsWith("ed") && !base.endsWith("ed"))) return "past-simple";
  if (last === base || last === `${base}s` || last === `${base}es` || last.startsWith(base.slice(0, -1)))
    return "present-simple";
  return null;
}

/* ---------------- Запись ответов ---------------- */

export function recordZone(id: string, question: string, target: Zone, chosen: Zone) {
  const ok = target === chosen;
  saveAttempt(id, {
    source: "where",
    correct: ok,
    targetZone: target,
    chosenZone: chosen,
    coordOk: ok,
    highLevelError: ok ? null : zonePairCategory(target, chosen),
    at: Date.now(),
  });
  recordAnswer({
    tenseId: COORDINATES_ID,
    exerciseId: id,
    correct: ok,
    category: ok ? "wrong_time_coordinate" : zonePairCategory(target, chosen),
    question,
    userAnswer: ZONE_INFO[chosen].label,
    correctAnswer: ZONE_INFO[target].label,
    explanation: "Шаг 1: где точка отсчёта?",
  });
}

export function recordMeaning(id: string, question: string, target: Meaning, chosen: Meaning) {
  const ok = target === chosen;
  saveAttempt(id, {
    source: "what",
    correct: ok,
    targetMeaning: target,
    chosenMeaning: chosen,
    meaningOk: ok,
    highLevelError: ok ? null : meaningPairCategory(target, chosen),
    at: Date.now(),
  });
  recordAnswer({
    tenseId: COORDINATES_ID,
    exerciseId: id,
    correct: ok,
    category: ok ? "wrong_aspect_selection" : meaningPairCategory(target, chosen),
    question,
    userAnswer: MEANING_INFO[chosen].label,
    correctAnswer: MEANING_INFO[target].label,
    explanation: "Шаг 2: что важно?",
  });
}

export function recordWorkshop(id: string, question: string, ok: boolean, user: string, answer: string) {
  saveAttempt(id, { source: "workshop", correct: ok, at: Date.now() });
  recordAnswer({
    tenseId: COORDINATES_ID,
    exerciseId: id,
    correct: ok,
    category: "wrong_aspect_selection",
    question,
    userAnswer: user,
    correctAnswer: answer,
    explanation: "Мастерская координат",
  });
}

export type Analysis = {
  correct: boolean;
  chosen: TenseKey | null;
  coordOk: boolean | null;
  meaningOk: boolean | null;
  formOk: boolean | null;
  highLevelError: ErrorCategory | null;
};

/** Разбирает ответ: ошибка координаты, смысла или формы. */
export function analyze(item: CoordItem, userAnswer: string, correct: boolean): Analysis {
  if (correct) {
    return { correct, chosen: item.tense, coordOk: true, meaningOk: true, formOk: true, highLevelError: null };
  }
  const chosen = classifyForm(userAnswer, item.verb);
  if (!chosen) {
    return { correct, chosen, coordOk: null, meaningOk: null, formOk: null, highLevelError: "tense_choice" as ErrorCategory };
  }
  if (chosen === item.tense) {
    return { correct, chosen, coordOk: true, meaningOk: true, formOk: false, highLevelError: "verb_form_after_tense_selection" };
  }
  const c = coordsOf(chosen);
  const coordOk = c.zone === item.timeCoordinate;
  const meaningOk = c.meaning === item.aspectMeaning;
  const highLevelError: ErrorCategory = !coordOk && !meaningOk
    ? "wrong_time_coordinate"
    : !coordOk
      ? zonePairCategory(item.timeCoordinate, c.zone)
      : meaningPairCategory(item.aspectMeaning, c.meaning);
  return { correct, chosen, coordOk, meaningOk, formOk: null, highLevelError };
}

export function recordCoordAnswer(
  item: CoordItem,
  userAnswer: string,
  a: Analysis,
  override?: { coordOk?: boolean; meaningOk?: boolean },
  store: Store = COORD_STORE,
) {
  const coordOk = override?.coordOk ?? a.coordOk;
  const meaningOk = override?.meaningOk ?? a.meaningOk;
  const c = a.chosen ? coordsOf(a.chosen) : null;
  saveAttempt(item.id, {
    source: store !== COORD_STORE ? "all12" : item.level === 4 ? "checkpoint" : "level",
    formSkill: a.formOk === false ? formSkillOf(item.tense, userAnswer, item.correctAnswer) : undefined,
    correct: a.correct,
    target: item.tense,
    targetZone: item.timeCoordinate,
    targetMeaning: item.aspectMeaning,
    chosen: a.chosen,
    chosenZone: c?.zone ?? null,
    chosenMeaning: c?.meaning ?? null,
    coordOk,
    meaningOk,
    formOk: a.formOk,
    highLevelError: a.highLevelError,
    errorCategory: item.errorCategory,
    at: Date.now(),
  }, store);
  recordAnswer({
    tenseId: store.tenseId,
    exerciseId: item.id,
    correct: a.correct,
    category: a.highLevelError ?? item.errorCategory,
    question: item.question.replace("___", `___ (${item.verb})`),
    userAnswer,
    correctAnswer: item.correctAnswer,
    explanation: `${ZONE_INFO[item.timeCoordinate].label} + ${MEANING_INFO[item.aspectMeaning].label} → ${TENSE_INFO[item.tense].title}`,
  });
}

/* ---------------- Диагностика ---------------- */

export const MIN_ANSWERS = 3;

export type Metric = { key: string; title: string; correct: number; total: number };

export const pct = (m: Metric) => Math.round((m.correct / m.total) * 100);
export const enough = (m: Metric) => m.total >= MIN_ANSWERS;

function metric(key: string, title: string, rows: boolean[]): Metric {
  return { key, title, correct: rows.filter(Boolean).length, total: rows.length };
}

export function diagnose(state: CoordState | null) {
  const list = Object.values(state?.attempts ?? {});
  const coordRows = list.filter((a) => typeof a.coordOk === "boolean");
  const meaningRows = list.filter((a) => typeof a.meaningOk === "boolean");
  const tenseRows = list.filter((a) => a.target);
  const formRows = list.filter((a) => a.target && a.formOk !== null && a.formOk !== undefined);

  const coordinate = metric("coordinate", "Time coordinate — временная зона", coordRows.map((a) => !!a.coordOk));
  const meaning = metric("meaning", "Meaning — смысл (аспект)", meaningRows.map((a) => !!a.meaningOk));
  const form = metric("form", "Форма глагола после выбора времени", formRows.map((a) => !!a.formOk));

  const byZone = ZONES.map((z) =>
    metric(z, `${ZONE_INFO[z].label} reference point`, coordRows.filter((a) => a.targetZone === z).map((a) => !!a.coordOk)),
  );
  const byMeaning = MEANINGS.map((m) =>
    metric(m, MEANING_INFO[m].label, meaningRows.filter((a) => a.targetMeaning === m).map((a) => !!a.meaningOk)),
  );
  const byTense = ALL_TENSES.map((t) =>
    metric(t, TENSE_INFO[t].title, tenseRows.filter((a) => a.target === t).map((a) => a.correct)),
  );

  // Накопительно, но свежие ошибки (последние 3 дня) весят больше — для выбора тренировки.
  const now = Date.now();
  const weight = (a: Attempt) => (now - a.at < 3 * 86400000 ? 2 : 1);
  const pairs = new Map<string, number>();
  list.forEach((a) => {
    if (a.highLevelError && PAIR_TITLES[a.highLevelError]) {
      pairs.set(a.highLevelError, (pairs.get(a.highLevelError) ?? 0) + weight(a));
    }
  });
  const formMap = new Map<string, number>();
  list.forEach((a) => {
    if (a.formOk === false && a.formSkill) formMap.set(a.formSkill, (formMap.get(a.formSkill) ?? 0) + 1);
  });
  const formIssues = [...formMap.entries()].map(([skill, count]) => ({ skill, count })).sort((a, b) => b.count - a.count);
  const confusions = [...pairs.entries()]
    .map(([key, count]) => ({ key, title: PAIR_TITLES[key]!, count }))
    .sort((a, b) => b.count - a.count);

  return { coordinate, meaning, form, byZone, byMeaning, byTense, confusions, formIssues, answered: list.length };
}

export type Diagnosis = ReturnType<typeof diagnose>;

/** «Где я ошибаюсь?» — человеческий вывод по двум координатам. */
export function whereIErr(d: Diagnosis): string[] {
  const out: string[] = [];
  const c = d.coordinate;
  const m = d.meaning;
  const strong = (x: Metric) => enough(x) && pct(x) >= 80;
  const weak = (x: Metric) => enough(x) && pct(x) < 70;
  const topMeaning = d.confusions.find((x) => !x.key.endsWith("_reference"));
  const topZone = d.confusions.find((x) => x.key.endsWith("_reference"));

  if (strong(c) && weak(m)) {
    out.push(
      `Ты хорошо определяешь временную зону, но иногда путаешь смысл${topMeaning ? `: ${topMeaning.title}` : ""}.`,
    );
  } else if (strong(m) && weak(c)) {
    out.push(
      `Ты правильно понимаешь смысл, но иногда ошибаешься с точкой отсчёта${topZone ? `: ${topZone.title}` : ""}.`,
    );
  } else if (weak(m) && weak(c)) {
    out.push("Пока сложно и с зоной, и со смыслом. Вернись к шагам «ГДЕ?» и «ЧТО?» по отдельности.");
  } else if (strong(m) && strong(c)) {
    out.push("Обе координаты ты определяешь уверенно.");
  }
  if (enough(d.form) && pct(d.form) < 80 && strong(c) && strong(m)) {
    out.push("Время ты выбираешь верно, но ошибаешься в форме глагола (V2, V3, -ing). Это не ошибка выбора времени.");
  } else if (enough(d.form) && pct(d.form) < 80) {
    out.push("Иногда время выбрано верно, но форма глагола неточная — проверь V2, V3 и -ing.");
  }
  if (!out.length) out.push("Недостаточно данных для вывода — ответь ещё на несколько заданий.");
  return out;
}

/** Слабые места: тренируем не конкретное время, а координату или смысл. */
export function weakAreaItems(state: CoordState | null, limit = 12): { title: string; items: CoordItem[] } | null {
  const d = diagnose(state);
  const attempts = state?.attempts ?? {};
  const top = d.confusions[0];
  let pool: CoordItem[] = [];
  let title = "";
  if (top) {
    title = top.title;
    const zonePairs: Record<string, Zone[]> = {
      present_vs_past_reference: ["present", "past"],
      present_vs_future_reference: ["present", "future"],
      past_vs_future_reference: ["past", "future"],
    };
    const meaningPairs: Record<string, Meaning[]> = {
      simple_vs_continuous_global: ["simple", "process"],
      simple_vs_perfect_global: ["simple", "result"],
      process_vs_result_global: ["process", "result"],
      result_vs_duration_global: ["result", "duration"],
      continuous_vs_perfect_continuous_global: ["process", "duration"],
      wrong_aspect_selection: MEANINGS,
    };
    if (zonePairs[top.key]) pool = COORD_TRAINING.filter((i) => zonePairs[top.key]!.includes(i.timeCoordinate));
    else if (meaningPairs[top.key])
      pool = COORD_TRAINING.filter((i) => meaningPairs[top.key]!.includes(i.aspectMeaning));
  }
  if (!pool.length) {
    const weakTense = d.byTense.filter((t) => t.total && t.correct < t.total).map((t) => t.key);
    if (!weakTense.length) return null;
    title = "Времена, где были ошибки";
    pool = COORD_TRAINING.filter((i) => weakTense.includes(i.tense));
  }
  const rank = (i: CoordItem) => (attempts[i.id]?.correct === false ? 0 : attempts[i.id] ? 2 : 1);
  const sorted = [...pool].sort((a, b) => rank(a) - rank(b));
  // Разные зоны вперемешку, чтобы не было подсказки «сейчас всё про Past».
  const out: CoordItem[] = [];
  const buckets = ZONES.map((z) => sorted.filter((i) => i.timeCoordinate === z));
  while (out.length < limit && buckets.some((b) => b.length)) {
    buckets.forEach((b) => {
      const next = b.shift();
      if (next && out.length < limit) out.push(next);
    });
  }
  return { title, items: out };
}
