import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/time-machine")({
  head: () => ({
    meta: [
      { title: "Машина времени — English Tenses Trainer" },
      {
        name: "description",
        content:
          "Интерактивная временная шкала PAST — NOW — FUTURE для расстановки действий. Скоро.",
      },
      { property: "og:title", content: "Машина времени — English Tenses Trainer" },
      { property: "og:description", content: "Расставляй действия на линии времени. Скоро." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Машина времени"
      description="Здесь появится интерактивная шкала: PAST ←———— NOW ————→ FUTURE. Действия можно будет размещать на линии времени."
      items={["PAST — прошлое", "NOW — настоящее", "FUTURE — будущее"]}
    />
  ),
});
