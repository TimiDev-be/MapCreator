import type { Feature } from "geojson";
import type { Group } from "./Group";
import type { AttractionPoint } from "./AttractionPoint";
import type { AreaForPrint } from "./AreaForPrint";

export interface Map {
  id: string;
  name: string;
  groups: Group[];
  features: Feature[];
  description: string;
  attractionPoint?: AttractionPoint;
  areaForPrint: AreaForPrint;
  createdAt: string;
  updatedAt: string;
}
