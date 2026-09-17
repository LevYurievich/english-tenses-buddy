import { useState } from "react";

export function Hint({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-dashed border-marker/60 bg-marker-soft px-3 py-2 text-sm font-semibold text-marker transition hover:brightness-95"
      >
        Показать подсказку
      </button>
    );
  }
  return (
    <p className="rounded-lg border border-dashed border-marker/60 bg-marker-soft px-3 py-2 text-sm text-marker">
      <span className="font-bold">Подсказка: </span>
      {text}
    </p>
  );
}
