import { useState } from "react";
import {
  MEANINGS,
  MEANING_INFO,
  TENSE_INFO,
  ZONES,
  ZONE_INFO,
  tenseOf,
  type Meaning,
  type Zone,
} from "@/data/coordinates/model";

/**
 * Матрица 3 × 4. Подсвечивает ячейку только когда переданы ОБЕ координаты.
 * На телефоне — переключатель зоны + мини-карта 3×4, без микроскопических карточек.
 */
export function Matrix({
  zone,
  meaning,
  showExamples = true,
  onPick,
}: {
  zone?: Zone | null;
  meaning?: Meaning | null;
  showExamples?: boolean;
  onPick?: (zone: Zone, meaning: Meaning) => void;
}) {
  const hit = (z: Zone, m: Meaning) => zone === z && meaning === m;
  const [mobileZone, setMobileZone] = useState<Zone>(zone ?? "present");
  const activeMobile = zone ?? mobileZone;

  const cell = (z: Zone, m: Meaning) => {
    const t = TENSE_INFO[tenseOf(z, m)];
    const on = hit(z, m);
    const Tag = onPick ? "button" : "div";
    return (
      <Tag
        key={`${z}-${m}`}
        {...(onPick ? { type: "button" as const, onClick: () => onPick(z, m) } : {})}
        aria-current={on ? "true" : undefined}
        className={`rounded-xl border-2 p-2.5 text-left transition motion-reduce:transition-none ${
          on
            ? "border-primary bg-primary/15 shadow-sm ring-2 ring-primary/30"
            : zone && meaning
              ? "border-border opacity-50"
              : "border-border bg-card"
        } ${onPick ? "hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary" : ""}`}
      >
        <span className="block font-display text-sm font-bold leading-tight">
          {on ? "★ " : ""}
          {t.title}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{t.formula}</span>
        {showExamples ? <span className="mt-1 block text-xs italic">{t.example}</span> : null}
      </Tag>
    );
  };

  return (
    <div className="space-y-3">
      {/* Desktop / tablet: полная таблица */}
      <div className="hidden md:grid md:grid-cols-[10rem_repeat(3,minmax(0,1fr))] md:gap-2">
        <div className="text-xs font-bold text-muted-foreground">ЧТО? ↓ &nbsp; ГДЕ? →</div>
        {ZONES.map((z) => (
          <div
            key={z}
            className={`rounded-lg px-2 py-1.5 text-center text-sm font-bold ${zone === z ? "bg-primary/15 text-primary" : "bg-muted"}`}
          >
            {ZONE_INFO[z].icon} {ZONE_INFO[z].label}
          </div>
        ))}
        {MEANINGS.map((m) => (
          <Row key={m} m={m} active={meaning === m}>
            {ZONES.map((z) => cell(z, m))}
          </Row>
        ))}
      </div>

      {/* Mobile: переключатель зоны + мини-карта */}
      <div className="space-y-3 md:hidden">
        <div role="tablist" aria-label="Временная зона" className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
          {ZONES.map((z) => (
            <button
              key={z}
              type="button"
              role="tab"
              aria-selected={activeMobile === z}
              onClick={() => setMobileZone(z)}
              disabled={!!zone}
              className={`rounded-lg px-2 py-2 text-xs font-bold ${activeMobile === z ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
            >
              {ZONE_INFO[z].icon} {ZONE_INFO[z].label}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {MEANINGS.map((m) => (
            <div key={m} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-2">
              <span className={`text-xs font-bold ${meaning === m ? "text-primary" : "text-muted-foreground"}`}>
                {MEANING_INFO[m].icon} {MEANING_INFO[m].label}
              </span>
              {cell(activeMobile, m)}
            </div>
          ))}
        </div>
        <MiniMap zone={zone} meaning={meaning} />
      </div>
    </div>
  );
}

function Row({ m, active, children }: { m: Meaning; active: boolean; children: React.ReactNode }) {
  return (
    <>
      <div className={`rounded-lg p-2 text-xs ${active ? "bg-primary/15" : "bg-muted"}`}>
        <span className="block font-bold">
          {MEANING_INFO[m].icon} {MEANING_INFO[m].label}
        </span>
        <span className="text-muted-foreground">{MEANING_INFO[m].ru}</span>
      </div>
      {children}
    </>
  );
}

/** Схема 3×4 из точек — чтобы на телефоне логика таблицы оставалась видимой. */
function MiniMap({ zone, meaning }: { zone?: Zone | null; meaning?: Meaning | null }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground" aria-hidden>
      <span>3 × 4:</span>
      <div className="grid grid-cols-3 gap-1">
        {MEANINGS.map((m) =>
          ZONES.map((z) => (
            <span
              key={`${z}${m}`}
              className={`size-2.5 rounded-sm ${zone === z && meaning === m ? "bg-primary" : "bg-border"}`}
            />
          )),
        )}
      </div>
      <span>3 зоны × 4 смысла = 12 времён</span>
    </div>
  );
}
