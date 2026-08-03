import { useMap } from "./useMap";
import { useOpenMapPage } from "./useOpenMapPage";
import type { AttractionPoint } from "../types/AttractionPoint";

export const useConnectDrawings = () => {
  const {setConnectedDrawings, maplibreMap} = useOpenMapPage();
  const {getMaps} = useMap();

  const toggleConnectedMap = async (id: string) => {
    const maps = await getMaps();
    if (!maps) return;

    setConnectedDrawings(prev => {
        const MapConnected = prev.find(m => m.id == id);
        if (!MapConnected) {
            const MapToConnect = maps.find(m => m.id == id);
            return MapToConnect ? [...prev, MapToConnect] : [...prev]; 
        }
        return [...prev].filter(f => f.id != id);
    })
  }

  // [min, max]; zoom
  const updateMinMaxZoom = (id: string, values: number[]) => {
    if (!maplibreMap.current) return;
    setConnectedDrawings(prev => [...prev].map(m => {
      if (m.id == id) {
        const NewFeatures = [...m.features].map(f => 
          ({
            ...f, 
            properties: {
              ...f.properties, minZoom: values[0] ?? 0, maxZoom: values[1] ?? 22
            }
          })
        );
        const NewAttractionPoint : AttractionPoint = {
          pitch: maplibreMap.current!.getPitch(),
          coords: maplibreMap.current!.getCenter().toArray(),
          bearing: maplibreMap.current!.getBearing(),
          zoom: maplibreMap.current!.getZoom(),
          minZoom: values[0] ?? 0,
          maxZoom: values[1] ?? 22
        }
        return {...m, attractionPoint: NewAttractionPoint, features: NewFeatures};
      }
      return m;
    }))
  }

  return { toggleConnectedMap, updateMinMaxZoom };
}