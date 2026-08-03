import { useCallback } from "react";
import type { CustomSelectOption } from "../../types/CustomSelectOption";
import type { DescriptionTemplate } from "../../types/DescriptionTemplate";
import { useMapDescription } from "../useMapDescription";
import { useOpenMapPage } from "../useOpenMapPage";
import { useTemplate } from "../useTemplate";

export type TemplatesSelectValues = {
  TemplatesOptions: CustomSelectOption[],
  DefaultTemplateOption: CustomSelectOption,
  selectTemplateOption: (option: CustomSelectOption) => void
}

export const useTNameSelect = () => {
  const {currentMap} = useOpenMapPage();
  const {getTemplates} = useTemplate();
  const {assignTemplate} = useMapDescription();

  const getTemplatesSelectValues = useCallback(async () : Promise<TemplatesSelectValues | null> => {
    if (!currentMap) return null;
    const {templateId} = currentMap.description ?? {};
    const templates : DescriptionTemplate[] = await getTemplates();

    const TemplatesOptions: CustomSelectOption[] = [
      ...templates.map((t) => ({ id: t.id, value: t.name })),
      { id: "none", value: "none" },
    ];

    const DefaultTemplateOption: CustomSelectOption = {
      id: templates.find(t => t.id == templateId)?.id ?? "none",
      value: templates.find(t => t.id == templateId)?.name ?? "none",
    };

    const selectTemplateOption = async (option: CustomSelectOption) => {
      await assignTemplate(option.id);
    };

    return {selectTemplateOption, DefaultTemplateOption, TemplatesOptions}
  }, [currentMap]);

  return { getTemplatesSelectValues }
}