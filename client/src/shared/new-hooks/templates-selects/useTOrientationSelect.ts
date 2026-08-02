import { useCallback } from "react";
import type { CustomSelectOption } from "../../types/CustomSelectOption";
import type { MapDescription } from "../../types/MapDescription";
import { useMapDescription } from "../useMapDescription";
import { useOpenMapPage } from "../useOpenMapPage";

export type OrientationSelectValues = {
  OrientationsOptions: CustomSelectOption[],
  DefaultOrientationOption: CustomSelectOption,
  selectOrientationOption: (option: CustomSelectOption) => void
}

export const useTOrientationSelect = () => {
  const {currentMap} = useOpenMapPage();
  const {updateDescriptionValues} = useMapDescription();

  const getOrientationsSelectValues = useCallback(() : OrientationSelectValues | null => {
    if (!currentMap 
      || !currentMap.description 
      || !currentMap.description.templatePrintSettings 
      || currentMap.description.templateId == null 
      || currentMap.description.templateId == "") return null;

    const {description} = currentMap;
    const {templatePrintSettings} = description;

    const OrientationsOptions: CustomSelectOption[] = [
      {id: crypto.randomUUID(), value: "portrait"},
      {id: crypto.randomUUID(), value: "landscape"},
    ]

    const DefaultOrientationOption: CustomSelectOption = {
      id: OrientationsOptions.find(o => o.value == templatePrintSettings.orientation)?.id ?? crypto.randomUUID(),
      value: templatePrintSettings.orientation ?? "portrait"
    }

    const selectOrientationOption = async (option: CustomSelectOption) => {
      const NewDescription : MapDescription = {
        ...description,
        templatePrintSettings: {
          ...templatePrintSettings,
          orientation: option.value
        }
      }
      await updateDescriptionValues(NewDescription);
    }

    return {OrientationsOptions, DefaultOrientationOption, selectOrientationOption};
  }, [currentMap]);

  return { getOrientationsSelectValues }
}