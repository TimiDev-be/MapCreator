export const DPIRecord = {
  d72: 72,
  d96: 96,
  d100: 100,
  d200: 200,
  d300: 300,
  d400: 400,
  d500: 500,
  d600: 600,
  d700: 700,
  d800: 800,
  d900: 900,
  d1000: 1000,
} as const;

export type DPI = keyof typeof DPIRecord;

export interface MapPrintSettings {
  dpi: DPI;
  unit: "mm" | "cm" | "in" | "px";
  scale: number
}