import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/all-tenses")({
  head: () => ({
    meta: [
      { title: "Все времена — смешанная тренировка" },
      {
        name: "description",
        content: "Смешанные упражнения на все 12 времён английского языка без подсказок. Скоро.",
      },
      { property: "og:title", content: "Все времена — English Tenses Trainer" },
      { property: "og:description", content: "Смешанная тренировка на все 12 времён." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Все времена"
      description="Смешанная тренировка на все 12 времён без подсказки, какое время нужно использовать."
      items={["Уровень 1 — с маркерами", "Уровень 2 — по контексту", "Уровень 3 — без подсказок"]}
    />
  ),
});
