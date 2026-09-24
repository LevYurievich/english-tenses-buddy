import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { Tensy } from "@/components/Tensy";
import { HelpCardView } from "@/routes/review";
import { FINAL_SIZE, type FinalQuestion } from "@/data/final/items";
import { MEANINGS, MEANING_INFO, TENSE_INFO, ZONES, ZONE_INFO, coordsOf, tenseOf, type Meaning, type Zone } from "@/data/coordinates/model";
import { buildFinal, finishFinal, formSkill, grade, restoreLast, topCards, type ItemResult, type QuestionResult } from "@/lib/final";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "Final Challenge — English Tenses Trainer" },
      { name: "description", content: "Финальная проверка: 30 заданий на все 12 времён без подсказок. Разбор ошибок после завершения." },
      { property: "og:title", content: "Final Challenge — все 12 времён" },
      { property: "og:description", content: "30 заданий, никаких подсказок — только контекст. Потом разбор ГДЕ? / ЧТО? / ФОРМА." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinalPage,
});

const TASK: Record<FinalQuestion["kind"], string> = {
  write: "Вставь глагол в правильной форме",
  choose: "Выбери правильный вариант",
  fix: "Найди ошибку и напиши правильную форму глагола",
  translate: "Переведи: впиши глагол в правильной форме",
  two: "Вставь оба глагола в правильной форме",
};
const ZONE_RU: Record<Zone, string> = { present: "настоящее", past: "прошлое", future: "будущее" };
const MEAN_RU: Record<Meaning, string> = { simple: "факт / событие", process: "процесс", result: "результат", duration: "длительность" };

function FinalPage() {
  const [phase, setPhase] = useState<"start" | "run" | "result">("start");
  const [qs, setQs] = useState<FinalQuestion[]>([]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<{ id: string; answers: string[] }[]>([]);
  const [results, setResults] = useState<QuestionResult[] | null>(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const last = restoreLast();
    if (last) setResults(last);
  }, []);

  const start = () => {
    setQs(buildFinal());
    setI(0);
    setAnswers([]);
    setPhase("run");
    window.scrollTo({ top: 0 });
  };

  const submit = (vals: string[]) => {
    const q = qs[i]!;
    const next = [...answers, { id: q.id, answers: vals }];
    setAnswers(next);
    setAccepted(true);
    setTimeout(() => setAccepted(false), 900);
    if (i + 1 < qs.length) {
      setI(i + 1);
      return;
    }
    const res = qs.map((qq, k) => grade(qq, next[k]!.answers));
    finishFinal(res, next);
    setResults(res);
    setPhase("result");
    window.scrollTo({ top: 0 });
  };

  if (phase === "run" && qs[i]) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <ProgressBar value={(i / qs.length) * 100} label={`Вопрос ${i + 1} / ${qs.length}`} />
        <p className="h-5 text-sm font-bold text-success" aria-live="polite">{accepted ? "✓ Ответ принят" : ""}</p>
        <QuestionView key={qs[i]!.id} q={qs[i]!} onSubmit={submit} />
      </div>
    );
  }

  if (phase === "result" && results) return <Results results={results} onAgain={start} />;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <section className="card-surface space-y-4 p-6 text-center">
        <p className="text-xs font-bold tracking-widest text-primary">ФИНАЛЬНАЯ ПРОВЕРКА</p>
        <h1 className="text-3xl sm:text-4xl">Final Challenge</h1>
        <p className="text-muted-foreground">{FINAL_SIZE} заданий. Все 12 времён. Никаких подсказок — только контекст.</p>
        <Tensy mood="test" compact>Маршрут не указан. Теперь ты сам определяешь координаты времени.</Tensy>
        <p className="text-sm text-muted-foreground">Во время проверки подсказки и разборы скрыты. После завершения ты сможешь посмотреть все ошибки.</p>
        <button type="button" onClick={start} className="rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground">Начать</button>
      </section>
      {results ? (
        <button type="button" onClick={() => setPhase("result")} className="w-full rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">
          Посмотреть прошлый результат
        </button>
      ) : null}
    </div>
  );
}

function withVerb(item: FinalQuestion["items"][number]) {
  return item.question.replace("___", `___ (${item.verb})`);
}

