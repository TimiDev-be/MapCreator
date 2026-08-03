import type { DescriptionTemplate } from "../types/DescriptionTemplate";
import type { Map } from "../types/Map";
import type { MapDescription } from "../types/MapDescription";
import { PrintFormatsRecord } from "../types/PrintFormats";
import { useMap } from "./useMap";
import { useOpenMapPage } from "./useOpenMapPage"
import { useTemplate } from "./useTemplate";

export const useMapDescription = () => {
  const {currentMap, setCurrentMap} = useOpenMapPage();
  const {updateMap} = useMap();
  const {getTemplate} = useTemplate();

  const updateDescriptionValues = async (description : MapDescription) => {
    if (!currentMap) return;
    
    const NewMap : Map = {
      ...currentMap,
      description: {
        ...currentMap.description,
        ...description
      }
    }

    await updateMap(NewMap);
    setCurrentMap(NewMap);
  }
  
  const assignTemplate = async (id: string) => {
    if (!currentMap) return;

    const ExistingTemplate : DescriptionTemplate | null = id == "none" ? null : await getTemplate(id);
    if (currentMap.description.templateId === ExistingTemplate?.id) return;

    const NewDescription : MapDescription = {
      ...currentMap.description,
      templateId: ExistingTemplate ? ExistingTemplate.id : null,
      values: {},
      templatePrintSettings: {
        format: PrintFormatsRecord.A4,
        orientation: "portrait",
        margins: [0, 0, 0, 0],
        unit: "mm"
      }
    }

    await updateDescriptionValues(NewDescription);
  }

  return {
    updateDescriptionValues,
    assignTemplate
  }
}