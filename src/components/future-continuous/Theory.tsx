import { Link } from "@tanstack/react-router";
import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  ALL_PERSONS,
  CHEATSHEET,
  CONTINUOUS_FAMILY,
  FORMS,
  FS_VS_FC,
  ING_RULES,
  MAIN_IDEA,
  MOMENT_EXPRESSIONS,
  PC_FUTURE_NOTE,
  TIMELINE_AROUND,
  TIMELINE_FOOTBALL,
  TIMELINE_MAIN,
  TYPICAL_MISTAKES,
  WH_QUESTIONS,
} from "@/data/future-continuous/theory";

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

export function FutureContinuousTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Tensy mood="map" title="TENSY">
        Настроим машину времени на конкретный момент будущего. Что мы увидим в этот момент?
      </Tensy>

      <Card kicker="КАРТОЧКА 1" title="Главная идея">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          ПРОЦЕСС В ОПРЕДЕЛЁННЫЙ МОМЕНТ БУДУЩЕГО
        </p>
        <p className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center font-display font-bold text-primary">
          {MAIN_IDEA.question}
        </p>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono font-semibold">{MAIN_IDEA.example}</p>
          <p className="text-muted-foreground">{MAIN_IDEA.ru}</p>
        </div>
        <p className="text-sm">
          Нас интересует не просто факт будущего. Мы мысленно переносимся в определённый момент и
          смотрим: что в этот момент будет в процессе?
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Временная линия">
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{TIMELINE_MAIN}
        </pre>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>● — определённый момент будущего</li>
          <li>████ — процесс, который идёт вокруг этого момента</li>
        </ul>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Мнемоника">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center font-display font-bold">
          <p>ЗАГЛЯНИ В БУДУЩЕЕ</p>
          <p aria-hidden>↓</p>
          <p>ЧТО ТАМ БУДЕТ ПРОИСХОДИТЬ?</p>
          <p aria-hidden>↓</p>
          <p className="text-primary">FUTURE CONTINUOUS</p>
        </div>
        <p className="formula-box">WILL → BE → ING</p>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Связь с уже изученным">
        <div className="space-y-3">
          {CONTINUOUS_FAMILY.map((f) => (
            <div key={f.id} className="rounded-xl border border-border p-4">
              <p className="text-xs font-bold tracking-widest text-primary">{f.label}</p>
              <p className="mt-1 text-sm font-semibold">{f.question}</p>
              <p className="font-mono">{f.example}</p>
              <p className="text-sm text-muted-foreground">
                {f.formula} · {f.ru}
              </p>
            </div>
          ))}
        </div>
        <p className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center font-display text-lg font-bold text-primary">
          CONTINUOUS = ПРОЦЕСС. Меняется только время.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Визуальная система Continuous">
        <div className="grid gap-3 sm:grid-cols-3">
          {CONTINUOUS_FAMILY.map((f) => (
            <div key={f.id} className="rounded-xl bg-muted p-4 text-center">
              <p className="font-display text-sm font-bold">{f.label.split(" ")[0]}</p>
              <p aria-hidden className="text-type-continuous">
                ████
              </p>
              <p className="mt-1 font-mono text-sm">{f.formula}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Везде главное — ПРОЦЕСС.</p>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Формула">
        <p className="formula-box">WILL + BE + V-ING</p>
        <RoleLegend />
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="subject">She</GrammarChip>
          <GrammarChip role="aux">will be</GrammarChip>
          <GrammarChip role="verb" note="V-ing">
            working
          </GrammarChip>
          <GrammarChip role="marker">at 5</GrammarChip>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {ALL_PERSONS.map((p) => (
            <p key={p} className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">
              {p}
            </p>
          ))}
        </div>
        <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center">
          <p className="font-display text-lg font-bold text-primary">WILL BE НЕ МЕНЯЕТСЯ</p>
          <p className="mt-1 text-sm">
            Не нужно выбирать am / is / are / was / were — для всех лиц одинаково.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Утверждение, отрицание, вопрос">
        {FORMS.map((f) => (
          <div key={f.sign} className="space-y-2">
            <p className="formula-box">
              {f.sign} {f.formula}
            </p>
            <div className="space-y-1 font-mono text-sm">
              {f.examples.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-xl bg-muted p-4 text-sm font-mono">
          <p>Tom will be sleeping.</p>
          <p aria-hidden className="font-bold">
            ↓
          </p>
          <p>Will Tom be sleeping?</p>
        </div>
        <p className="font-display font-bold text-primary">
          WILL выходит вперёд. BE + V-ING остаются вместе.
        </p>
        <p className="formula-box">Question word + will + subject + be + V-ing ?</p>
        <div className="space-y-1 font-mono text-sm">
          {WH_QUESTIONS.map((q) => (
            <p key={q}>{q}</p>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="Главный случай: процесс в момент будущего">
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono font-semibold">
            At 10 tomorrow morning, Tom will be taking an exam.
          </p>
          <p className="mt-2 text-muted-foreground">
            Точка будущего → 10 tomorrow morning. Процесс вокруг неё → taking an exam.
          </p>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono font-semibold">This time tomorrow, we will be flying to London.</p>
          <p className="mt-2 text-muted-foreground">
            Мы мысленно переносимся в это же время завтра: в тот момент будет идти полёт.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOMENT_EXPRESSIONS.map((m) => (
            <span
              key={m.en}
              className="rounded-lg border-2 border-dotted border-marker/60 bg-marker-soft px-3 py-2 text-sm font-semibold text-marker"
            >
              {m.en} — {m.ru}
            </span>
          ))}
        </div>
        <div className="rounded-xl border-2 border-dashed border-warning/50 bg-warning/5 p-4 text-sm">
          Эти выражения — удобные подсказки в учебных ситуациях. Но правило «увидел this time
          tomorrow → сразу Future Continuous» не работает. Сначала спроси: нас интересует процесс в
          этот момент?
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 9" title="Процесс вокруг будущего момента">
        <p className="text-sm">
          Действие не обязано начинаться точно в указанное время. Важно, что в этот момент оно
          находится В ПРОЦЕССЕ.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{TIMELINE_AROUND}
        </pre>
        <p className="font-mono text-sm font-semibold">At 8 p.m., I will be watching a film.</p>
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{TIMELINE_FOOTBALL}
        </pre>
        <p className="text-sm text-muted-foreground">
          What will Tom be doing at 5? — Tom will be playing football.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 10" title="Естественный ход событий и вопрос о планах">
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono font-semibold">Don't call me at 9. I'll be driving home.</p>
          <p className="mt-1 text-muted-foreground">
            В 9 часов человек ожидает быть в процессе поездки домой — это привычный ход событий.
          </p>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono font-semibold">Will you be using the computer tonight?</p>
          <p className="mt-1 text-muted-foreground">
            Спокойный вопрос о том, что человек будет делать вечером.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 11" title="Напоминание про V-ing">
        <div className="grid gap-2 sm:grid-cols-2">
          {ING_RULES.map((r) => (
            <p key={r} className="rounded-lg bg-muted px-3 py-2 text-sm font-mono font-semibold">
              {r}
            </p>
          ))}
        </div>
        <Link
          to="/learn/present-continuous"
          className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
        >
          Повторить правила -ing →
        </Link>
      </Card>

      <Card kicker="КАРТОЧКА 12" title="Типичные ошибки">
        <div className="rounded-xl border-2 border-destructive/40 bg-destructive/5 p-4 text-sm">
          <p className="font-mono text-destructive">❌ I will studying.</p>
          <p className="font-mono text-success">✅ I will be studying.</p>
          <p className="mt-2 font-display font-bold">WILL → BE → ING. BE нельзя потерять.</p>
        </div>
        <div className="space-y-2">
          {TYPICAL_MISTAKES.map((m) => (
            <div key={m.wrong} className="rounded-xl border border-border p-3 text-sm">
              <p className="font-mono text-destructive">❌ {m.wrong}</p>
              <p className="font-mono text-success">✅ {m.right}</p>
              <p className="mt-1 text-muted-foreground">{m.why}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 13" title="Не путать с Future Simple">
        {FS_VS_FC.map((c) => (
          <div key={c.title} className="space-y-2 rounded-xl border border-border p-4">
            <p className="font-display font-bold">{c.title}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <p className="rounded-xl border-2 border-primary/30 p-3 text-sm">{c.left}</p>
              <p className="rounded-xl border-2 border-accent/40 p-3 text-sm">{c.right}</p>
            </div>
            <p className="text-sm text-muted-foreground">{c.note}</p>
          </div>
        ))}
        <div className="rounded-xl border-2 border-dashed border-warning/50 bg-warning/5 p-4 text-sm">
          Не учи по длине действия. Future Simple — событие, решение, прогноз, будущий факт. Future
          Continuous — процесс, который мы рассматриваем в определённый момент будущего.
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 14" title="И не путать с Present Continuous для будущего">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-muted p-4 text-sm">
            <p className="font-mono font-semibold">{PC_FUTURE_NOTE.left}</p>
            <p className="mt-1 text-muted-foreground">{PC_FUTURE_NOTE.leftNote}</p>
          </div>
          <div className="rounded-xl bg-muted p-4 text-sm">
            <p className="font-mono font-semibold">{PC_FUTURE_NOTE.right}</p>
            <p className="mt-1 text-muted-foreground">{PC_FUTURE_NOTE.rightNote}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Оба предложения правильные — различается фокус говорящего.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 15" title="Мини-шпаргалка">
        <div className="space-y-1 font-mono text-sm">
          {CHEATSHEET.map((row) => (
            <p key={row.sign}>
              {row.sign} {row.example}
            </p>
          ))}
        </div>
        <p className="formula-box">WILL + BE + V-ING</p>
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display font-bold">
          ПРОЦЕСС В МОМЕНТ БУДУЩЕГО
        </p>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
