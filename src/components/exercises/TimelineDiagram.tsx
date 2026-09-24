import type { TimelineSpec } from "@/data/types";

/**
 * Нейтральная временная линия для задания: начало, точка в будущем, полоса действия.
 * Не показывает название времени и формулу — только структуру ситуации.
 */
export function TimelineDiagram({ spec }: { spec: TimelineSpec }) {
  const barLeft = spec.from ? 8 : spec.shape === "through" ? 30 : 15;
  const barRight = spec.shape === "through" ? 88 : spec.shape === "done" ? 55 : 72;
  const pointX = 72;

  return (
    <figure
      className="mt-4 rounded-xl border-2 border-border bg-muted/40 px-3 py-4"
      aria-label={`Временная линия: ${spec.from ? `с ${spec.from} ` : ""}${spec.action}, точка — ${spec.point}`}
    >
      <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground">ЛИНИЯ ВРЕМЕНИ</p>
      <div className="relative h-24 w-full">
        <div className="absolute left-0 right-0 top-12 h-0.5 bg-border" />
        <span className="absolute left-0 top-14 text-xs font-semibold text-muted-foreground">сейчас</span>
        <div
          className="absolute top-[42px] flex h-3 items-center rounded-full bg-primary/70"
          style={{ left: `${barLeft}%`, width: `${barRight - barLeft}%` }}
        />
        <span
          className="absolute top-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
          style={{ left: `${(barLeft + barRight) / 2}%` }}
        >
          {spec.action}
        </span>
        {spec.from ? (
          <span
            className="absolute top-14 -translate-x-1/2 whitespace-nowrap text-xs font-semibold"
            style={{ left: `${barLeft}%` }}
          >
            ● {spec.from}
          </span>
        ) : null}
        {spec.shape === "done" ? (
          <span
            className="absolute top-[36px] -translate-x-1/2 text-sm font-bold text-success"
            style={{ left: `${barRight}%` }}
            aria-hidden
          >
            ✓
          </span>
        ) : null}
        <div className="absolute top-8 h-9 w-0.5 bg-foreground" style={{ left: `${pointX}%` }} />
        <span
          className="absolute top-[4.5rem] -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 text-xs font-bold text-background"
          style={{ left: `${pointX}%` }}
        >
          {spec.point}
        </span>
      </div>
    </figure>
  );
}
