import { Link } from "@tanstack/react-router";
import { enough, pct, type Diagnosis, type Metric, type CoordState } from "@/lib/coordinates-stats";
import type { SessionRow } from "@/components/coordinates/Trainer";
import { MEANINGS, MEANING_INFO, ZONES, ZONE_INFO, tenseOf, TENSE_INFO, coordsOf, PAIR_TITLES } from "@/data/coordinates/model";
import type { CoordItem } from "@/data/coordinates/items";

const p = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "Мало данных");

/** Результат одной сессии: общий %, зона, смысл, форма + сильная сторона и что потренировать. */
export function SessionSummary({ rows }: { rows: SessionRow[] }) {
  const correct = rows.filter((r) => r.analysis.correct).length;
  const c = rows.filter((r) => r.analysis.coordOk !== null);
  const m = rows.filter((r) => r.analysis.meaningOk !== null);
  const f = rows.filter((r) => r.analysis.formOk !== null);
  const zoneStat = ZONES.map((z) => {
    const r = c.filter((x) => x.item.timeCoordinate === z);
    return { t: `${ZONE_INFO[z].label} reference point`, ok: r.filter((x) => x.analysis.coordOk).length, n: r.length };
  });
  const meanStat = MEANINGS.map((mm) => {
    const r = m.filter((x) => x.item.aspectMeaning === mm);
    return { t: MEANING_INFO[mm].label, ok: r.filter((x) => x.analysis.meaningOk).length, n: r.length };
  });
  const all = [...zoneStat, ...meanStat].filter((x) => x.n >= 2);
  const strong = [...all].sort((a, b) => b.ok / b.n - a.ok / a.n)[0];
  const pairs = new Map<string, number>();
  rows.forEach((r) => r.analysis.highLevelError && PAIR_TITLES[r.analysis.highLevelError] && pairs.set(r.analysis.highLevelError, (pairs.get(r.analysis.highLevelError) ?? 0) + 1));
  const need = [...pairs.entries()].sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-xs font-bold tracking-widest text-primary">РЕЗУЛЬТАТ</p>
        <p className="text-4xl font-display font-bold">{p(correct, rows.length)}</p>
        <p className="text-sm text-muted-foreground">{correct} из {rows.length}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { t: "Координата времени", v: p(c.filter((r) => r.analysis.coordOk).length, c.length) },
          { t: "Смысл", v: p(m.filter((r) => r.analysis.meaningOk).length, m.length) },
          { t: "Форма", v: p(f.filter((r) => r.analysis.formOk).length, f.length) },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border-2 border-border p-2">
            <p className="text-xs font-bold text-muted-foreground">{x.t}</p>
            <p className="font-display text-xl font-bold">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1 text-sm">
        {strong && strong.ok / strong.n >= 0.8 ? <p><b>Сильная сторона:</b> {strong.t}</p> : null}
        {need ? <p><b>Стоит потренировать:</b> {PAIR_TITLES[need[0]]}</p> : <p>Ошибок выбора времени в этой сессии нет.</p>}
      </div>
    </div>
  );
}

function status(m: Metric) {
  if (!enough(m)) return { label: "Мало данных", mark: "·", cls: "border-dashed border-border" };
  if (pct(m) >= 80) return { label: "Уверенно", mark: "✓", cls: "border-success bg-success/10" };
  return { label: "Тренируем", mark: "↻", cls: "border-warning bg-warning/10" };
}

