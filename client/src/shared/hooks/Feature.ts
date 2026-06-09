import type { Feature } from "maplibre-gl";
import { useSource } from "./Source";

export const useFeature = () => {
  const { setCurrentSource, currentMap, currentGroup } = useSource();

  const newFeature = (feature: Feature) => {};
  const updateFeature = (feature: Feature) => {};
  const deleteFeature = (id: string) => {};

  return { newFeature, updateFeature, deleteFeature };
};
