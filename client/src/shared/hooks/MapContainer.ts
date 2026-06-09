import { useContext } from "react";
import { MAP_CONTAINER_CONTEXT } from "../../open-map/contexts/MapContainerContext";

export const useMapContainer = () => {
  const context = useContext(MAP_CONTAINER_CONTEXT);
  if (context === undefined) {
    throw new Error(
      "useMapContainer must be used within a MapContainerContext",
    );
  }
  return context;
};
