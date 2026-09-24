import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { Tensy } from "@/components/Tensy";
import { HELP_CARDS, type HelpCard } from "@/data/review-cards";
import { recordAnswer, useProgress } from "@/lib/progress";
import { displayAnswer } from "@/lib/check-exercise";
import { buildSession, loadReview, reviewTopics, saveReviewResult, type ReviewQuestion } from "@/lib/review";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Умное повторение — English Tenses Trainer" },
      { name: "description", content: "Короткая тренировка из 10 заданий по твоим ошибкам: V3, процесс или результат, Present или Past и другие темы." },
      { property: "og:title", content: "Умное повторение — English Tenses Trainer" },
      { property: "og:description", content: "10 заданий по темам, где были ошибки. Карточки-подсказки от Tensy." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewPage,
});

const plural = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "ошибка" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "ошибки" : "ошибок");

export function HelpCardView({ card }: { card: HelpCard }) {
  return (
    <div className="space-y-2 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 text-sm">
      <p className="font-display text-lg font-bold">{card.title}</p>
      {card.lines.map((l) => <p key={l}>{l}</p>)}
      {card.wrong?.map((l) => <p key={l} className="text-destructive">❌ {l}</p>)}
      {card.right?.map((l) => <p key={l} className="text-success">✅ {l}</p>)}
      {card.tensy ? <p className="italic text-muted-foreground">Tensy: «{card.tensy}»</p> : null}
    </div>
  );
}

type Row = { q: ReviewQuestion; correct: boolean };

function ReviewPage() {
  const progress = useProgress();
  const topics = useMemo(() => reviewTopics(progress), [progress]);
  const [session, setSession] = useState<ReviewQuestion[] | null>(null);
  const [i, setI] = useState(0);
  const [rows, setRows] = useState<Row[]>([]);
  const last = typeof window === "undefined" ? undefined : loadReview().last;

  const start = (focus?: string, mixedOnly = false) => {
    setSession(buildSession(mixedOnly ? null : progress, focus));
    setI(0);
    setRows([]);
  };

  if (session && i < session.length) {
    const q = session[i]!;
    return (
      <div className="space-y-4">
        <h1 className="text-2xl">Умное повторение</h1>
        <ExerciseCard
          exercise={q.ex}
          index={i}
          total={session.length}
          mixed
          onResult={(correct, answer) => {
            setRows((r) => [...r, { q, correct }]);
            recordAnswer({ tenseId: q.tenseId, exerciseId: q.ex.id, correct, category: q.ex.errorCategory, question: q.ex.question, userAnswer: displayAnswer(q.ex, answer), correctAnswer: q.ex.correctAnswer, explanation: q.ex.explanation });
          }}
          onNext={() => {
            if (i === session.length - 1) {
              const score = rows.filter((r) => r.correct).length;
              saveReviewResult(session.map((s) => s.ex.id), score, session.length);
            }
            setI(i + 1);
          }}
        />
      </div>
    );
  }

  if (session) {
    const score = rows.filter((r) => r.correct).length;
    const byTopic = HELP_CARDS.map((c) => {
      const r = rows.filter((x) => x.q.topicId === c.id);
      return { c, ok: r.filter((x) => x.correct).length, n: r.length };
    }).filter((x) => x.n);
    const best = [...byTopic].filter((x) => x.ok === x.n).sort((a, b) => b.n - a.n)[0];
    const worst = [...byTopic].filter((x) => x.ok < x.n).sort((a, b) => a.ok / a.n - b.ok / b.n)[0];
    return (
      <div className="space-y-4">
        <section className="card-surface space-y-4 p-6">
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-primary">ПОВТОРЕНИЕ ЗАВЕРШЕНО</p>
            <p className="font-display text-4xl font-bold">{score} / {rows.length}</p>
          </div>
          {byTopic.length ? (
            <ul className="space-y-1 text-sm">
              {byTopic.map((x) => (
                <li key={x.c.id} className="flex justify-between gap-2 rounded-xl border-2 border-border px-3 py-2">
                  <span className="font-medium">{x.c.topic}</span>
                  <span>{x.ok} из {x.n} правильно</span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-sm">
            {best ? `Сегодня лучше получилось: ${best.c.topic}. ` : ""}
            {worst ? `${worst.c.topic} — стоит ещё немного потренировать.` : byTopic.length ? "Все темы сегодня получились." : ""}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => start()} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Ещё 10 заданий</button>
            <button type="button" onClick={() => setSession(null)} className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">К списку тем</button>
          </div>
        </section>
      </div>
    );
  }

  const top = topics[0];
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl">Умное повторение</h1>
        <p className="mt-2 text-muted-foreground">10 заданий из уже пройденных тренировок — по темам, где были ошибки.</p>
      </header>

      {topics.length ? (
        <>
          <section className="card-surface space-y-3 p-5 sm:p-6">
            <h2 className="text-xl">Что стоит повторить</h2>
            <ol className="space-y-2">
              {topics.slice(0, 5).map((t, k) => (
                <li key={t.card.id} className="flex items-center justify-between gap-2 rounded-xl border-2 border-border px-3 py-2">
                  <span><b>{k + 1}.</b> {t.card.topic}</span>
                  <span className="text-sm text-muted-foreground">{t.count} {plural(t.count)}</span>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => start()} className="rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground">Потренировать мои ошибки</button>
            {last ? <p className="text-sm text-muted-foreground">Последнее повторение: {last.score} / {last.total}</p> : null}
          </section>
          {top && top.count >= 2 ? (
            <section className="space-y-3">
              <Tensy mood="think" title="Похоже, здесь есть сложность">Вот короткая подсказка.</Tensy>
              <HelpCardView card={top.card} />
              <button type="button" onClick={() => start(top.card.id)} className="rounded-xl border-2 border-primary/40 px-4 py-2 text-sm font-bold text-primary">Потренировать</button>
            </section>
          ) : null}
        </>
      ) : (
        <section className="card-surface space-y-3 p-6">
          <p>Пока недостаточно ошибок для персонального повторения. Можно пройти смешанную тренировку всех времён.</p>
          <button type="button" onClick={() => start(undefined, true)} className="rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground">Смешанная тренировка</button>
        </section>
      )}

      <p className="text-sm text-muted-foreground">ⓘ Прогресс хранится на этом устройстве в браузере. Регистрация не требуется. · <Link to="/mistakes" className="font-bold text-primary">Мои ошибки</Link></p>
    </div>
  );
}
