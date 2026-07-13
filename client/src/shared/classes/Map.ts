import type { StateMap } from "../types/StateMap";
import type { Group } from "../types/Group";
import type { AttractionPoint } from "../types/AttractionPoint";
import type { AreaForPrint } from "../types/AreaForPrint";
import type { Feature } from "geojson";
import type { MapDescription } from "../types/MapDescription";
import { PrintFormatsRecord } from "../types/PrintFormats";
import type { MapPrintSettings } from "../types/MapPrintSettings";

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
  public printSettings: MapPrintSettings;
  public checked: boolean;

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.groups = [];
    this.features = [];
    this.description = { 
      templateId: "", 
      values: {}, 
      descriptionForMapMaker: "", 
      templatePrintSettings: {
        format: PrintFormatsRecord.A4,
        orientation: "portrait",
        margins: [0, 0, 0, 0],
        unit: "mm"
      } 
    };
    this.attractionPoint = undefined;
    this.areaForPrint = { width: 150, height: 95 };
    this.printSettings = {
      dpi: 96,
      unit: "mm",
      scale: 1.7,
    }
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.checked = false;
  }
}