function QuestionView({ q, onSubmit }: { q: FinalQuestion; onSubmit: (v: string[]) => void }) {
  const [vals, setVals] = useState<string[]>(q.items.map(() => ""));
  const first = q.items[0]!;
  const ready = vals.every((v) => v.trim());
  const set = (k: number, v: string) => setVals((p) => p.map((x, j) => (j === k ? v : x)));

  return (
    <form
      className="card-surface space-y-4 p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) onSubmit(vals);
      }}
    >
      <p className="text-sm font-bold text-muted-foreground">{TASK[q.kind]}</p>
      {q.kind === "two" ? (
        <p className="text-lg leading-relaxed">{first.context?.[0]}</p>
      ) : (
        <div className="space-y-1 text-lg leading-relaxed">
          {q.kind === "fix" ? <p className="rounded-xl bg-muted p-3">{q.prompt}</p> : null}
          {q.kind === "translate" ? <p className="rounded-xl bg-muted p-3">{q.prompt}</p> : null}
          {q.kind !== "fix" ? (
            <>
              {first.context?.map((c) => <p key={c}>{c}</p>)}
              <p>{withVerb(first)}</p>
            </>
          ) : null}
        </div>
      )}
      {q.kind === "choose" && first.options ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {first.options.map((o) => (
            <button key={o} type="button" onClick={() => onSubmit([o])} className="rounded-xl border-2 border-border px-4 py-3 text-left font-medium hover:border-primary">
              {o}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {q.items.map((it, k) => (
            <label key={it.id} className="block space-y-1">
              {q.items.length > 1 ? <span className="text-sm text-muted-foreground">{k + 1}. ({it.verb})</span> : null}
              <input
                value={vals[k]}
                onChange={(e) => set(k, e.target.value)}
                autoFocus={k === 0}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={q.kind === "fix" ? "Правильная форма глагола" : "Твой ответ"}
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-lg focus:border-primary focus:outline-none"
              />
            </label>
          ))}
          <button type="submit" disabled={!ready} className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground disabled:opacity-50">
            Ответить
          </button>
        </div>
      )}
    </form>
  );
}

function reason(r: ItemResult): string {
  const a = r.analysis;
  if (a.formOk === false) return `Время выбрано правильно. Ошибка только в форме: ${formSkill(r)}.`;
  if (!a.chosen) return "Форму не удалось распознать — сравни свой ответ с правильным.";
  const c = coordsOf(a.chosen);
  if (a.coordOk && !a.meaningOk) return `Ты правильно определил ${ZONE_RU[r.item.timeCoordinate]}, но перепутал ${MEAN_RU[c.meaning]} и ${MEAN_RU[r.item.aspectMeaning]}.`;
  if (!a.coordOk && a.meaningOk) return `Смысл «${MEAN_RU[r.item.aspectMeaning]}» определён правильно, но точка отсчёта должна быть ${ZONE_INFO[r.item.timeCoordinate].label}, а не ${ZONE_INFO[c.zone].label}.`;
  return "Здесь другая и точка отсчёта, и смысл. Начни с вопроса ГДЕ?";
}

const pctText = (ok: number, n: number) => (n ? `${Math.round((ok / n) * 100)}%` : "—");

