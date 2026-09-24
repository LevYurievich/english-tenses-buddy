/**
 * «Умное повторение»: темы повторения и статичные карточки помощи Tensy.
 * Тексты подготовлены заранее — ничего не генерируется.
 * Каждая тема привязана к существующим errorCategory; по ним же ищутся упражнения.
 */
import type { ErrorCategory } from "./types";

export type HelpCard = {
  id: string;
  /** Короткое название темы в списке «Что стоит повторить». */
  topic: string;
  title: string;
  lines: string[];
  wrong?: string[];
  right?: string[];
  tensy?: string;
  categories: ErrorCategory[];
};

export const HELP_CARDS: HelpCard[] = [
  {
    id: "did-v1",
    topic: "DID + первая форма",
    title: "DID забирает прошлое себе",
    lines: ["После did / didn't используем первую форму глагола."],
    wrong: ["Did Tom went?", "Tom didn't went."],
    right: ["Did Tom go?", "Tom didn't go."],
    tensy: "Прошедшее время уже спряталось в DID — глаголу снова нужен V1.",
    categories: ["did_plus_v2", "didnt_plus_v2", "used_did_with_be", "used_did_in_past_continuous", "used_did_with_past_perfect", "used_did_with_past_perfect_continuous"],
  },
  {
    id: "v2",
    topic: "Вторая форма глагола V2",
    title: "Прошлое событие — V2",
    lines: ["В утвердительном Past Simple нужна вторая форма: go → went, see → saw, play → played.", "V3 (gone, seen) без have / had здесь не подходит."],
    wrong: ["We seen a film yesterday."],
    right: ["We saw a film yesterday."],
    categories: ["wrong_v2", "used_v3_instead_v2", "ed_spelling", "wrong_was_were"],
  },
  {
    id: "v3",
    topic: "Третья форма глагола V3",
    title: "Проверь третью форму",
    lines: ["После have / has / had в Perfect нужна V3.", "go → went → gone", "write → wrote → written", "see → saw → seen", "do → did → done"],
    wrong: ["Tom has went home."],
    right: ["Tom has gone home."],
    categories: ["wrong_v3", "used_v2_instead_v3", "wrong_past_perfect_v3", "used_v2_after_had", "wrong_v3_future_perfect", "used_v2_instead_v3_future", "will_have_plus_v1", "will_be_plus_v3"],
  },
  {
    id: "process-result",
    topic: "Процесс или результат?",
    title: "Процесс или результат?",
    lines: ["«Что происходило в этот момент?» → PROCESS → Continuous.", "«Что уже было сделано к этому моменту?» → RESULT → Perfect."],
    right: ["At 8, Tom was doing his homework. → процесс в 8.", "By 8, Tom had finished his homework. → результат к 8."],
    categories: ["process_vs_result_global", "continuous_vs_perfect", "continuous_vs_perfect_global", "future_continuous_vs_future_perfect"],
  },
  {
    id: "result-duration",
    topic: "Результат или как долго?",
    title: "Результат или как долго?",
    lines: ["«Что уже сделано?» → Perfect.", "«Как долго процесс идёт / шёл / будет идти до точки?» → Perfect Continuous."],
    right: ["I have written three pages. → результат.", "I have been writing for two hours. → длительность процесса."],
    categories: ["result_vs_duration_global", "perfect_vs_perfect_continuous", "perfect_vs_perfect_continuous_global", "present_perfect_vs_present_perfect_continuous", "past_perfect_vs_past_perfect_continuous", "future_perfect_vs_perfect_continuous", "wrong_tense_duration", "duration_selection"],
  },
  {
    id: "simple-continuous",
    topic: "Обычно или прямо сейчас?",
    title: "Факт или процесс?",
    lines: ["Обычность, факт, событие → Simple.", "Процесс в определённый момент → Continuous."],
    right: ["Tom plays football every Saturday. → обычность.", "Look! Tom is playing football. → процесс сейчас."],
    categories: ["simple_vs_continuous", "simple_vs_continuous_global", "past_simple_vs_continuous", "future_simple_vs_continuous", "continuous_vs_perfect_continuous_global", "past_continuous_vs_past_perfect_continuous", "future_continuous_vs_perfect_continuous", "wrong_background_event", "wrong_when_while_interpretation", "continuous_family_confusion"],
  },
  {
    id: "present-past",
    topic: "Present или Past?",
    title: "Где точка отсчёта?",
    lines: ["Результат связан с NOW? → Present Perfect.", "Результат был к прошлому моменту? → Past Perfect.", "Просто событие в прошлом, со временем «когда»? → Past Simple."],
    right: ["I have finished my homework. → результат сейчас.", "I had finished my homework before Tom arrived. → результат к прошлой точке."],
    categories: ["present_vs_past_reference", "present_perfect_vs_past_simple", "wrong_reference_point", "wrong_past_reference_point", "reference_point_error", "simple_vs_perfect", "simple_vs_perfect_global"],
  },
  {
    id: "event-order",
    topic: "Что случилось раньше?",
    title: "Прошлое до прошлого",
    lines: ["Если одно событие в прошлом случилось ещё раньше другого и это важно — Past Perfect.", "Если события идут по порядку — хватит Past Simple."],
    right: ["When we arrived, the train had left. → поезд ушёл раньше.", "We arrived, and then the train left. → по порядку."],
    categories: ["past_simple_vs_past_perfect", "wrong_event_order", "already_position_past_perfect"],
  },
  {
    id: "at-by",
    topic: "AT или BY?",
    title: "В момент или к моменту?",
    lines: ["AT 8 → что происходит В 8? → Continuous.", "BY 8 → что готово К 8? → Perfect.", "Как долго процесс идёт К 8? → Perfect Continuous.", "AT и BY — полезные ориентиры, а не автоматические правила."],
    categories: ["at_vs_by", "wrong_future_deadline", "future_simple_vs_future_perfect", "perfect_family_confusion", "perfect_continuous_family_confusion", "wrong_future_duration"],
  },
  {
    id: "for-since",
    topic: "FOR или SINCE?",
    title: "FOR или SINCE?",
    lines: ["FOR — сколько времени? for two hours, for three years.", "SINCE — с какого момента? since Monday, since 2020, since 5 o'clock."],
    categories: ["wrong_for_since", "for_since_error", "wrong_for_since_past", "wrong_for_since_future"],
  },
  {
    id: "ing-helper",
    topic: "Continuous: помощник + ING",
    title: "ING не ходит один",
    lines: ["Present: am / is / are + V-ing", "Past: was / were + V-ing", "Future: will be + V-ing"],
    wrong: ["Tom working now."],
    right: ["Tom is working now."],
    categories: ["missing_be", "wrong_be", "missing_ing", "ing_spelling", "wrong_was_were_continuous", "missing_ing_past", "missing_be_future_continuous", "wrong_ing_future_continuous", "will_be_plus_v1", "auxiliary_error"],
  },
  {
    id: "been",
    topic: "Perfect Continuous: BEEN + ING",
    title: "Не потеряй BEEN",
    lines: ["Present: have / has + been + V-ing", "Past: had + been + V-ing", "Future: will + have + been + V-ing"],
    tensy: "Главная подсказка: BEEN + ING.",
    categories: ["missing_been", "missing_been_past_perfect_continuous", "missing_ing_past_perfect_continuous", "used_v3_instead_ing", "missing_have_future_perfect_continuous", "missing_been_future_perfect_continuous", "wrong_ing_future_perfect_continuous", "stative_future_perfect_continuous"],
  },
  {
    id: "have-has",
    topic: "HAVE / HAS / HAD",
    title: "Кто помогает в Perfect?",
    lines: ["I / you / we / they → have; he / she / it → has.", "Прошлая точка → had. Будущая → will have."],
    wrong: ["She have finished.", "Tom finished already by 8 tomorrow."],
    right: ["She has finished.", "Tom will have finished by 8 tomorrow."],
    categories: ["wrong_have_has", "missing_have_has", "missing_had", "missing_have_future_perfect", "wrong_have_has_future_perfect", "already_position", "yet_usage"],
  },
  {
    id: "third-person",
    topic: "He / she / it + S",
    title: "Не забудь S",
    lines: ["В Present Simple после he / she / it глагол обычно получает -s / -es.", "I play. Tom plays.", "Но: Does Tom play? После DOES снова V1."],
    categories: ["third_person_s", "do_does"],
  },
  {
    id: "question",
    topic: "Порядок слов в вопросе",
    title: "Кто задаёт вопрос?",
    lines: ["Present Simple: Do / Does + subject + V1?", "Past Simple: Did + subject + V1?", "Continuous: BE + subject + V-ing?", "Perfect: Have / Has / Had + subject + V3?", "Future: Will + subject + …?"],
    categories: ["question", "question_word_order", "question_order_past_continuous", "question_order_past_perfect_continuous", "future_question_order", "future_continuous_question_order", "future_perfect_question_order", "question_order_future_perfect_continuous", "word_order", "wrong_word_order", "word_order_error"],
  },
  {
    id: "negative",
    topic: "Отрицание",
    title: "Где живёт NOT?",
    lines: ["NOT встаёт после первого вспомогательного глагола.", "doesn't play · didn't play · isn't playing · hasn't played · won't play · won't have played"],
    wrong: ["Tom not plays.", "I will have not finished."],
    right: ["Tom doesn't play.", "I won't have finished."],
    categories: ["negative", "negative_form", "negative_position", "future_negative_form", "future_continuous_negative", "wrong_wont_form"],
  },
  {
    id: "future-forms",
    topic: "Что идёт после WILL?",
    title: "Что идёт после WILL?",
    lines: ["Future Simple: WILL + V1", "Future Continuous: WILL + BE + V-ing", "Future Perfect: WILL + HAVE + V3", "Future Perfect Continuous: WILL + HAVE + BEEN + V-ing"],
    wrong: ["She will goes.", "I will to call you."],
    right: ["She will go.", "I will call you."],
    categories: ["will_plus_wrong_verb_form", "will_plus_to", "will_plus_ing", "will_plus_s", "future_time_clause_will", "will_vs_going_to", "will_vs_present_continuous_future", "future_context_selection"],
  },
  {
    id: "time-coordinate",
    topic: "Сначала найди ГДЕ",
    title: "Сначала найди ГДЕ",
    lines: ["Перед выбором времени спроси: где точка отсчёта — NOW, PAST или FUTURE?", "Только потом: что важно — событие, процесс, результат или длительность?"],
    categories: ["wrong_time_coordinate", "present_vs_future_reference", "past_vs_future_reference", "wrong_future_reference_point"],
  },
  {
    id: "markers",
    topic: "Маркеры и выбор времени",
    title: "Маркер — подсказка, а не ответ",
    lines: ["yesterday, now, for, since, already, by, when, tomorrow помогают понять контекст,", "но не всегда сами определяют время. Сначала пойми смысл предложения."],
    categories: ["tense_choice", "wrong_aspect_selection", "present_tense_selection", "past_simple_selection", "past_tense_selection", "verb_form", "verb_form_error", "verb_form_after_tense_selection", "translation"],
  },
];

const BY_CATEGORY = new Map<string, HelpCard>();
HELP_CARDS.forEach((c) => c.categories.forEach((cat) => BY_CATEGORY.set(cat, c)));

/** Карточка для категории ошибки (или null, если категории нет в наборе). */
export function cardFor(category: string): HelpCard | null {
  return BY_CATEGORY.get(category) ?? null;
}
