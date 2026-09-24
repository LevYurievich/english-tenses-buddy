import { useState } from "react";
import { Tensy } from "@/components/Tensy";
import {
  MEANINGS,
  MEANING_INFO,
  TENSE_INFO,
  ZONES,
  ZONE_INFO,
  tenseOf,
  type Meaning,
  type Zone,
} from "@/data/coordinates/model";
import { Matrix } from "./Matrix";

const FAMILIES: { meaning: Meaning; idea: string; lines: [Zone, string][]; note?: string }[] = [
  {
    meaning: "simple",
    idea: "FACT / EVENT / BASIC VIEW",
    lines: [
      ["present", "Tom plays football every Saturday. → регулярность, привычка"],
      ["past", "Tom played football last Saturday. → завершённое событие"],
      ["future", "I think Tom will play football next Saturday. → прогноз"],
    ],
    note: "Simple показывает ситуацию без фокуса на процессе, результате или длительности. Эти формы относятся к разным коммуникативным ситуациям: Present Simple — ещё и факты, состояния, расписания; Past Simple — последовательность событий, прошлые привычки; Future Simple — решения, обещания, предложения. Это учебная модель, а не абсолютное определение.",
  },
  {
    meaning: "process",
    idea: "PROCESS — меняется только точка",
    lines: [
      ["present", "I am studying. (сейчас)"],
      ["past", "At 8 yesterday, I was studying."],
      ["future", "At 8 tomorrow, I will be studying."],
    ],
  },
  {
    meaning: "result",
    idea: "RESULT RELATIVE TO A REFERENCE POINT",
    lines: [
      ["present", "I have finished. ★ NOW"],
      ["past", "I had finished before Tom arrived. ★ PAST"],
      ["future", "I will have finished by 8. ★ FUTURE"],
    ],
  },
  {
    meaning: "duration",
    idea: "PROCESS + DURATION UP TO A REFERENCE POINT",
    lines: [
      ["present", "████→ ★ I have been studying for two hours."],
      ["past", "████→ ★ I had been studying for two hours before Tom arrived."],
      ["future", "████→ ★ By 8, I will have been studying for two hours."],
    ],
  },
];

export function CoordinatesTheory({ onDone }: { onDone: () => void }) {
  const [zone, setZone] = useState<Zone | null>(null);
  const [meaning, setMeaning] = useState<Meaning | null>(null);
  const tense = zone && meaning ? tenseOf(zone, meaning) : null;

  return (
    <div className="space-y-6">
      <section className="card-surface overflow-hidden p-5 sm:p-7">
        <p className="text-xs font-bold tracking-widest text-primary">НОВЫЙ УРОВЕНЬ</p>
        <h2 className="mt-1 text-2xl sm:text-3xl">Чтобы выбрать время, найди две координаты</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          <div className="rounded-2xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold text-muted-foreground">КООРДИНАТА 1</p>
            <p className="font-display text-xl font-bold">ГДЕ?</p>
            <p className="mt-2 text-sm">PAST ← NOW ● → FUTURE</p>
            <p className="mt-1 text-xs text-muted-foreground">Где точка отсчёта — не обязательно слово now, yesterday или tomorrow.</p>
          </div>
          <span className="text-center text-2xl font-bold text-primary" aria-hidden>+</span>
          <div className="rounded-2xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold text-muted-foreground">КООРДИНАТА 2</p>
            <p className="font-display text-xl font-bold">ЧТО?</p>
            <ul className="mt-2 space-y-0.5 text-sm">
              {MEANINGS.map((m) => (
                <li key={m}>{MEANING_INFO[m].icon} {MEANING_INFO[m].label}</li>
              ))}
            </ul>
          </div>
          <span className="text-center text-2xl font-bold text-primary" aria-hidden>=</span>
          <div className="rounded-2xl bg-primary/10 p-4 text-center">
            <p className="font-display text-4xl font-bold text-primary">3 × 4</p>
            <p className="font-bold">= 12 времён</p>
            <p className="mt-1 text-xs text-muted-foreground">не 12 отдельных правил, а одна система</p>
          </div>
        </div>
      </section>

      <Tensy mood="map" title="Tensy">
        Теперь машина времени работает по координатам. Сначала выбери, ГДЕ мы находимся. Потом — ЧТО хотим показать.
      </Tensy>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Матрица 3 × 4</h2>
        <p className="text-sm text-muted-foreground">
          Колонки — точка отсчёта (NOW / PAST / FUTURE). Строки — смысл. На пересечении — одно время.
        </p>
        <Matrix />
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <p className="text-xs font-bold tracking-widest text-primary">НАВИГАТОР ВРЕМЕНИ</p>
        <h2 className="text-xl">Выбери направление и режим наблюдения</h2>
        <div className="space-y-2">
          <p className="text-sm font-bold">1. Направление</p>
          <div className="grid grid-cols-3 gap-2">
            {(["past", "present", "future"] as Zone[]).map((z) => (
              <button key={z} type="button" aria-pressed={zone === z} onClick={() => setZone(z)} className={`rounded-xl border-2 p-3 font-bold ${zone === z ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>
                {z === "past" ? "← PAST" : z === "present" ? "● NOW" : "FUTURE →"}
              </button>
            ))}
          </div>
          <p className="pt-2 text-sm font-bold">2. Режим наблюдения</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MEANINGS.map((m) => (
              <button key={m} type="button" aria-pressed={meaning === m} onClick={() => setMeaning(m)} className={`rounded-xl border-2 p-3 text-left text-sm font-bold ${meaning === m ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>
                {MEANING_INFO[m].icon} {MEANING_INFO[m].label}
                <span className="block text-xs font-normal text-muted-foreground">{MEANING_INFO[m].ru}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-muted/60 p-4" aria-live="polite">
          {tense ? (
            <>
              <p className="font-display text-lg font-bold text-primary">{TENSE_INFO[tense].title}</p>
              <p className="text-sm">{TENSE_INFO[tense].formula}</p>
              <p className="mt-1 italic">{TENSE_INFO[tense].example}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Выбери обе координаты — навигатор покажет время.</p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Один смысл — три временные зоны</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {FAMILIES.map((f) => (
            <article key={f.meaning} className="card-surface space-y-3 p-5">
              <p className="text-xs font-bold tracking-widest text-primary">
                {MEANING_INFO[f.meaning].icon} {MEANING_INFO[f.meaning].aspect} FAMILY
              </p>
              <p className="font-display font-bold">{f.idea}</p>
              <ul className="space-y-2 text-sm">
                {f.lines.map(([z, text]) => (
                  <li key={z} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2">
                    <span className="font-bold text-muted-foreground">{ZONE_INFO[z].label}</span>
                    <span>
                      {text}
                      <span className="block text-xs text-muted-foreground">↓ {TENSE_INFO[tenseOf(z, f.meaning)].title}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {f.note ? <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">{f.note}</p> : null}
            </article>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Важно: разница между временами одной строки — не только в точке отсчёта. Например, Past Simple и Present Perfect отвечают на разные вопросы: «когда это было?» и «что есть сейчас?».
        </p>
      </section>

      <section className="card-surface flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">Сначала потренируем каждую координату отдельно.</p>
        <button type="button" onClick={onDone} className="rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground">
          Шаг 1: ГДЕ? →
        </button>
      </section>
      <p className="sr-only">{ZONES.length} зоны</p>
    </div>
  );
}
