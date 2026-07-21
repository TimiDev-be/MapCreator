import type { FeatureProperties } from "./FeatureProperties.ts";
import type { BoxShadow } from "./Boxshadow.ts";
import type { Border } from "./Border.ts";

export interface MarkerProperties extends FeatureProperties {
  isPlainText: boolean;
  markerId: string;
  markerClass: string;
  markerSigns: string[];
  markerIconClass: string;
  label?: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
  boxShadow: BoxShadow;
  border: Border
  borderRadius: number[];
  padding: number[];
  rotate: number;
}
