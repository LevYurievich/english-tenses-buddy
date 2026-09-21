import { Button } from "@/components/ui/app-button";
import {
  CONTRAST_SETS,
  DECISION_TREE,
  MNEMONIC_CARDS,
  PRESENT_MAP,
  type MnemonicCard,
  type TenseMapRow,
  type TreeStep,
} from "@/data/all-present/theory";

/** Карта времён — используется и в теории, и как «Шпаргалка Present» внутри тренировки. */
export function TenseMapTable({ rows }: { rows: TenseMapRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="text-xs font-bold tracking-widest text-muted-foreground">
            <th className="border-b-2 border-border py-2 pr-3">СМЫСЛ</th>
            <th className="border-b-2 border-border py-2 pr-3">ВРЕМЯ</th>
            <th className="border-b-2 border-border py-2 pr-3">ФОРМУЛА</th>
            <th className="border-b-2 border-border py-2">ПРИМЕР</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.tense} className="align-top">
              <td className="border-b border-border py-3 pr-3 font-semibold">{r.meaning}</td>
              <td className="border-b border-border py-3 pr-3 font-display font-bold text-primary">
                {r.tense}
              </td>
              <td className="border-b border-border py-3 pr-3 font-mono text-xs">{r.formula}</td>
              <td className="border-b border-border py-3">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MnemonicCards({ cards }: { cards: MnemonicCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((c) => (
        <div key={c.tense} className="rounded-2xl border-2 border-border p-4">
          <p className="text-3xl" aria-hidden>
            {c.icon}
          </p>
          <p className="mt-2 font-display text-lg font-bold">{c.short}</p>
          <p className="text-sm font-semibold text-primary">{c.meaning}</p>
          <p className="mt-2 text-sm text-muted-foreground">{c.tense}</p>
          <p className="mt-1 font-mono text-xs">{c.formula}</p>
        </div>
      ))}
    </div>
  );
}

export function DecisionTreeCard({ steps }: { steps: TreeStep[] }) {
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s.yes} className="rounded-xl border-2 border-border p-4">
          <p className="text-xs font-bold tracking-widest text-muted-foreground">ВОПРОС {i + 1}</p>
          <p className="mt-1 font-semibold">{s.question}</p>
          <p className="mt-2 text-sm">
            <span className="rounded-md bg-success/15 px-2 py-0.5 font-bold text-success">ДА</span>{" "}
            → <span className="font-display font-bold text-primary">{s.yes}</span>{" "}
            <span className="font-mono text-xs text-muted-foreground">({s.formula})</span>
          </p>
          {i < steps.length - 1 ? (
            <p className="mt-2 text-sm text-muted-foreground">НЕТ → следующий вопрос ↓</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Теория модуля «Все Present»: карта, мнемоники, дерево выбора, контрастные пары. */
export function FamilyTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-4">
      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Как выбрать время?</h2>
        <p className="text-sm text-muted-foreground">
          Главный вопрос не «какая формула», а «что важно в этой ситуации».
        </p>
        <TenseMapTable rows={PRESENT_MAP} />
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Четыре смысла — четыре времени</h2>
        <MnemonicCards cards={MNEMONIC_CARDS} />
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Дерево времён</h2>
        <DecisionTreeCard steps={DECISION_TREE} />
        <p className="rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground">
          Это учебный алгоритм, который помогает выбрать время в типичных ситуациях. В живом языке
          бывают исключения — тогда решает смысл и контекст.
        </p>
      </section>

      <section className="card-surface space-y-4 p-5 sm:p-6">
        <h2 className="text-xl">Один глагол — разные времена</h2>
        <p className="text-sm text-muted-foreground">
          Время зависит не от глагола, а от ситуации.
        </p>
        {CONTRAST_SETS.map((set) => (
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
          </div>
        ))}
        <Button onClick={onDone}>Я понял(а) → научи меня выбирать</Button>
      </section>
    </div>
  );
}
