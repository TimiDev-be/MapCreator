import type { GeoJsonGeometryTypes } from "geojson";

export const FeatureTypeArray: { type: GeoJsonGeometryTypes }[] = [
  { type: "Point" },
  { type: "LineString" },
  { type: "Polygon" },
] as const;
