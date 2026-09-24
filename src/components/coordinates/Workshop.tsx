import { useState } from "react";
import { WORKSHOP } from "@/data/coordinates/items";
import { recordWorkshop } from "@/lib/coordinates-stats";

const KIND: Record<string, string> = {
  "change-zone": "Смени координату",
  "change-meaning": "Смени смысл",
  "odd-one": "Найди лишнее",
  "which-question": "Какой вопрос задать?",
};

export function Workshop({ onFinish }: { onFinish: () => void }) {
  const [picked, setPicked] = useState<Record<string, string>>({});
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Четыре новых типа заданий: меняем одну координату и смотрим, как меняется время.
      </p>
      {WORKSHOP.map((w) => {
        const p = picked[w.id];
        return (
          <section key={w.id} className="card-surface space-y-3 p-5">
            <p className="text-xs font-bold tracking-widest text-primary">{KIND[w.kind]!.toUpperCase()}</p>
            {w.source ? <p className="rounded-lg bg-muted/60 p-3 font-medium">{w.source}</p> : null}
            <p className="font-display font-bold">{w.prompt}</p>
            <div className="grid gap-2">
              {w.options.map((o) => {
                const state = !p ? "" : o === w.answer ? "border-success bg-success/10" : o === p ? "border-destructive bg-destructive/10" : "opacity-50";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={!!p}
                    onClick={() => {
                      setPicked((s) => ({ ...s, [w.id]: o }));
                      recordWorkshop(w.id, `${w.source ?? ""} ${w.prompt}`.trim(), o === w.answer, o, w.answer);
                    }}
                    className={`rounded-xl border-2 border-border p-3 text-left hover:border-primary/60 ${state}`}
                  >
                    {p && o === w.answer ? "✓ " : p === o && o !== w.answer ? "✗ " : ""}
                    {o}
                  </button>
                );
              })}
            </div>
            {p ? <p className={`rounded-xl p-3 text-sm ${p === w.answer ? "bg-success/10" : "bg-destructive/10"}`}>{w.why}</p> : null}
          </section>
        );
      })}
      <button type="button" onClick={onFinish} className="rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground">
        К Checkpoint →
      </button>
    </div>
  );
}
