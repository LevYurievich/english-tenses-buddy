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
    id: "back-in-time",
    icon: "🕰",
    title: "Назад во времени",
    description: "Освоен Past Simple",
    xp: 40,
  },
  {
    id: "even-earlier",
    icon: "⏮",
    title: "Ещё раньше!",
    description: "Освоен Past Perfect",
    xp: 40,
  },
  {
    id: "past-in-process",
    icon: "🎞",
    title: "В процессе прошлого",
    description: "Освоен Past Continuous",
    xp: 40,
  },
  {
    id: "long-journey",
    icon: "⌛",
    title: "Долгое путешествие",
    description: "Освоен Past Perfect Continuous",
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
    id: "past-master",
    icon: "🗺",
    title: "Мастер прошлого",
    description: "Past Challenge пройден",
    xp: 60,
  },
  {
    id: "forward-to-future",
    icon: "🚀",
    title: "Вперёд в будущее!",
    description: "Освоен Future Simple",
    xp: 40,
  },
  {
    id: "looked-into-future",
    icon: "🔭",
    title: "Заглянул в будущее",
    description: "Освоен Future Continuous",
    xp: 40,
  },
  {
    id: "mission-on-time",
    icon: "🎯",
    title: "Миссия выполнена к сроку",
    description: "Освоен Future Perfect",
    xp: 40,
  },
  {
    id: "twelve-of-twelve",
    icon: "🌍",
    title: "12 из 12",
    description: "Освоен Future Perfect Continuous — пройдены уроки всех 12 времён",
    xp: 80,
  },
  {
    id: "future-master",
    icon: "🔮",
    title: "Мастер будущего",
    description: "Future Challenge пройден",
    xp: 60,
  },
  {
    id: "all12-master",
    icon: "🌐",
    title: "Переключатель времён",
    description: "Ты сам переключаешься между всеми 12 временами в одной истории",
    xp: 80,
  },
  {
    id: "final-master",
    icon: "🏁",
    title: "Мастер 12 времён",
    description: "Final Challenge пройден до конца (игровое достижение, не языковой уровень)",
    xp: 100,
  },
  {
    id: "time-navigator",
    icon: "🧭",
    title: "Навигатор времени",
    description: "Ты научился находить время по двум координатам",
    xp: 60,
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
