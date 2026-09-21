import { TensyAvatar } from "@/components/Tensy";

/**
 * Обратная связь после проверки. Правильный/неправильный ответ различается
 * не только цветом: есть символ, заголовок и текст.
 */
export function AnswerFeedback({
  correct,
  correctAnswer,
  explanation,
  userAnswer,
  tip,
}: {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  userAnswer?: string | undefined;
  tip?: string | undefined;
}) {
  return (
    <div
      className={`appear rounded-2xl border-2 p-4 ${
        correct
          ? "border-success/45 bg-success/10"
          : "border-warning/50 bg-warning/10"
      }`}
      role="status"
    >
      <div className="flex items-start gap-3">
        <TensyAvatar mood={correct ? "cheer" : "mistake"} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold">
            {correct ? "✓ Верно!" : "✕ Почти!"}
          </p>

          {!correct ? (
            <div className="mt-2 space-y-1 text-sm">
              {userAnswer ? (
                <p>
                  <span className="text-muted-foreground">Твой ответ: </span>
                  <span className="font-semibold">{userAnswer}</span>
                </p>
              ) : null}
              {correctAnswer ? (
                <p>
                  <span className="text-muted-foreground">Правильно: </span>
                  <span className="font-bold text-success">✓ {correctAnswer}</span>
                </p>
              ) : null}
              {tip ? <p className="text-sm font-semibold text-primary">{tip}</p> : null}
            </div>
          ) : null}

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{explanation}</p>
        </div>
      </div>
    </div>
  );
}
