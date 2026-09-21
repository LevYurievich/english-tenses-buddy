import { useState } from "react";
import { Button } from "@/components/ui/app-button";
import { ProgressBar } from "@/components/ProgressBar";
import { BUILD_CASES, PAST_TENSE_NAMES, type BuildCase } from "@/data/all-past/theory";

type Tone = "idle" | "right" | "wrong";

function OptionRow({
  options,
  chosen,
  answer,
  onPick,
}: {
  options: string[];
  chosen: string | null;
  answer: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const selected = chosen === option;
        const isAnswer = option === answer;
        const tone = !chosen
          ? "border-border bg-card hover:border-primary/50"
          : isAnswer
            ? "border-success bg-success/10"
            : selected
              ? "border-destructive bg-destructive/10"
              : "border-border bg-card opacity-70";
        return (
          <button
            key={option}
            type="button"
            disabled={!!chosen}
            onClick={() => onPick(option)}
            className={`rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${tone}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/**
 * «Собери время»: ситуация → точка отсчёта → что важно → время → формула.
 * Тренирует мышление, а не угадывание варианта.
 */
export function BuildTenseTrainer({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [point, setPoint] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [tense, setTense] = useState<string | null>(null);
  const [built, setBuilt] = useState<string[]>([]);

  const current: BuildCase | undefined = BUILD_CASES[index];

  if (!current) {
    return (
      <div className="card-surface space-y-4 p-6">
        <h2 className="text-2xl">Алгоритм собран</h2>
        <p className="text-muted-foreground">
          Контекст → линия времени → смысл → время → формула → форма глагола. Теперь потренируемся на
          заданиях.
        </p>
        <Button onClick={onDone}>К построению timeline</Button>
      </div>
    );
  }

  const formulaDone = built.length === current.formulaAnswer.length;
  const formulaRight =
    formulaDone && built.every((t, i) => t === current.formulaAnswer[i]);
  const formulaTone: Tone = !formulaDone ? "idle" : formulaRight ? "right" : "wrong";

  const next = () => {
    setPoint(null);
    setFocus(null);
    setTense(null);
    setBuilt([]);
    setIndex((i) => i + 1);
  };

  return (
    <section className="card-surface space-y-5 p-5 sm:p-6">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary">
          СИТУАЦИЯ {index + 1} ИЗ {BUILD_CASES.length} · СОБЕРИ ВРЕМЯ
        </p>
        <ProgressBar value={(index / BUILD_CASES.length) * 100} />
      </div>

      <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3">
        <p className="text-xs font-bold tracking-widest text-primary">СИТУАЦИЯ</p>
        <p className="mt-1 text-sm leading-relaxed">{current.situation}</p>
      </div>

      <div className="space-y-2">
        <p className="font-display font-bold">1. Когда происходит ситуация?</p>
        <p className="inline-block rounded-lg bg-muted px-3 py-1.5 text-sm font-bold">PAST</p>
      </div>

      <div className="space-y-2">
        <p className="font-display font-bold">2. {current.pointQuestion}</p>
        <OptionRow
          options={current.pointOptions}
          chosen={point}
          answer={current.pointAnswer}
          onPick={setPoint}
        />
      </div>

      {point ? (
        <div className="space-y-2">
          <p className="font-display font-bold">3. Что важно в этой ситуации?</p>
          <OptionRow
            options={current.focusOptions}
            chosen={focus}
            answer={current.focusAnswer}
            onPick={setFocus}
          />
        </div>
      ) : null}

      {focus ? (
        <div className="space-y-2">
          <p className="font-display font-bold">4. Выбери время</p>
          <OptionRow
            options={PAST_TENSE_NAMES}
            chosen={tense}
            answer={current.tenseAnswer}
            onPick={setTense}
          />
        </div>
      ) : null}

      {tense ? (
        <div className="space-y-2">
          <p className="font-display font-bold">5. Собери формулу</p>
          <div className="flex flex-wrap gap-2">
            {current.formulaTokens.map((token) => (
              <button
                key={token}
                type="button"
                disabled={built.includes(token)}
                onClick={() => setBuilt((b) => [...b, token])}
                className="rounded-lg border-2 border-border px-3 py-2 font-mono text-sm font-bold transition hover:border-primary/60 disabled:opacity-40"
              >
                {token}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-muted/60 px-3 py-3 font-mono text-sm">
            {built.length ? built.join(" + ") : "…"}
            {built.length ? (
              <button
                type="button"
                onClick={() => setBuilt([])}
                className="ml-auto text-xs font-bold text-primary"
              >
                Сбросить
              </button>
            ) : null}
          </div>
          {formulaTone !== "idle" ? (
            <p
              className={`text-sm font-semibold ${formulaRight ? "text-success" : "text-destructive"}`}
            >
              {formulaRight
                ? "✓ Формула собрана верно!"
                : `Порядок другой: ${current.formulaAnswer.join(" + ")}.`}
            </p>
          ) : null}
        </div>
      ) : null}

      {formulaDone ? (
        <div className="space-y-3 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="font-display font-bold text-primary">Почему?</p>
          <p className="text-sm leading-relaxed">{current.why}</p>
          <div className="rounded-lg border border-success/40 bg-success/10 p-3">
            <p className="text-xs font-bold tracking-wide text-muted-foreground">ИТОГ</p>
            <p className="mt-1 font-semibold">{current.result}</p>
          </div>
          <Button variant="success" onClick={next}>
            {index === BUILD_CASES.length - 1 ? "Завершить" : "Дальше"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
