import { useState } from "react";
import { TenseTypeBadge } from "@/components/TenseTypeBadge";
import { Tensy } from "@/components/Tensy";

const CARDS = [
  { type: "simple" as const, tense: "Future Simple", q: "ЧТО ПРОИЗОЙДЁТ?", note: "Решение сейчас, обещание, прогноз, будущее событие.", ex: "I'll help you." },
  { type: "continuous" as const, tense: "Future Continuous", q: "ЧТО БУДЕТ ПРОИСХОДИТЬ В ТОТ МОМЕНТ?", note: "Процесс В конкретной точке будущего.", ex: "At 8 I'll be watching TV." },
  { type: "perfect" as const, tense: "Future Perfect", q: "ЧТО УЖЕ БУДЕТ ГОТОВО К ТОМУ МОМЕНТУ?", note: "Результат К будущей точке.", ex: "By 8 I'll have finished my homework." },
  { type: "perfect-continuous" as const, tense: "Future Perfect Continuous", q: "КАК ДОЛГО ПРОЦЕСС УЖЕ БУДЕТ ИДТИ К ТОМУ МОМЕНТУ?", note: "Длительность К будущей точке.", ex: "By 8 I'll have been studying for 3 hours." },
];

const STEPS = [
  { title: "Шаг 1", text: "Это просто событие, решение, обещание или прогноз? → Future Simple." },
  { title: "Шаг 2", text: "Есть конкретная будущая точка? Смотрим В неё или К ней?" },
  { title: "Шаг 3", text: "В точку: что будет происходить? → Future Continuous." },
  { title: "Шаг 4", text: "К точке: что будет готово? → Future Perfect. Как долго будет идти? → Future Perfect Continuous." },
];

const CONTRAST = [
  { label: "AT 8", text: "At 8 I'll be doing my homework.", note: "процесс В момент ████" },
  { label: "BY 8", text: "By 8 I'll have done my homework.", note: "результат К моменту ✓" },
  { label: "BY 8 + how long?", text: "By 8 I'll have been doing my homework for two hours.", note: "длительность К моменту ⏱" },
];

const QUIZ = [
  { q: "Tomorrow at 9 Anna ___ (sleep).", a: "В момент", tense: "Future Continuous → will be sleeping" },
  { q: "By 9 Anna ___ (finish) the book.", a: "К моменту", tense: "Future Perfect → will have finished" },
  { q: "By 9 Anna ___ (read) for 3 hours.", a: "К моменту", tense: "Future Perfect Continuous → will have been reading" },
];

export function FutureFamilyTheory({ onDone }: { onDone: () => void }) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <div className="space-y-6">
      <section className="grid gap-3 sm:grid-cols-2">
        {CARDS.map((c) => (
          <article key={c.tense} className="card-surface space-y-2 p-5">
            <TenseTypeBadge type={c.type} showMeaning={false} />
            <h3 className="text-lg">{c.tense}</h3>
            <p className="font-display text-sm font-bold text-primary">{c.q}</p>
            <p className="text-sm text-muted-foreground">{c.note}</p>
            <p className="rounded-lg bg-muted px-3 py-2 text-sm font-semibold">{c.ex}</p>
          </article>
        ))}
      </section>

      <section className="card-surface space-y-3 p-5 sm:p-6">
        <h2 className="text-xl">Общая система: всё начинается с WILL</h2>
        <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-sm leading-7">{`WILL + V1                    → событие
WILL + BE + V-ing            → процесс В момент
WILL + HAVE + V3             → результат К моменту
WILL + HAVE + BEEN + V-ing   → длительность К моменту`}</pre>
        <p className="text-sm text-muted-foreground">
          Не выбирай время по длине формулы. Порядок всегда такой: <b>СМЫСЛ → ВРЕМЯ → ФОРМУЛА</b>.
        </p>
      </section>

      <section className="card-surface space-y-3 p-5 sm:p-6">
        <h2 className="text-xl">Алгоритм выбора</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.title} className="rounded-xl border-2 border-border p-3 text-sm">
              <span className="font-display font-bold text-primary">{s.title}. </span>
              {s.text}
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground">
          Это подсказка-эвристика, а не закон. Всегда проверяй смысл всей ситуации.
        </p>
      </section>

      <section className="card-surface space-y-3 p-5 sm:p-6">
        <h2 className="text-xl">Главное противопоставление: AT или BY?</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {CONTRAST.map((c) => (
            <div key={c.label} className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-display font-bold text-primary">{c.label}</p>
              <p className="mt-1 font-semibold">{c.text}</p>
              <p className="mt-1 text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          После when, by the time, before, after, until в придаточной части используем Present Simple:
          <i> By the time you <b>arrive</b>, I'll have finished.</i>
        </p>
      </section>

      <section className="card-surface space-y-3 p-5 sm:p-6">
        <h2 className="text-xl">В момент или к моменту?</h2>
        <ul className="space-y-3">
          {QUIZ.map((item, i) => (
            <li key={item.q} className="space-y-2 rounded-xl border-2 border-border p-3">
              <p className="font-semibold">{item.q}</p>
              <div className="flex flex-wrap gap-2">
                {["В момент", "К моменту"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                    className={`rounded-lg border-2 px-3 py-1.5 text-sm font-bold ${
                      picked[i] === opt ? "border-primary bg-primary/10 text-primary" : "border-border"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {picked[i] ? (
                <p className={`text-sm font-semibold ${picked[i] === item.a ? "text-success" : "text-destructive"}`}>
                  {picked[i] === item.a ? "✓ Верно: " : `Нет — здесь «${item.a}»: `}
                  {item.tense}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <Tensy mood="think">Сначала найди точку в будущем. Потом реши: смотрим В неё или К ней?</Tensy>

      <button
        type="button"
        onClick={onDone}
        className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:brightness-110"
      >
        К уровню 1 →
      </button>
    </div>
  );
}
