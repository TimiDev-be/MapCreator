import { useFeature } from "./Feature";
import { useMapContainer } from "./MapContainer";
import type { Feature } from "geojson";

export const useMarkerFeature = () => {
  const { feature } = useMapContainer();
  const { updateFeature } = useFeature();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, color: e.target.value },
    });
  };
  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, backgroundColor: e.target.value },
    });
  };
  const handleFontSizeChange = (e: React.MouseEvent<HTMLInputElement>) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, fontSize: e.currentTarget.value },
    });
  };
  const handlePaddingChange = (value: number[]) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, padding: value },
    });
  };
  const handleLabelChange = (value: string) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, label: value },
    });
  };
  const toggleLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFeature({
      ...feature,
      properties: {
        ...feature.properties,
        label: e.currentTarget.checked
          ? (feature.properties.label ?? "default label")
          : undefined,
      },
    });
  };
  const handleOpacityChange = (value: number) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, opacity: value },
    });
  };
  const handleDirectionSignChange = (value: string) => {
    if (
      feature.properties.markerSigns &&
      !feature.properties.markerSigns.includes(value)
    ) {
      updateFeature({
        ...feature,
        properties: {
          ...feature.properties,
          markerSigns: [...feature.properties.markerSigns, value],
        },
      });
    } else if (
      feature.properties.markerSigns &&
      feature.properties.markerSigns.includes(value)
    ) {
      updateFeature({
        ...feature,
        properties: {
          ...feature.properties,
          markerSigns: feature.properties.markerSigns.filter(
            (sign) => sign !== value,
          ),
        },
      });
    }
  };
  const handleMarkerIconClassChange = (value: string) => {
    updateFeature({
      ...feature,
      properties: {
        ...feature.properties,
        markerIconClass: value,
      },
    });
  };
  const handleRotateChange = (value: number) => {
    updateFeature({
      ...feature,
      properties: {
        ...feature.properties,
        rotate: value,
      },
    });
  };
  //coś nie działą
  const handleChangeCoords = (coords: number[], currentFeature: Feature) => {
    updateFeature({
      ...currentFeature,
      geometry: {
        type: "Point",
        coordinates: coords,
      },
    });
  };

  return {
    handleColorChange,
    handleBackgroundColorChange,
    handleFontSizeChange,
    handlePaddingChange,
    handleLabelChange,
    toggleLabel,
    handleOpacityChange,
    handleDirectionSignChange,
    handleMarkerIconClassChange,
    handleRotateChange,
    handleChangeCoords,
  };
};
