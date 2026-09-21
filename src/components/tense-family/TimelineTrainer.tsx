import { useState } from "react";
import { Button } from "@/components/ui/app-button";
import { ProgressBar } from "@/components/ProgressBar";
import { TIMELINE_CASES, type TimelineCase } from "@/data/all-past/theory";

/**
 * «Построй timeline»: ученик нажимает карточки в правильном порядке (удобно и на телефоне),
 * затем выбирает время. Без drag-and-drop.
 */
export function TimelineTrainer({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [tense, setTense] = useState<string | null>(null);

  const current: TimelineCase | undefined = TIMELINE_CASES[index];

  if (!current) {
    return (
      <div className="card-surface space-y-4 p-6">
        <h2 className="text-2xl">Линия времени построена</h2>
        <p className="text-muted-foreground">
          Сначала расставляем события, потом выбираем время. Дальше — три уровня тренировки.
        </p>
        <Button onClick={onDone}>К уровню 1</Button>
      </div>
    );
  }

  const ordered = picked.length === current.order.length;
  const orderRight = ordered && picked.every((c, i) => c === current.order[i]);

  const next = () => {
    setPicked([]);
    setTense(null);
    setIndex((i) => i + 1);
  };

  return (
    <section className="card-surface space-y-5 p-5 sm:p-6">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary">
          ЗАДАНИЕ {index + 1} ИЗ {TIMELINE_CASES.length} · ПОСТРОЙ TIMELINE
        </p>
        <ProgressBar value={(index / TIMELINE_CASES.length) * 100} />
      </div>

      <p className="rounded-xl bg-muted/60 px-4 py-4 text-lg font-semibold">{current.sentence}</p>

      <div className="space-y-2">
        <p className="font-display font-bold">
          1. Нажимай карточки по порядку: что было раньше — первым.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {current.cards.map((card) => (
            <button
              key={card}
              type="button"
              disabled={picked.includes(card) || ordered}
              onClick={() => setPicked((p) => [...p, card])}
              className="rounded-xl border-2 border-border px-4 py-3 text-left font-semibold transition hover:border-primary/60 disabled:opacity-40"
            >
              {card}
            </button>
          ))}
        </div>
        <ol className="space-y-1 rounded-xl bg-muted/60 px-4 py-3 font-mono text-sm">
          {picked.map((c, i) => (
            <li key={c}>
              {i + 1}. {c} ↓
            </li>
          ))}
          <li className="text-muted-foreground">NOW</li>
        </ol>
        {picked.length ? (
          <button
            type="button"
            onClick={() => setPicked([])}
            className="text-xs font-bold text-primary"
          >
            Сбросить порядок
          </button>
        ) : null}
        {ordered ? (
          <p className={`text-sm font-semibold ${orderRight ? "text-success" : "text-destructive"}`}>
            {orderRight
              ? `✓ Верно. Раньше произошло: ${current.earlier}.`
              : `Порядок другой. Раньше произошло: ${current.earlier}.`}
          </p>
        ) : null}
      </div>

      {ordered ? (
        <div className="space-y-2">
          <p className="font-display font-bold">2. {current.tenseQuestion}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {current.tenseOptions.map((name) => {
              const selected = tense === name;
              const isAnswer = name === current.tenseAnswer;
              const tone = !tense
                ? "border-border bg-card hover:border-primary/50"
                : isAnswer
                  ? "border-success bg-success/10"
                  : selected
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card opacity-70";
              return (
                <button
                  key={name}
                  type="button"
                  disabled={!!tense}
                  onClick={() => setTense(name)}
                  className={`rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${tone}`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {tense ? (
        <div className="space-y-3 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="font-display font-bold text-primary">Почему?</p>
          <p className="text-sm leading-relaxed">{current.why}</p>
          <Button variant="success" onClick={next}>
            {index === TIMELINE_CASES.length - 1 ? "Завершить" : "Дальше"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
