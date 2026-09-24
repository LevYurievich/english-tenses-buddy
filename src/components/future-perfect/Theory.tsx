import { Button } from "@/components/ui/app-button";
import { Tensy } from "@/components/Tensy";
import {
  AT_VS_BY,
  CHEATSHEET,
  FORMS,
  MAIN_IDEA,
  TYPICAL_MISTAKES,
  V3_LIST,
} from "@/data/future-perfect/theory";

function Card({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section className="card-surface space-y-4 p-5 sm:p-6">
      {kicker ? <p className="text-xs font-bold tracking-widest text-primary">{kicker}</p> : null}
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function FuturePerfectTheory({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-5">
      <Card kicker="ГЛАВНАЯ ИДЕЯ" title={MAIN_IDEA.title}>
        <p className="rounded-xl bg-primary/10 p-4 text-center font-display text-lg font-bold text-primary">
          {MAIN_IDEA.question}
        </p>
        <div>
          <p className="font-mono text-base font-semibold">{MAIN_IDEA.example}</p>
          <p className="text-sm text-muted-foreground">{MAIN_IDEA.ru}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {MAIN_IDEA.steps.map((s) => (
            <div key={s.label} className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-display font-bold">{s.label}</p>
              <p className="text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="МЕТАФОРА" title="Дедлайн: к 8 часам будет готово">
        <p className="text-sm text-muted-foreground">
          Представь флажок на карте будущего. Future Perfect смотрит не на сам процесс, а на то,
          что уже будет сделано к этому флажку.
        </p>
        <div
          className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs sm:text-sm"
          aria-label="Временная линия: сейчас, работа, готово, дедлайн"
        >
          <pre className="whitespace-pre">{`NOW            TUE            THU            FRI
●──────────────●──────────────●──────────────🎯
     РАБОТА НАД ПРОЕКТОМ      ✓ ГОТОВО`}</pre>
        </div>
        <p className="font-mono text-sm font-semibold">By Friday, Tom will have finished the project.</p>
        <p className="rounded-xl border-2 border-dashed border-primary/40 p-3 text-center text-sm font-bold">
          Главные вопросы: К КАКОМУ МОМЕНТУ? → ЧТО К НЕМУ УЖЕ БУДЕТ ГОТОВО?
        </p>
      </Card>

      <Tensy mood="map">
        Поставим точку в будущем и посмотрим: что к ней уже будет готово?
      </Tensy>

      <Card kicker="ФОРМУЛА" title="WILL → HAVE → V3">
        <p className="text-sm text-muted-foreground">
          WILL HAVE + V3 = будет готово к точке. После will всегда стоит <b>have</b> — даже с he,
          she, it. «will has» не бывает.
        </p>
        <div className="space-y-2">
          {FORMS.map((f) => (
            <div key={f.kind} className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-display font-bold">{f.kind}</p>
              <p className="font-mono">{f.formula}</p>
              <p className="font-mono text-muted-foreground">{f.example}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="V3" title="Третья форма глагола">
        <p className="text-sm text-muted-foreground">
          Правильные глаголы: + ed. Неправильные — третья колонка таблицы. V2 (went) и V3 (gone) —
          разные формы!
        </p>
        <div className="grid grid-cols-3 gap-1 text-sm">
          <p className="font-bold">V1</p>
          <p className="font-bold">V2</p>
          <p className="font-bold text-primary">V3</p>
          {V3_LIST.map(([a, b, c]) => (
            <div key={a} className="contents font-mono">
              <p>{a}</p>
              <p className="text-muted-foreground">{b}</p>
              <p className="font-semibold text-primary">{c}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="AT vs BY" title="В момент или к моменту?">
        <div className="grid gap-3 sm:grid-cols-2">
          {AT_VS_BY.map((a) => (
            <div key={a.word} className="rounded-xl bg-muted p-4 text-sm">
              <p className="font-display text-lg font-bold">{a.word}</p>
              <p className="text-muted-foreground">{a.meaning}</p>
              <p className="mt-1 font-bold">{a.tense}</p>
              <p className="font-mono">{a.example}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          BY не означает «в». By Friday = в пятницу или раньше. By the time + событие тоже задаёт
          точку: <span className="font-mono">By the time you come back, I will have cleaned the flat.</span>
        </p>
        <p className="rounded-xl bg-primary/10 p-3 text-sm font-bold text-primary">
          Будущий смысл ≠ will в каждой части. После by the time, when, before, after ставим Present
          Simple: by the time you <u>come</u>.
        </p>
        <p className="text-sm text-muted-foreground">
          Не полагайся только на слова at / by — всегда проверяй смысл: процесс в точке или готовый
          результат к точке?
        </p>
      </Card>

      <Card kicker="СКОЛЬКО БУДЕТ ГОТОВО?" title="Количество к будущему моменту">
        <p className="font-mono text-sm font-semibold">
          By the end of the year, I will have read twenty books.
        </p>
        <p className="text-sm text-muted-foreground">
          Считаем результат к точке: сколько книг, страниц, денег уже будет «в копилке».
        </p>
      </Card>

      <Card kicker="ТИПИЧНЫЕ ОШИБКИ" title="Проверь себя">
        <div className="space-y-2">
          {TYPICAL_MISTAKES.map((m) => (
            <div key={m.wrong} className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-mono text-destructive">❌ {m.wrong}</p>
              <p className="font-mono text-success">✅ {m.right}</p>
              <p className="text-muted-foreground">{m.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card kicker="МИНИ-ШПАРГАЛКА" title="WILL + HAVE + V3 = результат к будущей точке">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {CHEATSHEET.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
      </Card>

      <Button onClick={onDone} className="w-full sm:w-auto">
        Понятно, к тренировке →
      </Button>
    </div>
  );
}
