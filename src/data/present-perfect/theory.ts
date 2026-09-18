export const MARKER_WORDS = [
  { en: "already", ru: "уже" },
  { en: "just", ru: "только что" },
  { en: "yet", ru: "уже / ещё" },
  { en: "ever", ru: "когда-либо" },
  { en: "never", ru: "никогда" },
  { en: "recently", ru: "недавно" },
  { en: "so far", ru: "до сих пор / пока" },
  { en: "this week", ru: "на этой неделе" },
  { en: "today", ru: "сегодня" },
];

export const USAGE_CARDS: {
  title: string;
  text: string;
  examples: { ru: string; en: string }[];
}[] = [
  {
    title: "Результат важен сейчас",
    text: "Действие произошло раньше, но нас интересует то, что есть сейчас.",
    examples: [
      { ru: "Я сломал телефон. (Сейчас телефон сломан.)", en: "I have broken my phone." },
      { ru: "Я потерял ключ. (Ключа сейчас нет.)", en: "I have lost my key." },
    ],
  },
  {
    title: "Жизненный опыт",
    text: "Говорим об опыте человека до настоящего момента. Точный момент не называем.",
    examples: [
      { ru: "Я был в Китае.", en: "I have been to China." },
      { ru: "Она никогда не пробовала суши.", en: "She has never tried sushi." },
    ],
  },
  {
    title: "Только что / уже / ещё не",
    text: "Говорим о том, что произошло или пока не произошло к этому моменту.",
    examples: [
      { ru: "Она только что закончила домашнее задание.", en: "She has just finished her homework." },
      { ru: "Я уже поел.", en: "I have already eaten." },
      { ru: "Я ещё не закончил.", en: "I haven't finished yet." },
    ],
  },
  {
    title: "Период времени ещё не закончился",
    text: "Неделя или день ещё продолжается. Смысл зависит от контекста говорящего.",
    examples: [
      { ru: "Я прочитал две книги на этой неделе.", en: "I have read two books this week." },
      { ru: "Сегодня мы написали два теста.", en: "We have written two tests today." },
    ],
  },
];

export const HAVE_TABLE = [
  { who: "I / You / We / They", aux: "have", example: "I have finished" },
  { who: "He / She / It", aux: "has", example: "She has finished" },
];

export const REGULAR_VERBS = ["play → played → played", "work → worked → worked", "finish → finished → finished"];

export const IRREGULAR_VERBS: { v1: string; v2: string; v3: string }[] = [
  { v1: "go", v2: "went", v3: "gone" },
  { v1: "see", v2: "saw", v3: "seen" },
  { v1: "do", v2: "did", v3: "done" },
  { v1: "write", v2: "wrote", v3: "written" },
  { v1: "eat", v2: "ate", v3: "eaten" },
  { v1: "take", v2: "took", v3: "taken" },
  { v1: "break", v2: "broke", v3: "broken" },
  { v1: "be", v2: "was / were", v3: "been" },
  { v1: "make", v2: "made", v3: "made" },
  { v1: "come", v2: "came", v3: "come" },
];

export const WORD_PLACES: { word: string; note: string; examples: string[] }[] = [
  {
    word: "JUST",
    note: "Обычно стоит между have / has и V3.",
    examples: ["I have just finished.", "He has just come home."],
  },
  {
    word: "ALREADY",
    note: "Чаще всего тоже между have / has и V3.",
    examples: ["She has already eaten.", "We have already seen this film."],
  },
  {
    word: "YET",
    note: "Обычно в вопросах и отрицаниях, ближе к концу предложения.",
    examples: ["Have you finished yet?", "I haven't finished yet."],
  },
];

export const CHEATSHEET_SIGNS = [
  { sign: "+", example: "She has finished. / They have finished." },
  { sign: "−", example: "She hasn't finished. / They haven't finished." },
  { sign: "?", example: "Has she finished? / Have they finished?" },
];
