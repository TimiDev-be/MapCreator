import type { Feature } from "geojson"
import { useMap } from "./useMap";
import { useOpenMapPage } from "./useOpenMapPage";
import type { Map } from "../types/Map";
import { useCallback } from "react";

export const useFeature = (feature: Feature | undefined = undefined) => {
  const {currentMap, setCurrentMap} = useOpenMapPage();
  const {updateMap} = useMap();

  const newFeature = async (feature : Feature) => {
    if (!currentMap) return;
    const NewMap : Map = {
      ...currentMap,
      features: [
        ...currentMap.features,
        feature
      ]
    }
    await updateMap(NewMap);
    setCurrentMap(NewMap);
  }

  const updateFeature = useCallback(async (oldFeature: Feature | undefined = undefined, featureToUpdate: Feature) => {
    if (!currentMap || (!feature && !oldFeature)) return;

    const OldFeature = feature ? feature : oldFeature; 
    const NewFeature : Feature = {
      ...OldFeature,
      ...featureToUpdate
    } 

    const NewFeatures : Feature[] = currentMap.features.map(f => {
      if (f.id == NewFeature.id)
        return {...f, ...NewFeature};
      else 
        return f;
    });

    await updateMap({
      ...currentMap,
      features: NewFeatures
    });
    setCurrentMap({
      ...currentMap,
      features: NewFeatures
    });
  }, [currentMap]);

  const deleteFeature = async (id: string | undefined = undefined) => {
    if (!currentMap || (!feature?.id && !id)) return;

    const FeatureToDeleteId = feature ? feature.id : id;
    const NewFeatures = [...currentMap.features].filter(f => f.id != FeatureToDeleteId);

    const NewMap : Map = {
      ...currentMap,
      features: NewFeatures
    }

    await updateMap(NewMap);
    setCurrentMap(NewMap);
  }

  return { newFeature, updateFeature, deleteFeature }
}