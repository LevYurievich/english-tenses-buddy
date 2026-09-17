/** Нормализация ответа: регистр, апострофы, лишние пробелы и точка в конце. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([?!.,])/g, "$1")
    .replace(/[.]+$/g, "")
    .trim();
}

export function isCorrect(userAnswer: string, accepted: string[]): boolean {
  const a = normalize(userAnswer);
  if (!a) return false;
  return accepted.some((x) => normalize(x) === a);
}
