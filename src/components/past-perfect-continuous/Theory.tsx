import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  CHEATSHEET,
  CONTINUOUS_SYSTEM,
  FOR_EXAMPLES,
  ING_REMINDER,
  MARKER_WORDS,
  PERSONS,
  SINCE_EXAMPLES,
  STATIVE_VERBS,
  USAGE_CASES,
} from "@/data/past-perfect-continuous/theory";

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

export function PastPerfectContinuousTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Tensy mood="map" title="TENSY">
        Теперь посмотрим не просто назад, а на процесс, который уже шёл до другого момента в
        прошлом.
      </Tensy>

      <Card kicker="КАРТОЧКА 1" title="Главная идея">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          ПРОЦЕСС ДЛИЛСЯ ДО МОМЕНТА В ПРОШЛОМ
        </p>
        <p className="rounded-xl border-2 border-primary/40 px-4 py-2 text-center font-bold">
          КАК ДОЛГО ЭТО ПРОИСХОДИЛО ДО ТОГО МОМЕНТА?
        </p>
        <p className="font-mono text-sm">
          Tom had been studying for two hours before his friend arrived.
        </p>
        <p className="text-sm text-muted-foreground">
          Том занимался уже два часа до того, как пришёл его друг.
        </p>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Том начал заниматься раньше.</li>
          <li>Процесс длился два часа.</li>
          <li>Потом произошло другое событие прошлого — пришёл друг.</li>
        </ol>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Временная линия">
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PAST                                   NOW
●══════════════════●────────────────────●
START             FRIEND ARRIVED
     2 HOURS`}
        </pre>
        <p className="text-sm text-muted-foreground">
          ════ — процесс. ● справа — момент прошлого, до которого этот процесс длился.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Present Perfect Continuous и Past Perfect Continuous">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">
              PRESENT PERFECT CONTINUOUS
            </p>
            <p className="mt-1 font-mono">HAVE / HAS + BEEN + V-ING</p>
            <p className="text-sm text-muted-foreground">процесс до NOW</p>
            <p className="pt-1 font-mono text-sm">I have been studying for two hours.</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold tracking-widest text-primary">
              PAST PERFECT CONTINUOUS
            </p>
            <p className="mt-1 font-mono">HAD + BEEN + V-ING</p>
            <p className="text-sm text-muted-foreground">процесс до момента в прошлом</p>
            <p className="pt-1 font-mono text-sm">
              I had been studying for two hours before Tom arrived.
            </p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Perfect Continuous = процесс + длительность">
        <p className="formula-box">МЕНЯЕТСЯ ТОЛЬКО ТОЧКА ОТСЧЁТА</p>
        <p className="text-sm text-muted-foreground">
          Present Perfect Continuous — до настоящего. Past Perfect Continuous — до момента в
          прошлом.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Формула: HAD + BEEN + V-ING">
        <p className="formula-box">HAD + BEEN + V-ING</p>
        <p className="text-sm text-muted-foreground">У всех лиц одинаково — HAD.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PERSONS.map((s) => (
            <p key={s} className="rounded-xl border border-border px-3 py-2 font-mono text-sm">
              {s}
            </p>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Мнемоника">
        <p className="formula-box">HAD → BEEN → ING</p>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            <span className="font-mono font-bold">HAD</span> — прошлое относительно прошлого
          </li>
          <li>
            <span className="font-mono font-bold">BEEN</span> — часть Perfect Continuous
          </li>
          <li>
            <span className="font-mono font-bold">V-ING</span> — процесс
          </li>
        </ul>
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-base font-bold">
          HAD BEEN + ING = ПРОЦЕСС ШЁЛ ДО ТОГО МОМЕНТА
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Утверждение, отрицание, вопрос">
        <div className="space-y-2">
          {CHEATSHEET.map((c) => (
            <div key={c.sign} className="rounded-xl border border-border p-3">
              <p className="font-mono text-sm">
                <span className="font-bold text-primary">{c.sign}</span> {c.formula}
              </p>
              <p className="font-mono text-sm text-muted-foreground">{c.example}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-sm">Tom had been studying. → Had Tom been studying?</p>
        <p className="text-sm text-muted-foreground">
          HAD выходит вперёд. BEEN + V-ING остаются вместе.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="HOW LONG? — как долго?">
        <p className="font-mono text-sm">How long had you been waiting before the bus arrived?</p>
        <p className="text-sm text-muted-foreground">
          Как долго ты ждал до того, как приехал автобус?
        </p>
        <p className="font-mono text-sm">— I had been waiting for forty minutes.</p>
        <p className="formula-box">HOW LONG + HAD + SUBJECT + BEEN + V-ING ?</p>
      </Card>

      <Card kicker="КАРТОЧКА 9" title="FOR и SINCE">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="font-mono font-bold">FOR</p>
            <p className="text-sm text-muted-foreground">продолжительность</p>
            <ul className="pt-1 font-mono text-sm">
              {FOR_EXAMPLES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-border p-4">
            <p className="font-mono font-bold">SINCE</p>
            <p className="text-sm text-muted-foreground">точка начала</p>
            <ul className="pt-1 font-mono text-sm">
              {SINCE_EXAMPLES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="font-mono text-sm">He had been working for three hours before lunch.</p>
        <p className="font-mono text-sm">
          She had been studying since 7 a.m. before the power went out.
        </p>
        <p className="text-sm text-muted-foreground">
          FOR и SINCE — подсказки, а не автоматическое правило. Время выбирает контекст.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 10" title="Два важных момента">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="font-display font-bold">1. ТОЧКА В ПРОШЛОМ</p>
            <p className="font-mono text-sm">The bus arrived.</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="font-display font-bold">2. ПРОЦЕСС ДО НЕЁ</p>
            <p className="font-mono text-sm">I had been waiting for 30 minutes.</p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 11" title="Две основные ситуации">
        <div className="space-y-3">
          {USAGE_CASES.map((c, i) => (
            <div key={c.en} className="rounded-xl border border-border p-3">
              <p className="text-xs font-bold tracking-widest text-primary">СИТУАЦИЯ {i + 1}</p>
              <p className="mt-1 font-semibold">{c.title}</p>
              <p className="font-mono text-sm">{c.en}</p>
              <p className="text-sm text-muted-foreground">{c.ru}</p>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-muted px-3 py-2 font-mono text-xs leading-5">
{c.line}
              </pre>
              <p className="text-sm text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 12" title="Не путай с Past Continuous">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">
              PAST CONTINUOUS
            </p>
            <p className="mt-1 font-display font-bold">ЧТО ПРОИСХОДИЛО В ТОТ МОМЕНТ?</p>
            <p className="font-mono text-sm">At 6 p.m. I was studying.</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold tracking-widest text-primary">
              PAST PERFECT CONTINUOUS
            </p>
            <p className="mt-1 font-display font-bold">КАК ДОЛГО ДО ТОГО МОМЕНТА?</p>
            <p className="font-mono text-sm">By 6 p.m. I had been studying for two hours.</p>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PAST CONTINUOUS
────────████ 18:00 ████────────

PAST PERFECT CONTINUOUS
████████████████→ 18:00 ★`}
        </pre>
      </Card>

      <Card kicker="КАРТОЧКА 13" title="Точка отсчёта">
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PRESENT PERFECT CONTINUOUS
████████████████→ NOW ★

