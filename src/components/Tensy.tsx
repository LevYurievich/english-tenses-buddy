/**
 * Tensy — кот-путешественник, спутник ученика в мире английских времён.
 * Иллюстрации лежат в src/assets/tensy и подбираются по настроению (mood).
 */
import mapImg from "@/assets/tensy/map.png";
import helloImg from "@/assets/tensy/hello.png";
import bookImg from "@/assets/tensy/book.png";
import hintImg from "@/assets/tensy/hint.png";
import thinkImg from "@/assets/tensy/think.png";
import correctImg from "@/assets/tensy/correct.png";
import achievementImg from "@/assets/tensy/achievement.png";
import levelImg from "@/assets/tensy/level.png";
import testImg from "@/assets/tensy/test.png";
import motivationImg from "@/assets/tensy/motivation.png";

export type TensyMood =
  | "hello"
  | "hint"
  | "mistake"
  | "cheer"
  | "map"
  | "book"
  | "level"
  | "test"
  | "motivation";

const MOOD_IMAGES: Record<TensyMood, string> = {
  hello: helloImg,
  hint: hintImg,
  mistake: thinkImg,
  cheer: correctImg,
  map: mapImg,
  book: bookImg,
  level: levelImg,
  test: testImg,
  motivation: motivationImg,
};

/** Отдельная картинка для экрана достижения. */
export const TENSY_ACHIEVEMENT = achievementImg;

const SIZES = {
  sm: "size-10",
  md: "size-14",
  lg: "size-20",
  xl: "size-28 sm:size-36",
} as const;

export function TensyAvatar({
  mood = "hello",
  size = "md",
  image,
  className = "",
}: {
  mood?: TensyMood;
  size?: keyof typeof SIZES;
  image?: string;
  className?: string;
}) {
  return (
    <img
      src={image ?? MOOD_IMAGES[mood]}
      alt=""
      aria-hidden
      loading="lazy"
      className={`${SIZES[size]} shrink-0 object-contain drop-shadow-sm ${className}`}
    />
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