/** Матрица 3 × 4 как карта прогресса: название, % и статус — не только цвет. */
export function Heatmap({ d }: { d: Diagnosis }) {
  return (
    <section className="card-surface space-y-3 p-5 sm:p-6">
      <h2 className="text-xl">Карта 12 времён</h2>
      <p className="text-xs text-muted-foreground sm:hidden">← Проведи, чтобы увидеть всю таблицу →</p>
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[480px] border-separate border-spacing-1 text-xs sm:text-sm">
          <thead>
            <tr>
              <th />
              {ZONES.map((z) => <th key={z} className="font-display">{ZONE_INFO[z].label}</th>)}
            </tr>
          </thead>
          <tbody>
            {MEANINGS.map((mm) => (
              <tr key={mm}>
                <th className="text-left font-medium">{MEANING_INFO[mm].icon} {MEANING_INFO[mm].label}</th>
                {ZONES.map((z) => {
                  const t = tenseOf(z, mm);
                  const m = d.byTense.find((x) => x.key === t)!;
                  const s = status(m);
                  return (
                    <td key={z} className={`rounded-lg border-2 p-2 align-top ${s.cls}`}>
                      <p className="font-bold">{TENSE_INFO[t].title}</p>
                      <p>{s.mark} {s.label}{enough(m) ? ` · ${pct(m)}%` : ""}</p>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** «Мои ошибки» для All 12: не та зона / не тот смысл / форма. */
export function MistakeGroups({ state, bank, onTrain }: { state: CoordState | null; bank: CoordItem[]; onTrain: (focus: string) => void }) {
  const byId = new Map(bank.map((i) => [i.id, i]));
  const wrong = Object.entries(state?.attempts ?? {})
    .map(([id, a]) => ({ id, a, item: byId.get(id) }))
    .filter((x) => x.item && !x.a.correct);
  const zone = wrong.filter((x) => x.a.coordOk === false);
  const meaning = wrong.filter((x) => x.a.coordOk === true && x.a.meaningOk === false);
  const form = wrong.filter((x) => x.a.formOk === false);

  const Card = ({ x }: { x: (typeof wrong)[number] }) => {
    const it = x.item!;
    const chosen = x.a.chosen ? coordsOf(x.a.chosen) : null;
    const pair = x.a.highLevelError && PAIR_TITLES[x.a.highLevelError] ? x.a.highLevelError : null;
    return (
      <li className="card-surface space-y-1 p-4 text-sm">
        {pair ? <p className="font-display font-bold">{PAIR_TITLES[pair]}</p> : x.a.formSkill ? <p className="font-display font-bold">Форма: {x.a.formSkill}</p> : null}
        <p>{it.question.replace("___", `___ (${it.verb})`)}</p>
        {x.a.answer ? <p>Ты написал(а): <b>{x.a.answer}</b></p> : null}
        <p>Правильно: <b>{it.correctAnswer}</b></p>
        <p className="font-mono text-xs">
          {ZONE_INFO[it.timeCoordinate].label} {x.a.coordOk ? "✓" : "✗"}
          {chosen && !x.a.meaningOk ? ` · ${MEANING_INFO[chosen.meaning].label} ✗ · ${MEANING_INFO[it.aspectMeaning].label} ✓` : ` · ${MEANING_INFO[it.aspectMeaning].label} ${x.a.meaningOk === false ? "✗" : "✓"}`}
        </p>
        {pair ? (
          <button type="button" onClick={() => onTrain(pair)} className="mt-1 rounded-lg border-2 border-primary/40 px-3 py-1 text-xs font-bold text-primary">
            Потренировать эту разницу
          </button>
        ) : null}
      </li>
    );
  };

  const Group = ({ title, sub, list }: { title: string; sub: string; list: typeof wrong }) => (
    <section className="space-y-2">
      <h3 className="text-lg">{title} <span className="text-sm text-muted-foreground">({list.length})</span></h3>
      <p className="text-sm text-muted-foreground">{sub}</p>
      {list.length ? <ul className="grid gap-2 sm:grid-cols-2">{list.slice(0, 8).map((x) => <Card key={x.id} x={x} />)}</ul> : <p className="text-sm">Пока пусто.</p>}
    </section>
  );

  return (
    <div className="space-y-5">
      <Group title="Не та временная зона" sub="Present / Past / Future" list={zone} />
      <Group title="Не тот смысл" sub="Событие / процесс / результат / длительность" list={meaning} />
      <Group title="Форма" sub="Вспомогательный глагол / V1 / V2 / V3 / V-ing / отрицание" list={form} />
      <p className="text-sm text-muted-foreground">Все ошибки приложения — в разделе <Link to="/mistakes" className="font-bold text-primary">«Мои ошибки»</Link>.</p>
    </div>
  );
}
