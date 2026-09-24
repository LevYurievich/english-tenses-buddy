import type { ErrorCategory, Exercise } from "./types";

type Skill = Exercise["skill"];
type Extra = { situation?: string; difficulty?: 1 | 2 | 3; task?: string; targetTense?: string };

/** Варианты ответа: без точки/вопроса, с сокращениями 'll и won't. */
export function answerVariants(...sentences: string[]): string[] {
  const out = new Set<string>();
  for (const raw of sentences) {
    const s = raw.toLowerCase().replace(/[.?!]$/, "");
    const forms = [s];
    if (/\b(\w+) will /.test(s)) forms.push(s.replace(/\b(\w+) will /, "$1'll "));
    if (/\bwill not\b/.test(s)) forms.push(s.replace(/\bwill not\b/, "won't"));
    if (/\bwon't\b/.test(s)) forms.push(s.replace(/\bwon't\b/, "will not"));
    for (const f of [...forms]) {
      if (f.includes("travelling")) forms.push(f.replace("travelling", "traveling"));
    }
    for (const f of forms) {
      out.add(f);
      out.add(`${f}.`);
      out.add(`${f}?`);
    }
  }
  return [...out];
}

/** Компактные фабрики упражнений для одного времени/модуля. */
export function exerciseKit(tense: string, rule: string) {
  const opt = (extra: Extra) => ({
    ...(extra.situation ? { situation: extra.situation } : {}),
    ...(extra.targetTense ? { targetTense: extra.targetTense } : {}),
  });
  return {
    mc(id: string, cat: ErrorCategory, skill: Skill, question: string, options: string[], correctAnswer: string, hint: string, explanation: string, extra: Extra = {}): Exercise {
      return { id, tense, type: "multiple-choice", difficulty: extra.difficulty ?? 2, skill, task: extra.task ?? "Выбери правильный вариант", ...opt(extra), question, options, correctAnswer, hint, explanation, rule, errorCategory: cat };
    },
    fb(id: string, cat: ErrorCategory, skill: Skill, question: string, answers: string[], hint: string, explanation: string, extra: Extra = {}): Exercise {
      return { id, tense, type: "fill-blank", difficulty: extra.difficulty ?? 2, skill, task: extra.task ?? "Раскрой скобки", ...opt(extra), question, correctAnswer: answers[0] ?? "", acceptableAnswers: answerVariants(...answers), hint, explanation, rule, errorCategory: cat };
    },
    tr(id: string, type: "transformation" | "translation", cat: ErrorCategory, skill: Skill, task: string, question: string, answers: string[], hint: string, explanation: string, difficulty: 1 | 2 | 3 = 2): Exercise {
      return { id, tense, type, difficulty, skill, task, question, correctAnswer: answers[0] ?? "", acceptableAnswers: answerVariants(...answers), hint, explanation, rule, errorCategory: cat };
    },
    err(id: string, cat: ErrorCategory, tokens: string[], wrongIndex: number, correctAnswer: string, hint: string, explanation: string): Exercise {
      return { id, tense, type: "error-finder", difficulty: 2, skill: "formula", task: "Найди ошибку", question: tokens.join(" "), tokens, wrongIndex, correctAnswer, hint, explanation, rule, errorCategory: cat };
    },
  };
}
