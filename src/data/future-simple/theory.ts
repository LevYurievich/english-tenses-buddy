/** Данные теории Future Simple. Отдельно от UI — тексты легко дополнять. */

export const WILL_CASES: {
  icon: string;
  title: string;
  situation: string;
  en: string;
  ru: string;
  note: string;
}[] = [
  {
    icon: "⚡",
    title: "Решение в момент речи",
    situation: "The phone is ringing.",
    en: "I'll answer it.",
    ru: "Телефон звонит. — Я отвечу.",
    note: "Решение появилось прямо сейчас, оно не было запланировано заранее.",
  },
  {
    icon: "🤞",
    title: "Обещание",
    situation: "Your friend tells you a secret.",
    en: "I won't tell anyone.",
    ru: "Я никому не расскажу.",
    note: "Говорящий берёт на себя обязательство.",
  },
  {
    icon: "🤝",
    title: "Предложение помощи",
    situation: "Your bag looks heavy.",
    en: "I'll carry it for you.",
    ru: "Я понесу её за тебя.",
    note: "Вижу ситуацию сейчас → предлагаю помощь.",
  },
  {
    icon: "💭",
    title: "Прогноз или мнение",
    situation: "You are talking about tomorrow.",
    en: "I think it will rain tomorrow.",
    ru: "Думаю, завтра пойдёт дождь.",
    note: "Говорящий делится своим мнением о будущем.",
  },
  {
    icon: "→",
    title: "Будущий факт",
    situation: "You give information about the future.",
    en: "She will be fourteen next year.",
    ru: "В следующем году ей будет четырнадцать.",
    note: "Просто сообщаем информацию, без акцента на плане или процессе.",
  },
];

export const CONTRACTIONS: { full: string; short: string }[] = [
  { full: "I will", short: "I'll" },
  { full: "you will", short: "you'll" },
  { full: "he will", short: "he'll" },
  { full: "she will", short: "she'll" },
  { full: "we will", short: "we'll" },
  { full: "they will", short: "they'll" },
];

export const ALL_PERSONS = [
  "I will go.",
  "You will go.",
  "He will go.",
  "She will go.",
  "It will go.",
  "We will go.",
  "They will go.",
];

export const TYPICAL_MISTAKES: { wrong: string; right: string; why: string }[] = [
  { wrong: "She will goes.", right: "She will go.", why: "После WILL всегда V1 — без -s." },
  { wrong: "He will to come.", right: "He will come.", why: "После WILL частица to не нужна." },
  { wrong: "They will playing.", right: "They will play.", why: "После WILL не бывает V-ing." },
  { wrong: "Will he comes?", right: "Will he come?", why: "В вопросе тоже V1." },
  { wrong: "She willn't come.", right: "She won't come.", why: "will not сокращается в won't." },
  { wrong: "I will am at home.", right: "I will be at home.", why: "После WILL — базовая форма BE." },
];

export const SHORT_ANSWERS: { q: string; yes: string; no: string }[] = [
  { q: "Will you come?", yes: "Yes, I will.", no: "No, I won't." },
  { q: "Will Tom help us?", yes: "Yes, he will.", no: "No, he won't." },
  { q: "Will they be at home?", yes: "Yes, they will.", no: "No, they won't." },
];

export const WH_QUESTIONS = [
  "What will you do?",
  "Where will they stay?",
  "When will Tom arrive?",
  "Who will help us?",
];

export const FUTURE_MARKERS = [
  { en: "tomorrow", ru: "завтра" },
  { en: "next week", ru: "на следующей неделе" },
  { en: "next year", ru: "в следующем году" },
  { en: "soon", ru: "скоро" },
  { en: "one day", ru: "однажды" },
  { en: "in the future", ru: "в будущем" },
  { en: "in 2030", ru: "в 2030 году" },
];

export const CHEATSHEET: { sign: string; formula: string; example: string }[] = [
  { sign: "+", formula: "Subject + will + V1", example: "I will go." },
  { sign: "−", formula: "Subject + won't + V1", example: "I won't go." },
  { sign: "?", formula: "Will + subject + V1 ?", example: "Will I go?" },
  { sign: "BE", formula: "will + be", example: "I will be at home." },
];

/** Три способа говорить о будущем — для вводного модуля. */
export const FUTURE_WAYS: {
  id: string;
  form: string;
  meaning: string;
  context: string;
  example: string;
  ru: string;
}[] = [
  {
    id: "will",
    form: "WILL + V1",
    meaning: "Решение сейчас · прогноз · обещание",
    context: "The phone is ringing.",
    example: "I'll answer it.",
    ru: "Решение появилось в момент речи.",
  },
  {
    id: "going-to",
    form: "BE GOING TO + V1",
    meaning: "Намерение · план, который уже есть",
    context: "I've decided to start exercising.",
    example: "I'm going to start exercising.",
    ru: "Намерение появилось раньше разговора.",
  },
  {
    id: "present-continuous",
    form: "AM / IS / ARE + V-ing",
    meaning: "Конкретная договорённость (arrangement)",
    context: "I've arranged it with Anna.",
    example: "I'm meeting Anna at 6 tomorrow.",
    ru: "Время и место уже согласованы с другим человеком.",
  },
];

export const FUTURE_CONTRASTS: { title: string; left: string; right: string; note: string }[] = [
  {
    title: "План или решение сейчас?",
    left: "Ты видишь открытое окно и вдруг решаешь его закрыть → I'll close the window.",
    right: "Ты ещё вчера решил убраться в комнате → I'm going to clean my room tomorrow.",
    note: "WILL — решение возникает сейчас. BE GOING TO — намерение уже существовало.",
  },
  {
    title: "План или договорённость?",
    left: "Я собираюсь покрасить комнату → I'm going to paint my room.",
    right: "Мы договорились с Анной на 5 → I'm meeting Anna at 5 tomorrow.",
    note: "BE GOING TO — намерение. Present Continuous — конкретная договорённость.",
  },
  {
    title: "Прогноз: мнение или признаки?",
    left: "Я так думаю → I think it will rain tomorrow.",
    right: "Look at those black clouds! → It's going to rain.",
    note: "WILL — личное мнение. GOING TO — есть видимое основание прямо сейчас.",
  },
];
