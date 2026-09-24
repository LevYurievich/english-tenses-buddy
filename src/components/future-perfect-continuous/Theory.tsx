import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";

function Card({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      {kicker ? <p className="text-xs font-bold tracking-widest text-primary">{kicker}</p> : null}
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

const FORMS = [
  { kind: "Утверждение", formula: "кто + WILL HAVE BEEN + V-ING", example: "By 6, Tom will have been studying for three hours." },
  { kind: "Отрицание", formula: "WON'T HAVE BEEN + V-ING", example: "We won't have been waiting long by then." },
  { kind: "Вопрос", formula: "WILL + кто + HAVE BEEN + V-ING?", example: "Will Tom have been studying for three hours by 6?" },
  { kind: "How long?", formula: "How long + WILL + кто + HAVE BEEN + V-ING?", example: "How long will you have been living here by June?" },
];

const COMPARE = [
  { tense: "Future Continuous", q: "Что будет происходить В момент?", ex: "At 6, Tom will be studying." },
  { tense: "Future Perfect", q: "Что / сколько будет готово К моменту?", ex: "By 6, Tom will have read three chapters." },
  { tense: "Future Perfect Continuous", q: "Как долго уже будет идти К моменту?", ex: "By 6, Tom will have been studying for three hours." },
];

export function FuturePerfectContinuousTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Card kicker="ГЛАВНАЯ ИДЕЯ" title="К будущему моменту процесс уже будет длиться какое-то время">
        <p className="rounded-xl bg-primary/10 p-4 text-center font-display text-lg font-bold text-primary">
          Как долго это уже будет происходить к тому моменту?
        </p>
        <p className="font-mono text-base font-semibold">By 6 p.m., Tom will have been studying for three hours.</p>
        <p className="text-sm text-muted-foreground">К 6 часам Том будет заниматься уже три часа.</p>
      </Card>

      <Card kicker="ТАЙМЕР" title="Флажок в будущем + таймер назад">
        <div className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs sm:text-sm" aria-label="Временная линия со старта в 3 часа до точки в 6 часов">
          <pre className="whitespace-pre">{`START 3 p.m.                    6 p.m. 🎯
●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━▶
⏱ 00:00     01:00     02:00     03:00
          ЗАНИМАЕТСЯ (и дальше тоже)`}</pre>
        </div>
        <p className="text-sm text-muted-foreground">
          Три шага: где START? → где FUTURE POINT? → сколько времени между ними (DURATION)?
        </p>
        <p className="rounded-xl border-2 border-dashed border-primary/40 p-3 text-center text-sm font-bold">
          HOW LONG? → for three hours · since 3 p.m.
        </p>
      </Card>

      <Tensy mood="map">
        Поставим точку в будущем, посмотрим назад и включим таймер. Как долго процесс уже будет идти?
      </Tensy>

      <Card kicker="ФОРМУЛА" title="WILL → HAVE → BEEN → ING">
        <p className="text-sm text-muted-foreground">
          Четыре детали, ни одну нельзя потерять. После will — всегда have (не has), потом been, потом
          глагол с -ing.
        </p>
        <div className="space-y-2">
          {FORMS.map((f) => (
            <div key={f.kind} className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-display font-bold">{f.kind}</p>
              <p className="font-mono">{f.formula}</p>
              <p className="font-mono text-muted-foreground">{f.example}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="FOR / SINCE" title="Отрезок или точка старта">
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-xl bg-muted p-4">
            <p className="font-display text-lg font-bold">FOR</p>
            <p className="text-muted-foreground">сколько длится: for three hours, for a week</p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <p className="font-display text-lg font-bold">SINCE</p>
            <p className="text-muted-foreground">с какого момента: since 3 p.m., since Monday</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          После by the time / when про будущее — Present Simple: by the time the bus <u>comes</u>.
        </p>
      </Card>

      <Card kicker="ТРИ БУДУЩИХ ВОПРОСА" title="В момент, к моменту или как долго?">
        <div className="space-y-2">
          {COMPARE.map((c) => (
            <div key={c.tense} className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-display font-bold">{c.tense}</p>
              <p className="text-muted-foreground">{c.q}</p>
              <p className="font-mono">{c.ex}</p>
            </div>
          ))}
        </div>
        <p className="rounded-xl bg-primary/10 p-3 text-sm font-bold text-primary">
          СКОЛЬКО БУДЕТ СДЕЛАНО? → Perfect. КАК ДОЛГО? → Perfect Continuous.
        </p>
      </Card>

      <Card kicker="ГЛАГОЛЫ СОСТОЯНИЯ" title="know, be, have (иметь), like — без -ing">
        <p className="font-mono text-sm text-destructive">❌ By June, I will have been knowing him for a year.</p>
        <p className="font-mono text-sm text-success">✅ By June, I will have known him for a year.</p>
      </Card>

      <Card kicker="ТИПИЧНЫЕ ОШИБКИ" title="Проверь себя">
        <div className="space-y-1 font-mono text-sm">
          <p className="text-destructive">❌ will have studying → ✅ will have been studying</p>
          <p className="text-destructive">❌ will has been studying → ✅ will have been studying</p>
          <p className="text-destructive">❌ will have been study → ✅ will have been studying</p>
          <p className="text-destructive">❌ since three hours → ✅ for three hours</p>
        </div>
      </Card>

      <Button onClick={onDone} className="w-full sm:w-auto">
        Понятно, к тренировке →
      </Button>
    </div>
  );
}
