import type { Reasoning } from "../types";

const BE = "am / is / are + V-ing";

/** Объяснения «Почему?» для Present Continuous. Ключ — id упражнения. */
export const PRESENT_CONTINUOUS_REASONING: Record<string, Reasoning> = {
  "pc-mc-1": {
    title: "Почему is running?",
    chain: ["Look!", "процесс сейчас", "Present Continuous", BE, "is running"],
    steps: [
      { kind: "when", text: "Look! = Смотри! Мы наблюдаем действие прямо сейчас.", highlight: "Look!" },
      { kind: "what", text: "Собака сейчас бежит — это процесс." },
      { kind: "tense", text: "Значит нужен Present Continuous." },
      { kind: "structure", text: "Формула: am / is / are + V-ing." },
      { kind: "who", text: "The dog = it → помощник is." },
      { kind: "form", text: "run → running." },
    ],
    result: "The dog is running in the garden.",
    remember: "СЕЙЧАС + В ПРОЦЕССЕ = PRESENT CONTINUOUS",
    wrongAnswers: [
      { answer: "runs", text: "runs — Present Simple, про то, что бывает обычно. А здесь мы видим действие сейчас." },
      { answer: "running", text: "ING не ходит один: перед running нужен помощник is." },
      { answer: "run", text: "Без помощника и без -ing предложение не получится. Нужно is running." },
    ],
    whyThisTense: {
      steps: [
        { kind: "tense", text: "Present Simple описывает привычку: The dog runs every morning." },
        { kind: "tense", text: "Здесь слово Look! показывает, что мы смотрим на действие сейчас → Present Continuous." },
      ],
    },
  },
  "pc-mc-2": {
    title: "Почему are playing?",
    chain: ["at the moment", "процесс сейчас", "Present Continuous", "they → are", "are playing"],
    steps: [
      { kind: "when", text: "At the moment = в данный момент.", highlight: "at the moment" },
      { kind: "who", text: "My friends = they → помощник are." },
      { kind: "form", text: "play → playing." },
    ],
    result: "My friends are playing basketball at the moment.",
    wrongDefault: "Помощник зависит от подлежащего: they → are, а не is или am.",
  },
  "pc-mc-3": {
    title: "Почему am doing?",
    chain: ["right now", "процесс", "Present Continuous", "I → am", "am doing"],
    steps: [
      { kind: "when", text: "Right now = прямо сейчас.", highlight: "right now" },
      { kind: "who", text: "I → только am." },
      { kind: "form", text: "do → doing." },
    ],
    result: "I am doing my homework right now.",
    wrongDefault: "С местоимением I всегда am: I am doing.",
  },
  "pc-mc-4": {
    title: "Почему is playing?",
    chain: ["Listen!", "процесс сейчас", "Present Continuous", BE, "is playing"],
    steps: [
      { kind: "when", text: "Listen! = Слушай! Мы слышим действие прямо сейчас.", highlight: "Listen!" },
      { kind: "who", text: "Somebody = he / she → is." },
      { kind: "form", text: "После is нужен V-ing: play → playing." },
    ],
    result: "Listen! Somebody is playing the guitar.",
    wrongAnswers: [
      { answer: "is play", text: "После is глагол обязательно с -ing: is playing." },
      { answer: "plays", text: "plays — Present Simple. А мы слышим действие в процессе." },
    ],
  },
  "pc-mc-5": {
    title: "Почему isn't watching?",
    chain: ["отрицание", "процесс сейчас", "Present Continuous", "is + not + V-ing", "isn't watching"],
    steps: [
      { kind: "what", text: "Нужно отрицание: сейчас она не смотрит телевизор." },
      { kind: "structure", text: "not ставим после помощника: is + not = isn't." },
      { kind: "form", text: "Глагол остаётся с -ing: watching." },
    ],
    result: "Kate isn't watching TV now, she is reading.",
    wrongDefault: "В Present Continuous отрицание строится не через doesn't, а через is / are + not.",
  },
  "pc-mc-6": {
    title: "Почему Is?",
    chain: ["вопрос", "he", "Present Continuous", "Is + подлежащее + V-ing", "Is your brother playing?"],
    steps: [
      { kind: "what", text: "Это вопрос: в предложении уже есть playing." },
      { kind: "who", text: "Your brother = he → помощник is." },
      { kind: "structure", text: "В вопросе помощник выходит вперёд: Is your brother playing...?" },
    ],
    result: "Is your brother playing a computer game?",
    wrongAnswers: [
      { answer: "Does", text: "Does — помощник Present Simple. С V-ing он не используется." },
      { answer: "Are", text: "Are нужен для you / we / they. Your brother = he → Is." },
    ],
  },
  "pc-fb-1": {
    title: "Почему are watching?",
    chain: ["at the moment", "процесс", "Present Continuous", "they → are", "are watching"],
    steps: [
      { kind: "when", text: "At the moment = сейчас.", highlight: "at the moment" },
      { kind: "who", text: "My parents = they → are." },
      { kind: "form", text: "watch → watching." },
    ],
    result: "My parents are watching TV at the moment.",
    wrongDefault: "Нужны обе части: помощник are и глагол с -ing.",
  },
  "pc-fb-2": {
    title: "Почему is making?",
    chain: ["now", "процесс", "Present Continuous", "she → is", "making"],
    steps: [
      { kind: "who", text: "Anna = she → is." },
      { kind: "form", text: "Make заканчивается на -e: убираем -e и добавляем -ing → making." },
    ],
    result: "Anna is making a cake now.",
    wrongDefault: "«makeing» не бывает: глаголы на -e теряют -e перед -ing.",
  },
  "pc-fb-3": {
    title: "Почему is sitting?",
    chain: ["Look!", "процесс", "Present Continuous", "it → is", "sitting"],
    steps: [
      { kind: "who", text: "The cat = it → is." },
      { kind: "form", text: "Sit — короткий глагол с ударным слогом: удваиваем t → sitting." },
    ],
    result: "Look! The cat is sitting on my laptop.",
    wrongDefault: "«siting» — ошибка. Правильно sitting, с двумя t.",
  },
  "pc-fb-4": {
    title: "Почему am learning?",
    chain: ["this year", "временная ситуация", "Present Continuous", "I → am", "am learning"],
    steps: [
      { kind: "when", text: "This year — процесс, который идёт в жизни сейчас.", highlight: "this year" },
      { kind: "who", text: "I → am." },
      { kind: "form", text: "learn → learning." },
    ],
    result: "I am learning English this year.",
    wrongDefault: "Present Continuous подходит не только для «этой секунды», но и для текущего периода.",
  },
  "pc-fb-5": {
    title: "Почему is lying?",
    chain: ["сейчас", "процесс", "Present Continuous", "it → is", "lying"],
    steps: [
      { kind: "who", text: "The baby = it → is." },
      { kind: "form", text: "Lie: -ie превращается в -y → lying." },
    ],
    result: "The baby is lying on the sofa.",
    wrongDefault: "«lieing» не пишут. У lie / die / tie окончание особое: lying, dying, tying.",
  },
  "pc-build-1": {
    title: "Почему такой порядок?",
    chain: ["кто", "помощник", "V-ing", "что", "когда"],
    steps: [
      { kind: "who", text: "Сначала подлежащее: Anna." },
      { kind: "structure", text: "Потом помощник is, затем глагол reading." },
      { kind: "form", text: "Дальше дополнение a book и время now в конце." },
    ],
    result: "Anna is reading a book now.",
    wrongDefault: "Проверь порядок: Anna → is → reading → a book → now.",
  },
  "pc-build-2": {
    title: "Почему We are playing...?",
    chain: ["we", "процесс", "Present Continuous", "are + V-ing", "We are playing football"],
    steps: [
      { kind: "who", text: "We → помощник are." },
      { kind: "structure", text: "Подлежащее → помощник → V-ing → дополнение → место." },
    ],
    result: "We are playing football in the park.",
    wrongDefault: "Место (in the park) ставим после дополнения.",
  },
  "pc-build-3": {
    title: "Почему He isn't sleeping now?",
    chain: ["отрицание", "he", "Present Continuous", "isn't + V-ing", "He isn't sleeping now."],
    steps: [
      { kind: "who", text: "He → помощник is." },
      { kind: "structure", text: "В отрицании not идёт сразу после помощника: isn't." },
    ],
    result: "He isn't sleeping now.",
    wrongDefault: "not не может стоять перед помощником: не «He not is sleeping».",
  },
  "pc-build-4": {
    title: "Почему Is your sister listening...?",
    chain: ["вопрос", "she", "Present Continuous", "Is + подлежащее + V-ing", "Is your sister listening to music?"],
    steps: [
      { kind: "who", text: "Your sister = she → is." },
      { kind: "structure", text: "В вопросе помощник выходит вперёд." },
    ],
    result: "Is your sister listening to music?",
    wrongDefault: "Вопрос начинается с Is, а не с подлежащего.",
  },
  "pc-trans-1": {
    title: "Почему Tom isn't sleeping?",
    chain: ["отрицание", "he", "Present Continuous", "is + not + V-ing", "Tom isn't sleeping."],
    steps: [
      { kind: "what", text: "Превращаем утверждение в отрицание." },
      { kind: "structure", text: "Ставим not после is: is not = isn't." },
    ],
    result: "Tom isn't sleeping.",
    wrongDefault: "Глагол остаётся с -ing, меняется только помощник: isn't sleeping.",
  },
  "pc-trans-2": {
    title: "Почему Is Kate doing...?",
    chain: ["вопрос", "she", "Present Continuous", "Is + подлежащее + V-ing", "Is Kate doing her homework?"],
    steps: [
      { kind: "what", text: "Нужен общий вопрос." },
      { kind: "structure", text: "Is перемещается перед подлежащим Kate." },
    ],
    result: "Is Kate doing her homework?",
    wrongDefault: "Одной вопросительной интонации мало: в вопросе is стоит первым.",
  },
  "pc-trans-3": {
    title: "Почему aren't swimming?",
    chain: ["отрицание", "they", "Present Continuous", "are + not + V-ing", "aren't swimming"],
    steps: [
      { kind: "who", text: "The children = they → are." },
      { kind: "structure", text: "are + not = aren't, глагол с -ing остаётся." },
    ],
    result: "The children aren't swimming in the pool.",
    wrongDefault: "Для they нужен are, поэтому отрицание — aren't.",
  },
  "pc-trans-4": {
    title: "Почему Are you waiting...?",
    chain: ["вопрос", "you", "Present Continuous", "Are + подлежащее + V-ing", "Are you waiting for the bus?"],
    steps: [
      { kind: "who", text: "You → помощник are." },
      { kind: "structure", text: "В вопросе Are выходит вперёд." },
    ],
    result: "Are you waiting for the bus?",
    wrongDefault: "Порядок: Are → you → waiting → for the bus?",
  },
  "pc-err-1": {
    title: "Почему ошибка в слове play?",
    chain: ["is", "Present Continuous", "is + V-ing", "playing"],
    steps: [
      { kind: "structure", text: "В предложении уже есть помощник is.", highlight: "is" },
      { kind: "form", text: "После am / is / are глагол обязательно с -ing: play → playing." },
    ],
    result: "She is playing tennis now.",
    wrongDefault: "Ошибка именно в глаголе: нужно playing.",
  },
  "pc-err-2": {
    title: "Почему нужен are?",
    chain: ["playing", "нет помощника", "Present Continuous", "are + V-ing", "are playing"],
    steps: [
      { kind: "what", text: "В предложении есть V-ing, но нет помощника." },
      { kind: "who", text: "They → нужен are." },
    ],
    result: "They are playing football now.",
    remember: "ING НЕ ХОДИТ ОДИН.",
    wrongDefault: "Пропущен помощник перед playing: нужно are playing.",
  },
  "pc-err-3": {
    title: "Почему ошибка в слове is?",
    chain: ["My brothers", "они", "Present Continuous", "are + V-ing", "are cooking"],
    steps: [
      { kind: "who", text: "My brothers — их несколько, это they." },
      { kind: "form", text: "Для they помощник are, а не is." },
    ],
    result: "My brothers are cooking dinner.",
    wrongDefault: "Глагол cooking стоит правильно. Ошибка в помощнике: is → are.",
  },
  "pc-err-4": {
    title: "Почему ошибка в слове not?",
    chain: ["отрицание", "порядок", "Present Continuous", "is + not + V-ing", "She is not reading"],
    steps: [
      { kind: "structure", text: "В английском not идёт после помощника, а не перед ним." },
    ],
    result: "She is not reading a book.",
    wrongDefault: "Нужно поменять местами not и is: She is not reading.",
  },
  "pc-tr-1": {
    title: "Почему My brother is playing...?",
    chain: ["сейчас", "процесс", "Present Continuous", "he → is", "is playing"],
    steps: [
      { kind: "when", text: "«Сейчас» = now, действие в процессе." },
      { kind: "who", text: "Мой брат = my brother = he → is." },
      { kind: "form", text: "play → playing." },
    ],
    result: "My brother is playing a computer game now.",
    wrongDefault: "Проверь обе части: помощник is и глагол playing.",
  },
  "pc-tr-2": {
    title: "Почему We are cooking...?",
    chain: ["сейчас", "процесс", "Present Continuous", "we → are", "are cooking"],
    steps: [
      { kind: "who", text: "Мы = we → are." },
      { kind: "form", text: "cook → cooking." },
    ],
    result: "We are cooking dinner now.",
    wrongDefault: "Для we нужен помощник are.",
  },
  "pc-tr-3": {
    title: "Почему She isn't listening...?",
    chain: ["сейчас", "отрицание", "Present Continuous", "isn't + V-ing", "isn't listening"],
    steps: [
      { kind: "what", text: "«Не слушает» — отрицание." },
      { kind: "who", text: "Она = she → is." },
      { kind: "structure", text: "is + not = isn't, глагол listening." },
    ],
    result: "She isn't listening to music now.",
    wrongDefault: "В Present Continuous отрицание — isn't / aren't, а не doesn't.",
  },
  "pc-tr-4": {
    title: "Почему Are your friends playing...?",
    chain: ["вопрос", "they", "Present Continuous", "Are + подлежащее + V-ing", "Are your friends playing football?"],
    steps: [
      { kind: "who", text: "Твои друзья = your friends = they → are." },
      { kind: "structure", text: "В вопросе помощник Are стоит первым." },
    ],
    result: "Are your friends playing football?",
    wrongDefault: "Порядок слов: Are → your friends → playing → football?",
  },
  "pc-sit-1": {
    title: "Почему It is raining?",
    chain: ["видишь сейчас", "процесс", "Present Continuous", "it → is", "is raining"],
    steps: [
      { kind: "when", text: "Ты описываешь то, что видишь в данный момент." },
      { kind: "what", text: "Дождь идёт — действие в процессе." },
      { kind: "who", text: "Про погоду говорим it → is." },
      { kind: "form", text: "rain → raining." },
    ],
    result: "It is raining.",
    wrongAnswers: [
      { answer: "It rains.", text: "It rains — это про погоду вообще («здесь часто идут дожди»), а не про то, что происходит сейчас." },
      { answer: "It rained.", text: "Это прошедшее время, а дождь идёт прямо сейчас." },
      { answer: "It has rained.", text: "Так говорят про результат («дождь уже прошёл»), а ты видишь процесс." },
    ],
    whyThisTense: {
      steps: [
        { kind: "tense", text: "Здесь нет слова now, но есть ситуация: ты смотришь в окно." },
        { kind: "tense", text: "Ты видишь действие в процессе → Present Continuous." },
      ],
    },
  },
  "pc-sit-2": {
    title: "Почему My brother is sleeping?",
    chain: ["видишь сейчас", "процесс", "Present Continuous", "he → is", "is sleeping"],
    steps: [
      { kind: "when", text: "Ты видишь это в тот момент, когда заходишь в комнату." },
      { kind: "who", text: "My brother = he → is." },
      { kind: "form", text: "sleep → sleeping." },
    ],
    result: "My brother is sleeping.",
    whyThisTense: {
      steps: [
        { kind: "tense", text: "My brother sleeps — это привычка («он обычно спит днём»)." },
        { kind: "tense", text: "А сейчас ты описываешь то, что видишь → Present Continuous." },
      ],
    },
    wrongDefault: "Ты описываешь момент, а не привычку, поэтому нужен Present Continuous.",
  },
  "pc-sit-3": {
    title: "Почему I am doing my homework?",
    chain: ["в момент разговора", "процесс", "Present Continuous", "I → am", "am doing"],
    steps: [
      { kind: "when", text: "Он занят именно сейчас, во время звонка." },
      { kind: "who", text: "I → am." },
      { kind: "form", text: "do → doing." },
    ],
    result: "I am doing my homework.",
    wrongDefault: "I do my homework — это про привычку. Сейчас нужен процесс: I am doing.",
  },

  // --- итоговый тест ---
  "pc-test-1": {
    title: "Почему are running?",
    chain: ["Look!", "процесс", "Present Continuous", "they → are", "are running"],
    steps: [
      { kind: "when", text: "Look! — действие видно прямо сейчас.", highlight: "Look!" },
      { kind: "who", text: "The boys = they → are." },
      { kind: "form", text: "run → running (удваиваем n)." },
    ],
    result: "Look! The boys are running in the yard.",
    wrongDefault: "Мальчиков несколько → they → are running.",
  },
  "pc-test-2": {
    title: "Почему is writing?",
    chain: ["now", "процесс", "Present Continuous", "she → is", "writing"],
    steps: [
      { kind: "who", text: "Grandma = she → is." },
      { kind: "form", text: "Write заканчивается на -e: write → writing." },
    ],
    result: "Grandma is writing a letter now.",
    wrongDefault: "«writeing» не бывает: -e убираем.",
  },
  "pc-test-3": {
    title: "Почему I am listening...?",
    chain: ["I", "процесс", "Present Continuous", "am + V-ing", "I am listening to music."],
    steps: [
      { kind: "who", text: "I → am." },
      { kind: "structure", text: "Подлежащее → помощник → V-ing → дополнение." },
    ],
    result: "I am listening to music.",
    wrongDefault: "Порядок: I → am → listening → to music.",
  },
  "pc-test-4": {
    title: "Почему Are they having...?",
    chain: ["вопрос", "they", "Present Continuous", "Are + подлежащее + V-ing", "Are they having lunch?"],
    steps: [
      { kind: "who", text: "They → are." },
      { kind: "structure", text: "В вопросе Are выходит вперёд." },
    ],
    result: "Are they having lunch?",
    wrongDefault: "Вопрос начинается с помощника Are.",
  },
  "pc-test-5": {
    title: "Почему isn't sleeping?",
    chain: ["отрицание", "it", "Present Continuous", "is + not + V-ing", "isn't sleeping"],
    steps: [
      { kind: "who", text: "My cat = it → is." },
      { kind: "structure", text: "not после is: isn't sleeping." },
    ],
    result: "My cat isn't sleeping on the chair.",
    wrongDefault: "Меняем только помощник: is → isn't, глагол остаётся sleeping.",
  },
  "pc-test-6": {
    title: "Почему ошибка в слове is?",
    chain: ["We", "мы", "Present Continuous", "are + V-ing", "are travelling"],
    steps: [
      { kind: "who", text: "We → помощник are." },
      { kind: "when", text: "This week — временная ситуация, поэтому Present Continuous подходит." },
    ],
    result: "We are travelling to Spain this week.",
    wrongDefault: "Ошибка в помощнике: is → are.",
  },
  "pc-test-7": {
    title: "Почему are playing?",
    chain: ["сейчас", "процесс", "Present Continuous", "they → are", "are playing"],
    steps: [
      { kind: "who", text: "Дети = the children = they → are." },
      { kind: "form", text: "play → playing." },
    ],
    result: "The children are playing in the yard now.",
    wrongDefault: "Нужны обе части: are и playing.",
  },
  "pc-test-8": {
    title: "Почему My sister is listening...?",
    chain: ["слышишь сейчас", "процесс", "Present Continuous", "she → is", "is listening"],
    steps: [
      { kind: "when", text: "Ты слышишь музыку прямо сейчас." },
      { kind: "who", text: "My sister = she → is." },
    ],
    result: "My sister is listening to music.",
    whyThisTense: {
      steps: [
        { kind: "tense", text: "Здесь нет маркера now, но ситуация показывает момент." },
        { kind: "tense", text: "Действие в процессе → Present Continuous, а не Present Simple." },
      ],
    },
    wrongDefault: "My sister listens to music — это про привычку, а ты описываешь момент.",
  },
  "pc-test-9": {
    title: "Почему are swimming?",
    chain: ["сейчас", "процесс", "Present Continuous", "we → are", "swimming"],
    steps: [
      { kind: "who", text: "My friend and I = we → are." },
      { kind: "form", text: "Swim удваивает m: swimming." },
    ],
    result: "My friend and I are swimming in the lake.",
    wrongDefault: "«X and I» = we, поэтому помощник are.",
  },
  "pc-test-10": {
    title: "Почему is cooking?",
    chain: ["7 p.m.", "момент", "Present Continuous", "he → is", "is cooking"],
    steps: [
      { kind: "when", text: "Сейчас 7 вечера — мы описываем этот момент." },
      { kind: "what", text: "Папа занят готовкой, действие в процессе." },
      { kind: "who", text: "Dad = he → is." },
    ],
    result: "Dad is cooking dinner in the kitchen.",
    whyThisTense: {
      steps: [
        { kind: "tense", text: "Dad cooks dinner — привычка, он делает это обычно." },
        { kind: "tense", text: "Здесь описан конкретный момент → Present Continuous." },
      ],
    },
    wrongDefault: "cooks — Present Simple, про привычку. Нам нужен процесс сейчас.",
  },
};
