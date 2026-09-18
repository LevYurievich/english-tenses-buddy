import type { Reasoning } from "../types";

const F = "have / has + V3";

/** Объяснения «Почему?» для Present Perfect. Ключ — id упражнения. */
export const PRESENT_PERFECT_REASONING: Record<string, Reasoning> = {
  "pp-mc-1": {
    title: "Почему has finished?",
    chain: ["already", "результат сейчас", "Present Perfect", F, "has finished"],
    steps: [
      { kind: "when", text: "Already = уже. Работа сделана к этому моменту.", highlight: "already" },
      { kind: "what", text: "Важно то, что домашнее задание уже готово сейчас." },
      { kind: "tense", text: "Значит нужен Present Perfect." },
      { kind: "who", text: "Anna = she → помощник has." },
      { kind: "form", text: "finish — правильный глагол: finish → finished (V3)." },
    ],
    result: "Anna has finished her homework already.",
    remember: "HAS → he / she / it. HAVE → остальные.",
    wrongAnswers: [
      { answer: "have finished", text: "have используется с I / you / we / they. Anna = she → has." },
      { answer: "has finish", text: "После has нужна третья форма: finished, а не finish." },
      { answer: "finished", text: "Без have / has это Past Simple. Здесь важен результат сейчас." },
    ],
  },
  "pp-mc-2": {
    title: "Почему have lost?",
    chain: ["ключей нет сейчас", "результат", "Present Perfect", F, "have lost"],
    steps: [
      { kind: "what", text: "Ключи потеряны, и сейчас дверь не открыть — важен результат." },
      { kind: "tense", text: "Прошлое связано с настоящим → Present Perfect." },
      { kind: "who", text: "I → have." },
      { kind: "form", text: "lose → lost → lost. V3 = lost." },
    ],
    result: "I have lost my keys.",
    wrongDefault: "Нужна конструкция have + V3: have lost.",
  },
  "pp-mc-3": {
    title: "Почему has been?",
    chain: ["three times", "жизненный опыт", "Present Perfect", F, "has been"],
    steps: [
      { kind: "what", text: "Мы говорим об опыте Тома: он бывал в Лондоне.", highlight: "three times" },
      { kind: "tense", text: "Опыт до настоящего момента → Present Perfect." },
      { kind: "who", text: "Tom = he → has." },
      { kind: "form", text: "be → was / were → been. V3 = been." },
    ],
    result: "Tom has been to London three times.",
    wrongAnswers: [
      { answer: "have been", text: "Tom = he, значит has been." },
      { answer: "has was", text: "was — это V2. После has нужен V3: been." },
    ],
  },
  "pp-mc-4": {
    title: "Почему haven't finished?",
    chain: ["yet", "работа не сделана", "Present Perfect", "have + not + V3", "haven't finished"],
    steps: [
      { kind: "what", text: "Проект пока не готов — говорим о результате сейчас.", highlight: "yet" },
      { kind: "who", text: "We → have." },
      { kind: "structure", text: "Отрицание: have + not = haven't." },
      { kind: "form", text: "После haven't идёт V3: finished." },
    ],
    result: "We haven't finished our project yet.",
    wrongDefault: "В отрицании not ставим после have / has, а глагол остаётся в V3.",
  },
  "pp-mc-5": {
    title: "Почему Has?",
    chain: ["вопрос", "she", "Present Perfect", "Has + subject + V3", "Has she seen"],
    steps: [
      { kind: "who", text: "She = he / she / it → has." },
      { kind: "structure", text: "В вопросе помощник выходит вперёд: Has she ...?" },
      { kind: "form", text: "see → saw → seen. После has нужен V3." },
    ],
    result: "Has she seen this film?",
    wrongAnswers: [
      { answer: "Have", text: "Have используется с I / you / we / they, а she → has." },
      { answer: "Does", text: "Does — помощник Present Simple. Здесь нужен Present Perfect." },
    ],
  },
  "pp-mc-6": {
    title: "Почему has just finished?",
    chain: ["только что", "результат сейчас", "Present Perfect", "has + just + V3", "has just finished"],
    steps: [
      { kind: "what", text: "Только что = действие завершилось совсем недавно, результат важен сейчас." },
      { kind: "structure", text: "JUST ставим между помощником и V3." },
      { kind: "form", text: "finish → finished (V3)." },
    ],
    result: "She has just finished her breakfast.",
    remember: "just и already обычно стоят между have / has и V3.",
    wrongDefault: "JUST ставится между has и V3: has just finished.",
  },

  "pp-fb-1": {
    title: "Почему have seen?",
    chain: ["before", "жизненный опыт", "Present Perfect", F, "have seen"],
    steps: [
      { kind: "when", text: "Before = раньше, точный момент не назван.", highlight: "before" },
      { kind: "what", text: "Мы говорим об опыте до настоящего момента." },
      { kind: "who", text: "I → have." },
      { kind: "form", text: "see → saw → seen. Нужен V3: seen." },
    ],
    result: "I have seen this film before.",
    wrongAnswers: [{ answer: "have saw", text: "saw — это V2. После have нужен V3: seen." }],
  },
  "pp-fb-2": {
    title: "Почему has broken?",
    chain: ["телефон сломан", "результат сейчас", "Present Perfect", F, "has broken"],
    steps: [
      { kind: "what", text: "Сейчас телефон не работает — важен результат." },
      { kind: "who", text: "My sister = she → has." },
      { kind: "form", text: "break → broke → broken. V3 = broken." },
    ],
    result: "My sister has broken her phone.",
    wrongAnswers: [{ answer: "has broke", text: "broke — это V2. Нужен V3: broken." }],
  },
  "pp-fb-3": {
    title: "Почему haven't finished?",
    chain: ["yet", "ещё не сделано", "Present Perfect", "have + not + V3", "haven't finished"],
    steps: [
      { kind: "what", text: "Ужин ещё не закончен к этому моменту.", highlight: "yet" },
      { kind: "who", text: "We → have." },
      { kind: "structure", text: "have + not = haven't, дальше V3." },
    ],
    result: "We haven't finished dinner yet.",
    wrongDefault: "Подходит и полный вариант have not finished, но глагол обязательно в V3.",
  },
  "pp-fb-4": {
    title: "Почему has written?",
    chain: ["today", "день ещё идёт", "Present Perfect", F, "has written"],
    steps: [
      { kind: "when", text: "Today = сегодня, этот день ещё не закончился.", highlight: "today" },
      { kind: "who", text: "Tom = he → has." },
      { kind: "form", text: "write → wrote → written. V3 = written." },
    ],
    result: "Tom has written three letters today.",
    wrongAnswers: [{ answer: "has wrote", text: "wrote — это V2. После has нужен written." }],
  },
  "pp-fb-5": {
    title: "Почему have just arrived?",
    chain: ["just", "только что", "Present Perfect", "have + just + V3", "have just arrived"],
    steps: [
      { kind: "when", text: "Just = только что.", highlight: "just" },
      { kind: "who", text: "They → have." },
      { kind: "structure", text: "just стоит между have и V3." },
      { kind: "form", text: "arrive → arrived (V3)." },
    ],
    result: "They have just arrived at the hotel.",
  },

  "pp-v3-1": {
    title: "Почему gone?",
    chain: ["go", "V1 → V2 → V3", "gone"],
    steps: [
      { kind: "form", text: "go → went → gone. Третья форма — gone." },
      { kind: "structure", text: "Present Perfect берёт именно V3: I have gone." },
    ],
    result: "go → went → gone",
    remember: "Present Perfect → смотри в колонку V3.",
    wrongAnswers: [{ answer: "went", text: "went — это V2, форма Past Simple: I went to school." }],
  },
  "pp-v3-2": {
    title: "Почему seen?",
    chain: ["see", "V1 → V2 → V3", "seen"],
    steps: [{ kind: "form", text: "see → saw → seen. V3 = seen: I have seen." }],
    result: "see → saw → seen",
    wrongAnswers: [{ answer: "saw", text: "saw — это V2: I saw him yesterday. Для Present Perfect нужен seen." }],
  },
  "pp-v3-3": {
    title: "Почему written?",
    chain: ["write", "V1 → V2 → V3", "written"],
    steps: [{ kind: "form", text: "write → wrote → written. V3 = written: She has written." }],
    result: "write → wrote → written",
    wrongAnswers: [{ answer: "wrote", text: "wrote — это V2. После have / has нужен written." }],
  },
  "pp-v3-4": {
    title: "Почему taken?",
    chain: ["take", "V1 → V2 → V3", "taken"],
    steps: [{ kind: "form", text: "take → took → taken. V3 = taken: They have taken." }],
    result: "take → took → taken",
    wrongAnswers: [{ answer: "took", text: "took — это V2. Для Present Perfect нужен taken." }],
  },

  "pp-sb-1": {
    title: "Почему Tom has lost his phone?",
    chain: ["телефона нет сейчас", "результат", "Present Perfect", F, "has lost"],
    steps: [
      { kind: "who", text: "Tom = subject, he → has." },
      { kind: "structure", text: "Порядок: подлежащее → помощник → V3 → дополнение." },
      { kind: "form", text: "lose → lost → lost. V3 = lost." },
    ],
    result: "Tom has lost his phone.",
    remember: "Tom → subject, has → auxiliary, lost → V3, his phone → object.",
  },
  "pp-sb-2": {
    title: "Почему I have already read this book?",
    chain: ["already", "результат сейчас", "Present Perfect", "have + already + V3", "have already read"],
    steps: [
      { kind: "who", text: "I → have." },
      { kind: "structure", text: "already ставим между have и V3." },
      { kind: "form", text: "read → read → read: форма пишется одинаково." },
    ],
    result: "I have already read this book.",
  },
  "pp-sb-3": {
    title: "Почему Has Kate finished her homework?",
    chain: ["вопрос", "Kate = she", "Present Perfect", "Has + subject + V3", "Has Kate finished"],
    steps: [
      { kind: "who", text: "Kate = she → has." },
      { kind: "structure", text: "В вопросе помощник выходит вперёд: Has Kate ...?" },
      { kind: "form", text: "finish → finished (V3)." },
    ],
    result: "Has Kate finished her homework?",
  },

  "pp-tr-1": {
    title: "Почему She hasn't finished her homework?",
    chain: ["отрицание", "Present Perfect", "has + not + V3", "hasn't finished"],
    steps: [
      { kind: "structure", text: "not ставим сразу после помощника: has + not = hasn't." },
      { kind: "form", text: "Глагол остаётся в V3: finished." },
    ],
    result: "She hasn't finished her homework.",
    wrongDefault: "Полный вариант She has not finished her homework тоже верный.",
  },
  "pp-tr-2": {
    title: "Почему Has Tom visited London?",
    chain: ["вопрос", "Tom = he", "has вперёд", "Has Tom visited"],
    steps: [
      { kind: "structure", text: "has перемещается перед подлежащим." },
      { kind: "form", text: "visit → visited (V3) не меняется." },
    ],
    result: "Has Tom visited London?",
  },
  "pp-tr-3": {
    title: "Почему Have they cleaned the kitchen?",
    chain: ["вопрос", "they → have", "have вперёд", "Have they cleaned"],
    steps: [
      { kind: "who", text: "They → have." },
      { kind: "structure", text: "В вопросе have выходит вперёд." },
    ],
    result: "Have they cleaned the kitchen?",
  },

  "pp-err-1": {
    title: "Почему ошибка в have?",
    chain: ["She", "he / she / it", "has", "has finished"],
    steps: [
      { kind: "who", text: "She = he / she / it → нужен помощник has." },
      { kind: "form", text: "finished остаётся без изменений — это V3." },
    ],
    result: "She has finished her homework.",
    remember: "HAS → he / she / it.",
  },
  "pp-err-2": {
    title: "Почему ошибка в went?",
    chain: ["have + V3", "went = V2", "gone = V3"],
    steps: [
      { kind: "form", text: "go → went → gone. went — вторая форма." },
      { kind: "structure", text: "После have нужна третья форма: gone." },
    ],
    result: "I have gone to London.",
    remember: "Past Simple → V2, Present Perfect → V3.",
  },
  "pp-err-3": {
    title: "Почему ошибка в saw?",
    chain: ["Has + V3", "saw = V2", "seen = V3"],
    steps: [
      { kind: "form", text: "see → saw → seen." },
      { kind: "structure", text: "После has в вопросе нужен V3: seen." },
    ],
    result: "Has she seen this film?",
  },

  "pp-t-1": {
    title: "Почему I have already done my homework?",
    chain: ["уже", "результат сейчас", "Present Perfect", "have + already + V3", "have already done"],
    steps: [
      { kind: "what", text: "Уже = работа сделана к этому моменту." },
      { kind: "who", text: "I → have." },
      { kind: "form", text: "do → did → done. V3 = done." },
    ],
    result: "I have already done my homework.",
  },
  "pp-t-2": {
    title: "Почему She has never been to London?",
    chain: ["никогда", "жизненный опыт", "Present Perfect", "has + never + V3", "has never been"],
    steps: [
      { kind: "what", text: "Говорим об опыте за всю жизнь: такого опыта нет." },
      { kind: "who", text: "She → has." },
      { kind: "form", text: "be → was / were → been." },
    ],
    result: "She has never been to London.",
    remember: "Со словом never второе отрицание не нужно.",
  },
  "pp-t-3": {
    title: "Почему My brother has broken my computer?",
    chain: ["компьютер сломан", "результат сейчас", "Present Perfect", F, "has broken"],
    steps: [
      { kind: "what", text: "Сейчас компьютер сломан — важен результат." },
      { kind: "who", text: "My brother = he → has." },
      { kind: "form", text: "break → broke → broken." },
    ],
    result: "My brother has broken my computer.",
  },

  "pp-sit-1": {
    title: "Почему I have lost my key?",
    chain: ["ключа нет сейчас", "результат", "Present Perfect", "have + V3", "have lost"],
    steps: [
      { kind: "what", text: "Главное — результат сейчас: ключа нет, дверь не открыть." },
      { kind: "tense", text: "Прошлое связано с настоящим → Present Perfect." },
      { kind: "form", text: "lose → lost → lost." },
    ],
    result: "I have lost my key.",
    whyThisTense: {
      steps: [
        { kind: "tense", text: "I lost my key yesterday — Past Simple: важен момент прошлого (вчера)." },
        { kind: "tense", text: "Здесь важно то, что ключа нет сейчас → Present Perfect." },
      ],
    },
    wrongAnswers: [
      { answer: "I lost my key yesterday.", text: "Это рассказ о вчерашнем моменте. А тебе важно, что ключа нет прямо сейчас." },
      { answer: "I am losing my key.", text: "Present Continuous — это процесс. Ключ не теряется постепенно." },
    ],
  },
  "pp-sit-2": {
    title: "Почему Have you ever tried this food?",
    chain: ["ever", "жизненный опыт", "Present Perfect", "Have + subject + V3", "Have you tried"],
    steps: [
      { kind: "what", text: "Ты спрашиваешь про опыт друга за всю жизнь.", highlight: "ever" },
      { kind: "tense", text: "Опыт до настоящего момента → Present Perfect." },
      { kind: "structure", text: "Вопрос: Have + you + ever + V3." },
    ],
    result: "Have you ever tried this food?",
    whyThisTense: {
      steps: [
        { kind: "tense", text: "Did you try this food? спрашивает про конкретный момент прошлого." },
        { kind: "tense", text: "Здесь важен опыт вообще, без указания момента → Present Perfect." },
      ],
    },
  },
  "pp-sit-3": {
    title: "Почему I have broken a cup?",
    chain: ["чашка разбита", "результат сейчас", "Present Perfect", "have + V3", "have broken"],
    steps: [
      { kind: "what", text: "Чашка разбита прямо сейчас — это результат." },
      { kind: "form", text: "break → broke → broken. Нужен V3." },
    ],
    result: "I have broken a cup.",
    wrongAnswers: [{ answer: "I have broke a cup.", text: "broke — это V2. После have нужен broken." }],
  },

  "pp-test-1": {
    title: "Почему has baked?",
    chain: ["пирог готов сейчас", "результат", "Present Perfect", F, "has baked"],
    steps: [
      { kind: "who", text: "My grandmother = she → has." },
      { kind: "form", text: "bake — правильный глагол: baked (V3)." },
    ],
    result: "My grandmother has baked a cake for us.",
  },
  "pp-test-2": {
    title: "Почему eaten?",
    chain: ["eat", "V1 → V2 → V3", "eaten"],
    steps: [{ kind: "form", text: "eat → ate → eaten. V3 = eaten: I have eaten." }],
    result: "eat → ate → eaten",
    wrongAnswers: [{ answer: "ate", text: "ate — это V2, форма Past Simple." }],
  },
  "pp-test-3": {
    title: "Почему have made?",
    chain: ["today", "день ещё идёт", "Present Perfect", F, "have made"],
    steps: [
      { kind: "who", text: "My friends = they → have." },
      { kind: "form", text: "make → made → made." },
    ],
    result: "My friends have made a big snowman today.",
  },
  "pp-test-4": {
    title: "Почему He hasn't washed the dishes?",
    chain: ["отрицание", "has + not + V3", "hasn't washed"],
    steps: [
      { kind: "structure", text: "not ставим после has: has not = hasn't." },
      { kind: "form", text: "wash → washed (V3)." },
    ],
    result: "He hasn't washed the dishes.",
  },
  "pp-test-5": {
    title: "Почему Have you read this book?",
    chain: ["вопрос", "you → have", "Have + subject + V3", "Have you read"],
    steps: [
      { kind: "who", text: "You → have." },
      { kind: "structure", text: "Помощник выходит вперёд." },
      { kind: "form", text: "read → read → read." },
    ],
    result: "Have you read this book?",
  },
  "pp-test-6": {
    title: "Почему ошибка в took?",
    chain: ["have + V3", "took = V2", "taken = V3"],
    steps: [{ kind: "form", text: "take → took → taken. После have нужен taken." }],
    result: "They have taken my ball.",
    remember: "Past Simple → V2, Present Perfect → V3.",
  },
  "pp-test-7": {
    title: "Почему I haven't finished the test yet?",
    chain: ["ещё не", "отрицание", "Present Perfect", "haven't + V3 + yet", "haven't finished yet"],
    steps: [
      { kind: "structure", text: "Отрицание: haven't + V3." },
      { kind: "form", text: "YET обычно стоит ближе к концу предложения." },
    ],
    result: "I haven't finished the test yet.",
    remember: "yet — в вопросах и отрицаниях, в конце предложения.",
  },
  "pp-test-8": {
    title: "Почему He has been to Italy?",
    chain: ["жизненный опыт", "Present Perfect", F, "has been"],
    steps: [
      { kind: "what", text: "Говорим об опыте: он бывал в Италии." },
      { kind: "who", text: "He → has." },
      { kind: "form", text: "be → was / were → been." },
    ],
    result: "He has been to Italy.",
  },
  "pp-test-9": {
    title: "Почему I have already seen it?",
    chain: ["уже видел", "результат сейчас", "Present Perfect", "have + already + V3", "have already seen"],
    steps: [
      { kind: "what", text: "Важно то, что опыт просмотра уже есть — смотреть снова не нужно." },
      { kind: "form", text: "see → saw → seen." },
    ],
    result: "I have already seen it.",
    whyThisTense: {
      steps: [
        { kind: "tense", text: "Past Simple рассказал бы, когда именно ты смотрел фильм." },
        { kind: "tense", text: "Здесь важен результат сейчас: повторно смотреть не нужно → Present Perfect." },
      ],
    },
  },
  "pp-test-10": {
    title: "Почему We have just finished the lesson?",
    chain: ["just", "только что", "Present Perfect", "have + just + V3", "have just finished"],
    steps: [
      { kind: "who", text: "We → have." },
      { kind: "structure", text: "just стоит между have и V3." },
    ],
    result: "We have just finished the lesson.",
  },
};
