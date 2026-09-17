import { useState } from "react";
import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/app-button";
import {
  BE_TABLE,
  CHEATSHEET_SIGNS,
  ING_RULES,
  MARKER_WORDS,
  USAGE_CARDS,
} from "@/data/present-continuous/theory";

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
      {kicker ? <p className="text-xs font-bold tracking-widest text-primary">{kicker}</p> : null}
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Timeline() {
  return (
    <div className="rounded-xl border-2 border-border bg-muted/40 p-4">
      <div className="flex items-center justify-between text-xs font-bold tracking-widest text-muted-foreground">
        <span>PAST</span>
        <span className="text-primary">NOW</span>
        <span>FUTURE</span>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <div className="h-1 flex-1 rounded bg-border" />
        <div className="h-4 w-24 rounded bg-primary" aria-hidden />
        <div className="h-1 flex-1 rounded bg-border" />
      </div>
      <p className="mt-3 text-sm font-semibold">Действие происходит прямо сейчас.</p>
      <p className="text-sm text-muted-foreground">Tom is sleeping now. — Том сейчас спит.</p>
    </div>
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
        <div className="space-y-4">
          <p className="font-semibold">Subject + am / is / are + V-ing</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="subject">She</GrammarChip>
            <GrammarChip role="aux" note="помощник">
              is
            </GrammarChip>
            <GrammarChip role="verb" note="V-ing">
              playing
            </GrammarChip>
            <GrammarChip role="object">tennis</GrammarChip>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>I am playing.</li>
            <li>He is playing.</li>
            <li>We are playing.</li>
          </ul>
        </div>
      ) : null}

      {tab === "neg" ? (
        <div className="space-y-4">
          <p className="font-semibold">Subject + am / is / are + not + V-ing</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="subject">She</GrammarChip>
            <GrammarChip role="aux" note="помощник + not">
              isn't
            </GrammarChip>
            <GrammarChip role="verb" note="V-ing">
              sleeping
            </GrammarChip>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>I am not sleeping.</li>
            <li>She is not sleeping. → She isn't sleeping.</li>
            <li>They are not sleeping. → They aren't sleeping.</li>
          </ul>
          <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Сокращения: is not → isn't, are not → aren't.
          </p>
        </div>
      ) : null}

      {tab === "q" ? (
        <div className="space-y-4">
          <p className="font-semibold">Am / Is / Are + subject + V-ing ?</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="aux" note="помощник вперёд">
              Is
            </GrammarChip>
            <GrammarChip role="subject">Tom</GrammarChip>
            <GrammarChip role="verb" note="V-ing">
              sleeping?
            </GrammarChip>
          </div>
          <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4 text-sm">
            <p>Утверждение: Tom is sleeping.</p>
            <p className="mt-1">↓</p>
            <p className="mt-1 font-bold">Вопрос: Is Tom sleeping?</p>
            <p className="mt-2 text-muted-foreground">В вопросе AM / IS / ARE выходит вперёд.</p>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>Are you reading?</li>
            <li>Is Tom sleeping?</li>
            <li>Are they playing?</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function IngRules() {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-2">
      {ING_RULES.map((rule, i) => (
        <div key={rule.title} className="overflow-hidden rounded-xl border-2 border-border">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold"
          >
            <span>{rule.title}</span>
            <span aria-hidden className={`text-xs transition-transform ${open === i ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>
          {open === i ? (
            <div className="space-y-2 border-t border-border bg-muted/40 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {rule.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-lg border border-verb/40 bg-verb-soft px-3 py-1.5 text-sm font-semibold text-verb"
                  >
                    {ex}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{rule.note}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function PresentContinuousTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Card kicker="КАРТОЧКА 1" title="Когда нужен Present Continuous?">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          СЕЙЧАС • В ПРОЦЕССЕ
        </p>
        <p className="text-muted-foreground">
          Present Continuous нужен, когда действие происходит сейчас или примерно сейчас и
          находится в процессе.
        </p>
        <Timeline />
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Три главных случая">
        <div className="space-y-3">
          {USAGE_CARDS.map((u) => (
            <div key={u.title} className="rounded-xl border border-border p-4">
              <p className="font-display font-bold">{u.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{u.text}</p>
              <div className="mt-3 space-y-2">
                {u.examples.map((ex) => (
                  <div key={ex.en} className="rounded-lg bg-muted px-3 py-2">
                    <p className="text-sm text-muted-foreground">{ex.ru}</p>
                    <p className="font-semibold">{ex.en}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Слова-подсказки">
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
        <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          Это подсказки, а не абсолютное правило. Время нужно выбирать прежде всего по смыслу
          ситуации.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Формула Present Continuous">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          AM / IS / ARE + V-ING
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {BE_TABLE.map((row) => (
            <div key={row.who} className="rounded-xl border-2 border-aux/30 bg-aux-soft p-4">
              <p className="text-sm text-muted-foreground">{row.who} →</p>
              <p className="font-display text-xl font-bold text-aux">{row.be}</p>
              <p className="mt-1 text-sm font-semibold">{row.example}</p>
            </div>
          ))}
        </div>
        <RoleLegend />
        <FormulaSwitcher />
      </Card>

      <Card kicker="КАРТОЧКА 5" title="ING не ходит один">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-destructive/40 bg-destructive/10 p-4">
            <p className="font-display font-bold">Нельзя</p>
            <p className="mt-1 text-sm">✕ She reading.</p>
            <p className="text-sm">✕ They playing.</p>
          </div>
          <div className="rounded-xl border-2 border-success/40 bg-success/10 p-4">
            <p className="font-display font-bold">Нужно</p>
            <p className="mt-1 text-sm">✓ She is reading.</p>
            <p className="text-sm">✓ They are playing.</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          В Present Continuous всегда две части: помощник am / is / are и смысловой глагол V-ing.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Как добавить -ing">
        <IngRules />
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Мини-шпаргалка">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-border bg-muted p-3 text-sm">Кто?</th>
                <th className="border border-border bg-muted p-3 text-sm">Помощник</th>
                <th className="border border-border bg-muted p-3 text-sm">Пример</th>
              </tr>
            </thead>
            <tbody>
              {BE_TABLE.map((row) => (
                <tr key={row.who}>
                  <td className="border border-border p-3 font-semibold">{row.who}</td>
                  <td className="border border-border p-3 font-display font-bold text-aux">
                    {row.be}
                  </td>
                  <td className="border border-border p-3">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-2">
          {CHEATSHEET_SIGNS.map((row) => (
            <div key={row.sign} className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
              <span className="font-display text-lg font-bold">{row.sign}</span>
              <span className="font-semibold">{row.example}</span>
            </div>
          ))}
        </div>
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          BE + ING
        </p>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
