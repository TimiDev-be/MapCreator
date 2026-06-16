import type { StateMap } from "../types/StateMap";
import type { Group } from "../types/Group";
import type { AttractionPoint } from "../types/AttractionPoint";
import type { AreaForPrint } from "../types/AreaForPrint";
import type { Feature } from "geojson";
import type { MapDescription } from "../types/MapDescription";

export class Map implements StateMap {
  public id: string;
  public name: string;
  public groups: Group[];
  public features: Feature[];
  public description: MapDescription;
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
    this.description = { templateId: "", values: {} };
    this.attractionPoint = undefined;
    this.areaForPrint = { width: 150, height: 95 };
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.checked = false;
  }
}
