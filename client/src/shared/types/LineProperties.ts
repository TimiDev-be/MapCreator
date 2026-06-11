import type { FeatureProperties } from "./FeatureProperties";

export interface LineProperties extends FeatureProperties {
  color: string;
  borderColor: string;
  opacity: number;
  lineWidth: number;
  lineDash: number[];
}
