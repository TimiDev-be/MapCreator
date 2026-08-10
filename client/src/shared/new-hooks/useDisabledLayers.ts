import { useCallback, useMemo } from "react";
import { useOpenMapPage } from "./useOpenMapPage"
import type { DisabledLayer } from "../types/DisabledLayer";
import { useSource } from "./useSource";
import type { Map } from "../types/Map";
import { useMap } from "./useMap";

export const useDisabledLayers = () => {
  const {currentStyle} = useSource();
  const {currentMap, setCurrentMap, maplibreMap, layers} = useOpenMapPage();
  const {updateMap} = useMap();

  const disabledLayerIds = useMemo(() => {
    if (!maplibreMap.current || !currentMap || !currentStyle) return new Set<string>();

    const allLayerIds = new Set(layers.map(l => l.id));

    const ids = currentMap.disabledLayers
      .filter(dl => dl.mapStyleId === currentStyle.id && allLayerIds.has(dl.layerId))
      .map(dl => dl.layerId);

    return new Set(ids);
  }, [currentMap?.disabledLayers, currentStyle, layers]); 

  const toggleDisabledLayer = useCallback((layerId : string, visibility: "none" | "visible") => {
    if (!maplibreMap.current) return;
    maplibreMap.current.setLayoutProperty(layerId, 'visibility', visibility);
  }, [currentMap?.disabledLayers, maplibreMap, layers, disabledLayerIds])

  const handleToggleDisabledLayer = useCallback(async (layerId: string) => {
    if (!currentMap || !maplibreMap.current || !currentStyle) return;
    if (layers.find(l => l.id == layerId) == null) return;

    let newDisabledLayers : DisabledLayer[] = [
      ...currentMap.disabledLayers
    ]
    let visibility = false;

    if (disabledLayerIds.has(layerId))  {
      const layerToRemove = newDisabledLayers.find(dl => dl.layerId == layerId && dl.mapStyleId == currentStyle.id);
      if (layerToRemove) {
        newDisabledLayers = newDisabledLayers.filter(dl => dl.id != layerToRemove.id);
        visibility = true;
      }
    }
    else {
      newDisabledLayers = [
        ...newDisabledLayers,
        {
          id: crypto.randomUUID(),
          layerId,
          mapStyleId: currentStyle.id
        }
      ]
    }
    
    const newMap : Map = {
      ...currentMap,
      disabledLayers: newDisabledLayers
    }

    await updateMap(newMap);
    setCurrentMap(newMap);
    toggleDisabledLayer(layerId, visibility ? "visible" : "none");
  }, [currentMap?.disabledLayers, maplibreMap, layers]);

  return {
    layers,
    disabledLayerIds,
    toggleDisabledLayer,
    handleToggleDisabledLayer
  }
}