function Results({ results, onAgain }: { results: QuestionResult[]; onAgain: () => void }) {
  const [review, setReview] = useState(false);
  const items = results.flatMap((r) => r.items);
  const score = results.filter((r) => r.correct).length;
  const c = items.filter((x) => x.analysis.coordOk !== null);
  const m = items.filter((x) => x.analysis.meaningOk !== null);
  const f = items.filter((x) => x.analysis.formOk !== null);
  const zone = ZONES.map((z) => ({ t: ZONE_INFO[z].label, r: c.filter((x) => x.item.timeCoordinate === z) }));
  const mean = MEANINGS.map((mm) => ({ t: MEANING_INFO[mm].label, r: m.filter((x) => x.item.aspectMeaning === mm) }));
  const formMap = new Map<string, number>();
  items.filter((x) => x.analysis.formOk === false).forEach((x) => formMap.set(formSkill(x), (formMap.get(formSkill(x)) ?? 0) + 1));
  const cards = topCards(results);
  const wrong = results.filter((r) => !r.correct);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <section className="card-surface space-y-4 p-5 text-center sm:p-6">
        <p className="text-xs font-bold tracking-widest text-primary">FINAL CHALLENGE ЗАВЕРШЁН</p>
        <p className="font-display text-4xl font-bold">{score} / {results.length}</p>
        <p className="text-muted-foreground">{pctText(score, results.length)}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { t: "ГДЕ?", s: "Time coordinate", v: pctText(c.filter((x) => x.analysis.coordOk).length, c.length) },
            { t: "ЧТО?", s: "Meaning", v: pctText(m.filter((x) => x.analysis.meaningOk).length, m.length) },
            { t: "ФОРМА", s: "Form", v: pctText(f.filter((x) => x.analysis.formOk).length, f.length) },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border-2 border-border p-2">
              <p className="font-display font-bold">{x.t}</p>
              <p className="text-xs text-muted-foreground">{x.s}</p>
              <p className="font-display text-xl font-bold">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 text-left text-sm sm:grid-cols-2">
          <div>
            <p className="font-bold">Точка отсчёта</p>
            {zone.map((z) => <p key={z.t}>{z.t}: {z.r.length >= 3 ? pctText(z.r.filter((x) => x.analysis.coordOk).length, z.r.length) : "Мало данных"}</p>)}
          </div>
          <div>
            <p className="font-bold">Смысл</p>
            {mean.map((z) => <p key={z.t}>{z.t}: {z.r.length >= 3 ? pctText(z.r.filter((x) => x.analysis.meaningOk).length, z.r.length) : "Мало данных"}</p>)}
          </div>
        </div>
        {formMap.size ? (
          <p className="text-left text-sm"><b>Форма — где были неточности:</b> {[...formMap.entries()].map(([k, n]) => `${k} (${n})`).join(", ")}</p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link to="/review" className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Потренировать ошибки</Link>
          {wrong.length ? (
            <button type="button" onClick={() => setReview((v) => !v)} className="rounded-xl border-2 border-primary/40 px-5 py-3 font-bold text-primary">Разобрать ошибки</button>
          ) : null}
          <button type="button" onClick={onAgain} className="rounded-xl border-2 border-border px-5 py-3 font-bold">Пройти ещё раз</button>
        </div>
      </section>

      {review ? (
        <section className="space-y-3">
          <h2 className="text-xl">Разбор ошибок</h2>
          {wrong.map((r) => (
            <div key={r.q.id} className="card-surface space-y-3 p-4 text-sm sm:p-5">
              {r.q.prompt ? <p className="italic text-muted-foreground">{r.q.prompt}</p> : null}
              {r.items[0]!.item.context?.length && r.q.kind !== "two" ? <p>{r.items[0]!.item.context.join(" ")}</p> : null}
              {r.items.filter((x) => !x.analysis.correct).map((x) => (
                <div key={x.item.id} className="space-y-1 border-t border-border pt-2">
                  <p className="font-medium">{withVerb(x.item)}</p>
                  <p>Твой ответ: <span className="text-destructive">{x.answer || "—"}</span></p>
                  <p>Правильный ответ: <b className="text-success">{x.item.correctAnswer}</b></p>
                  <p>ГДЕ? {ZONE_INFO[x.item.timeCoordinate].label} {x.analysis.coordOk === false ? "✗" : x.analysis.coordOk ? "✓" : ""} — {x.item.whyWhere}</p>
                  <p>ЧТО? {MEANING_INFO[x.item.aspectMeaning].label} {x.analysis.meaningOk === false ? "✗" : x.analysis.meaningOk ? "✓" : ""} — {x.item.whyWhat}</p>
                  <p>Нужно: <b>{TENSE_INFO[x.item.tense].title}</b> · Форма: {TENSE_INFO[x.item.tense].formula}</p>
                  <p className="rounded-lg bg-muted p-2">{reason(x)}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}

      <FinalMap items={items} />

      {cards.length ? (
        <section className="space-y-3">
          <h2 className="text-xl">Что стоит повторить</h2>
          {cards.map((card) => <HelpCardView key={card.id} card={card} />)}
        </section>
      ) : null}
    </div>
  );
}

/** Матрица 3 × 4 как карта результата: без процентов по одному вопросу. */
function FinalMap({ items }: { items: ItemResult[] }) {
  return (
    <section className="card-surface space-y-3 p-5 sm:p-6">
      <h2 className="text-xl">Карта 12 времён</h2>
      <div className="overflow-x-auto">
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
                  const r = items.filter((x) => x.item.tense === t);
                  const bad = r.some((x) => !x.analysis.correct);
                  const s = bad
                    ? { l: "↻ Стоит повторить", cls: "border-warning bg-warning/10" }
                    : r.length >= 2
                      ? { l: "✓ Уверенно", cls: "border-success bg-success/10" }
                      : { l: "• Мало данных", cls: "border-dashed border-border" };
                  return (
                    <td key={z} className={`rounded-lg border-2 p-2 align-top ${s.cls}`}>
                      <p className="font-bold">{TENSE_INFO[t].title}</p>
                      <p>{s.l}</p>
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
