import type { Feature } from "geojson";
import type { MarkerProperties } from "../types/MarkerProperties";
import { BorderStylesRecord } from "../types/BorderStyle";

export class Marker implements Feature {
  public id: string;
  public type: "Feature";
  public geometry: {
    type: "Point";
    coordinates: number[];
  };
  public properties: MarkerProperties;

  public constructor(
    coordinates: number[],
    mapId: string,
    zoom: number,
    groupId?: string,
    role?: string,
  ) {
    this.id = crypto.randomUUID();
    this.type = "Feature";
    this.geometry = {
      type: "Point",
      coordinates,
    };
    this.properties = {
      name: "default marker",
      markerId: crypto.randomUUID(),
      markerClass: "default",
      markerSigns: ["bottom"],
      markerIconClass: "default",
      mapId,
      groupId,
      role,
      opacity: 1,
      visible: true,
      isPlainText: false,
      label: "default label",
      fontSize: 16,
      padding: [0.5, 1, 0.5, 1],
      border: [0, 0, 0, 0, BorderStylesRecord.SOLID, "#000000", 1],
      borderRadius: [0, 0, 0, 0],
      rotate: 0,
      color: "#000000",
      backgroundColor: "#ffffff",
      boxShadow: [0, 0, 0, "#000000", 1],
      minZoom: zoom - 3,
      maxZoom: zoom + 3,
    };
  }
}
