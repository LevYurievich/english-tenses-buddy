import { useState } from "react";
import { GrammarChip, RoleLegend } from "@/components/GrammarChip";
import { Button } from "@/components/ui/app-button";
import {
  CHEATSHEET_SIGNS,
  HAVE_TABLE,
  IRREGULAR_VERBS,
  MARKER_WORDS,
  REGULAR_VERBS,
  USAGE_CARDS,
  WORD_PLACES,
} from "@/data/present-perfect/theory";

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
        <div className="h-1 w-6 rounded bg-border" />
        <div className="h-3 w-3 rounded-full bg-marker" aria-hidden />
        <div className="h-1 flex-1 rounded bg-primary" />
        <div className="h-4 w-4 rounded-full bg-primary" aria-hidden />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-semibold">
        <span>потерял ключ</span>
        <span>ключа сейчас нет</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        I have lost my key. — Я потерял ключ. Главное не сам момент потери, а то, что ключа нет
        сейчас.
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
          <p className="font-semibold">Subject + have / has + V3</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="subject">She</GrammarChip>
            <GrammarChip role="aux" note="помощник">
              has
            </GrammarChip>
            <GrammarChip role="verb" note="V3">
              finished
            </GrammarChip>
            <GrammarChip role="object">her homework</GrammarChip>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>I have finished my homework.</li>
            <li>She has finished her homework.</li>
            <li>Tom has lost his phone.</li>
          </ul>
        </div>
      ) : null}

      {tab === "neg" ? (
        <div className="space-y-4">
          <p className="font-semibold">Subject + have / has + not + V3</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="subject">She</GrammarChip>
            <GrammarChip role="aux" note="помощник + not">
              hasn't
            </GrammarChip>
            <GrammarChip role="verb" note="V3">
              called
            </GrammarChip>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>I have not finished. → I haven't finished.</li>
            <li>She has not called me. → She hasn't called me.</li>
          </ul>
          <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Сокращения: have not → haven't, has not → hasn't.
          </p>
        </div>
      ) : null}

      {tab === "q" ? (
        <div className="space-y-4">
          <p className="font-semibold">Have / Has + subject + V3 ?</p>
          <div className="flex flex-wrap items-start gap-2">
            <GrammarChip role="aux" note="помощник вперёд">
              Has
            </GrammarChip>
            <GrammarChip role="subject">Tom</GrammarChip>
            <GrammarChip role="verb" note="V3">
              arrived?
            </GrammarChip>
          </div>
          <div className="rounded-xl border-2 border-dashed border-aux/50 bg-aux-soft p-4 text-sm">
            <p>Утверждение: She has finished.</p>
            <p className="mt-1">↓</p>
            <p className="mt-1 font-bold">Вопрос: Has she finished?</p>
            <p className="mt-2 text-muted-foreground">В вопросе HAVE / HAS выходит вперёд.</p>
          </div>
          <ul className="space-y-1 text-sm font-semibold">
            <li>Have you finished?</li>
            <li>Has Tom arrived?</li>
            <li>Has she seen this film?</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function IrregularTable() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[360px] border-collapse text-left">
          <thead>
            <tr>
              <th className="border border-border bg-muted p-3 text-sm">V1</th>
              <th className="border border-border bg-muted p-3 text-sm">V2</th>
              <th className="border border-border bg-muted p-3 text-sm">V3</th>
            </tr>
          </thead>
          <tbody>
            {(open ? IRREGULAR_VERBS : IRREGULAR_VERBS.slice(0, 5)).map((v) => (
              <tr key={v.v1}>
                <td className="border border-border p-3 font-semibold">{v.v1}</td>
                <td className="border border-border p-3 text-muted-foreground">{v.v2}</td>
                <td className="border border-border p-3 font-display font-bold text-verb">{v.v3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
      >
        {open ? "Свернуть таблицу" : "Показать все глаголы"}
      </button>
      <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
        Заучивать всю таблицу перед тренировкой не нужно. Present Perfect → смотри в колонку V3.
      </p>
    </div>
  );
}

export function PresentPerfectTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Card kicker="КАРТОЧКА 1" title="Главная идея Present Perfect">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          ПРОИЗОШЛО РАНЬШЕ → ВАЖНО СЕЙЧАС
        </p>
        <p className="text-muted-foreground">
          Прошлое + связь с настоящим = Present Perfect. Формула: <b>have / has + V3</b>.
        </p>
        <Timeline />
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Чем это отличается от Past Simple?">
        <p className="text-muted-foreground">
          И Present Perfect, и Past Simple могут говорить о прошлом. Разница в том, на что мы
          смотрим.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">PAST SIMPLE</p>
            <p className="font-display font-bold">КОГДА ПРОИЗОШЛО?</p>
            <p className="mt-2 font-semibold">I lost my key yesterday.</p>
            <p className="text-sm text-muted-foreground">
              Вчера я потерял ключ. Нас интересует законченный момент прошлого.
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
            <p className="text-xs font-bold tracking-widest text-primary">PRESENT PERFECT</p>
            <p className="font-display font-bold">ЧТО ВАЖНО СЕЙЧАС?</p>
            <p className="mt-2 font-semibold">I have lost my key.</p>
            <p className="text-sm text-muted-foreground">
              Я потерял ключ. Результат важен сейчас: ключа нет.
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Подробное сравнение будет в конце урока — в разделе «Present Perfect или Past Simple?».
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Когда используем Present Perfect">
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

      <Card kicker="КАРТОЧКА 4" title="Формула Present Perfect">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          HAVE / HAS + V3
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {HAVE_TABLE.map((row) => (
            <div key={row.who} className="rounded-xl border-2 border-aux/30 bg-aux-soft p-4">
              <p className="text-sm text-muted-foreground">{row.who} →</p>
              <p className="font-display text-xl font-bold text-aux">{row.aux}</p>
              <p className="mt-1 text-sm font-semibold">{row.example}</p>
            </div>
          ))}
        </div>
        <RoleLegend />
        <FormulaSwitcher />
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Что такое V3?">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          V1 → V2 → V3
        </p>
        <p className="text-muted-foreground">
          У английского глагола есть три формы. Для Present Perfect нужна третья — V3.
        </p>
        <div>
          <p className="font-display font-bold">Правильные глаголы: V2 и V3 обычно с -ed</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {REGULAR_VERBS.map((v) => (
              <span
                key={v}
                className="rounded-lg border border-verb/40 bg-verb-soft px-3 py-1.5 text-sm font-semibold text-verb"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-bold">Неправильные глаголы: V3 нужно запоминать</p>
          <div className="mt-2">
            <IrregularTable />
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Как запомнить">
        <p className="hero-surface rounded-xl px-4 py-3 text-center font-display text-lg font-bold">
          PERFECT = ЕСТЬ СВЯЗЬ
        </p>
        <p className="text-muted-foreground">
          Произошло раньше, но результат, опыт или информация важны сейчас.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-aux/40 bg-aux-soft p-4">
            <p className="font-display text-lg font-bold text-aux">HAS</p>
            <p className="text-sm">he / she / it</p>
          </div>
          <div className="rounded-xl border-2 border-aux/40 bg-aux-soft p-4">
            <p className="font-display text-lg font-bold text-aux">HAVE</p>
            <p className="text-sm">все остальные</p>
          </div>
        </div>
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
          Это подсказки, а не команда выбрать Present Perfect. Всегда смотри на смысл ситуации.
        </p>
        <div className="space-y-3">
          {WORD_PLACES.map((w) => (
            <div key={w.word} className="rounded-xl border border-border p-4">
              <p className="font-display font-bold">{w.word}</p>
              <p className="mt-1 text-sm text-muted-foreground">{w.note}</p>
              <ul className="mt-2 space-y-1 text-sm font-semibold">
                {w.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="font-display font-bold">EVER и NEVER</p>
          <p className="mt-1 text-sm">Have you ever been to London? — Ты когда-нибудь был в Лондоне?</p>
          <p className="text-sm">I have never been to London. — Я никогда не был в Лондоне.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Двойное отрицание не используем: ✕ I haven't never been there. ✓ I have never been
            there.
          </p>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="Мини-шпаргалка">
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
              {HAVE_TABLE.map((row) => (
                <tr key={row.who}>
                  <td className="border border-border p-3 font-semibold">{row.who}</td>
                  <td className="border border-border p-3 font-display font-bold text-aux">
                    {row.aux}
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
          PRESENT PERFECT = HAVE / HAS + V3
        </p>
        <Button onClick={onDone}>Я понял(а) → к тренировке</Button>
      </Card>
    </div>
  );
}
