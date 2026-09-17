import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "hero" | "success";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:brightness-95",
  ghost: "border border-border bg-card text-foreground hover:bg-muted",
  hero: "bg-card text-primary hover:brightness-95",
  success: "bg-success text-success-foreground hover:brightness-110",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        className,
      )}
    />
  );
}
