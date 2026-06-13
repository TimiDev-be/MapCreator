import type { Feature } from "geojson";
import type { PolygonProperties } from "../types/PolygonProperties";

export class Polygon implements Feature {
  public id: string;
  public type: "Feature";
  public geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  public properties: PolygonProperties;

  public constructor(
    coordinates: number[][][],
    mapId: string,
    zoom: number,
    groupId?: string,
    role?: string,
  ) {
    this.id = crypto.randomUUID();
    this.type = "Feature";
    this.geometry = {
      type: "Polygon",
      coordinates,
    };
    this.properties = {
      name: "default polygon",
      mapId,
      groupId,
      role,
      opacity: 0.3,
      visible: true,
      color: "#ff0000",
      borderColor: "#ff0000",
      lineWidth: 4,
      minZoom: zoom - 3,
      maxZoom: zoom + 3,
    };
  }
}
