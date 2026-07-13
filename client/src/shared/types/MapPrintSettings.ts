export interface MapPrintSettings {
  dpi: 72 | 96 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
  unit: "mm" | "cm" | "m";
  scale: number
}