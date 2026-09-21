import type { TenseGroup } from "./types";

export type TenseMeta = {
  id: string;
  title: string;
  group: TenseGroup;
  tagline: string;
  available: boolean;
  path?: string;
};

export const GROUP_TITLES: Record<TenseGroup, string> = {
  present: "PRESENT — Настоящее",
  past: "PAST — Прошедшее",
  future: "FUTURE — Будущее",
};

export const TENSES: TenseMeta[] = [
  {
    id: "present-simple",
    title: "Present Simple",
    group: "present",
    tagline: "Обычно • регулярно • факты",
    available: true,
    path: "/learn/present-simple",
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    group: "present",
    tagline: "Сейчас • в процессе • временная ситуация",
    available: true,
    path: "/learn/present-continuous",
  },
  {
    id: "present-perfect",
    title: "Present Perfect",
    group: "present",
    tagline: "Произошло раньше • важно сейчас",
    available: true,
    path: "/learn/present-perfect",
  },
  {
    id: "present-perfect-continuous",
    title: "Present Perfect Continuous",
    group: "present",
    tagline: "Как долго • процесс до сейчас",
    available: true,
    path: "/learn/present-perfect-continuous",
  },
  {
    id: "past-simple",
    title: "Past Simple",
    group: "past",
    tagline: "Было • закончилось • V2 / DID + V1",
    available: true,
    path: "/learn/past-simple",
  },
  {
    id: "past-continuous",
    title: "Past Continuous",
    group: "past",
    tagline: "Длилось в момент прошлого • was/were + V-ing",
    available: true,
    path: "/learn/past-continuous",
  },
  {
    id: "past-perfect",
    title: "Past Perfect",
    group: "past",
    tagline: "Раньше другого прошлого • had + V3",
    available: true,
    path: "/learn/past-perfect",
  },
  {
    id: "past-perfect-continuous",
    title: "Past Perfect Continuous",
    group: "past",
    tagline: "Длилось до момента в прошлом",
    available: false,
  },
  {
    id: "future-simple",
    title: "Future Simple",
    group: "future",
    tagline: "Решение • обещание • прогноз",
    available: false,
  },
  {
    id: "future-continuous",
    title: "Future Continuous",
    group: "future",
    tagline: "Будет длиться в момент будущего",
    available: false,
  },
  {
    id: "future-perfect",
    title: "Future Perfect",
    group: "future",
    tagline: "Закончится к моменту в будущем",
    available: false,
  },
  {
    id: "future-perfect-continuous",
    title: "Future Perfect Continuous",
    group: "future",
    tagline: "Будет длиться к моменту будущего",
    available: false,
  },
];

export const TENSES_BY_GROUP = (group: TenseGroup) => TENSES.filter((t) => t.group === group);
