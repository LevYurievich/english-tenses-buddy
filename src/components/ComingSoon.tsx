import { Link } from "@tanstack/react-router";

export function ComingSoon({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
          Скоро
        </span>
        <h1 className="text-3xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="card-surface p-5">
            <p className="font-semibold">{item}</p>
            <p className="mt-2 text-xs font-bold text-muted-foreground">Скоро</p>
          </div>
        ))}
      </div>

      <Link
        to="/learn/present-simple"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110"
      >
        Пока пройти Present Simple
      </Link>
    </div>
  );
}
