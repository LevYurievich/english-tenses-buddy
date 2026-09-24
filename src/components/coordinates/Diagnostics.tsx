import { ProgressBar } from "@/components/ProgressBar";
import { enough, pct, whereIErr, type Diagnosis, type Metric } from "@/lib/coordinates-stats";

function Bar({ m }: { m: Metric }) {
  if (!enough(m)) {
    return (
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium">{m.title}</span>
        <span className="text-muted-foreground">Недостаточно данных{m.total ? ` (${m.total})` : ""}</span>
      </div>
    );
  }
  return <ProgressBar value={pct(m)} label={`${m.title} — ${pct(m)}% (${m.correct}/${m.total})`} />;
}

export function CoordDiagnostics({ d, compactTenses = false }: { d: Diagnosis; compactTenses?: boolean }) {
  if (!d.answered) {
    return <div className="card-surface p-6 text-muted-foreground">Пройди хотя бы несколько заданий — и здесь появится карта твоих координат.</div>;
  }
  return (
    <div className="space-y-4">
      <section className="card-surface space-y-3 p-5 sm:p-6">
        <p className="text-xs font-bold tracking-widest text-primary">ГДЕ Я ОШИБАЮСЬ?</p>
        <ul className="space-y-1.5">
          {whereIErr(d).map((t) => (
            <li key={t} className="font-medium">{t}</li>
          ))}
        </ul>
        {d.confusions.length ? (
          <p className="text-sm text-muted-foreground">
            Чаще всего путаешь: {d.confusions.slice(0, 3).map((c) => `${c.title} (${c.count})`).join(" · ")}
          </p>
        ) : null}
      </section>

      <section className="card-surface grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div className="space-y-3">
          <p className="font-display font-bold">Time coordinate accuracy</p>
          <Bar m={d.coordinate} />
          {d.byZone.map((m) => <Bar key={m.key} m={m} />)}
        </div>
        <div className="space-y-3">
          <p className="font-display font-bold">Aspect / meaning accuracy</p>
          <Bar m={d.meaning} />
          {d.byMeaning.map((m) => <Bar key={m.key} m={m} />)}
        </div>
        <div className="space-y-3 sm:col-span-2">
          <p className="font-display font-bold">Форма глагола (когда время выбрано верно)</p>
          <Bar m={d.form} />
        </div>
      </section>

      <section className="card-surface space-y-3 p-5 sm:p-6">
        <p className="font-display font-bold">12 времён{compactTenses ? " — предварительно, вместе с уровнями модуля" : ""}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {d.byTense.map((m) => <Bar key={m.key} m={m} />)}
        </div>
        <p className="text-xs text-muted-foreground">Процент показываем, когда по пункту есть минимум 3 ответа.</p>
      </section>
    </div>
  );
}
