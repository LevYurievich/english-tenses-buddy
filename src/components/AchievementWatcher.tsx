import { useEffect, useState } from "react";
import { ACHIEVEMENT_BY_ID } from "@/data/achievements";
import { syncAchievements } from "@/lib/achievements";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/app-button";
import { TensyAvatar } from "@/components/Tensy";

/**
 * Следит за прогрессом и показывает экран нового достижения.
 * Короткое появление, без длинных анимаций и без блокировки обучения.
 */
export function AchievementWatcher() {
  const progress = useProgress();
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    if (!progress) return;
    const fresh = syncAchievements(progress);
    if (fresh.length) setQueue((q) => [...q, ...fresh]);
  }, [progress]);

  const current = queue[0];
  if (!current) return null;
  const achievement = ACHIEVEMENT_BY_ID[current];
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="appear w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-center shadow-lg">
        <div className="flex justify-center">
          <TensyAvatar mood="cheer" size="lg" />
        </div>
        <p className="mt-4 text-xs font-bold tracking-widest text-primary">НОВОЕ ДОСТИЖЕНИЕ</p>
        <p className="mt-2 font-display text-2xl">
          <span aria-hidden>{achievement.icon}</span> {achievement.title}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{achievement.description}</p>
        <p className="stat-chip mt-4 bg-xp/15 text-foreground">⭐ +{achievement.xp} XP</p>
        <Button className="mt-5 w-full" onClick={() => setQueue((q) => q.slice(1))}>
          Продолжить
        </Button>
      </div>
    </div>
  );
}
