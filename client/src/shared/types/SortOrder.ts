export const SORT_ORDER = {
  AZ: "a-z",
  ZA: "z-a",
  DF: "default",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
