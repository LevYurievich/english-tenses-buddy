/**
 * Типичные ошибки — общий словарь для всех времён.
 * Новое время добавляет сюда свои категории, страница «Мои ошибки» менять не нужно.
 */
export const CATEGORY_TITLES: Record<string, string> = {
  // Present Simple
  third_person_s: "Окончание -s у he / she / it",
  do_does: "Do / Does + V1",
  word_order: "Порядок слов",
  negative: "Отрицания",
  question: "Вопросы",
  verb_form: "Написание формы глагола",
  tense_choice: "Выбор времени",
  translation: "Перевод",
  // Present Continuous
  missing_be: "ING не ходит один",
  wrong_be: "AM / IS / ARE",
  missing_ing: "Окончание -ing",
  question_word_order: "Порядок слов в вопросе",
  negative_position: "Место not в отрицании",
  ing_spelling: "Написание формы -ing",
  // Present Perfect
  wrong_have_has: "HAVE или HAS?",
  missing_have_has: "Забыл have / has",
  wrong_v3: "Третья форма глагола (V3)",
  used_v2_instead_v3: "V2 или V3?",
  negative_form: "Отрицание с have / has",
  already_position: "Место just и already",
  yet_usage: "Слово yet",
  present_perfect_vs_past_simple: "Present Perfect или Past Simple?",
  // Present Perfect Continuous
  missing_been: "Ты забываешь BEEN",
  wrong_word_order: "Порядок слов в конструкции",
  wrong_for_since: "FOR или SINCE?",
  wrong_tense_duration: "Длительность: какое время выбрать?",
  present_perfect_vs_present_perfect_continuous: "Результат или процесс?",
  // Смешанный модуль «Все Present»
  simple_vs_continuous: "Обычно или сейчас?",
  simple_vs_perfect: "Обычно или результат?",
  continuous_vs_perfect: "Процесс сейчас или результат?",
  perfect_vs_perfect_continuous: "Результат или длительность процесса?",
  present_tense_selection: "Выбор времени по смыслу",
  auxiliary_error: "Помощник (am/is/are, do/does, have/has)",
  verb_form_error: "Форма глагола (V1 / V-ing / V3)",
  word_order_error: "Порядок слов",
  for_since_error: "FOR или SINCE?",
};

export const CATEGORY_RULES: Record<
  string,
  { right: string; wrong: string; rule: string; tip?: string }
