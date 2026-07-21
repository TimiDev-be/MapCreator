export const BorderStylesRecord = {
  NONE: "none",
  SOLID: "solid",
  DASHED: "dashed",
  DOTTED: "dotted",
  DOUBLE: "double",
  GROVE: "groove",
  RIDGE: "ridge",
  INSET: "inset",
} as const;

export type BorderStyle = (typeof BorderStylesRecord)[keyof typeof BorderStylesRecord];
