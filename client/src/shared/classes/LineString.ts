import type { Feature } from "geojson";
import type { LineProperties } from "../types/LineProperties";

export class LineString implements Feature {
  public id: string;
  public type: "Feature";
  public geometry: {
    type: "LineString";
    coordinates: number[][];
  };
  public properties: LineProperties;

  public constructor(
    coordinates: number[][],
    zoom: number,
    mapId: string,
    groupId?: string,
    role?: string,
  ) {
    this.id = crypto.randomUUID();
    this.type = "Feature";
    this.geometry = {
      type: "LineString",
      coordinates,
    };
    this.properties = {
      name: "default line",
      mapId,
      groupId,
      role,
      visible: true,
      opacity: 1,
      minZoom: zoom - 3,
      maxZoom: zoom + 3,
      color: "#ff0000",
      lineWidth: 4,
    };
  }
}
