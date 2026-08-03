import type { FeatureProperties } from "./FeatureProperties";

export interface LineProperties extends FeatureProperties {
  color: string;
  lineWidth: number;
  lineDash?: [number, number];
}
