export function AnswerFeedback({
  correct,
  correctAnswer,
  explanation,
}: {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
}) {
  return (
    <div
      className={`rounded-xl border-2 p-4 ${
        correct
          ? "border-success/40 bg-success/10 text-foreground"
          : "border-destructive/40 bg-destructive/10 text-foreground"
      }`}
      role="status"
    >
      <p className="font-display text-lg font-bold">
        {correct ? "✓ Верно!" : "✕ Почти. Посмотри на правило."}
      </p>
      {!correct ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Правильно: </span>
          <span className="font-semibold text-success">{correctAnswer}</span>
        </p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{explanation}</p>
    </div>
  );
}
