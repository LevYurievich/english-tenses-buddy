import { useState } from "react";
import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  BE_FORMS,
  CHEATSHEET,
  ING_RULES,
  MARKER_WORDS,
  USAGE_CASES,
} from "@/data/past-continuous/theory";

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

export function PastContinuousTheory({ onDone }: { onDone: () => void }) {
  const [ingOpen, setIngOpen] = useState(false);

  return (
    <div className="space-y-5">
      <Tensy mood="map" title="TENSY">
        Представь, что мы остановили машину времени и заглянули внутрь одного момента прошлого.
      </Tensy>

      <Card kicker="КАРТОЧКА 1" title="Главная идея Past Continuous">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          БЫЛО В ПРОЦЕССЕ В ТОТ МОМЕНТ
        </p>
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 text-center font-mono text-xs leading-5">
{`PAST                    NOW
──────██████─────────────●
       ↑
    тот момент`}
        </pre>
        <div className="rounded-xl border border-border p-3">
          <p className="font-semibold">At 8 p.m. yesterday, I was doing my homework.</p>
          <p className="text-sm text-muted-foreground">
            Вчера в 8 вечера я делал домашнее задание.
          </p>
        </div>
        <p className="formula-box">WAS / WERE + V-ING</p>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Связь с Present Continuous">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">NOW</p>
            <p className="mt-1 font-mono">I AM reading.</p>
            <p className="text-sm text-muted-foreground">Процесс сейчас.</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold tracking-widest text-primary">THEN</p>
            <p className="mt-1 font-mono">I WAS reading.</p>
            <p className="text-sm text-muted-foreground">Процесс тогда.</p>
          </div>
        </div>
        <p className="formula-box">CONTINUOUS = ПРОЦЕСС. Меняется только точка времени.</p>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Когда используем">
        <div className="space-y-3">
          {USAGE_CASES.map((c, i) => (
            <div key={c.en} className="rounded-xl border border-border p-4">
              <p className="text-xs font-bold tracking-widest text-primary">
                СЛУЧАЙ {i + 1} · {c.title.toUpperCase()}
              </p>
              <p className="mt-2 font-semibold">{c.en}</p>
              <p className="text-sm text-muted-foreground">{c.ru}</p>
              <p className="mt-1 text-sm">{c.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Формула">
        <p className="formula-box">WAS / WERE + V-ING</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {BE_FORMS.map((b) => (
            <div key={b.subject} className="rounded-xl bg-muted px-3 py-2 text-center text-sm">
              <span className="font-bold">{b.subject}</span> → {b.form}
            </div>
          ))}
        </div>
        <ul className="space-y-1 text-sm">
          <li className="font-mono">I was reading.</li>
          <li className="font-mono">She was sleeping.</li>
          <li className="font-mono">They were playing.</li>
        </ul>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Мнемоника">
        <p className="formula-box">WAS / WERE + ING = БЫЛ В ПРОЦЕССЕ</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4 text-sm">
            <p className="font-mono">AM / IS / ARE + ING</p>
            <p className="text-muted-foreground">процесс сейчас</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4 text-sm">
            <p className="font-mono">WAS / WERE + ING</p>
            <p className="text-muted-foreground">процесс тогда</p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Утверждение, отрицание, вопрос">
        <div className="space-y-2 text-sm">
          <p className="rounded-xl bg-muted px-3 py-2 font-mono">
            + Subject + was / were + V-ing → I was studying.
          </p>
          <p className="rounded-xl bg-muted px-3 py-2 font-mono">
            − Subject + wasn't / weren't + V-ing → I wasn't sleeping.
          </p>
          <p className="rounded-xl bg-muted px-3 py-2 font-mono">
            ? Was / Were + subject + V-ing? → Were you sleeping?
          </p>
        </div>
        <div className="rounded-xl border border-border p-3 text-sm">
          <p className="font-mono">Tom was sleeping.</p>
          <p className="font-mono">↓</p>
          <p className="font-mono">Was Tom sleeping?</p>
          <p className="mt-1 font-bold">WAS / WERE выходит вперёд.</p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="DID здесь не нужен">
        <div className="space-y-2 text-sm">
          <p className="rounded-xl border-2 border-destructive/40 bg-destructive/10 px-3 py-2 font-mono">
            ✕ Did Tom sleeping?
          </p>
          <p className="rounded-xl border-2 border-destructive/40 bg-destructive/10 px-3 py-2 font-mono">
            ✕ Did Tom was sleeping?
          </p>
          <p className="rounded-xl border-2 border-success/40 bg-success/10 px-3 py-2 font-mono">
            ✓ Was Tom sleeping?
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          У Past Continuous уже есть помощник — was / were. Поэтому DID не нужен.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="V-ing">
        <p className="text-sm text-muted-foreground">
          Правила те же, что и в Present Continuous: play → playing, read → reading, make → making,
          run → running, lie → lying.
        </p>
        <Button type="button" variant="ghost" onClick={() => setIngOpen((v) => !v)}>
          {ingOpen ? "Скрыть шпаргалку" : "Повторить правила -ing"}
        </Button>
        {ingOpen ? (
          <div className="space-y-2">
            {ING_RULES.map((r) => (
              <div key={r.pattern} className="rounded-xl bg-muted px-3 py-2 text-sm">
                <p className="font-semibold">{r.pattern}</p>
                <p className="font-mono text-xs">{r.examples.join(" · ")}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Card>

      <Card kicker="КАРТОЧКА 9" title="Слова и контексты-подсказки">
        <div className="flex flex-wrap gap-2">
          {MARKER_WORDS.map((w) => (
            <span key={w.en} className="rounded-lg bg-muted px-3 py-1.5 text-sm">
              <span className="font-bold">{w.en}</span>{" "}
              <span className="text-muted-foreground">— {w.ru}</span>
            </span>
          ))}
        </div>
        <p className="formula-box">Это подсказки, а не автоматическое правило.</p>
        <p className="text-sm text-muted-foreground">Время определяется смыслом ситуации.</p>
      </Card>

      <Card kicker="КАРТОЧКА 10" title="WHILE — процесс рядом с процессом">
        <p className="font-mono">While I was studying, my sister was watching TV.</p>
        <p className="text-sm text-muted-foreground">
          Пока я занимался, сестра смотрела телевизор.
        </p>
        <p className="formula-box">PROCESS ↔ PROCESS</p>
        <p className="text-sm text-muted-foreground">
          Это типичный учебный контекст, а не абсолютное правило: после while не всегда стоит Past
          Continuous.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 11" title="WHEN — процесс и событие">
        <p className="font-mono">I was sleeping when the phone rang.</p>
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PAST ───────────────────── NOW
      █████████████
             ●

I WAS SLEEPING  ████████████████
                        ● PHONE RANG`}
        </pre>
        <p className="text-sm">
          Одно действие уже происходило, когда случилось другое: ████ — процесс, ● — событие.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 12" title="Мини-шпаргалка">
        <div className="space-y-2">
          {CHEATSHEET.map((c) => (
            <div
              key={c.example}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border p-3"
            >
              <span className="grid size-8 place-items-center rounded-full bg-muted font-bold">
                {c.sign}
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-sm">{c.formula}</span>
                <span className="block text-sm text-muted-foreground">{c.example}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="formula-box">WAS / WERE + V-ING → PROCESS IN THE PAST</p>
      </Card>

      <Button type="button" className="w-full" onClick={onDone}>
        Я понял(а) → к тренировке
      </Button>
    </div>
  );
}
