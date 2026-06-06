import type { Feature } from "maplibre-gl";
import type { Group } from "./Group";
import type { AttractionPoint } from "./AttractionPoint";

export interface Map {
  id: string;
  name: string;
  groups: Group[];
  features: Feature[];
  description: string;
  attractionPoint?: AttractionPoint;
  visible: boolean;
}
