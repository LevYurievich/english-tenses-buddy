import type { GrammarRole } from "@/data/types";

/**
 * Единое цветовое кодирование частей предложения во всём приложении.
 * Помимо цвета всегда есть подпись роли и рамка — чтобы информация
 * оставалась доступной без различения цветов.
 */
export const ROLE_LABELS: Record<GrammarRole, string> = {
  subject: "SUBJECT",
  aux: "AUX",
  verb: "VERB",
  marker: "MARKER",
  object: "OBJECT",
};

const ROLE_STYLES: Record<GrammarRole, string> = {
  subject: "bg-subject-soft text-subject border-subject/40 border-solid",
  aux: "bg-aux-soft text-aux border-aux/40 border-dashed",
  verb: "bg-verb-soft text-verb border-verb/40 border-solid",
  marker: "bg-marker-soft text-marker border-marker/50 border-dotted",
  object: "bg-muted text-muted-foreground border-border border-solid",
};

export function GrammarChip({
  role,
  children,
  note,
  showLabel = true,
}: {
  role: GrammarRole;
  children: React.ReactNode;
  note?: string;
  showLabel?: boolean;
}) {
  return (
    <span className="inline-flex flex-col items-center gap-1 align-top">
      <span
        className={`inline-flex items-center rounded-lg border-2 px-3 py-1.5 font-semibold ${ROLE_STYLES[role]}`}
      >
        {children}
      </span>
      {showLabel ? (
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground">
          {ROLE_LABELS[role]}
          {note ? ` · ${note}` : ""}
        </span>
      ) : null}
    </span>
  );
}

export function RoleLegend() {
  const roles: GrammarRole[] = ["subject", "aux", "verb", "marker"];
  const notes: Record<string, string> = {
    subject: "кто",
    aux: "помощник",
    verb: "смысловой глагол",
    marker: "слово-маркер",
  };
  return (
    <div className="flex flex-wrap gap-3">
      {roles.map((r) => (
        <GrammarChip key={r} role={r} note={notes[r]}>
          {r === "subject" ? "He" : r === "aux" ? "does" : r === "verb" ? "play" : "every day"}
        </GrammarChip>
      ))}
    </div>
  );
}
