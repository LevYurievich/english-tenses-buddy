type Props = {
  value: number;
  label?: string;
  tone?: "primary" | "success";
};

export function ProgressBar({ value, label, tone = "primary" }: Props) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      ) : null}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            tone === "success" ? "bg-success" : "bg-primary"
          }`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
