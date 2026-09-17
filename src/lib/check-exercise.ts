import type { Exercise } from "@/data/types";
import { isCorrect } from "./answer-check";

export function acceptedAnswers(ex: Exercise): string[] {
  switch (ex.type) {
    case "multiple-choice":
      return [ex.correctAnswer];
    case "error-finder":
      return [String(ex.wrongIndex)];
    default:
      return ex.acceptableAnswers.length ? ex.acceptableAnswers : [ex.correctAnswer];
  }
}

export function checkAnswer(ex: Exercise, answer: string): boolean {
  if (ex.type === "error-finder") return answer === String(ex.wrongIndex);
  if (ex.type === "multiple-choice") return answer === ex.correctAnswer;
  return isCorrect(answer, acceptedAnswers(ex));
}

export function displayAnswer(ex: Exercise, answer: string): string {
  if (ex.type === "error-finder") {
    const i = Number(answer);
    return Number.isNaN(i) ? answer : (ex.tokens[i] ?? answer);
  }
  return answer;
}
