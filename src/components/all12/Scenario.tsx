import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { isCorrect } from "@/lib/answer-check";
import { analyze, recordCoordAnswer, type Analysis } from "@/lib/coordinates-stats";
import { ALL12_STORE } from "@/lib/all12-stats";
import { scenarioItems, type Scenario } from "@/data/all12/items";
import type { CoordItem } from "@/data/coordinates/items";
import { MEANING_INFO, TENSE_INFO, ZONE_INFO, type TenseKey } from "@/data/coordinates/model";
import type { SessionRow } from "@/components/coordinates/Trainer";

/** Куда «переехала» точка отсчёта — показывается только после ответа. */
function trackLabel(t: TenseKey): string {
  if (t === "past-perfect" || t === "past-perfect-continuous") return "PAST BEFORE PAST";
  if (t === "future-perfect" || t === "future-perfect-continuous") return "FUTURE (к точке)";
  if (t.startsWith("present-perfect")) return "NOW (итог к сейчас)";
  return ZONE_INFO[t.split("-")[0] as "present" | "past" | "future"].label;
}

/** Level 4: мини-сценарии с 2–4 глаголами. Название времени — только после проверки. */
export function Scenarios({
  scenarios,
  onComplete,
  onFinish,
  renderSummary,
}: {
  scenarios: Scenario[];
  onComplete?: (rows: SessionRow[]) => void;
  onFinish?: () => void;
  renderSummary: (rows: SessionRow[]) => React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const [rows, setRows] = useState<SessionRow[]>([]);

  if (i >= scenarios.length) {
    return (
      <section className="card-surface space-y-4 p-6">
        {renderSummary(rows)}
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => { setI(0); setRows([]); }} className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">
            Пройти ещё раз
          </button>
          {onFinish ? (
            <button type="button" onClick={onFinish} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              К результатам →
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Уровень 4 — в одной истории точка отсчёта двигается. Для каждого глагола реши заново: ГДЕ? и ЧТО?</p>
      <ProgressBar value={(i / scenarios.length) * 100} label={`История ${i + 1} из ${scenarios.length}`} />
      <ScenarioCard
        key={scenarios[i]!.id}
        scenario={scenarios[i]!}
        onDone={(r) => {
          const next = [...rows, ...r];
          setRows(next);
          if (i === scenarios.length - 1) onComplete?.(next);
        }}
        onNext={() => setI(i + 1)}
      />
    </div>
  );
}

function ScenarioCard({ scenario, onDone, onNext }: { scenario: Scenario; onDone: (r: SessionRow[]) => void; onNext: () => void }) {
  const items = scenarioItems(scenario);
  const [values, setValues] = useState<string[]>(items.map(() => ""));
  const [results, setResults] = useState<{ a: Analysis; note: string | null }[] | null>(null);
  const [why, setWhy] = useState(false);

  const check = () => {
    if (results || values.some((v) => !v.trim())) return;
    const out = items.map((item, k) => {
      const v = values[k]!;
      const variant = item.variants?.find((x) => isCorrect(v, x.answers));
      const ok = isCorrect(v, item.acceptableAnswers) || !!variant;
      const a = analyze(item, v, ok);
      recordCoordAnswer(item, v, a, undefined, ALL12_STORE);
      return { a, note: variant?.note ?? null };
    });
    setResults(out);
    onDone(out.map((r, k) => ({ item: items[k]!, analysis: r.a })));
  };

  let k = -1;
  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      <div className="space-y-2 text-lg leading-relaxed">
        {scenario.lines.map((line, n) => {
          if (!line.blank) return <p key={n}>{line.text}</p>;
          k += 1;
          const idx = k;
          const [before, after] = line.text.split("___");
          const r = results?.[idx];
          return (
            <p key={n}>
              {before}
              <input
                value={values[idx]}
                disabled={!!results}
                onChange={(e) => setValues(values.map((x, j) => (j === idx ? e.target.value : x)))}
                aria-label={`Пропуск ${idx + 1}: ${line.blank.verb}`}
                autoComplete="off"
                autoCapitalize="off"
                className={`mx-1 w-40 rounded-lg border-2 bg-background px-2 py-0.5 text-base outline-none focus:border-primary ${r ? (r.a.correct ? "border-success" : "border-destructive") : "border-border"}`}
              />
              <span className="text-sm text-muted-foreground">({line.blank.verb})</span>
              {after}
            </p>
          );
        })}
      </div>

      {!results ? (
        <button type="button" onClick={check} disabled={values.some((v) => !v.trim())} className="rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground disabled:opacity-50">
          Проверить
        </button>
      ) : (
        <div className="space-y-3">
          <ul className="space-y-2 text-sm">
            {items.map((item, j) => (
              <BlankFeedback key={item.id} item={item} n={j + 1} user={values[j]!} a={results[j]!.a} note={results[j]!.note} />
            ))}
          </ul>
          <div className="rounded-xl bg-muted/60 p-3 text-sm">
            <p className="font-display font-bold">Следи за временем</p>
            <ol className="mt-1 space-y-0.5 font-mono text-xs">
              {items.map((item, j) => (
                <li key={item.id}>
                  Глагол {j + 1} ({item.correctAnswer}) → {trackLabel(item.tense)}
                </li>
              ))}
            </ol>
          </div>
          <button type="button" onClick={() => setWhy(!why)} aria-expanded={why} className="rounded-xl border-2 border-primary/40 px-3 py-1.5 text-sm font-bold text-primary">
            Почему?
          </button>
          {why ? (
            <ol className="space-y-2 rounded-xl bg-muted/60 p-3 text-sm">
              {items.map((item, j) => (
                <li key={item.id}>
                  <b>{j + 1}.</b> ГДЕ? {ZONE_INFO[item.timeCoordinate].label} · ЧТО? {MEANING_INFO[item.aspectMeaning].label} → {TENSE_INFO[item.tense].title} ({TENSE_INFO[item.tense].formula}) → <b>{item.correctAnswer}</b>. {item.whyWhere}
                </li>
              ))}
            </ol>
          ) : null}
          <div>
            <button type="button" onClick={onNext} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              Дальше →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function BlankFeedback({ item, n, user, a, note }: { item: CoordItem; n: number; user: string; a: Analysis; note: string | null }) {
  const z = ZONE_INFO[item.timeCoordinate];
  const m = MEANING_INFO[item.aspectMeaning];
  let text = "";
  if (!a.correct) {
    if (a.formOk === false) text = `Время выбрано верно, ошибка в форме: ${TENSE_INFO[item.tense].formula}.`;
    else if (a.chosen && a.coordOk && !a.meaningOk) text = `Зона ${z.label} ✓, но смысл другой: нужен ${m.label}, а не ${MEANING_INFO[item.aspectMeaning === "simple" ? "simple" : item.aspectMeaning].label === m.label && a.chosen ? MEANING_INFO[(a.chosen.includes("perfect-continuous") ? "duration" : a.chosen.includes("perfect") ? "result" : a.chosen.includes("continuous") ? "process" : "simple")].label : ""}. Это ошибка смысла.`;
    else if (a.chosen && !a.coordOk && a.meaningOk) text = `Смысл ${m.label} ✓, но точка отсчёта здесь — ${z.label}. Это ошибка координаты.`;
    else if (a.chosen) text = `Нужны другие координаты: ${z.label} + ${m.label}.`;
  }
  return (
    <li className={`rounded-xl p-2.5 ${a.correct ? "bg-success/10" : "bg-destructive/10"}`}>
      <b>{n}.</b> {a.correct ? `✓ ${user}` : `✗ ${user} → правильно: ${item.correctAnswer}`}
      {note ? <span className="block text-muted-foreground">Этот вариант грамматически возможен, но меняет фокус. {note}</span> : null}
      {text ? <span className="block">{text}</span> : null}
    </li>
  );
}
