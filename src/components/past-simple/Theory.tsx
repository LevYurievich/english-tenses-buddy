import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  BE_FORMS,
  CHEATSHEET,
  ED_RULES,
  IRREGULAR_VERBS,
  MARKER_WORDS,
  USAGE_CASES,
} from "@/data/past-simple/theory";

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

export function PastSimpleTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Tensy mood="map" title="TENSY">
        Отправляемся в прошлое! Здесь главное — понять, что уже произошло и закончилось.
      </Tensy>

      <Card kicker="КАРТОЧКА 1" title="Главная идея Past Simple">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          БЫЛО → ЗАКОНЧИЛОСЬ
        </p>
        <p className="rounded-xl bg-muted px-4 py-3 text-center font-display text-base font-bold tracking-widest">
          ← ● ───────── NOW
        </p>
        <div className="rounded-xl border border-border p-3">
          <p className="font-semibold">I watched a film yesterday.</p>
          <p className="text-sm text-muted-foreground">Я посмотрел фильм вчера.</p>
          <p className="mt-1 text-sm">Действие произошло вчера и завершилось.</p>
        </div>
        <p className="formula-box">Главный вопрос: ЧТО ПРОИЗОШЛО?</p>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Когда используем">
        <div className="space-y-3">
          {USAGE_CASES.map((c, i) => (
            <div key={c.en} className="rounded-xl border border-border p-4">
              <p className="text-xs font-bold tracking-widest text-primary">
                СЛУЧАЙ {i + 1} · {c.title.toUpperCase()}
              </p>
              <p className="mt-2 font-semibold">{c.en}</p>
              <p className="text-sm text-muted-foreground">{c.ru}</p>
              <p className="mt-2 text-sm">{c.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Две системы Past Simple">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-verb/30 bg-verb-soft p-4">
            <p className="font-display font-bold text-verb">УТВЕРЖДЕНИЕ → V2</p>
            <p className="mt-2 text-sm">I played.</p>
            <p className="text-sm">I went.</p>
          </div>
          <div className="rounded-xl border-2 border-aux/30 bg-aux-soft p-4">
            <p className="font-display font-bold text-aux">ВОПРОС / ОТРИЦАНИЕ → DID + V1</p>
            <p className="mt-2 text-sm">Did you play?</p>
            <p className="text-sm">I didn't play.</p>
          </div>
        </div>
        <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4">
          <p className="font-display text-lg font-bold text-aux">DID ЗАБИРАЕТ ПРОШЛОЕ СЕБЕ</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>I went. → Did you go?</li>
            <li className="font-semibold text-destructive">Не: Did you went?</li>
          </ul>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Утверждение">
        <RoleLegend />
        <p className="formula-box">Subject + V2</p>
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="subject">I</GrammarChip>
          <GrammarChip role="verb" note="V2">
            played
          </GrammarChip>
          <GrammarChip role="object">football</GrammarChip>
          <GrammarChip role="marker">yesterday</GrammarChip>
        </div>
        <p className="text-sm text-muted-foreground">
          Правильные глаголы образуют V2 просто: V1 + ED.
        </p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {["play → played", "work → worked", "visit → visited"].map((x) => (
            <li key={x} className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">
              {x}
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-sm">
          <p>I played football yesterday.</p>
          <p>She watched a film.</p>
          <p>Tom visited his grandmother.</p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Неправильные глаголы">
        <p className="formula-box">Past Simple → смотри V2</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-border bg-muted p-2 text-sm">V1</th>
                <th className="border border-border bg-muted p-2 text-sm">V2 (Past Simple)</th>
                <th className="border border-border bg-muted p-2 text-sm">V3</th>
                <th className="border border-border bg-muted p-2 text-sm">Перевод</th>
              </tr>
            </thead>
            <tbody>
              {IRREGULAR_VERBS.map((v) => (
                <tr key={v.v1}>
                  <td className="border border-border p-2 text-sm">{v.v1}</td>
                  <td className="border border-border p-2 font-bold text-verb">{v.v2}</td>
                  <td className="border border-border p-2 text-sm text-muted-foreground">{v.v3}</td>
                  <td className="border border-border p-2 text-sm text-muted-foreground">{v.ru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="V2 или V3?">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-type-simple/30 bg-type-simple-soft p-4">
            <p className="text-xs font-bold tracking-widest">🔁 PAST SIMPLE</p>
            <p className="mt-2 font-display text-lg font-bold">→ V2</p>
            <p className="mt-1 text-sm">I went.</p>
          </div>
          <div className="rounded-xl border-2 border-type-perfect/30 bg-type-perfect-soft p-4">
            <p className="text-xs font-bold tracking-widest">✓ PRESENT PERFECT</p>
            <p className="mt-2 font-display text-lg font-bold">→ HAVE / HAS + V3</p>
            <p className="mt-1 text-sm">I have gone.</p>
          </div>
        </div>
        <p className="formula-box">go → went → gone · V1 → V2 → V3</p>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Окончание -ED">
        <div className="grid gap-3 sm:grid-cols-2">
          {ED_RULES.map((r) => (
            <div key={r.pattern} className="rounded-xl border border-border p-4">
              <p className="text-sm font-bold">{r.pattern}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.examples.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="Отрицание">
        <p className="formula-box">Subject + didn't + V1</p>
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="subject">I</GrammarChip>
          <GrammarChip role="aux">didn't</GrammarChip>
          <GrammarChip role="verb" note="V1">
            play
          </GrammarChip>
          <GrammarChip role="object">football</GrammarChip>
        </div>
        <p className="text-sm text-muted-foreground">did not → didn't</p>
        <div className="space-y-1 text-sm">
          <p>I didn't play football.</p>
          <p>She didn't watch the film.</p>
          <p>Tom didn't go to school.</p>
        </div>
        <div className="rounded-xl border-2 border-dashed border-destructive/40 bg-destructive/5 p-4">
          <p className="font-display font-bold">После DID / DIDN'T — только V1</p>
          <p className="mt-1 text-sm font-semibold text-destructive">❌ I didn't went.</p>
          <p className="text-sm font-semibold text-success">✅ I didn't go.</p>
          <p className="mt-2 text-sm">
            DID уже показывает прошлое, поэтому второму глаголу V2 больше не нужен.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 9" title="Вопрос">
        <p className="formula-box">DID + subject + V1 ?</p>
        <div className="flex flex-wrap items-start gap-2">
          <GrammarChip role="aux">Did</GrammarChip>
          <GrammarChip role="subject">you</GrammarChip>
          <GrammarChip role="verb" note="V1">
            play
          </GrammarChip>
          <GrammarChip role="object">football?</GrammarChip>
        </div>
        <div className="space-y-1 text-sm">
          <p>Did you play football?</p>
          <p>Did she watch the film?</p>
          <p>Did Tom go to school?</p>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          <p>Tom went to school.</p>
          <p className="font-bold">↓</p>
          <p>Did Tom go to school?</p>
        </div>
        <p className="font-semibold">Вопросительные слова</p>
        <p className="formula-box">Question word + DID + subject + V1 ?</p>
        <div className="space-y-1 text-sm">
          <p>Where did you go?</p>
          <p>What did she buy?</p>
          <p>When did Tom arrive?</p>
          <p>Why did they leave?</p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 10" title="Глагол BE: was / were">
        <p className="text-sm text-muted-foreground">
          BE ведёт себя иначе: am / is → was, are → were.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {BE_FORMS.map((b) => (
            <p key={b.subject} className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">
              {b.subject} {b.form}
            </p>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <p className="font-bold">Отрицание</p>
            <p className="mt-1 text-sm">was not → wasn't · were not → weren't</p>
            <p className="mt-1 text-sm">I wasn't tired. They weren't at school.</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="font-bold">Вопрос</p>
            <p className="mt-1 text-sm">Was she at home? Were they tired?</p>
            <p className="mt-1 text-sm font-semibold text-destructive">Не: Did she be at home?</p>
          </div>
        </div>
        <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4">
          <p className="font-display text-lg font-bold text-aux">WAS / WERE работают сами</p>
          <p className="mt-2 text-sm">Обычный глагол: Did Tom play?</p>
          <p className="text-sm">BE: Was Tom tired?</p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 11" title="Слова-подсказки">
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
        <p className="rounded-xl bg-muted px-4 py-3 text-sm">
          Это подсказки, а не автоматический выбор времени. Главное — законченная ситуация в
          прошлом.
        </p>
        <div className="rounded-xl border border-border p-4">
          <p className="font-bold">AGO = назад</p>
          <p className="mt-1 text-sm">two days ago · three years ago · an hour ago</p>
          <p className="mt-1 text-sm">
            AGO стоит после промежутка времени: three days ago.{" "}
            <span className="font-semibold text-destructive">Не: ago three days.</span>
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
        <p className="formula-box">Главная формула: V2 · но DID → V1</p>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
