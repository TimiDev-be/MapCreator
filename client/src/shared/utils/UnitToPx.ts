import type { MapPrintSettings } from "../types/MapPrintSettings";

// basic value is in mm
export function UnitToPx(printSettings : MapPrintSettings, value: number) {
  const {dpi, unit, scale} = printSettings;
  const unitMmValue = value * (unit == "mm" ? 1 : unit == "cm" ? 10 : 1000);
  return (dpi / 25.4) * unitMmValue * scale;
}