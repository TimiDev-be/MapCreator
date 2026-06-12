import type { FeatureProperties } from "./FeatureProperties.ts";

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
  borderRadius: number[];
  padding: number[];
  rotate: number;
}
