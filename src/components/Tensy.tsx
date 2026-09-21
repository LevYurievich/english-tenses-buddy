/**
 * Tensy — дружелюбный «хранитель времени».
 * Пока используется как место в UI: вместо иллюстрации показывается аккуратный аватар-заглушка.
 * Когда появится PNG/SVG/WebP, достаточно передать проп `image`.
 */
export type TensyMood = "hello" | "hint" | "mistake" | "cheer";

const MOODS: Record<TensyMood, { face: string; ring: string }> = {
  hello: { face: "🕒", ring: "border-primary/40 bg-primary/10" },
  hint: { face: "💡", ring: "border-marker/50 bg-marker-soft" },
  mistake: { face: "🧭", ring: "border-warning/50 bg-warning/15" },
  cheer: { face: "🎉", ring: "border-success/50 bg-success/15" },
};

export function TensyAvatar({
  mood = "hello",
  size = "md",
  image,
}: {
  mood?: TensyMood;
  size?: "sm" | "md" | "lg";
  image?: string;
}) {
  const box = size === "lg" ? "size-16 text-2xl" : size === "sm" ? "size-9 text-base" : "size-12 text-xl";
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-2xl border-2 ${MOODS[mood].ring} ${box}`}
    >
      {image ? (
        <img src={image} alt="" className="size-full rounded-xl object-cover" />
      ) : (
        MOODS[mood].face
      )}
    </span>
  );
}

/** Короткая реплика помощника. Тон спокойный и дружелюбный, без детских фраз. */
export function Tensy({
  mood = "hello",
  title,
  children,
  compact = false,
}: {
  mood?: TensyMood;
  title?: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-border bg-card ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <TensyAvatar mood={mood} size={compact ? "sm" : "md"} />
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-widest text-muted-foreground">
          {(title ?? "TENSY").toUpperCase()}
        </p>
        <div className="mt-0.5 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
