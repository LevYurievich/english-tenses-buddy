import { useState } from "react";
import { PRESENT_MAP } from "@/data/all-present/theory";
import { TenseMapTable } from "./FamilyTheory";

/** Шпаргалка, доступная из любого тренировочного упражнения (в экзамене не показывается). */
export function CheatSheet({ title = "Шпаргалка Present" }: { title?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border-2 border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-display text-sm font-bold"
      >
        <span>{title}</span>
        <span aria-hidden className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {open ? (
        <div className="border-t border-border px-4 py-4">
          <TenseMapTable rows={PRESENT_MAP} />
        </div>
      ) : null}
    </div>
  );
}
