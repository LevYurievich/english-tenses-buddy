/** Хранилище модуля «Все 12 времён»: отдельный ключ, та же логика диагностики. */
import type { Store } from "./coordinates-stats";
import { ALL12_ID } from "@/data/all12/items";

export const ALL12_STORE: Store = { key: "ets-all12-v1", event: "ets-all12-change", tenseId: ALL12_ID };
