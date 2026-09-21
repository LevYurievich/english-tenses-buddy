import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  CHEATSHEET,
  IRREGULAR_VERBS,
  MARKER_WORDS,
  USAGE_CASES,
} from "@/data/past-perfect/theory";

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

export function PastPerfectTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Tensy mood="map" title="TENSY">
        Теперь путешествуем ещё глубже в прошлое. Сначала найди два события и определи, какое
        случилось раньше.
      </Tensy>

      <Card kicker="КАРТОЧКА 1" title="Главная идея Past Perfect">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          ПРОИЗОШЛО РАНЬШЕ ДРУГОГО СОБЫТИЯ В ПРОШЛОМ
        </p>
        <p className="text-sm text-muted-foreground">
          В прошлом есть два момента. Одно событие произошло раньше, другое — позже. Past Perfect
          показывает более раннее.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 2" title="Временная линия">
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`PAST                                 NOW
●──────────────●──────────────────────●
Tom left       I arrived
РАНЬШЕ         ПОЗЖЕ`}
        </pre>
        <div className="rounded-xl border border-border p-3">
          <p className="font-semibold">When I arrived, Tom had already left.</p>
          <p className="text-sm text-muted-foreground">Когда я пришёл, Том уже ушёл.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-primary/40 p-3">
            <p className="font-mono text-sm">Tom HAD LEFT</p>
            <p className="text-sm text-muted-foreground">произошло раньше</p>
          </div>
          <div className="rounded-xl border-2 border-border p-3">
            <p className="font-mono text-sm">I ARRIVED</p>
            <p className="text-sm text-muted-foreground">произошло позже</p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 3" title="Мнемоника">
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-lg font-bold">
          ПРОШЛОЕ ДО ПРОШЛОГО
        </p>
        <p className="text-center text-2xl">↓</p>
        <p className="formula-box">PAST PERFECT</p>
        <p className="formula-box">РАНЬШЕ В ПРОШЛОМ → HAD + V3</p>
      </Card>

      <Card kicker="КАРТОЧКА 4" title="Это не «очень давно»">
        <p className="text-sm text-muted-foreground">
          Past Perfect не значит «далёкое прошлое». Он показывает отношение между двумя моментами
          прошлого. Разница может быть даже в несколько минут.
        </p>
        <p className="font-mono text-sm">The film had started before we arrived.</p>
        <p className="text-sm text-muted-foreground">Фильм начался до того, как мы пришли.</p>
      </Card>

      <Card kicker="КАРТОЧКА 5" title="Формула: HAD + V3">
        <p className="formula-box">HAD + V3</p>
        <p className="text-sm text-muted-foreground">
          У всех лиц одна форма — HAD. Это проще, чем have / has.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {["I had finished.", "You had finished.", "He had finished.", "She had finished.", "We had finished.", "They had finished."].map(
            (s) => (
              <p key={s} className="rounded-xl border border-border px-3 py-2 font-mono text-sm">
                {s}
              </p>
            ),
          )}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 6" title="Present Perfect и Past Perfect">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">
              PRESENT PERFECT
            </p>
            <p className="mt-1 font-mono">HAVE / HAS + V3</p>
            <p className="text-sm text-muted-foreground">I / you / we / they → have, he/she/it → has</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold tracking-widest text-primary">PAST PERFECT</p>
            <p className="mt-1 font-mono">HAD + V3</p>
            <p className="text-sm text-muted-foreground">ВСЕ лица → had</p>
          </div>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 7" title="Третья форма глагола — V3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs tracking-widest text-muted-foreground">
                <th className="py-2">V1</th>
                <th className="py-2">V2</th>
                <th className="py-2">V3</th>
                <th className="py-2">перевод</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {IRREGULAR_VERBS.map((v) => (
                <tr key={v.v1} className="border-t border-border">
                  <td className="py-2">{v.v1}</td>
                  <td className="py-2">{v.v2}</td>
                  <td className="py-2 font-bold text-primary">{v.v3}</td>
                  <td className="py-2 font-sans text-muted-foreground">{v.ru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 8" title="V2 и V3 — не путай">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">PAST SIMPLE</p>
            <p className="mt-1 font-mono">V2 · Tom went home.</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <p className="text-xs font-bold tracking-widest text-primary">PAST PERFECT</p>
            <p className="mt-1 font-mono">HAD + V3 · Tom had gone home.</p>
          </div>
        </div>
        <p className="formula-box">go → went → gone</p>
      </Card>

      <Card kicker="КАРТОЧКА 9" title="Утверждение, отрицание, вопрос">
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
        <p className="text-sm text-muted-foreground">
          В вопросе HAD выходит вперёд: Tom had left. → Had Tom left?
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 10" title="DID не нужен">
        <p className="rounded-xl border-2 border-destructive/40 px-4 py-2 font-mono text-sm">
          ❌ Did Tom had left?
        </p>
        <p className="rounded-xl border-2 border-success/40 px-4 py-2 font-mono text-sm">
          ✅ Had Tom left before you arrived?
        </p>
        <p className="text-sm text-muted-foreground">
          В Past Perfect помощник уже есть — это HAD. Поэтому DID для этой конструкции не нужен.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 11" title="Когда используем">
        <div className="space-y-3">
          {USAGE_CASES.map((c, i) => (
            <div key={c.en} className="rounded-xl border border-border p-3">
              <p className="text-xs font-bold tracking-widest text-primary">СЛУЧАЙ {i + 1}</p>
              <p className="mt-1 font-semibold">{c.title}</p>
              <p className="font-mono text-sm">{c.en}</p>
              <p className="text-sm text-muted-foreground">{c.ru}</p>
              <p className="text-sm text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="КАРТОЧКА 12" title="BEFORE, AFTER, ALREADY, BY">
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
        <p className="font-mono text-sm">Tom had left before I arrived.</p>
        <p className="font-mono text-sm">After Tom had left, I arrived.</p>
        <p className="font-mono text-sm">When I called Anna, she had already gone to bed.</p>
        <p className="font-mono text-sm">By 6 p.m., Tom had finished his homework.</p>
        <p className="text-sm text-muted-foreground">
          Позиция already: had + already + V3. И важно: before и after помогают понять порядок
          событий, но не означают, что время выбирается автоматически.
        </p>
      </Card>

      <Card kicker="КАРТОЧКА 13" title="BY THE TIME">
        <p className="font-mono text-sm">By the time we arrived, the film had started.</p>
        <p className="text-sm text-muted-foreground">
          К тому времени, когда мы пришли, фильм уже начался.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs leading-5">
{`FILM STARTED
●
        WE ARRIVED
        ●
                         NOW
                         ●`}
        </pre>
      </Card>

      <Card kicker="КАРТОЧКА 14" title="Порядок слов ≠ порядок событий">
        <p className="font-mono text-sm">When I arrived, Tom had left.</p>
        <p className="text-sm text-muted-foreground">
          Первым в предложении стоит «I arrived», но раньше произошло «Tom had left». Смотри на
          реальную последовательность событий, а не на порядок слов.
        </p>
      </Card>

      <Card kicker="ШПАРГАЛКА" title="Запомни главное">
        <p className="formula-box">HAD + V3</p>
        <p className="rounded-xl hero-surface px-4 py-3 text-center font-display text-base font-bold">
          РАНЬШЕ ДРУГОГО МОМЕНТА В ПРОШЛОМ
        </p>
        <div className="space-y-1 font-mono text-sm">
          <p>+ I had finished.</p>
          <p>− I hadn't finished.</p>
          <p>? Had I finished?</p>
        </div>
      </Card>

      <Button onClick={onDone} className="w-full">
        Я понял(а) → к тренировке
      </Button>
    </div>
  );
}
