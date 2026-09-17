export const MARKER_WORDS = [
  { en: "now", ru: "сейчас" },
  { en: "right now", ru: "прямо сейчас" },
  { en: "at the moment", ru: "в данный момент" },
  { en: "currently", ru: "в настоящее время" },
  { en: "today", ru: "сегодня" },
  { en: "this week", ru: "на этой неделе" },
  { en: "Look!", ru: "Смотри!" },
  { en: "Listen!", ru: "Слушай!" },
];

export const USAGE_CARDS: {
  title: string;
  text: string;
  examples: { ru: string; en: string }[];
}[] = [
  {
    title: "Действие происходит прямо сейчас",
    text: "Мы говорим о том, что происходит в этот момент, в процессе.",
    examples: [
      { ru: "Я сейчас читаю книгу.", en: "I am reading a book now." },
      { ru: "Она разговаривает по телефону.", en: "She is talking on the phone." },
    ],
  },
  {
    title: "Ситуация происходит примерно сейчас",
    text: "Не обязательно в эту секунду. Это процесс, который идёт в жизни человека сейчас.",
    examples: [
      { ru: "Я сейчас изучаю английский.", en: "I am studying English." },
      { ru: "Мы готовимся к соревнованиям.", en: "We are getting ready for the competition." },
    ],
  },
  {
    title: "Временная ситуация",
    text: "Так бывает не всегда, а только сейчас, какое-то время.",
    examples: [
      { ru: "В этом месяце я живу у бабушки.", en: "I am staying with my grandmother this month." },
      { ru: "На этой неделе он ездит в школу на автобусе.", en: "He is taking the bus to school this week." },
    ],
  },
];

export const BE_TABLE = [
  { who: "I", be: "am", example: "I am reading" },
  { who: "He / She / It", be: "is", example: "She is reading" },
  { who: "You / We / They", be: "are", example: "They are reading" },
];

export const ING_RULES: { title: string; note: string; examples: string[] }[] = [
  {
    title: "Обычно просто + ing",
    note: "Ничего не меняем, добавляем окончание.",
    examples: ["play → playing", "read → reading", "work → working"],
  },
  {
    title: "Глагол заканчивается на -e",
    note: "Обычно убираем -e и добавляем -ing.",
    examples: ["make → making", "write → writing", "dance → dancing"],
  },
  {
    title: "Удвоение последней согласной",
    note: "У некоторых коротких глаголов с ударным последним слогом последняя согласная удваивается. Но: open → opening, visit → visiting.",
    examples: ["run → running", "sit → sitting", "swim → swimming"],
  },
  {
    title: "-ie превращается в -y",
    note: "Таких глаголов немного — их проще запомнить.",
    examples: ["lie → lying", "die → dying", "tie → tying"],
  },
];

export const CHEATSHEET_SIGNS = [
  { sign: "+", example: "She is playing." },
  { sign: "−", example: "She isn't playing." },
  { sign: "?", example: "Is she playing?" },
];
