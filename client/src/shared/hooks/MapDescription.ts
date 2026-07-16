import { useMap } from "./Map";
import { useSource } from "./Source";
import type { MapDescription } from "../types/MapDescription";
import { PrintFormatsRecord } from "../types/PrintFormats";
import type { CustomSelectOption } from "../types/CustomSelectOption";

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

  type TemplatesSelectValues = {
    TemplatesOptions: CustomSelectOption[],
    DefaultTemplateOption: CustomSelectOption,
    selectTemplateOption: (option: CustomSelectOption) => void
  }

  const getTemplatesSelectValues = () : TemplatesSelectValues | null => {
    if (!currentSource || !currentMap) return null;
    const {templateId} = currentMap.description ?? {};

    const TemplatesOptions: CustomSelectOption[] = [
      ...currentSource.templates.map((t) => ({ id: t.id, value: t.name })),
      { id: "none", value: "none" },
    ];

    const DefaultTemplateOption: CustomSelectOption = {
      id: getTemplate(templateId ?? "")?.id ?? "none",
      value: getTemplate(templateId ?? "")?.name ?? "none",
    };

    const selectTemplateOption = (option: CustomSelectOption) => {
      assignTemplate(option.id);
    };

    return {selectTemplateOption, DefaultTemplateOption, TemplatesOptions}
  }

  type FormatsSelectValues = {
    FormatsOptions: CustomSelectOption[],
    DefaultFormatOption: CustomSelectOption,
    selectFormatOption: (option: CustomSelectOption) => void
  }

  const getFormatsSelectValues = () : FormatsSelectValues | null => {
    if (!currentMap 
      || !currentMap.description 
      || !currentMap.description.templatePrintSettings 
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

    const selectFormatOption = (option: CustomSelectOption) => {
      updateMap({
        ...currentMap,
        description: {
          ...description,
          templatePrintSettings: {
            ...templatePrintSettings,
            format: PrintFormatsRecord[option.value as keyof typeof PrintFormatsRecord]
          }
        }
      })
    }

    return {FormatsOptions, DefaultFormatOption, selectFormatOption};
  }

  type OrientationSelectValues = {
    OrientationsOptions: CustomSelectOption[],
    DefaultOrientationOption: CustomSelectOption,
    selectOrientationOption: (option: CustomSelectOption) => void
  }

  const getOrientationsSelectValues = () : OrientationSelectValues | null => {
    if (!currentMap 
      || !currentMap.description 
      || !currentMap.description.templatePrintSettings 
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

    const selectOrientationOption = (option: CustomSelectOption) => {
      updateMap({
        ...currentMap,
        description: {
          ...description,
          templatePrintSettings: {
            ...templatePrintSettings,
            orientation: option.value
          }
        }
      })
    }

    return {OrientationsOptions, DefaultOrientationOption, selectOrientationOption};
  }

  type UnitSelectValues = {
    UnitsOptions: CustomSelectOption[],
    DefaultUnitOption: CustomSelectOption,
    selectUnitOption: (option: CustomSelectOption) => void
  }

  const getUnitSelectValues = () : UnitSelectValues | null => {
    if (!currentMap 
      || !currentMap.description.templatePrintSettings 
      || currentMap.description.templateId == "") return null;

    const {description} = currentMap;
    const {templatePrintSettings} = description;

    const UnitsOptions : CustomSelectOption[] = [
      {id: crypto.randomUUID(), value: "px"},
      {id: crypto.randomUUID(), value: "mm"},
      {id: crypto.randomUUID(), value: "cm"},
      {id: crypto.randomUUID(), value: "in"},
    ]

    const DefaultUnitOption: CustomSelectOption = {
      id: UnitsOptions.find(u => u.value == templatePrintSettings.unit)?.id ?? crypto.randomUUID(),
      value: templatePrintSettings.unit ?? "mm"
    }

    const selectUnitOption = (option: CustomSelectOption) => {
      updateMap({
        ...currentMap,
        description: {
          ...description, 
          templatePrintSettings: {
            ...templatePrintSettings,
            unit: option.value
          }
        }
      })
    }

    return {UnitsOptions, DefaultUnitOption, selectUnitOption};
  }

  return {
    templates: (currentSource && currentSource.templates) ?? [],
    getTemplate,
    assignTemplate,
    getTemplatesSelectValues,
    getFormatsSelectValues,
    getOrientationsSelectValues,
    getUnitSelectValues
  };
};
