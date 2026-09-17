import { createFileRoute } from "@tanstack/react-router";
import { TenseCard } from "@/components/TenseCard";
import { GROUP_TITLES, TENSES_BY_GROUP } from "@/data/tenses";
import type { TenseGroup } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { allPercents, isCompleted } from "@/lib/tense-stats";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Учим времена — English Tenses Trainer" },
      {
        name: "description",
        content: "Каталог 12 времён английского языка: Present, Past и Future с прогрессом.",
      },
      { property: "og:title", content: "Учим времена — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Каталог 12 времён английского языка с прогрессом по каждому.",
      },
    ],
  }),
  component: LearnCatalog,
});

const GROUPS: TenseGroup[] = ["present", "past", "future"];

function LearnCatalog() {
  const progress = useProgress();
  const percents = allPercents(progress);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl">Учим времена</h1>
        <p className="mt-2 text-muted-foreground">
          Разбираем каждое время отдельно: правило → формула → практика.
        </p>
      </header>

      {GROUPS.map((group) => (
        <section key={group} className="space-y-3">
          <h2 className="text-sm font-bold tracking-widest text-muted-foreground">
            {GROUP_TITLES[group]}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TENSES_BY_GROUP(group).map((tense) => (
              <TenseCard
                key={tense.id}
                tense={tense}
                percent={percents[tense.id] ?? 0}
                completed={isCompleted(progress, tense.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
