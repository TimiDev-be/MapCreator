import type { Feature } from "geojson";
import type { Group } from "./Group";
import type { AttractionPoint } from "./AttractionPoint";
import type { AreaForPrint } from "./AreaForPrint";
import type { MapDescription } from "./MapDescription";

export interface Map {
  id: string;
  name: string;
  groups: Group[];
  features: Feature[];
  description: MapDescription;
  attractionPoint?: AttractionPoint;
  areaForPrint: AreaForPrint;
  createdAt: string;
  updatedAt: string;
}
