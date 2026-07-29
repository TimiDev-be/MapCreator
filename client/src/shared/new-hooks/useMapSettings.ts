import { useEffect, useState } from "react";
import type { AreaForPrint } from "../types/AreaForPrint";
import type { AttractionPoint } from "../types/AttractionPoint";
import type { Map } from "../types/Map";
import type { MapPrintSettings } from "../types/MapPrintSettings";
import { useMap } from "./useMap";
import { useOpenMapPage } from "./useOpenMapPage"

export type SettingsPanelProperties = {
  name: string;
  attractionPoint?: AttractionPoint;
  areaForPrint: AreaForPrint;
  printSettings: MapPrintSettings;
}

const getSettings = (map: Map) : SettingsPanelProperties => {
  const {name, attractionPoint, areaForPrint, printSettings} = map;
  return {name, attractionPoint, areaForPrint, printSettings};
}

export const useMapSettings = () => {
  const {currentMap, currentMapLoading, setCurrentMap} = useOpenMapPage();
  const {updateMap, deleteMap} = useMap();
  const [settings, setSettings] = useState<SettingsPanelProperties | null>(null);

  const updateSettings = async (settings: SettingsPanelProperties) => {
    if (!currentMap) return;

    const UpdatedMap : Map = {
      ...currentMap,
      ...settings,
    }
    
    await updateMap(UpdatedMap);
    setCurrentMap(UpdatedMap);
  }

  useEffect(() => {
    if (currentMap && !currentMapLoading)
      setSettings(getSettings(currentMap));
  }, [currentMap, currentMapLoading])

  return {
    settings,
    updateSettings, 
    deleteMap: () => deleteMap(currentMap?.id ?? "")
  };
}