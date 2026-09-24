/** Проверка условий достижений. Считается по уже сохранённым данным, без генерации. */
import { ACHIEVEMENTS } from "@/data/achievements";
import { getTenseProgress, type ProgressState } from "./progress";
import { loadGame, unlockAchievements, updateGame, type GameState } from "./gamification";
import { isCompleted } from "./tense-stats";

const MASTERY: Record<string, string> = {
  "present-simple": "first-habit",
  "present-continuous": "in-the-moment",
  "present-perfect": "result-is-here",
  "present-perfect-continuous": "duration-master",
  "past-simple": "back-in-time",
  "past-continuous": "past-in-process",
  "past-perfect": "even-earlier",
  "past-perfect-continuous": "long-journey",
  "future-simple": "forward-to-future",
  "future-continuous": "looked-into-future",
  "future-perfect": "mission-on-time",
};

export function earnedAchievements(progress: ProgressState, game: GameState): string[] {
  const ids: string[] = [];

  Object.entries(MASTERY).forEach(([tenseId, achievementId]) => {
    if (isCompleted(progress, tenseId)) ids.push(achievementId);
  });

  if (game.bestAnswerStreak >= 10) ids.push("on-target");
  if (game.correctedMistakes >= 20) ids.push("mistake-work");

  const allPresent = getTenseProgress(progress, "all-present");
  if (
    allPresent.bestTestScore !== null &&
    allPresent.testTotal &&
    allPresent.bestTestScore / allPresent.testTotal >= 0.8
  ) {
    ids.push("present-master");
  }

  const allPast = getTenseProgress(progress, "all-past");
  if ((allPast.testAttempts ?? 0) > 0 && allPast.bestTestScore !== null) {
    ids.push("past-master");
  }

  return ids;
}

/**
 * Начисляет новые достижения и возвращает их id.
 * Вызывается из UI после изменения прогресса.
 */
export function syncAchievements(progress: ProgressState): string[] {
  const game = loadGame();
  const earned = earnedAchievements(progress, game);
  const fresh = earned.filter((id) => !game.achievements.includes(id));
  if (!fresh.length) return [];
  const bonus = fresh.reduce(
    (sum, id) => sum + (ACHIEVEMENTS.find((a) => a.id === id)?.xp ?? 0),
    0,
  );
  unlockAchievements(fresh);
  updateGame((g) => ({ ...g, xp: g.xp + bonus }));
  return fresh;
}
