import { TENSE_TYPES, typeOfTense, type TenseTypeId } from "@/data/tense-types";

/**
 * Значок типа времени: символ + название + смысл.
 * Цвет никогда не единственный признак — рядом всегда символ и текст.
 */
export function TenseTypeBadge({
  type,
  tenseId,
  showMeaning = true,
}: {
  type?: TenseTypeId;
  tenseId?: string;
  showMeaning?: boolean;
}) {
  const meta = type ? TENSE_TYPES[type] : typeOfTense(tenseId);
  if (!meta) return null;
  return (
    <span className={`stat-chip ${meta.className}`}>
      <span aria-hidden>{meta.symbol}</span>
      <span className="tracking-wide">{meta.label}</span>
      {showMeaning ? (
        <span className="font-semibold opacity-80">· {meta.meaning}</span>
      ) : null}
    </span>
  );
}
