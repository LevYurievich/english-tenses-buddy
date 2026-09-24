import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { recordAnswer } from "@/lib/progress";
import { ALL12_ID, A12_LAB, MARKER_TRAPS } from "@/data/all12/items";

const KIND: Record<string, string> = {
  "what-changed": "Что изменилось?",
  "move-point": "Передвинь точку",
  "fix-thinking": "Исправь мышление",
};

/** Ловушки слов-маркеров: слово ≠ автоматический ответ. */
export function MarkerTraps() {
  return (
    <section className="card-surface space-y-3 p-5 sm:p-6">
      <h2 className="text-xl">Ловушки слов-маркеров</h2>
      <p className="text-sm text-muted-foreground">Слово помогает понять контекст, но решение принимается по смыслу. Одно и то же слово — разные времена.</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {MARKER_TRAPS.map((m) => (
          <div key={m.word} className="rounded-xl border-2 border-border p-3 text-sm">
            <p className="font-display text-lg font-bold text-primary">{m.word}</p>
            <p className="text-muted-foreground">{m.helps}</p>
            <ul className="mt-1 space-y-0.5">
              {m.examples.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Lab({ onFinish }: { onFinish?: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  if (i >= A12_LAB.length) {
    return (
      <section className="card-surface space-y-3 p-6 text-center">
        <p className="text-xs font-bold tracking-widest text-primary">ЛАБОРАТОРИЯ</p>
        <h2 className="text-3xl">{score} из {A12_LAB.length}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => { setI(0); setScore(0); setPicked(null); }} className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">Ещё раз</button>
          {onFinish ? <button type="button" onClick={onFinish} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Уровень 4 →</button> : null}
        </div>
      </section>
    );
  }

  const item = A12_LAB[i]!;
  const pick = (o: string) => {
    if (picked) return;
    const ok = o === item.answer;
    setPicked(o);
    if (ok) setScore(score + 1);
    recordAnswer({ tenseId: ALL12_ID, exerciseId: item.id, correct: ok, category: "wrong_aspect_selection", question: `${KIND[item.kind]}: ${item.source.join(" / ")}`, userAnswer: o, correctAnswer: item.answer, explanation: item.why });
  };

  return (
    <div className="space-y-3">
      <ProgressBar value={(i / A12_LAB.length) * 100} label={`Задание ${i + 1} из ${A12_LAB.length}`} />
      <section className="card-surface space-y-4 p-5 sm:p-6">
        <p className="text-xs font-bold tracking-widest text-primary">{KIND[item.kind]!.toUpperCase()}</p>
        <div className="space-y-1 rounded-xl bg-muted/60 p-3 text-lg">
          {item.source.map((s) => <p key={s}>{s}</p>)}
        </div>
        <p className="font-display font-bold">{item.prompt}</p>
        <div className="grid gap-2">
          {item.options.map((o) => {
            const st = !picked ? "" : o === item.answer ? "border-success bg-success/10" : o === picked ? "border-destructive bg-destructive/10" : "opacity-50";
            return (
              <button key={o} type="button" disabled={!!picked} onClick={() => pick(o)} className={`rounded-xl border-2 border-border p-3 text-left font-medium hover:border-primary/60 ${st}`}>
                {o}
              </button>
            );
          })}
        </div>
        {picked ? (
          <div className="space-y-2">
            <p className="rounded-xl bg-muted/60 p-3 text-sm">{item.why}</p>
            {item.examples ? (
              <ul className="space-y-0.5 text-sm">
                {item.examples.map((e) => <li key={e}>• {e}</li>)}
              </ul>
            ) : null}
            <button type="button" onClick={() => { setI(i + 1); setPicked(null); }} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Дальше →</button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
