import { useFeature } from "./Feature";
import { useMapContainer } from "./MapContainer";

export const useLineFeature = () => {
  const { feature } = useMapContainer();
  const { updateFeature } = useFeature();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFeature({
      ...feature,
      properties: { ...feature.properties, color: e.target.value },
    });
  };

  const handleWidthChange = (e: React.MouseEvent<HTMLInputElement>) => {
    updateFeature({
      ...feature,
      properties: {
        ...feature.properties,
        lineWidth: Number(e.currentTarget.value),
      },
    });
  };

  return {
    handleColorChange,
    handleWidthChange,
  };
};
