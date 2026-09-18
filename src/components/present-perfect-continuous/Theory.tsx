import { useState } from "react";
import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/app-button";
import {
  CHEATSHEET_SIGNS,
  FOR_EXAMPLES,
  HAVE_TABLE,
  MARKER_WORDS,
  PARTS,
  SINCE_EXAMPLES,
  STATIVE_VERBS,
  USAGE_CARDS,
} from "@/data/present-perfect-continuous/theory";

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
      </div>
      <div className="mt-2 flex items-center gap-1">
        <div className="h-3 w-3 rounded-full bg-marker" aria-hidden />
        <div className="h-3 flex-1 rounded bg-primary" aria-hidden />
        <span aria-hidden className="font-display text-primary">
          ▶
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-semibold">
        <span>started</span>
        <span>still studying</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        I have been studying English for three years. — Действие началось в прошлом и продолжается
        до настоящего момента.
      </p>
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
          <p className="font-semibold">Subject + have / has + been + V-ing</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="subject">She</GrammarChip>
            <GrammarChip role="aux" note="помощник">
              has been
            </GrammarChip>
            <GrammarChip role="verb" note="V-ing">
              studying
            </GrammarChip>
            <GrammarChip role="marker" note="как долго">
              since 5 o'clock
            </GrammarChip>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>I have been reading for an hour.</li>
            <li>She has been studying since 5 o'clock.</li>
            <li>They have been playing all morning.</li>
          </ul>
        </div>
      ) : null}

      {tab === "neg" ? (
        <div className="space-y-4">
          <p className="font-semibold">Subject + have / has + not + been + V-ing</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="subject">He</GrammarChip>
            <GrammarChip role="aux" note="помощник + not">
              hasn't been
            </GrammarChip>
            <GrammarChip role="verb" note="V-ing">
              studying
            </GrammarChip>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>I haven't been sleeping well.</li>
            <li>He hasn't been studying today.</li>
          </ul>
          <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Сокращения: have not → haven't, has not → hasn't. NOT ставим после have / has.
          </p>
        </div>
      ) : null}

      {tab === "q" ? (
        <div className="space-y-4">
          <p className="font-semibold">Have / Has + subject + been + V-ing ?</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="aux" note="помощник вперёд">
              Have
            </GrammarChip>
            <GrammarChip role="subject">you</GrammarChip>
            <GrammarChip role="verb" note="been + V-ing">
              been waiting?
            </GrammarChip>
          </div>
          <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4 text-sm">
            <p>Утверждение: You have been waiting.</p>
            <p className="mt-1">↓</p>
            <p className="mt-1 font-bold">Вопрос: Have you been waiting?</p>
            <p className="mt-2 text-muted-foreground">
              Have / has выходит вперёд, а been + V-ing остаются вместе.
            </p>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>Have you been waiting long?</li>
            <li>Has Tom been studying?</li>
            <li>How long have you been learning English?</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function PresentPerfectContinuousTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Card kicker="КАРТОЧКА 1" title="Главная идея: КАК ДОЛГО?">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          НАЧАЛОСЬ РАНЬШЕ → ДЛИЛОСЬ → СВЯЗАНО С СЕЙЧАС
        </p>
        <p className="text-muted-foreground">
          Формула: <b>have / has + been + V-ing</b>. Вопрос «как долго?» — очень полезная подсказка,
          но не абсолютное правило: всегда смотри на смысл.
        </p>
        <Timeline />
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Две главные ситуации">
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

      <Card kicker="КАРТОЧКА 3" title="Формула по частям">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          HAVE / HAS + BEEN + V-ING
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {PARTS.map((p) => (
            <div key={p.part} className="rounded-xl border-2 border-aux/30 bg-aux-soft p-4">
              <p className="font-display text-lg font-bold text-aux">{p.part}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {HAVE_TABLE.map((row) => (
            <div key={row.who} className="rounded-xl border-2 border-border p-4">
              <p className="text-sm text-muted-foreground">{row.who} →</p>
              <p className="font-display text-xl font-bold text-aux">{row.aux}</p>
              <p className="mt-1 text-sm font-semibold">{row.example}</p>
            </div>
          ))}
        </div>
        <RoleLegend />
        <FormulaSwitcher />
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Ничего не пропускаем">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-destructive/40 bg-destructive/10 p-4">
            <p className="font-display font-bold">Нельзя</p>
            <p className="mt-1 text-sm">✕ I have studying for two hours.</p>
            <p className="text-sm">✕ She has been study all morning.</p>
          </div>
          <div className="rounded-xl border-2 border-success/40 bg-success/10 p-4">
            <p className="font-display font-bold">Нужно</p>
            <p className="mt-1 text-sm">✓ I have been studying for two hours.</p>
            <p className="text-sm">✓ She has been studying all morning.</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          BEEN не пропускаем, и после been всегда идёт V-ing.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="HOW LONG? — как долго?">
        <p className="text-muted-foreground">
          Это самый характерный вопрос для Present Perfect Continuous.
        </p>
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="marker" note="как долго">
            How long
          </GrammarChip>
          <GrammarChip role="aux">have</GrammarChip>
          <GrammarChip role="subject">you</GrammarChip>
          <GrammarChip role="aux" note="часть конструкции">
            been
          </GrammarChip>
          <GrammarChip role="verb" note="V-ing">
            learning
          </GrammarChip>
          <GrammarChip role="object">English?</GrammarChip>
        </div>
        <div className="rounded-xl bg-muted px-4 py-3 text-sm">
          <p className="font-semibold">How long have you been learning English?</p>
          <p className="text-muted-foreground">Как долго ты изучаешь английский?</p>
          <p className="mt-2 font-semibold">I have been learning English for three years.</p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="FOR или SINCE?">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          FOR = ДЛИНА &nbsp;•&nbsp; SINCE = СТАРТ
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="font-display font-bold">FOR — как долго?</p>
            <p className="mt-1 font-mono text-sm">←──── 3 YEARS ────→</p>
            <p className="text-xs text-muted-foreground">промежуток времени</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold">
              {FOR_EXAMPLES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">I have been reading for two hours.</p>
          </div>
          <div className="rounded-xl border-2 border-marker/50 p-4">
            <p className="font-display font-bold">SINCE — с какого момента?</p>
            <p className="mt-1 font-mono text-sm">●──────────────→ NOW</p>
            <p className="text-xs text-muted-foreground">точка начала</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold">
              {SINCE_EXAMPLES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              I have been studying English since 2022.
            </p>
          </div>
        </div>
        <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          FOR и SINCE могут встречаться и с другими временами. Здесь мы учимся использовать их в
          типичных предложениях Present Perfect Continuous.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Слова-подсказки">
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
          Слова помогают, но время выбираем по смыслу.
        </p>
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="font-display font-bold">Некоторые глаголы не любят Continuous</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATIVE_VERBS.map((v) => (
              <span key={v} className="rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold">
                {v}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm">✓ I have known Anna for five years.</p>
          <p className="text-sm text-muted-foreground">✕ I have been knowing Anna for five years.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Поэтому правило «есть FOR → значит Perfect Continuous» не работает.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="Мини-шпаргалка">
        <div className="space-y-2">
          {CHEATSHEET_SIGNS.map((row) => (
            <div key={row.sign} className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
              <span className="font-display text-lg font-bold">{row.sign}</span>
              <span className="font-semibold">{row.example}</span>
            </div>
          ))}
        </div>
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          HAVE / HAS + BEEN + V-ING
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">
            FOR → продолжительность
          </div>
          <div className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">
            SINCE → начало
          </div>
        </div>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
