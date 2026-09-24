/**
 * Perfect Continuous family — одна идея «как долго процесс длится к точке отсчёта».
 * Переиспользуется в уроках и будущем модуле All 12 Tenses.
 */
export type PerfectContinuousPoint = "now" | "past" | "future";

export const PERFECT_CONTINUOUS_FAMILY = [
  { id: "now" as const, point: "NOW", tense: "Present Perfect Continuous", formula: "HAVE / HAS BEEN + V-ING", example: "I have been studying for two hours.", ru: "Процесс длится до сейчас." },
  { id: "past" as const, point: "PAST", tense: "Past Perfect Continuous", formula: "HAD BEEN + V-ING", example: "Before Tom arrived, I had been studying for two hours.", ru: "Процесс длился до точки в прошлом." },
  { id: "future" as const, point: "FUTURE", tense: "Future Perfect Continuous", formula: "WILL HAVE BEEN + V-ING", example: "By 8 p.m., I will have been studying for two hours.", ru: "Процесс будет длиться до точки в будущем." },
];

export function PerfectContinuousFamily({ highlight }: { highlight?: PerfectContinuousPoint }) {
  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      <p className="text-xs font-bold tracking-widest text-primary">PERFECT CONTINUOUS FAMILY</p>
      <h2 className="text-xl sm:text-2xl">Как долго процесс длится к точке?</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {PERFECT_CONTINUOUS_FAMILY.map((f) => (
          <div
            key={f.id}
            className={`space-y-1 rounded-xl p-4 text-sm ${
              highlight === f.id ? "border-2 border-primary bg-primary/10" : "bg-muted"
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-muted-foreground">{f.point} ⏱</p>
            <p className="font-display font-bold">{f.tense}</p>
            <p className="font-mono font-semibold">{f.formula}</p>
            <p className="text-muted-foreground">{f.ru}</p>
            <p className="font-mono text-xs">{f.example}</p>
          </div>
        ))}
      </div>
      <p className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center font-display font-bold text-primary">
        МЕНЯЕТСЯ ТОЧКА ОТСЧЁТА. ИДЕЯ «КАК ДОЛГО?» ОСТАЁТСЯ.
      </p>
    </section>
  );
}
