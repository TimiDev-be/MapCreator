import { useCallback } from "react";
import { useFeature } from "./useFeature";
import { useOpenMapPage } from "./useOpenMapPage"
import type { LineProperties } from "../types/LineProperties";
import type { PolygonProperties } from "../types/PolygonProperties";
import type { MarkerProperties } from "../types/MarkerProperties";
import type { Feature } from "geojson";

type UpdateValues = LineProperties | PolygonProperties | MarkerProperties;

export const useFeaturePropertiesPanel = () => {
  const {feature, setFeature} = useOpenMapPage();
  const {updateFeature} = useFeature();

  const getProperties = useCallback(() : UpdateValues | null => {
    if (!feature) return null;
    return feature.properties as UpdateValues | null;
  }, [feature]);

  const updateFeatureProperties = useCallback(async (values: UpdateValues) => {
    if (!feature) return;
    
    const UpdatedFeature : Feature = {
      ...feature,
      properties: {
        ...feature.properties,
        ...values
      }
    }
    
    await updateFeature(feature, UpdatedFeature);
    setFeature(UpdatedFeature);
  }, [feature]);

  return {
    getProperties,
    updateFeatureProperties,
    feature,
    closePanel: () => setFeature(null)
  }
}