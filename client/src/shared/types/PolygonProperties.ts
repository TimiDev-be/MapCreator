import type { FeatureProperties } from "./FeatureProperties";

export interface PolygonProperties extends FeatureProperties {
  color: string;
  borderColor: string;
  lineWidth: number;
}
