import type { StateMap } from "../types/StateMap";
import type { Group } from "../types/Group";
import type { AttractionPoint } from "../types/AttractionPoint";
import type { AreaForPrint } from "../types/AreaForPrint";
import type { Feature } from "geojson";

export class Map implements StateMap {
  public id: string;
  public name: string;
  public groups: Group[];
  public features: Feature[];
  public description: string;
  public attractionPoint?: AttractionPoint;
  public areaForPrint: AreaForPrint;
  public createdAt: string;
  public updatedAt: string;
  public checked: boolean;

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.groups = [];
    this.features = [];
    this.description = "<h>Data;Adres</h>>";
    this.attractionPoint = undefined;
    this.areaForPrint = { width: 150, height: 95 };
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.checked = false;
  }
}
