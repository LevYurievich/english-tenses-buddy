import type { Reasoning } from "../types";
import { FOR_SINCE_REASONING } from "./for-since";

const F = "have / has + been + V-ing";

const MAIN: Record<string, Reasoning> = {
  "ppc-mc-1": {
    title: "Почему has been studying?",
    chain: ["for three years", "как долго?", "процесс продолжается", "Present Perfect Continuous", F, "has been studying"],
    steps: [
      { kind: "when", text: "For three years — действие началось три года назад.", highlight: "for three years" },
      { kind: "what", text: "Занятия продолжаются и сейчас — важна длительность процесса." },
      { kind: "tense", text: "Значит нужен Present Perfect Continuous." },
      { kind: "who", text: "Anna = she → has been." },
      { kind: "form", text: "study → studying." },
    ],
    result: "Anna has been studying English for three years.",
    remember: "КАК ДОЛГО? → PERFECT CONTINUOUS.",
    wrongAnswers: [
      { answer: "studies", text: "Present Simple рассказывает о привычке, но не показывает длительность до настоящего момента." },
      { answer: "is studying", text: "Present Continuous — это процесс сейчас, без указания, что он длится три года." },
      { answer: "has studied", text: "Present Perfect подчёркивает результат, а здесь важен сам процесс и его длительность." },
    ],
  },
  "ppc-mc-2": {
    title: "Почему have been waiting?",
    chain: ["for twenty minutes", "длительность", "Present Perfect Continuous", F, "have been waiting"],
    steps: [
      { kind: "when", text: "Ждём уже двадцать минут, и автобуса всё ещё нет.", highlight: "for twenty minutes" },
      { kind: "who", text: "I → have." },
      { kind: "structure", text: "BEEN не пропускаем: have + been + V-ing." },
      { kind: "form", text: "wait → waiting." },
    ],
    result: "I have been waiting for the bus for twenty minutes.",
    remember: "BEEN НЕ ПРОПУСКАЕМ.",
    wrongAnswers: [
      { answer: "have waiting", text: "Без been конструкция разваливается: нужно have been waiting." },
      { answer: "has been waiting", text: "has используется с he / she / it, а здесь I → have." },
    ],
  },
  "ppc-mc-3": {
    title: "Почему has been playing?",
    chain: ["all morning", "длительность", "Present Perfect Continuous", F, "has been playing"],
    steps: [
      { kind: "when", text: "All morning = всё утро, действие длится.", highlight: "all morning" },
      { kind: "who", text: "My brother = he → has been." },
      { kind: "form", text: "После been нужен V-ing: play → playing." },
    ],
    result: "My brother has been playing computer games all morning.",
    wrongDefault: "Нужны все три части: has + been + V-ing.",
  },
  "ppc-mc-4": {
    title: "Почему hasn't been sleeping?",
    chain: ["lately", "отрицание", "Present Perfect Continuous", "has + not + been + V-ing", "hasn't been sleeping"],
    steps: [
      { kind: "what", text: "Он плохо спит в последнее время, поэтому выглядит уставшим.", highlight: "lately" },
      { kind: "who", text: "He → has." },
      { kind: "structure", text: "NOT ставим после has: has not = hasn't, дальше been + V-ing." },
    ],
    result: "He hasn't been sleeping well lately.",
    wrongDefault: "В отрицании not идёт сразу после have / has, а been + V-ing остаются вместе.",
  },
  "ppc-mc-5": {
    title: "Почему Have?",
    chain: ["вопрос", "you → have", "Have + subject + been + V-ing", "Have you been waiting"],
    steps: [
      { kind: "who", text: "You → have." },
      { kind: "structure", text: "В вопросе помощник выходит вперёд, been + waiting остаются вместе." },
    ],
    result: "Have you been waiting long?",
    wrongAnswers: [{ answer: "Has", text: "Has нужен для he / she / it, а you → have." }],
  },
  "ppc-mc-6": {
    title: "Почему has been raining?",
    chain: ["сад мокрый", "процесс шёл долго", "Present Perfect Continuous", F, "has been raining"],
    steps: [
      { kind: "when", text: "All afternoon — дождь шёл весь день.", highlight: "all afternoon" },
      { kind: "what", text: "Результат процесса виден сейчас: сад мокрый." },
      { kind: "form", text: "It → has been, rain → raining." },
    ],
    result: "The garden looks wet. It has been raining all afternoon.",
  },

  "ppc-fb-1": {
    title: "Почему have been waiting?",
    chain: ["for twenty minutes", "длительность", F, "have been waiting"],
    steps: [
      { kind: "who", text: "I → have." },
      { kind: "structure", text: "Perfect Continuous → been." },
      { kind: "form", text: "wait → waiting." },
    ],
    result: "I have been waiting for the bus for twenty minutes.",
  },
  "ppc-fb-2": {
    title: "Почему has been studying?",
    chain: ["since 5 o'clock", "точка начала", "Present Perfect Continuous", F, "has been studying"],
    steps: [
      { kind: "when", text: "Since 5 o'clock — занятия начались в пять и продолжаются.", highlight: "since 5 o'clock" },
      { kind: "who", text: "She → has been." },
      { kind: "form", text: "study → studying." },
    ],
    result: "She has been studying since 5 o'clock.",
  },
  "ppc-fb-3": {
    title: "Почему have been running?",
    chain: ["for an hour", "длительность", F, "have been running"],
    steps: [
      { kind: "who", text: "They → have been." },
      { kind: "form", text: "run → running: короткий глагол удваивает согласную." },
    ],
    result: "They have been running around the park for an hour.",
  },
  "ppc-fb-4": {
    title: "Почему haven't been watching?",
    chain: ["отрицание", "this week", "have + not + been + V-ing", "haven't been watching"],
    steps: [
      { kind: "who", text: "We → have." },
      { kind: "structure", text: "not ставим после have: haven't been watching." },
    ],
    result: "We haven't been watching TV this week.",
    wrongDefault: "Полный вариант have not been watching тоже верный.",
  },
  "ppc-fb-5": {
    title: "Почему have you been learning?",
    chain: ["How long", "длительность", "вопрос", "have + you + been + V-ing", "have you been learning"],
    steps: [
      { kind: "when", text: "How long = как долго — вопрос о длительности.", highlight: "How long" },
      { kind: "structure", text: "После How long ставим have, потом подлежащее, потом been + V-ing." },
    ],
    result: "How long have you been learning Spanish?",
  },

  "ppc-sb-1": {
    title: "Почему Tom has been playing football all morning?",
    chain: ["all morning", "длительность", F, "has been playing"],
    steps: [
      { kind: "who", text: "Tom = he → has." },
      { kind: "structure", text: "Порядок: subject → has → been → V-ing → остальное." },
    ],
    result: "Tom has been playing football all morning.",
    remember: "Tom → subject, has → auxiliary, been → часть конструкции, playing → V-ing, all morning → длительность.",
  },
  "ppc-sb-2": {
    title: "Почему We have been waiting for you for twenty minutes?",
    chain: ["for twenty minutes", "длительность", F, "have been waiting"],
    steps: [
      { kind: "who", text: "We → have been." },
      { kind: "structure", text: "Сначала кто, потом have been, потом V-ing, потом всё остальное." },
    ],
    result: "We have been waiting for you for twenty minutes.",
  },
  "ppc-sb-3": {
    title: "Почему How long have you been learning English?",
    chain: ["How long", "вопрос о длительности", "have + you + been + V-ing"],
    steps: [
      { kind: "structure", text: "How long стоит первым, потом помощник have, потом подлежащее." },
      { kind: "form", text: "been + learning остаются вместе." },
    ],
    result: "How long have you been learning English?",
  },
  "ppc-sb-4": {
    title: "Почему She has been doing her homework since three o'clock?",
    chain: ["since three o'clock", "точка начала", F, "has been doing"],
    steps: [
      { kind: "who", text: "She → has been." },
      { kind: "form", text: "do → doing." },
      { kind: "structure", text: "Since three o'clock — точка начала, ставим в конце." },
    ],
    result: "She has been doing her homework since three o'clock.",
  },

  "ppc-tr-1": {
    title: "Почему She hasn't been sleeping well?",
    chain: ["отрицание", "has + not + been + V-ing", "hasn't been sleeping"],
    steps: [{ kind: "structure", text: "NOT ставится после has, been + sleeping не меняются." }],
    result: "She hasn't been sleeping well.",
  },
  "ppc-tr-2": {
    title: "Почему Has Tom been working all day?",
    chain: ["вопрос", "has вперёд", "Has + Tom + been working"],
    steps: [
      { kind: "structure", text: "HAS выходит перед подлежащим." },
      { kind: "form", text: "been + working остаются после Tom." },
    ],
    result: "Has Tom been working all day?",
  },
  "ppc-tr-3": {
    title: "Почему Have they been living in Moscow since 2019?",
    chain: ["вопрос", "they → have", "Have + they + been living"],
    steps: [
      { kind: "who", text: "They → have." },
      { kind: "structure", text: "Помощник вперёд, been + living вместе." },
    ],
    result: "Have they been living in Moscow since 2019?",
  },

  "ppc-err-1": {
    title: "Почему нужно been?",
    chain: ["have + ???", "нет been", "have been studying"],
    steps: [
      { kind: "structure", text: "В Present Perfect Continuous обязательно have / has + been + V-ing." },
      { kind: "form", text: "Без been предложение неправильное." },
    ],
    result: "I have been studying for two hours.",
    remember: "BEEN НЕ ПРОПУСКАЕМ.",
  },
  "ppc-err-2": {
    title: "Почему нужно studying?",
    chain: ["been + ???", "нужен V-ing", "been studying"],
    steps: [{ kind: "form", text: "После been всегда идёт V-ing: study → studying." }],
    result: "She has been studying since morning.",
    remember: "ING НЕ ПРОПУСКАЕМ.",
  },
  "ppc-err-3": {
    title: "Почему нужно have?",
    chain: ["They", "не he / she / it", "have"],
    steps: [{ kind: "who", text: "They → have. HAS только для he / she / it." }],
    result: "They have been playing all day.",
  },
  "ppc-err-4": {
    title: "Почему нужно for?",
    chain: ["three hours", "как долго?", "промежуток", "FOR"],
    steps: [
      { kind: "when", text: "Three hours отвечает на вопрос «как долго?».", highlight: "three hours" },
      { kind: "structure", text: "Для промежутка нужен FOR, а SINCE — только для точки начала." },
    ],
    result: "I have been working for three hours.",
    remember: "FOR = ДЛИНА, SINCE = СТАРТ.",
  },

  "ppc-fs-1": {
    title: "Почему for two hours?",
    chain: ["two hours", "как долго?", "FOR"],
    steps: [{ kind: "when", text: "Два часа — это длина промежутка → for.", highlight: "two hours" }],
    result: "We have been cleaning the flat for two hours.",
  },
  "ppc-fs-2": {
    title: "Почему since September?",
    chain: ["September", "с какого момента?", "SINCE"],
    steps: [{ kind: "when", text: "Сентябрь — момент начала → since.", highlight: "September" }],
    result: "Kate has been learning the guitar since September.",
  },
  "ppc-fs-3": {
    title: "Почему since the morning?",
    chain: ["the morning", "с какого момента?", "SINCE"],
    steps: [
      { kind: "when", text: "«С утра» — это точка начала, а не длина промежутка.", highlight: "the morning" },
      { kind: "structure", text: "Если бы мы сказали «пять часов», нужен был бы for." },
    ],
    result: "My dog has been sleeping since the morning.",
  },

  "ppc-t-1": {
    title: "Почему I have been learning English for two years?",
    chain: ["два года", "длительность", "Present Perfect Continuous", F, "have been learning"],
    steps: [
      { kind: "what", text: "Действие началось раньше и продолжается сейчас." },
      { kind: "who", text: "I → have been." },
      { kind: "structure", text: "Два года — промежуток → for." },
    ],
    result: "I have been learning English for two years.",
    remember: "Вариант studying English тоже принимается.",
  },
  "ppc-t-2": {
    title: "Почему She has been playing the piano since the morning?",
    chain: ["с утра", "точка начала", F, "has been playing"],
    steps: [
      { kind: "who", text: "She → has been." },
      { kind: "structure", text: "С утра = since the morning — момент начала." },
    ],
    result: "She has been playing the piano since the morning.",
  },

  "ppc-sit-1": {
    title: "Почему I have been doing my homework for two hours?",
    chain: ["началось раньше", "продолжается", "важна длительность", "Present Perfect Continuous", F],
    steps: [
      { kind: "when", text: "Началось раньше? Да — два часа назад." },
      { kind: "what", text: "Продолжается ли сейчас? Да." },
      { kind: "tense", text: "Важна длительность → Present Perfect Continuous." },
      { kind: "who", text: "I → have been." },
      { kind: "form", text: "do → doing, и промежуток → for two hours." },
    ],
    result: "I have been doing my homework for two hours.",
    wrongAnswers: [
      { answer: "I am doing my homework.", text: "Это просто процесс сейчас, без указания, что он длится два часа." },
      { answer: "I have done my homework.", text: "Это значит, что работа уже закончена. А ты ещё делаешь её." },
    ],
  },
  "ppc-sit-2": {
    title: "Почему Tom has been running?",
    chain: ["результат процесса виден", "мокрая футболка", "Present Perfect Continuous", F, "has been running"],
    steps: [
      { kind: "what", text: "Процесс мог только что закончиться, но его результат виден сейчас." },
      { kind: "tense", text: "Такой смысл передаёт Present Perfect Continuous." },
      { kind: "form", text: "run → running." },
    ],
    result: "Tom has been running.",
    whyThisTense: {
      title: "Почему не Present Perfect?",
      steps: [
        { kind: "tense", text: "Tom has run фокусируется на завершённом факте (например, на дистанции)." },
        { kind: "tense", text: "Здесь важно, что он долго бежал, и это видно по нему сейчас → Perfect Continuous." },
      ],
    },
  },
  "ppc-sit-3": {
    title: "Почему since four o'clock?",
    chain: ["четыре часа", "точка начала", F, "has been doing since"],
    steps: [
      { kind: "who", text: "She → has been." },
      { kind: "form", text: "do → doing." },
      { kind: "when", text: "Four o'clock — момент начала → since.", highlight: "four o'clock" },
    ],
    result: "She has been doing her homework since four o'clock.",
    wrongAnswers: [
      { answer: "She has been doing her homework for four o'clock.", text: "For нужен для промежутка: for two hours. А four o'clock — момент." },
      { answer: "She has doing her homework since four o'clock.", text: "Пропущено been: has been doing." },
    ],
  },

  "ppc-test-1": {
    title: "Почему have been living?",
    chain: ["for five years", "длительность", F, "have been living"],
    steps: [
      { kind: "who", text: "My cousins = they → have been." },
      { kind: "form", text: "live → living." },
    ],
    result: "My cousins have been living in this village for five years.",
  },
  "ppc-test-2": {
    title: "Почему has been repairing?",
    chain: ["since lunch", "точка начала", F, "has been repairing"],
    steps: [
      { kind: "who", text: "Dad = he → has." },
      { kind: "structure", text: "BEEN обязательно: has been repairing." },
    ],
    result: "Dad has been repairing the car since lunch.",
  },
  "ppc-test-3": {
    title: "Почему have been swimming?",
    chain: ["for an hour", "длительность", F, "have been swimming"],
    steps: [
      { kind: "who", text: "The children = they → have been." },
      { kind: "form", text: "swim → swimming." },
    ],
    result: "The children have been swimming in the pool for an hour.",
  },
  "ppc-test-4": {
    title: "Почему haven't been practising?",
    chain: ["отрицание", "have + not + been + V-ing", "haven't been practising"],
    steps: [{ kind: "structure", text: "NOT ставим после have, been + practising остаются вместе." }],
    result: "I haven't been practising the violin today.",
  },
  "ppc-test-5": {
    title: "Почему Has Kate been helping...?",
    chain: ["вопрос", "Kate = she", "has вперёд"],
    steps: [
      { kind: "who", text: "Kate = she → has." },
      { kind: "structure", text: "Помощник выходит вперёд, been helping остаётся после подлежащего." },
    ],
    result: "Has Kate been helping her mum in the kitchen?",
  },
  "ppc-test-6": {
    title: "Почему How long have they been playing chess?",
    chain: ["How long", "вопрос о длительности", "have + they + been + V-ing"],
    steps: [{ kind: "structure", text: "How long → have → подлежащее → been → V-ing." }],
    result: "How long have they been playing chess?",
  },
  "ppc-test-7": {
    title: "Почему since Tuesday?",
    chain: ["Tuesday", "с какого момента?", "SINCE"],
    steps: [{ kind: "when", text: "Вторник — точка начала → since.", highlight: "Tuesday" }],
    result: "Grandma has been knitting a scarf since Tuesday.",
  },
  "ppc-test-8": {
    title: "Почему нужно for?",
    chain: ["two hours", "промежуток", "FOR"],
    steps: [{ kind: "when", text: "Два часа — длина промежутка, поэтому for, а не since." }],
    result: "We have been skating for two hours.",
    remember: "FOR = ДЛИНА, SINCE = СТАРТ.",
  },
  "ppc-test-9": {
    title: "Почему She has been baking a pie?",
    chain: ["следы процесса", "пирог не готов", "Present Perfect Continuous", F, "has been baking"],
    steps: [
      { kind: "what", text: "Процесс ещё идёт: мука на столе, пирог не готов." },
      { kind: "tense", text: "Важен процесс, а не результат → Present Perfect Continuous." },
    ],
    result: "She has been baking a pie.",
    whyThisTense: {
      title: "Почему не Present Perfect?",
      steps: [{ kind: "tense", text: "She has baked a pie означало бы, что пирог уже готов. А он ещё нет." }],
    },
  },
  "ppc-test-10": {
    title: "Почему We have been watching this series for a week?",
    chain: ["неделя", "длительность", F, "have been watching"],
    steps: [
      { kind: "who", text: "We → have been." },
      { kind: "structure", text: "Неделя — промежуток → for a week." },
    ],
    result: "We have been watching this series for a week.",
  },
};

/** Объяснения «Почему?» для урока: основная практика + мини-тренировка FOR / SINCE. */
export const PRESENT_PERFECT_CONTINUOUS_REASONING: Record<string, Reasoning> = {
  ...MAIN,
  ...FOR_SINCE_REASONING,
};
