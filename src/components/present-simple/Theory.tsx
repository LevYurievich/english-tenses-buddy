import { useState } from "react";
import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/Button";
import {
  CHEATSHEET,
  MARKER_WORDS,
  USAGE_EXAMPLES,
  USAGE_POINTS,
} from "@/data/present-simple/theory";

function Card({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      {kicker ? (
        <p className="text-xs font-bold tracking-widest text-primary">{kicker}</p>
      ) : null}
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function FormulaSwitcher() {
  const [tab, setTab] = useState<"pos" | "neg" | "q">("pos");
  const tabs = [
    { id: "pos", label: "Утверждение" },
    { id: "neg", label: "Отрицание" },
    { id: "q", label: "Вопрос" },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-xl bg-muted p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
              tab === t.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "pos" ? (
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="font-semibold">I / You / We / They → V1</p>
            <div className="flex flex-wrap items-start gap-2">
              <GrammarChip role="subject">I</GrammarChip>
              <GrammarChip role="verb" note="V1">
                play
              </GrammarChip>
              <GrammarChip role="object">football</GrammarChip>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-semibold">He / She / It → V1 + s/es</p>
            <div className="flex flex-wrap items-start gap-2">
              <GrammarChip role="subject">He</GrammarChip>
              <GrammarChip role="verb" note="V1 + s">
                plays
              </GrammarChip>
              <GrammarChip role="object">football</GrammarChip>
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-verb/50 bg-verb-soft p-4">
            <p className="font-display text-lg font-bold text-verb">HE / SHE / IT любят S</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Если действие выполняет he, she или it, обычно добавляем к глаголу -s или -es.
            </p>
          </div>
        </div>
      ) : null}

      {tab === "neg" ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-semibold">I / You / We / They → do not (don't) + V1</p>
            <div className="flex flex-wrap items-start gap-2">
              <GrammarChip role="subject">I</GrammarChip>
              <GrammarChip role="aux">don't</GrammarChip>
              <GrammarChip role="verb" note="V1">
                play
              </GrammarChip>
              <GrammarChip role="object">football</GrammarChip>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">He / She / It → does not (doesn't) + V1</p>
            <div className="flex flex-wrap items-start gap-2">
              <GrammarChip role="subject">He</GrammarChip>
              <GrammarChip role="aux">doesn't</GrammarChip>
              <GrammarChip role="verb" note="V1">
                play
              </GrammarChip>
              <GrammarChip role="object">football</GrammarChip>
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4">
            <p className="font-display text-lg font-bold text-aux">DOES забирает S себе</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Было: He plays.</li>
              <li>Стало: He doesn't play.</li>
              <li className="font-semibold text-destructive">Не: He doesn't plays.</li>
            </ul>
          </div>
        </div>
      ) : null}

      {tab === "q" ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-semibold">Do + подлежащее + V1 ?</p>
            <div className="flex flex-wrap items-start gap-2">
              <GrammarChip role="aux">Do</GrammarChip>
              <GrammarChip role="subject">you</GrammarChip>
              <GrammarChip role="verb" note="V1">
                play
              </GrammarChip>
              <GrammarChip role="object">football?</GrammarChip>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Does + подлежащее + V1 ?</p>
            <div className="flex flex-wrap items-start gap-2">
              <GrammarChip role="aux">Does</GrammarChip>
              <GrammarChip role="subject">he</GrammarChip>
              <GrammarChip role="verb" note="V1">
                play
              </GrammarChip>
              <GrammarChip role="object">football?</GrammarChip>
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4">
            <p className="font-display text-lg font-bold text-aux">
              Появился DOES → глагол снова V1
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Does she like cats?</li>
              <li className="font-semibold text-destructive">Не: Does she likes cats?</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PresentSimpleTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Card kicker="КАРТОЧКА 1" title="Когда нужен Present Simple?">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          ОБЫЧНО • РЕГУЛЯРНО • ФАКТ
        </p>
        <p className="text-muted-foreground">Present Simple используется, когда мы говорим:</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {USAGE_POINTS.map((p) => (
            <li key={p} className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">
              {p}
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          {USAGE_EXAMPLES.map((ex) => (
            <div key={ex.en} className="rounded-xl border border-border p-3">
              <p className="text-sm text-muted-foreground">{ex.ru}</p>
              <p className="font-semibold">{ex.en}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Слова-подсказки">
        <div className="flex flex-wrap gap-2">
          {MARKER_WORDS.map((w) => (
            <span
              key={w.en}
              className="rounded-lg border-2 border-dotted border-marker/60 bg-marker-soft px-3 py-2 text-sm font-semibold text-marker"
            >
              {w.en} — {w.ru}
            </span>
          ))}
        </div>
        <p className="font-semibold">Увидел такое слово? Проверь, не нужен ли Present Simple.</p>
        <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          Важно: наличие этих слов — не абсолютное правило. Всегда смотри на смысл предложения:
          например, «I'm playing now, but I usually study» — здесь usually относится ко второй
          части.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Формула Present Simple">
        <RoleLegend />
        <FormulaSwitcher />
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Секрет Present Simple">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
            <p className="font-display font-bold">Обычно → SIMPLE</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Если действие происходит обычно или регулярно, сначала подумай о Present Simple.
            </p>
          </div>
          <div className="rounded-xl border-2 border-verb/30 bg-verb-soft p-4">
            <p className="font-display font-bold text-verb">HE / SHE / IT → S</p>
            <p className="mt-1 text-sm">He plays. She reads. It works.</p>
          </div>
          <div className="rounded-xl border-2 border-aux/30 bg-aux-soft p-4">
            <p className="font-display font-bold text-aux">DO / DOES — помощники</p>
            <p className="mt-1 text-sm">I don't play. Does he play?</p>
          </div>
          <div className="rounded-xl border-2 border-aux/30 bg-aux-soft p-4">
            <p className="font-display font-bold text-aux">DOES забирает S</p>
            <p className="mt-1 text-sm">
              He likes pizza. → Does he like pizza? / He doesn't like pizza.
            </p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Мини-шпаргалка">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-12 border border-border bg-muted p-3" />
                {CHEATSHEET.columns.map((c) => (
                  <th key={c} className="border border-border bg-muted p-3 text-sm">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHEATSHEET.rows.map((row) => (
                <tr key={row.sign}>
                  <td className="border border-border p-3 text-center font-display text-lg font-bold">
                    {row.sign}
                  </td>
                  {row.cells.map((cell) => (
                    <td key={cell} className="border border-border p-3 font-semibold">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
