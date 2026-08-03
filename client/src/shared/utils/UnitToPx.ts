import { DPIRecord, type MapPrintSettings } from "../types/MapPrintSettings";

// basic value is in mm
export function UnitToPx(printSettings : MapPrintSettings, value: number) {
  const {dpi, unit, scale} = printSettings;
  const dpiValue = DPIRecord[dpi];
  let unitValue = value;
  
  switch(unit) {
    case "mm":
      unitValue = value;
      break;
    case "cm":
      unitValue = value * 10;
      break;
    case "in":
      unitValue = value * 25.4;
      break;
    case "px":
      unitValue = (value * 25.4) / dpiValue
      break;
  }

  return (dpiValue / 25.4) * unitValue * scale;
}