import type { PrintFormats } from "./PrintFormats";

export interface TemplatePrintSettings {
  format: PrintFormats,
  orientation: "portrait" | "landscape",
  margins: number[],
  unit: "px" | "mm" | "cm" | "in"
}