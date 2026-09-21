/** Данные теории Future Continuous. Отдельно от UI — тексты легко дополнять. */

export const MAIN_IDEA = {
  question: "ЧТО БУДЕТ ПРОИСХОДИТЬ В ТОТ МОМЕНТ?",
  example: "At 8 p.m. tomorrow, I will be doing my homework.",
  ru: "Завтра в 8 вечера я буду делать домашнее задание.",
};

export const TIMELINE_MAIN = `NOW                         FUTURE
●────────────────────────────●
                         8 P.M.
                    █████████████
                       STUDYING`;

export const TIMELINE_AROUND = `7:30             8:00              9:30
●════════════════●═════════════════●
START            ↑                 END
                 LOOK HERE
              WATCHING`;

export const TIMELINE_FOOTBALL = `4:00                    5:00                    6:00
●═══════════════════════●══════════════════════●
      FOOTBALL`;

/** Continuous family: одна идея в трёх временах. */
export const CONTINUOUS_FAMILY: {
  id: string;
  label: string;
  question: string;
  formula: string;
  example: string;
  ru: string;
}[] = [
  {
    id: "present",
    label: "PRESENT CONTINUOUS",
    question: "What is happening NOW?",
    formula: "am / is / are + V-ing",
    example: "I am studying.",
    ru: "Процесс сейчас.",
  },
  {
    id: "past",
    label: "PAST CONTINUOUS",
    question: "What was happening THEN?",
    formula: "was / were + V-ing",
    example: "I was studying at 8 yesterday.",
    ru: "Процесс в тот момент прошлого.",
  },
  {
    id: "future",
    label: "FUTURE CONTINUOUS",
    question: "What will be happening THEN?",
    formula: "will be + V-ing",
    example: "I will be studying at 8 tomorrow.",
    ru: "Процесс в тот момент будущего.",
  },
];

export const ALL_PERSONS = [
  "I will be working.",
  "You will be working.",
  "He will be working.",
  "She will be working.",
  "It will be working.",
  "We will be working.",
  "They will be working.",
];

export const FORMS: { sign: string; formula: string; examples: string[] }[] = [
  {
    sign: "+",
    formula: "Subject + will + be + V-ing",
    examples: ["I will be studying.", "Tom will be sleeping.", "They will be playing football."],
  },
  {
    sign: "−",
    formula: "Subject + will not (won't) + be + V-ing",
    examples: ["I won't be sleeping.", "Tom won't be working.", "They won't be playing."],
  },
  {
    sign: "?",
    formula: "Will + subject + be + V-ing ?",
    examples: ["Will you be studying?", "Will Tom be sleeping?", "Will they be playing?"],
  },
];

export const WH_QUESTIONS = [
  "What will you be doing at 8?",
  "Where will Tom be staying?",
  "Who will be working tomorrow morning?",
];

export const MOMENT_EXPRESSIONS = [
  { en: "this time tomorrow", ru: "в это же время завтра" },
  { en: "at 5 tomorrow", ru: "завтра в 5" },
  { en: "tomorrow morning at 10", ru: "завтра утром в 10" },
  { en: "at this time next week", ru: "в это же время на следующей неделе" },
];

export const ING_RULES = [
  "work → working",
  "study → studying",
  "make → making",
  "run → running",
  "lie → lying",
];

export const TYPICAL_MISTAKES: { wrong: string; right: string; why: string }[] = [
  { wrong: "I will studying.", right: "I will be studying.", why: "BE нельзя потерять: WILL → BE → ING." },
  { wrong: "She will be study.", right: "She will be studying.", why: "После be нужна форма -ing." },
  { wrong: "Tom will being sleep.", right: "Tom will be sleeping.", why: "После will — базовая форма be, а -ing получает смысловой глагол." },
  { wrong: "Will Tom be sleeps?", right: "Will Tom be sleeping?", why: "В вопросе тоже be + V-ing." },
  { wrong: "Tom will is studying.", right: "Tom will be studying.", why: "После will не бывает is / am / are." },
];

export const FS_VS_FC: { title: string; left: string; right: string; note: string }[] = [
  {
    title: "Что произойдёт или что будет происходить?",
    left: "I'll call Tom tonight. — Future Simple: событие / решение.",
    right: "At 8 tonight, I'll be talking to Tom. — Future Continuous: процесс в 8 часов.",
    note: "Дело не в длине действия, а в том, на что смотрит говорящий.",
  },
  {
    title: "Прогноз или процесс в момент?",
    left: "I think Tom will play well tomorrow. — прогноз.",
    right: "At 3 tomorrow, Tom will be playing in the final. — процесс в 3 часа.",
    note: "Есть конкретная точка будущего и процесс вокруг неё → Future Continuous.",
  },
  {
    title: "Решение сейчас или процесс в момент?",
    left: "The phone is ringing. I'll answer it. — решение в момент речи.",
    right: "Don't call me at 7. I'll be having dinner. — процесс в 7 часов.",
    note: "Оба предложения о будущем, но фокус разный.",
  },
];

export const PC_FUTURE_NOTE = {
  left: "I'm meeting Anna at 6 tomorrow.",
  leftNote: "Договорённость: время согласовано с Анной.",
  right: "At 6 tomorrow, I'll be meeting Anna.",
  rightNote: "Говорящий смотрит, что будет происходить в этот будущий момент.",
};

export const CHEATSHEET: { sign: string; example: string }[] = [
  { sign: "+", example: "I will be working." },
  { sign: "−", example: "I won't be working." },
  { sign: "?", example: "Will I be working?" },
];
