import { useState, type ReactNode } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { isCorrect } from "@/lib/answer-check";
import { analyze, COORD_STORE, recordCoordAnswer, type Analysis, type Store } from "@/lib/coordinates-stats";
import type { CoordItem } from "@/data/coordinates/items";
import {
  coordsOf,
  MEANINGS,
  MEANING_INFO,
  TENSE_INFO,
  ZONES,
  ZONE_INFO,
  type Meaning,
  type Zone,
} from "@/data/coordinates/model";
import { Matrix } from "./Matrix";

export type TrainerMode = "guided" | "free" | "help" | "blind";

export type SessionRow = { item: CoordItem; analysis: Analysis };

/**
 * Тренажёр координат.
 * guided — две координаты по шагам + матрица; free — можно разобрать по координатам;
 * blind — только контекст. Название времени, формула и подсветка — только после ответа.
 */
export function Trainer({
  items,
  mode,
  intro,
  onFinish,
  finishLabel,
  renderSummary,
  onComplete,
  store = COORD_STORE,
}: {
  store?: Store;
  items: CoordItem[];
  mode: TrainerMode;
  intro: string;
  onFinish?: () => void;
  finishLabel?: string;
  renderSummary?: (rows: SessionRow[]) => ReactNode;
  onComplete?: (rows: SessionRow[]) => void;
}) {
  const [i, setI] = useState(0);
  const [rows, setRows] = useState<SessionRow[]>([]);

  if (i >= items.length) {
    const score = rows.filter((r) => r.analysis.correct).length;
    return (
      <section className="card-surface space-y-4 p-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-primary">РЕЗУЛЬТАТ</p>
          <h2 className="text-3xl">
            {score} из {items.length}
          </h2>
        </div>
        {renderSummary ? renderSummary(rows) : null}
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => { setI(0); setRows([]); }} className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">
            Пройти ещё раз
          </button>
          {onFinish ? (
            <button type="button" onClick={onFinish} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              {finishLabel ?? "Дальше"}
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{intro}</p>
      <ProgressBar value={(i / items.length) * 100} label={`Задание ${i + 1} из ${items.length}`} />
      <Card
        key={items[i]!.id}
        item={items[i]!}
        mode={mode}
        store={store}
        onDone={(analysis) => {
          const next = [...rows, { item: items[i]!, analysis }];
          setRows(next);
          if (next.length === items.length) onComplete?.(next);
        }}
        onNext={() => setI(i + 1)}
      />
    </div>
  );
}

function Choice<T extends string>({
  label,
  values,
  render,
  target,
  picked,
  onPick,
}: {
  label: string;
  values: T[];
  render: (v: T) => ReactNode;
  target: T;
  picked: T | null;
  onPick: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="font-display font-bold">{label}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {values.map((v) => {
          const state = picked === null ? "" : v === target ? "border-success bg-success/10" : v === picked ? "border-destructive bg-destructive/10" : "opacity-50";
          return (
            <button key={v} type="button" disabled={picked !== null} onClick={() => onPick(v)} className={`rounded-xl border-2 border-border p-2.5 text-left text-sm font-bold hover:border-primary/60 ${state}`}>
              {picked !== null && v === target ? "✓ " : picked === v && v !== target ? "✗ " : ""}
              {render(v)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const zoneLabel = (z: Zone) => `${ZONE_INFO[z].icon} ${ZONE_INFO[z].label}`;
const meaningLabel = (m: Meaning) => `${MEANING_INFO[m].icon} ${MEANING_INFO[m].label}`;

function Card({
  item,
  mode,
  store,
  onDone,
  onNext,
}: {
  item: CoordItem;
  mode: TrainerMode;
  store: Store;
  onDone: (a: Analysis) => void;
  onNext: () => void;
}) {
  const [zone, setZone] = useState<Zone | null>(null);
  const [meaning, setMeaning] = useState<Meaning | null>(null);
  const [breakdown, setBreakdown] = useState(false);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [showWhy, setShowWhy] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [variantNote, setVariantNote] = useState<string | null>(null);

  const guided = mode === "guided";
  const stepsDone = zone !== null && meaning !== null;
  const canAnswer = !guided || stepsDone;

  const submit = (answer: string) => {
    if (result || !answer.trim()) return;
    const variant = item.variants?.find((v) => isCorrect(answer, v.answers));
    const ok = isCorrect(answer, item.acceptableAnswers) || !!variant;
    setVariantNote(variant ? variant.note : null);
    const a = analyze(item, answer, ok);
    recordCoordAnswer(
      item,
      answer,
      a,
      guided && zone && meaning
        ? { coordOk: zone === item.timeCoordinate, meaningOk: meaning === item.aspectMeaning }
        : undefined,
      store,
    );
    setValue(answer);
    setResult(a);
    onDone(a);
  };

  const [before, after] = item.question.split("___");

  return (
    <section className="card-surface space-y-5 p-5 sm:p-6">
      {item.context?.length ? (
        <div className="space-y-1 rounded-xl bg-muted/60 p-3 text-lg leading-snug">
          {item.context.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      <p className="text-xl font-medium leading-snug">
        {before}
        <span className="mx-1 inline-block min-w-16 border-b-2 border-primary/60 text-center font-bold text-primary">
          {result ? item.correctAnswer : "___"}
        </span>
        {after}
        <span className="ml-2 text-base text-muted-foreground">({item.verb})</span>
      </p>

      {guided ? (
        <div className="space-y-4">
          <Choice label="Шаг 1. ГДЕ точка отсчёта?" values={ZONES} render={zoneLabel} target={item.timeCoordinate} picked={zone} onPick={setZone} />
          {zone ? <p className="text-sm text-muted-foreground">{item.whyWhere}</p> : null}
          {zone ? (
            <Choice label="Шаг 2. ЧТО хочет показать говорящий?" values={MEANINGS} render={meaningLabel} target={item.aspectMeaning} picked={meaning} onPick={setMeaning} />
          ) : null}
          {meaning ? <p className="text-sm text-muted-foreground">{item.whyWhat}</p> : null}
          {stepsDone ? (
            <div className="space-y-2">
              <p className="font-display font-bold">
                Шаг 3. Пересечение: {ZONE_INFO[item.timeCoordinate].label} × {MEANING_INFO[item.aspectMeaning].aspect} →{" "}
                <span className="text-primary">{TENSE_INFO[item.tense].title}</span> ({TENSE_INFO[item.tense].formula})
              </p>
              <Matrix zone={item.timeCoordinate} meaning={item.aspectMeaning} showExamples={false} />
            </div>
          ) : null}
        </div>
      ) : null}

      {(mode === "free" || mode === "help") && !result ? (
        <div>
          {!breakdown ? (
            <button type="button" onClick={() => setBreakdown(true)} className="text-sm font-bold text-primary underline-offset-4 hover:underline">
              {mode === "help" ? "🧭 Нужна помощь" : "🧭 Разобрать по координатам"}
            </button>
          ) : (
            <div className="space-y-3 rounded-xl bg-muted/60 p-3">
              <Choice label="ГДЕ?" values={ZONES} render={zoneLabel} target={item.timeCoordinate} picked={zone} onPick={setZone} />
              {zone ? <Choice label="ЧТО?" values={MEANINGS} render={meaningLabel} target={item.aspectMeaning} picked={meaning} onPick={setMeaning} /> : null}
              {stepsDone && mode === "help" ? (
                <p className="text-sm">
                  {ZONE_INFO[item.timeCoordinate].label} + {MEANING_INFO[item.aspectMeaning].label} →{" "}
                  <b>{TENSE_INFO[item.tense].title}</b> ({TENSE_INFO[item.tense].formula}). Теперь построй форму.
                </p>
              ) : stepsDone ? (
                <p className="text-sm">
                  {ZONE_INFO[item.timeCoordinate].label} + {MEANING_INFO[item.aspectMeaning].label} → теперь найди пересечение сам и построй форму.
                </p>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {canAnswer ? (
        <div className="space-y-2">
          {guided ? <p className="font-display font-bold">Шаг 4. Построй форму</p> : null}
          {item.options ? (
            <div className="grid grid-cols-2 gap-2">
              {item.options.map((o) => {
                const state = !result ? "" : item.acceptableAnswers.includes(o) ? "border-success bg-success/10" : o === value ? "border-destructive bg-destructive/10" : "opacity-50";
                return (
                  <button key={o} type="button" disabled={!!result} onClick={() => submit(o)} className={`rounded-xl border-2 border-border p-3 font-bold hover:border-primary/60 ${state}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(value);
              }}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!!result}
                autoFocus
                aria-label="Твой ответ"
                placeholder="Впиши форму глагола"
                autoComplete="off"
                autoCapitalize="off"
                className="min-w-0 flex-1 rounded-xl border-2 border-border bg-background px-3 py-2 text-lg outline-none focus:border-primary"
              />
              {!result ? (
                <button type="submit" className="rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground">
                  Проверить
                </button>
              ) : null}
            </form>
          )}
        </div>
      ) : null}

      {result ? (
        <Feedback item={item} variantNote={variantNote} result={result} userAnswer={value} showWhy={showWhy} setShowWhy={setShowWhy} showMap={showMap} setShowMap={setShowMap} onNext={onNext} />
      ) : null}
    </section>
  );
}

function Feedback({
  item,
  variantNote,
  result,
  userAnswer,
  showWhy,
  setShowWhy,
  showMap,
  setShowMap,
  onNext,
}: {
  item: CoordItem;
  variantNote: string | null;
  result: Analysis;
  userAnswer: string;
  showWhy: boolean;
  setShowWhy: (v: boolean) => void;
  showMap: boolean;
  setShowMap: (v: boolean) => void;
  onNext: () => void;
}) {
  const t = TENSE_INFO[item.tense];
  const z = ZONE_INFO[item.timeCoordinate];
  const m = MEANING_INFO[item.aspectMeaning];
  const others = ZONES.filter((x) => x !== item.timeCoordinate).map((x) => ZONE_INFO[x].label).join(" и ");

  let diagnosis: string | null = null;
  if (!result.correct) {
    if (result.formOk === false) {
      diagnosis = `Время выбрано верно (${t.title}), но форма неточная. Проверь: ${t.formula}.`;
    } else if (result.chosen) {
      const c = coordsOf(result.chosen);
      const chosenTitle = TENSE_INFO[result.chosen].title;
      if (result.coordOk && !result.meaningOk) {
        diagnosis = `Ошибка смысла. Зону ${z.label} ты определил(а) верно. ${chosenTitle} показывает ${MEANING_INFO[c.meaning].describe}. Здесь важен не ${MEANING_INFO[c.meaning].label}, а ${m.label}: ${m.describe}.`;
      } else if (!result.coordOk && result.meaningOk) {
        diagnosis = `Ошибка координаты. Смысл ${m.label} ты понял(а) верно, но ${chosenTitle} ставит точку отсчёта в ${ZONE_INFO[c.zone].label}. Здесь ${z.point}.`;
      } else {
        diagnosis = `${chosenTitle} — это ${ZONE_INFO[c.zone].label} + ${MEANING_INFO[c.meaning].label}. Здесь нужны обе другие координаты: ${z.label} + ${m.label}.`;
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className={`rounded-xl p-3 text-sm ${result.correct ? "bg-success/10" : "bg-destructive/10"}`}>
        <p className="font-bold">{result.correct ? "Верно!" : `Правильно: ${item.correctAnswer}`}</p>
        {!result.correct ? <p className="mt-1 text-muted-foreground">Твой ответ: {userAnswer}</p> : null}
        {variantNote ? <p className="mt-1">Этот вариант грамматически возможен, но меняет фокус предложения. {variantNote} Основной ответ: {item.correctAnswer}.</p> : null}
        {!result.correct && result.chosen && result.formOk !== false ? (
          <p className="mt-2 font-mono text-xs">
            ГДЕ? {z.label} {result.coordOk ? "✓" : "✗"} · ЧТО? {m.label} {result.meaningOk ? "✓" : "✗"}
          </p>
        ) : null}
        {diagnosis ? <p className="mt-1"><b>Почему мой ответ не подходит?</b> {diagnosis}</p> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setShowWhy(!showWhy)} aria-expanded={showWhy} className="rounded-xl border-2 border-primary/40 px-3 py-1.5 text-sm font-bold text-primary">
          Почему?
        </button>
        <button type="button" onClick={() => setShowMap(!showMap)} aria-expanded={showMap} className="rounded-xl border-2 border-primary/40 px-3 py-1.5 text-sm font-bold text-primary">
          Показать координаты
        </button>
      </div>
      {showWhy ? (
        <ol className="space-y-2 rounded-xl bg-muted/60 p-4 text-sm">
          <li><b>1. Где точка отсчёта?</b> {z.label}. {item.whyWhere}</li>
          <li><b>2. Что важно?</b> {m.label}. {item.whyWhat}</li>
          <li><b>3. Пересечение в матрице:</b> {z.label} × {m.aspect} → {t.title}</li>
          <li><b>4. Формула:</b> {t.formula}</li>
          <li><b>5. Форма глагола:</b> {item.verb} → {item.correctAnswer}</li>
          <li><b>6. Ответ:</b> {item.question.replace("___", item.correctAnswer)}</li>
          <li className="border-t border-border pt-2">
            <b>Почему не другие?</b> Точка отсчёта — {z.label}, поэтому времена {others} не нужны. Внутри {z.label} важен смысл «{m.ru}» — поэтому {t.title}, а не другое время этой зоны.
          </li>
        </ol>
      ) : null}
      {showMap ? <Matrix zone={item.timeCoordinate} meaning={item.aspectMeaning} showExamples={false} /> : null}
      <button type="button" onClick={onNext} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
        Дальше →
      </button>
    </div>
  );
}

