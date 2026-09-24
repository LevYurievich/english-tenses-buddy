/**
 * Perfect family — одна идея «результат относительно точки отсчёта»
 * для трёх времён. Переиспользуется в уроках и будущем модуле All 12 Tenses.
 */
export type PerfectPoint = "now" | "past" | "future";

export const PERFECT_FAMILY = [
  {
    id: "now" as const,
    point: "NOW",
    tense: "Present Perfect",
    formula: "HAVE / HAS + V3",
    example: "Tom has finished his homework.",
    ru: "Результат есть сейчас.",
  },
  {
    id: "past" as const,
    point: "PAST",
    tense: "Past Perfect",
    formula: "HAD + V3",
    example: "Tom had finished his homework before his friend arrived.",
    ru: "Результат был готов к моменту в прошлом.",
  },
  {
    id: "future" as const,
    point: "FUTURE",
    tense: "Future Perfect",
    formula: "WILL HAVE + V3",
    example: "Tom will have finished his homework by 8 tonight.",
    ru: "Результат будет готов к моменту в будущем.",
  },
];

export function PerfectFamily({ highlight }: { highlight?: PerfectPoint }) {
  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      <p className="text-xs font-bold tracking-widest text-primary">PERFECT FAMILY</p>
      <h2 className="text-xl sm:text-2xl">Perfect = результат относительно точки</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {PERFECT_FAMILY.map((f) => (
          <div
            key={f.id}
            className={`space-y-1 rounded-xl p-4 text-sm ${
              highlight === f.id ? "border-2 border-primary bg-primary/10" : "bg-muted"
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-muted-foreground">{f.point} 🎯</p>
            <p className="font-display font-bold">{f.tense}</p>
            <p className="font-mono font-semibold">{f.formula}</p>
            <p className="text-muted-foreground">{f.ru}</p>
            <p className="font-mono text-xs">{f.example}</p>
          </div>
        ))}
      </div>
      <p className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center font-display font-bold text-primary">
        МЕНЯЕТСЯ ТОЧКА ОТСЧЁТА. ИДЕЯ PERFECT ОСТАЁТСЯ.
      </p>
    </section>
  );
}
