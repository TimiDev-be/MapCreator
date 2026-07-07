import type { Feature } from "geojson";
import type { StateMap } from "../types/StateMap";
import { useMap } from "./Map";
import { useGroup } from "./Group";

export const useFeature = () => {
  const { currentMap, updateMap } = useMap();
  const { currentGroup } = useGroup();

  const newFeature = (feature: Feature) => {
    if (!currentMap) return;
    const newFeature: Feature = {
      ...feature,
      properties: {
        ...feature.properties,
        groupId: currentGroup?.id ?? undefined,
      },
    };

    const UpdatedMap: StateMap = {
      ...currentMap,
      features: [...currentMap.features, newFeature],
    };
    updateMap(UpdatedMap);
  };
  const updateFeature = (feature: Feature) => {
    if (!currentMap) return;
    const UpdatedMap: StateMap = {
      ...currentMap,
      features: currentMap.features.map((f) =>
        f.id === feature.id ? feature : f,
      ),
    };
    updateMap(UpdatedMap);
  };
  const deleteFeature = (id: string) => {
    if (!currentMap) return;
    const UpdatedMap: StateMap = {
      ...currentMap,
      features: currentMap.features.filter((f) => f.id !== id),
    };
    updateMap(UpdatedMap);
  };

  return { newFeature, updateFeature, deleteFeature };
};
