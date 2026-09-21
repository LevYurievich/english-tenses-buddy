import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  ALL_PERSONS,
  CHEATSHEET,
  CONTRACTIONS,
  FUTURE_MARKERS,
  SHORT_ANSWERS,
  TYPICAL_MISTAKES,
  WH_QUESTIONS,
  WILL_CASES,
} from "@/data/future-simple/theory";

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

export function FutureSimpleTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Tensy mood="map" title="TENSY">
        Мы разобрались с прошлым. Теперь посмотрим, что ждёт нас впереди!
      </Tensy>

      <Card kicker="КАРТОЧКА 1" title="WILL — один из способов говорить о будущем">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          WILL — НЕ ЕДИНСТВЕННОЕ БУДУЩЕЕ
        </p>
        <p className="text-sm">
          О будущем можно сказать по-разному. WILL чаще всего появляется, когда мы принимаем решение
          прямо сейчас, обещаем, предлагаем помощь, высказываем прогноз или сообщаем будущий факт.
        </p>
        <div className="space-y-1 rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono">I will call Tom tomorrow.</p>
          <p className="font-mono">I'm meeting Tom tomorrow.</p>
          <p className="font-mono">I'm going to visit Tom tomorrow.</p>
          <p className="mt-2 text-muted-foreground">
            Все три предложения о будущем, но говорящий представляет ситуацию по-разному.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Пять главных случаев WILL">
        <div className="space-y-3">
          {WILL_CASES.map((c, i) => (
            <div key={c.en} className="rounded-xl border border-border p-4">
              <p className="text-xs font-bold tracking-widest text-primary">
                СЛУЧАЙ {i + 1} · {c.icon} {c.title.toUpperCase()}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{c.situation}</p>
              <p className="mt-1 font-mono font-semibold">{c.en}</p>
              <p className="text-sm text-muted-foreground">{c.ru}</p>
              <p className="mt-2 text-sm">{c.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Решение в момент речи">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center font-display font-bold">
          <p>SITUATION NOW</p>
          <p aria-hidden>↓</p>
          <p>DECISION NOW</p>
          <p aria-hidden>↓</p>
          <p className="text-primary">WILL</p>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono">The phone is ringing. — I'll answer it.</p>
          <p className="text-muted-foreground">Телефон звонит. — Я отвечу.</p>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p className="font-mono">A: We don't have any milk. — B: I'll buy some.</p>
          <p className="mt-1 text-muted-foreground">
            B не планировал покупать молоко заранее: решение появилось в разговоре.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Главная формула">
        <p className="formula-box">WILL + V1</p>
        <RoleLegend />
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="subject">She</GrammarChip>
          <GrammarChip role="aux">will</GrammarChip>
          <GrammarChip role="verb" note="V1">
            help
          </GrammarChip>
          <GrammarChip role="object">us</GrammarChip>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {ALL_PERSONS.map((p) => (
            <p key={p} className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">
              {p}
            </p>
          ))}
        </div>
        <p className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center font-display text-lg font-bold text-primary">
          WILL НЕ МЕНЯЕТСЯ
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="WILL → V1: мнемоника">
        <p className="formula-box">После WILL глагол остаётся в первой форме</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-success/40 bg-success/10 p-4 text-sm">
            <p className="font-display font-bold text-success">✅ Так</p>
            <p className="mt-1 font-mono">will go · will play · will see</p>
            <p className="font-mono">will study · will be</p>
          </div>
          <div className="rounded-xl border-2 border-destructive/40 bg-destructive/5 p-4 text-sm">
            <p className="font-display font-bold text-destructive">❌ Не так</p>
            <p className="mt-1 font-mono">will goes · will went</p>
            <p className="font-mono">will going · will to go</p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Сокращения">
        <div className="grid gap-2 sm:grid-cols-3">
          {CONTRACTIONS.map((c) => (
            <p key={c.full} className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">
              {c.full} → {c.short}
            </p>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          В разговорном английском сокращения встречаются очень часто. В заданиях принимаются обе
          формы, если они одинаково правильны.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Утверждение, отрицание, вопрос">
        <p className="formula-box">Subject + will + V1</p>
        <div className="space-y-1 text-sm font-mono">
          <p>I will help you.</p>
          <p>Tom will come tomorrow.</p>
          <p>They will play football.</p>
        </div>
        <p className="formula-box">Subject + will not (won't) + V1</p>
        <div className="space-y-1 text-sm font-mono">
          <p>I won't forget.</p>
          <p>Tom won't come.</p>
          <p>They won't play.</p>
        </div>
        <div className="rounded-xl border-2 border-dashed border-destructive/40 bg-destructive/5 p-4">
          <p className="font-display text-lg font-bold">WILL NOT = WON'T</p>
          <p className="mt-1 text-sm font-semibold text-destructive">❌ willn't</p>
          <p className="text-sm font-semibold text-success">✅ won't</p>
        </div>
        <p className="formula-box">Will + subject + V1 ?</p>
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="aux">Will</GrammarChip>
          <GrammarChip role="subject">Tom</GrammarChip>
          <GrammarChip role="verb" note="V1">
            come
          </GrammarChip>
          <GrammarChip role="marker">tomorrow?</GrammarChip>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm font-mono">
          <p>Tom will come.</p>
          <p aria-hidden className="font-bold">
            ↓
          </p>
          <p>Will Tom come?</p>
        </div>
        <p className="font-display font-bold text-primary">WILL выходит вперёд.</p>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="Короткие ответы и WH-вопросы">
        <div className="space-y-2">
          {SHORT_ANSWERS.map((s) => (
            <div key={s.q} className="rounded-xl border border-border p-3 text-sm">
              <p className="font-mono font-semibold">{s.q}</p>
              <p className="font-mono text-success">{s.yes}</p>
              <p className="font-mono text-destructive">{s.no}</p>
            </div>
          ))}
        </div>
        <p className="formula-box">Question word + will + subject + V1 ?</p>
        <div className="space-y-1 text-sm font-mono">
          {WH_QUESTIONS.map((q) => (
            <p key={q}>{q}</p>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 9" title="WILL + BE">
        <p className="formula-box">will + be</p>
        <div className="space-y-1 text-sm font-mono">
          <p>I will be at home.</p>
          <p>She will be happy.</p>
          <p>They will be tired.</p>
        </div>
        <p className="text-sm font-semibold text-destructive">❌ will am · will is · will are</p>
        <p className="text-sm">После WILL используется базовая форма: BE.</p>
      </Card>

      <Card kicker="КАРТОЧКА 10" title="Типичные ошибки">
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

      <Card kicker="КАРТОЧКА 11" title="Временная линия и слова-подсказки">
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`NOW                         FUTURE
●────────────────────────────●
                              ↑
                         action/event`}
        </pre>
        <p className="text-sm text-muted-foreground">
          Временная линия показывает только одно: действие в будущем. Чтобы выбрать именно WILL,
          нужен контекст.
        </p>
        <div className="flex flex-wrap gap-2">
          {FUTURE_MARKERS.map((w) => (
            <span
              key={w.en}
              className="rounded-lg border-2 border-dotted border-marker/60 bg-marker-soft px-3 py-2 text-sm font-semibold text-marker"
            >
              {w.en} — {w.ru}
            </span>
          ))}
        </div>
        <div className="rounded-xl border-2 border-dashed border-warning/50 bg-warning/5 p-4">
          <p className="font-display font-bold">
            Эти слова показывают будущее, но НЕ выбирают конструкцию за тебя.
          </p>
          <p className="mt-2 text-sm">
            tomorrow отвечает на вопрос КОГДА. А вопрос «как говорящий представляет будущее?»
            решается по контексту: решение сейчас, план, договорённость или прогноз.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 12" title="Мини-шпаргалка">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-16 border border-border bg-muted p-3 text-sm" />
                <th className="border border-border bg-muted p-3 text-sm">Формула</th>
                <th className="border border-border bg-muted p-3 text-sm">Пример</th>
              </tr>
            </thead>
            <tbody>
              {CHEATSHEET.map((row) => (
                <tr key={row.sign}>
                  <td className="border border-border p-3 text-center font-display text-lg font-bold">
                    {row.sign}
                  </td>
                  <td className="border border-border p-3 font-semibold">{row.formula}</td>
                  <td className="border border-border p-3 text-sm text-muted-foreground">
                    {row.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="formula-box">Главная формула: WILL + V1</p>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li className="rounded-lg bg-muted px-3 py-2">💭 прогноз / мнение</li>
          <li className="rounded-lg bg-muted px-3 py-2">⚡ решение сейчас</li>
          <li className="rounded-lg bg-muted px-3 py-2">🤝 предложение помощи</li>
          <li className="rounded-lg bg-muted px-3 py-2">🤞 обещание</li>
          <li className="rounded-lg bg-muted px-3 py-2">→ нейтральный будущий факт</li>
        </ul>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
