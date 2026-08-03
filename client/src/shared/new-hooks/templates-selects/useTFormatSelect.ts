import { useCallback } from "react";
import type { CustomSelectOption } from "../../types/CustomSelectOption";
import type { MapDescription } from "../../types/MapDescription";
import { PrintFormatsRecord } from "../../types/PrintFormats";
import { useMapDescription } from "../useMapDescription";
import { useOpenMapPage } from "../useOpenMapPage";

export type FormatsSelectValues = {
  FormatsOptions: CustomSelectOption[],
  DefaultFormatOption: CustomSelectOption,
  selectFormatOption: (option: CustomSelectOption) => void
}

export const useTFormatSelect = () => {
  const {currentMap} = useOpenMapPage();
  const {updateDescriptionValues} = useMapDescription();

  const getFormatsSelectValues = useCallback(async () : Promise<FormatsSelectValues | null> => {
    if (!currentMap 
      || !currentMap.description 
      || !currentMap.description.templatePrintSettings 
      || currentMap.description.templateId == null
    || currentMap.description.templateId == "") return null;

    const {description} = currentMap;
    const {templatePrintSettings} = description;
    
    const FormatsOptions : CustomSelectOption[] = [
      ...Object.keys(PrintFormatsRecord).map(key => ({id: crypto.randomUUID(), value: key}))
    ];

    const keyOfSelectedFormat = Object.keys(PrintFormatsRecord).find(
      key => PrintFormatsRecord[key as keyof typeof PrintFormatsRecord][0] === templatePrintSettings.format[0] &&
            PrintFormatsRecord[key as keyof typeof PrintFormatsRecord][1] === templatePrintSettings.format[1]
    );

    const DefaultFormatOption : CustomSelectOption = {
      id: FormatsOptions.find(
        f => f.value == PrintFormatsRecord[keyOfSelectedFormat as keyof typeof PrintFormatsRecord]
      )?.id ?? crypto.randomUUID(),
      value: keyOfSelectedFormat ?? "A4"
    };

    const selectFormatOption = async (option: CustomSelectOption) => {
      const NewDescription : MapDescription = {
        ...description,
        templatePrintSettings: {
          ...templatePrintSettings,
          format: PrintFormatsRecord[option.value as keyof typeof PrintFormatsRecord]
        }
      }
      await updateDescriptionValues(NewDescription);
    }

    return {FormatsOptions, DefaultFormatOption, selectFormatOption};
  }, [currentMap])

  return { getFormatsSelectValues }
}