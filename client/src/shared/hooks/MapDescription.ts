import { useMap } from "./Map";
import { useSource } from "./Source";
import type { MapDescription } from "../types/MapDescription";

export const useMapDescription = () => {
  const { currentSource } = useSource();
  const { currentMap, updateMap } = useMap();

  const getTemplate = (id: string) => {
    return (currentSource && currentSource.templates)?.find((t) => t.id === id);
  };
  const assignTemplate = (id: string) => {
    if (!currentMap) return;

    const ExistingTemplate = getTemplate(id);
    const { descriptionForMapMaker } = currentMap.description;

    if (!ExistingTemplate)
      return updateMap({
        ...currentMap,
        description: {
          templateId: "",
          values: {},
          qrCodeUrl: undefined,
          descriptionForMapMaker: descriptionForMapMaker ?? "",
        } as MapDescription,
      });
    if (currentMap.description.templateId === id) return;
    return updateMap({
      ...currentMap,
      description: {
        values: {},
        templateId: id,
        qrCodeUrl: undefined,
        descriptionForMapMaker: descriptionForMapMaker ?? "",
      },
    });
  };
  const updateMapDescription = (description: string) => {
    if (!currentMap) return;
    return updateMap({
      ...currentMap,
      description: {
        ...currentMap.description,
        descriptionForMapMaker: description,
      },
    });
  };

  return {
    templates: (currentSource && currentSource.templates) ?? [],
    getTemplate,
    assignTemplate,
    updateMapDescription,
  };
};
