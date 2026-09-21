/** Небольшой стартовый набор достижений. Легко расширяется под Past и Future. */
export type Achievement = {
  id: string;
  icon: string;
  title: string;
  description: string;
  xp: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-habit",
    icon: "🔁",
    title: "Первая привычка",
    description: "Освоен Present Simple",
    xp: 40,
  },
  {
    id: "in-the-moment",
    icon: "▶",
    title: "В моменте",
    description: "Освоен Present Continuous",
    xp: 40,
  },
  {
    id: "result-is-here",
    icon: "✓",
    title: "Результат есть",
    description: "Освоен Present Perfect",
    xp: 40,
  },
  {
    id: "duration-master",
    icon: "⏱",
    title: "Мастер длительности",
    description: "Освоен Present Perfect Continuous",
    xp: 40,
  },
  {
    id: "on-target",
    icon: "🎯",
    title: "Точно в цель",
    description: "10 правильных ответов подряд",
    xp: 30,
  },
  {
    id: "mistake-work",
    icon: "🧠",
    title: "Работа над ошибками",
    description: "Исправлено 20 ошибок",
    xp: 30,
  },
  {
    id: "present-master",
    icon: "🏆",
    title: "Present Master",
    description: "Итоговый тест Present Tenses пройден на 80% и выше",
    xp: 60,
  },
];

export const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));
