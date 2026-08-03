import { useCallback, useEffect, useState } from "react";
import type { AreaForPrint } from "../types/AreaForPrint";
import type { AttractionPoint } from "../types/AttractionPoint";
import type { Map } from "../types/Map";
import type { MapPrintSettings } from "../types/MapPrintSettings";
import { useMap } from "./useMap";
import { useOpenMapPage } from "./useOpenMapPage"
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsPanelProperties | null>(null);

  const updateSettings = useCallback(async (settings: SettingsPanelProperties, minMaxZoom: boolean = false) => {
    if (!currentMap) return;

    const UpdatedMap : Map = {
      ...currentMap,
      features: !minMaxZoom ? 
        [...currentMap.features] 
        : [...currentMap.features].map(f => ({
          ...f,
          properties: {
            ...f.properties,
            minZoom: settings.attractionPoint?.minZoom ?? 0,
            maxZoom: settings.attractionPoint?.maxZoom ?? 22
          }
        })), 
      ...settings,
    }
    
    await updateMap(UpdatedMap);
    setCurrentMap(UpdatedMap);
  }, [currentMap])

  useEffect(() => {
    if (currentMap && !currentMapLoading)
      setSettings(getSettings(currentMap));
  }, [currentMap, currentMapLoading])

  return {
    settings,
    updateSettings, 
    deleteMap: async () => {
      await deleteMap(currentMap?.id ?? "");
      navigate("/");
    }
  };
}