> = {
  third_person_s: {
    rule: "HE / SHE / IT → V1 + s/es",
    right: "He plays football.",
    wrong: "He play football.",
  },
  do_does: {
    rule: "DOES забирает -s себе, глагол остаётся V1",
    right: "Does he play?",
    wrong: "Does he plays?",
  },
  word_order: {
    rule: "Кто → что делает → что → когда",
    right: "Anna goes to school every day.",
    wrong: "Anna every day goes to school.",
  },
  negative: {
    rule: "don't / doesn't + V1",
    right: "He doesn't like milk.",
    wrong: "He doesn't likes milk.",
  },
  question: {
    rule: "Do / Does + подлежащее + V1 ?",
    right: "Do they live in London?",
    wrong: "They live in London?",
  },
  verb_form: {
    rule: "-ch, -sh, -x, -s, -o → +es; согласная + y → -ies",
    right: "She watches TV.",
    wrong: "She watchs TV.",
  },
  tense_choice: {
    rule: "Обычно → Present Simple, сейчас / в процессе → Present Continuous",
    right: "Look! She is running.",
    wrong: "Look! She runs.",
  },
  translation: {
    rule: "Сначала определи лицо и тип предложения",
    right: "My sister reads books every day.",
    wrong: "My sister read books every day.",
  },
  missing_be: {
    rule: "ING НЕ ХОДИТ ОДИН: am / is / are + V-ing",
    right: "She is reading.",
    wrong: "She reading.",
    tip: "Перед V-ing всегда нужен помощник am / is / are.",
  },
  wrong_be: {
    rule: "I → am, he/she/it → is, you/we/they → are",
    right: "They are playing.",
    wrong: "They is playing.",
    tip: "Сначала определи, кто выполняет действие, потом выбери помощника.",
  },
  missing_ing: {
    rule: "После am / is / are нужен V-ing",
    right: "He is playing.",
    wrong: "He is play.",
  },
  question_word_order: {
    rule: "Am / Is / Are + подлежащее + V-ing ?",
    right: "Is Tom sleeping?",
    wrong: "Tom is sleeping?",
  },
  negative_position: {
    rule: "not ставим после am / is / are",
    right: "She is not reading.",
    wrong: "She not is reading.",
  },
  ing_spelling: {
    rule: "make → making, run → running, lie → lying",
    right: "He is running.",
    wrong: "He is runing.",
  },
  wrong_have_has: {
    rule: "he / she / it → has, остальные → have",
    right: "She has finished her homework.",
    wrong: "She have finished her homework.",
    tip: "Сначала определи, кто выполняет действие, потом выбери have или has.",
  },
  missing_have_has: {
    rule: "Present Perfect = have / has + V3",
    right: "I have finished my homework.",
    wrong: "I finished my homework already.",
    tip: "V3 не ходит один: перед ним нужен have или has.",
  },
  wrong_v3: {
    rule: "После have / has нужна третья форма глагола",
    right: "My sister has broken her phone.",
    wrong: "My sister has broke her phone.",
  },
  used_v2_instead_v3: {
    rule: "Past Simple → V2, Present Perfect → V3",
    right: "I have gone to London.",
    wrong: "I have went to London.",
    tip: "go → went → gone, see → saw → seen, take → took → taken.",
  },
  negative_form: {
    rule: "have / has + not + V3",
    right: "She hasn't finished her homework.",
    wrong: "She doesn't finished her homework.",
  },
  already_position: {
    rule: "just и already стоят между have / has и V3",
    right: "She has just finished her breakfast.",
    wrong: "She just has finished her breakfast.",
  },
  yet_usage: {
    rule: "yet — в вопросах и отрицаниях, ближе к концу предложения",
    right: "I haven't finished the test yet.",
    wrong: "I have finished the test yet.",
  },
  present_perfect_vs_past_simple: {
    rule: "Назван законченный момент прошлого → Past Simple, важен результат сейчас → Present Perfect",
    right: "I saw him yesterday. / I have lost my key.",
    wrong: "I have seen him yesterday.",
    tip: "Сначала спроси себя: важно КОГДА или важен РЕЗУЛЬТАТ сейчас?",
  },
  missing_been: {
    rule: "HAVE / HAS + BEEN + V-ING",
    right: "I have been studying for two hours.",
    wrong: "I have studying for two hours.",
    tip: "BEEN не пропускаем: без него конструкция неправильная.",
  },
  wrong_word_order: {
    rule: "Кто → have / has → been → V-ing → остальное",
    right: "Tom has been playing football all morning.",
    wrong: "Tom has playing been football all morning.",
  },
  wrong_for_since: {
    rule: "FOR → промежуток, SINCE → точка начала",
    right: "for three years / since 2023",
    wrong: "since three hours",
    tip: "FOR = ДЛИНА, SINCE = СТАРТ.",
  },
  wrong_tense_duration: {
    rule: "Важна длительность процесса → have / has + been + V-ing",
    right: "I have been waiting for twenty minutes.",
    wrong: "I wait for twenty minutes.",
    tip: "Но глаголы состояния (know, have, love) в Continuous не используются.",
  },
  present_perfect_vs_present_perfect_continuous: {
    rule: "Результат → Present Perfect, процесс и длительность → Present Perfect Continuous",
    right: "She has been cleaning the kitchen for two hours.",
    wrong: "She has cleaned the kitchen for two hours and hasn't finished.",
    tip: "Спроси себя: важен готовый результат или сам процесс?",
  },
  simple_vs_continuous: {
    rule: "Обычно → Present Simple, сейчас / в процессе → Present Continuous",
    right: "Look! Tom is playing football.",
    wrong: "Look! Tom plays football.",
    tip: "Спроси: это привычка или то, что происходит прямо сейчас?",
  },
  simple_vs_perfect: {
    rule: "Регулярное действие → Present Simple, результат сейчас → Present Perfect",
    right: "I have lost my key.",
    wrong: "I lose my key.",
  },
  continuous_vs_perfect: {
    rule: "Процесс сейчас → Present Continuous, готовый результат → Present Perfect",
    right: "She has finished her homework.",
    wrong: "She is finishing her homework. (если работа уже сделана)",
  },
  perfect_vs_perfect_continuous: {
    rule: "Perfect → результат, Perfect Continuous → процесс и длительность",
    right: "I have been reading this book for two hours.",
    wrong: "I have read this book for two hours.",
    tip: "Ты знаешь обе формулы — вопрос в том, что важнее: результат или сам процесс.",
  },
  present_tense_selection: {
    rule: "Сначала смысл ситуации, потом формула",
    right: "Ситуация «результат сейчас» → have / has + V3",
    wrong: "Выбор времени только по слову-маркеру",
    tip: "Обычно → Simple, сейчас → Continuous, результат → Perfect, как долго → Perfect Continuous.",
  },
  auxiliary_error: {
    rule: "I → am/have, he/she/it → is/has/does, you/we/they → are/have/do",
    right: "They have been waiting.",
    wrong: "They has been waiting.",
  },
  verb_form_error: {
    rule: "Simple → V1, Continuous → V-ing, Perfect → V3",
    right: "He has eaten the pizza.",
    wrong: "He has ate the pizza.",
  },
  word_order_error: {
    rule: "Кто → помощник → действие → что → когда",
    right: "Tom has been working in the garden all day.",
    wrong: "Tom has working been in the garden all day.",
  },
  for_since_error: {
    rule: "FOR → сколько длится, SINCE → с какого момента",
    right: "since 2019 / for three years",
    wrong: "since three years",
  },
};
