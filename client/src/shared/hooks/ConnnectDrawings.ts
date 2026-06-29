import type { AttractionPoint } from "../types/AttractionPoint";
import { useMapContainer } from "./MapContainer"
import { useMaps } from "./Maps";

export const useConnectDrawings = () => {
    const {maps} = useMaps();
    const {setConnectedMaps, map} = useMapContainer();

    const toggleConnectedMap = (id: string) => {
        setConnectedMaps(prev => {
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
      if (!map.current) return;
      setConnectedMaps(prev => [...prev].map(m => {
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
            pitch: map.current!.getPitch(),
            coords: map.current!.getCenter().toArray(),
            bearing: map.current!.getBearing(),
            zoom: map.current!.getZoom(),
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