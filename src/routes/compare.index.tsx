import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/compare/")({
  head: () => ({
    meta: [
      { title: "Сравниваем времена — English Tenses Trainer" },
      {
        name: "description",
        content:
          "Тренировки на разницу между Simple, Continuous, Perfect и Perfect Continuous. Скоро.",
      },
      { property: "og:title", content: "Сравниваем времена — English Tenses Trainer" },
      {
        property: "og:description",
        content: "Учимся понимать разницу между похожими временами.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Сравниваем времена"
      description="Учимся понимать разницу между похожими временами: Simple, Continuous, Perfect и Perfect Continuous."
      items={["Все времена Present", "Все времена Past", "Все времена Future"]}
    />
  ),
});
