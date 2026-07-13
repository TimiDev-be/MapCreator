import { useMap } from "./Map";
import { useSource } from "./Source";
import type { MapDescription } from "../types/MapDescription";
import { PrintFormatsRecord } from "../types/PrintFormats";

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
          templatePrintSettings: {
            format: PrintFormatsRecord.A4,
            orientation: "portrait",
            margins: [0, 0, 0, 0],
            unit: "mm"
          }
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
        templatePrintSettings: {
          format: PrintFormatsRecord.A4,
          orientation: "portrait",
          margins: [0, 0, 0, 0],
          unit: "mm"
        }
      },
    });
  };

  return {
    templates: (currentSource && currentSource.templates) ?? [],
    getTemplate,
    assignTemplate
  };
};
