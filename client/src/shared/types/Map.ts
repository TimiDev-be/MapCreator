import type { Feature } from "geojson";
import type { Group } from "./Group";
import type { AttractionPoint } from "./AttractionPoint";
import type { AreaForPrint } from "./AreaForPrint";
import type { MapDescription } from "./MapDescription";
import type { MapPrintSettings } from "./MapPrintSettings";

export interface Map {
  id: string;
  name: string;
  groups: Group[];
  features: Feature[];
  description: MapDescription;
  attractionPoint?: AttractionPoint;
  areaForPrint: AreaForPrint;
  printSettings: MapPrintSettings;
  createdAt: string;
  updatedAt: string;
}