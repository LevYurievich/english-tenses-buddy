import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  HEURISTIC_NOTE,
  MEANING_CARDS,
  PAST_CONTRAST_SETS,
  PAST_DECISION_TREE,
  PAST_MAP,
  PAST_MNEMONIC_CARDS,
  TIMELINE_ROWS,
} from "@/data/all-past/theory";
import { DecisionTreeCard, MnemonicCards, TenseMapTable } from "./FamilyTheory";

/** Теория модуля «Все Past»: четыре смысла → шпаргалка → алгоритм → линия времени. */
export function PastFamilyTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-4">
      <Tensy mood="map">
        Мы изучили четыре способа говорить о прошлом. Теперь попробуем путешествовать по нему без
        подсказок.
      </Tensy>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Четыре главных вопроса</h2>
        <p className="text-sm text-muted-foreground">
          Начинаем не с формулы, а со смысла: сначала пойми, что важно в ситуации.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {MEANING_CARDS.map((c) => (
            <div key={c.tense} className="rounded-2xl border-2 border-border p-4">
              <p className="font-mono text-sm text-primary" aria-hidden>
                {c.icon}
              </p>
              <p className="mt-1 font-display text-base font-bold">{c.question}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.meaning}</p>
              <p className="mt-2 text-sm font-semibold">{c.example}</p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">{c.line}</p>
              <p className="mt-2 text-xs font-bold tracking-widest text-primary">
                {c.tense.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Главная шпаргалка</h2>
        <TenseMapTable rows={PAST_MAP} />
        <MnemonicCards cards={PAST_MNEMONIC_CARDS} />
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Алгоритм выбора</h2>
        <p className="text-sm font-bold tracking-widest text-primary">СМЫСЛ → ВРЕМЯ → ФОРМУЛА</p>
        <DecisionTreeCard steps={PAST_DECISION_TREE} />
        <p className="rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground">
          {HEURISTIC_NOTE}
        </p>
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Одна линия времени</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[320px] space-y-3">
            <p className="flex justify-between font-mono text-xs text-muted-foreground">
              <span>PAST</span>
              <span>NOW</span>
            </p>
            {TIMELINE_ROWS.map((r) => (
              <div key={r.tense} className="rounded-xl border-2 border-border p-3">
                <p className="font-mono text-sm text-primary" aria-hidden>
                  {r.art}
                </p>
                <p className="mt-1 text-sm font-semibold">{r.caption}</p>
                <p className="text-xs text-muted-foreground">{r.tense}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Одна ситуация — четыре времени</h2>
        {PAST_CONTRAST_SETS.map((set) => (
          <div key={set.verb} className="rounded-xl border-2 border-border p-4">
            <p className="font-display font-bold text-primary">{set.verb}</p>
            <ul className="mt-2 space-y-2 text-sm">
              {set.rows.map((row) => (
                <li key={row.sentence} className="flex flex-wrap items-baseline gap-2">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
                    {row.meaning}
                  </span>
                  <span>{row.sentence}</span>
                </li>
              ))}
            </ul>
            {set.askWhatChanges ? (
              <p className="mt-3 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
                {set.askWhatChanges}
              </p>
            ) : null}
          </div>
        ))}
        <Button onClick={onDone}>Я понял(а) → собрать время</Button>
      </section>
    </div>
  );
}