PAST PERFECT CONTINUOUS
████████████→ PAST ★ ─────────→ NOW`}
        </pre>
      </Card>

      <Card kicker="КАРТОЧКА 14" title="Напомним V-ing">
        <div className="flex flex-wrap gap-2 font-mono text-sm">
          {ING_REMINDER.map((r) => (
            <span key={r} className="rounded-full border border-border px-3 py-1">
              {r}
            </span>
          ))}
        </div>
        <a
          href="/learn/present-continuous"
          className="inline-flex items-center justify-center rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/10"
        >
          Повторить правила -ing
        </a>
      </Card>

      <Card kicker="КАРТОЧКА 15" title="DID не нужен">
        <p className="rounded-xl border-2 border-destructive/40 px-4 py-2 font-mono text-sm">
          ❌ Did Tom had been working?
        </p>
        <p className="rounded-xl border-2 border-destructive/40 px-4 py-2 font-mono text-sm">
          ❌ Did Tom been working?
        </p>
        <p className="rounded-xl border-2 border-success/40 px-4 py-2 font-mono text-sm">
          ✅ Had Tom been working?
        </p>
        <p className="text-sm text-muted-foreground">Помощник уже есть — это HAD.</p>
      </Card>

      <Card kicker="КАРТОЧКА 16" title="BEEN не пропускаем">
        <p className="rounded-xl border-2 border-destructive/40 px-4 py-2 font-mono text-sm">
          ❌ I had studying for two hours.
        </p>
        <p className="rounded-xl border-2 border-destructive/40 px-4 py-2 font-mono text-sm">
          ❌ I had been study for two hours.
        </p>
        <p className="rounded-xl border-2 border-success/40 px-4 py-2 font-mono text-sm">
          ✅ I had been studying for two hours.
        </p>
        <p className="formula-box">HAD → BEEN → ING</p>
      </Card>

      <Card kicker="КАРТОЧКА 17" title="Система Continuous">
        <div className="space-y-2">
          {CONTINUOUS_SYSTEM.map((c) => (
            <div key={c.tense} className="rounded-xl border border-border p-3">
              <p className="text-xs font-bold tracking-widest text-muted-foreground">{c.tense}</p>
              <p className="font-mono text-sm">{c.formula}</p>
              <p className="text-sm text-muted-foreground">{c.sense}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 18" title="Глаголы состояния">
        <div className="flex flex-wrap gap-2 font-mono text-sm">
          {STATIVE_VERBS.map((v) => (
            <span key={v} className="rounded-full border border-border px-3 py-1">
              {v}
            </span>
          ))}
        </div>
        <p className="font-mono text-sm">✅ By then, I had known Anna for five years.</p>
        <p className="font-mono text-sm text-muted-foreground">
          ❌ I had been knowing Anna for five years.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 19" title="Слова-подсказки">
        <div className="flex flex-wrap gap-2">
          {MARKER_WORDS.map((m) => (
            <span
              key={m.en}
              className="rounded-full border border-border px-3 py-1 text-sm"
              title={m.ru}
            >
              <span className="font-mono font-bold">{m.en}</span>{" "}
              <span className="text-muted-foreground">— {m.ru}</span>
            </span>
          ))}
        </div>
      </Card>

      <Card kicker="ШПАРГАЛКА" title="Запомни главное">
        <p className="formula-box">HAD + BEEN + V-ING</p>
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-base font-bold">
          ПРОЦЕСС / ДЛИТЕЛЬНОСТЬ ДО МОМЕНТА В ПРОШЛОМ
        </p>
        <div className="space-y-1 font-mono text-sm">
          <p>+ I had been working.</p>
          <p>− I hadn't been working.</p>
          <p>? Had I been working?</p>
        </div>
        <p className="text-sm text-muted-foreground">
          FOR → продолжительность. SINCE → начало.
        </p>
      </Card>

      <Button onClick={onDone} className="w-full">
        Я понял(а) → к тренировке
      </Button>
    </div>
  );
}
