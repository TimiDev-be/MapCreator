import type { TemplatePrintSettings } from "./TemplatePrintSettings";

export interface MapDescription {
  templateId: string;
  values: Record<string, string>;
  qrCodeUrl?: string;
  descriptionForMapMaker: string;
  templatePrintSettings: TemplatePrintSettings;
}
