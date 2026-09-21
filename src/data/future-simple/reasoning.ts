import type { Reasoning } from "../types";

/**
 * Объяснения «Почему?» для Future Simple.
 * Цепочка: КОГДА? → будущее → КАКОЙ КОНТЕКСТ? (решение / обещание /
 * предложение / прогноз / факт) → WILL → V1 → ответ.
 */
export const FUTURE_SIMPLE_REASONING: Record<string, Reasoning> = {
  "fs-will-1": {
    title: "Почему will win?",
    chain: ["I think", "прогноз", "WILL", "V1", "will win"],
    steps: [
      { kind: "when", text: "Действие относится к будущему — матч ещё не сыгран." },
      { kind: "what", text: "I think показывает: говорящий высказывает мнение.", highlight: "I think" },
      { kind: "tense", text: "Прогноз / мнение о будущем — типичный случай WILL." },
      { kind: "form", text: "После WILL глагол остаётся в первой форме: win.", highlight: "win" },
    ],
    result: "I think Tom will win the match.",
    remember: "WILL + V1 — форма не меняется ни для какого лица.",
    wrongAnswers: [
      { answer: "will wins", text: "После WILL окончание -s не нужно: will win." },
      { answer: "will winning", text: "После WILL не бывает -ing." },
      { answer: "will to win", text: "После WILL частица to не ставится." },
    ],
  },
  "fs-will-2": {
    title: "Почему will be?",
    steps: [
      { kind: "what", text: "Говорящий делится своим мнением о будущем." },
      { kind: "tense", text: "Прогноз → WILL." },
      { kind: "form", text: "После WILL используется базовая форма BE.", highlight: "be" },
    ],
    result: "I think robots will be more common in 50 years.",
    remember: "Не will are / will is, а will be.",
    wrongDefault: "После WILL нужна базовая форма: will be.",
  },
  "fs-will-3": {
    title: "Почему will call?",
    steps: [
      { kind: "what", text: "Говорящий даёт обещание." },
      { kind: "tense", text: "Обещание — один из главных смыслов WILL." },
      { kind: "form", text: "WILL + V1: will call. В речи чаще звучит I'll call." },
    ],
    result: "I will call you tonight. / I'll call you tonight.",
    remember: "🤞 обещание → WILL",
  },
  "fs-will-5": {
    title: "Почему will help?",
    chain: ["вижу ситуацию сейчас", "предлагаю помощь", "WILL", "will help"],
    steps: [
      { kind: "when", text: "Ситуация происходит прямо сейчас: коробка тяжёлая." },
      { kind: "what", text: "Ты предлагаешь помощь, решение возникло в этот момент." },
      { kind: "tense", text: "Предложение помощи → WILL." },
      { kind: "form", text: "WILL + V1: will help." },
    ],
    result: "That box looks heavy. I'll help you.",
    remember: "🤝 предложение помощи → WILL",
  },
  "fs-wont-1": {
    title: "Почему won't tell?",
    steps: [
      { kind: "what", text: "Это обещание НЕ делать что-то." },
      { kind: "structure", text: "Отрицание: subject + will not + V1." },
      { kind: "form", text: "will not сокращается в won't, а не willn't.", highlight: "won't" },
    ],
    result: "I won't tell anyone.",
    remember: "WILL NOT = WON'T",
    wrongAnswers: [
      { answer: "willn't tell", text: "Формы willn't не существует. Правильно: won't." },
      { answer: "won't to tell", text: "После won't частица to не нужна." },
    ],
  },
  "fs-wont-3": {
    title: "Почему won't?",
    steps: [{ kind: "form", text: "will not → won't. Формы willn't в английском нет." }],
    result: "I won't forget your birthday.",
    remember: "WILL NOT = WON'T",
  },
  "fs-q-1": {
    title: "Почему Will Tom come?",
    chain: ["утверждение", "WILL вперёд", "V1", "вопрос"],
    steps: [
      { kind: "structure", text: "В вопросе помощник выходит вперёд: Will + подлежащее." },
      { kind: "form", text: "После WILL остаётся V1: come, а не comes." },
    ],
    result: "Tom will come tomorrow. → Will Tom come tomorrow?",
    remember: "WILL выходит вперёд.",
    wrongDefault: "Порядок слов: Will + кто + V1 ?",
  },
  "fs-q-4": {
    title: "Почему Where will they stay?",
    steps: [
      { kind: "structure", text: "Question word + will + subject + V1 ?" },
      { kind: "form", text: "Глагол остаётся в первой форме: stay." },
    ],
    result: "Where will they stay?",
    remember: "Вопросительное слово ставится перед WILL.",
  },
  "fs-form-1": {
    title: "Почему will go?",
    steps: [
      { kind: "form", text: "После WILL глагол не получает -s даже с he / she / it." },
    ],
    result: "She will go to the party.",
    remember: "WILL НЕ МЕНЯЕТСЯ, и глагол после него тоже.",
    wrongAnswers: [
      { answer: "will goes", text: "Окончание -s после WILL не ставится." },
      { answer: "will going", text: "will + V-ing — не форма Future Simple." },
      { answer: "will to go", text: "После WILL частицы to нет." },
    ],
  },
  "fs-err-1": {
    title: "Почему go, а не goes?",
    steps: [{ kind: "form", text: "После WILL всегда V1, лицо подлежащего ничего не меняет." }],
    result: "She will go to London.",
    remember: "will + V1",
  },
  "fs-err-2": {
    title: "Почему без to?",
    steps: [{ kind: "form", text: "WILL — модальный помощник, после него инфинитив без to." }],
    result: "He will come at six.",
    remember: "❌ will to come · ✅ will come",
  },
  "fs-mean-1": {
    title: "Почему это решение сейчас?",
    steps: [
      { kind: "when", text: "Телефон зазвонил только что." },
      { kind: "what", text: "Человек не планировал отвечать заранее — решает в момент речи." },
      { kind: "tense", text: "SITUATION NOW → DECISION NOW → WILL." },
    ],
    result: "I'll answer the phone.",
    remember: "⚡ решение сейчас → WILL",
  },
  "fs-sit-1": {
    title: "Почему I'll open it?",
    steps: [
      { kind: "when", text: "Звонок раздался только что." },
      { kind: "what", text: "Решение открыть возникло прямо сейчас, плана не было." },
      { kind: "tense", text: "Решение в момент речи → WILL." },
    ],
    result: "I'll open it.",
    remember: "Если решение появилось в разговоре — WILL.",
    alternatives: [
      { label: "I'm going to open it.", text: "Так говорят, когда намерение было раньше." },
      { label: "I opened it.", text: "Это прошедшее время, а дверь ещё не открыта." },
    ],
  },
  "fs-sit-3": {
    title: "Почему will win?",
    steps: [
      { kind: "what", text: "Ты высказываешь мнение о будущем результате." },
      { kind: "tense", text: "Прогноз / мнение → WILL." },
    ],
    result: "I think our class will win.",
    remember: "💭 прогноз → WILL",
  },
  "fs-tr-2": {
    title: "Почему won't come?",
    steps: [
      { kind: "structure", text: "Отрицание в будущем: subject + won't + V1." },
      { kind: "form", text: "come остаётся в первой форме." },
    ],
    result: "Tom won't come tomorrow.",
    remember: "won't + V1",
  },
  "fst-12": {
    title: "Почему am going to paint?",
    steps: [
      { kind: "when", text: "Действие в будущем — выходные ещё не наступили." },
      { kind: "what", text: "Краска и кисти уже куплены: намерение появилось раньше разговора." },
      { kind: "tense", text: "Намерение / план → BE GOING TO." },
    ],
    result: "I'm going to paint my room this weekend.",
    remember: "Намерение было раньше → going to.",
    alternatives: [
      { label: "will paint", text: "WILL звучал бы как решение, принятое прямо сейчас." },
    ],
  },
  "fst-13": {
    title: "Почему are eating?",
    steps: [
      { kind: "what", text: "Столик забронирован — есть конкретная договорённость." },
      { kind: "tense", text: "Arrangement → Present Continuous для будущего." },
    ],
    result: "We are eating at the new café at 7 tonight.",
    remember: "Договорённость с точным временем → am / is / are + V-ing.",
  },
  "fst-14": {
    title: "Почему will open?",
    steps: [
      { kind: "when", text: "Ситуация возникла только что." },
      { kind: "what", text: "Решение принято в момент речи." },
      { kind: "tense", text: "Решение сейчас → WILL." },
    ],
    result: "I'll open it.",
    remember: "⚡ решение сейчас → WILL",
  },
};
