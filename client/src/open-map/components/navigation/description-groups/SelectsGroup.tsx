import { useEffect, useState } from "react";
import CustomSelect from "../../../../shared/components/CustomSelect";
import { useTFormatSelect, type FormatsSelectValues } from "../../../../shared/new-hooks/templates-selects/useTFormatSelect";
import { useTNameSelect, type TemplatesSelectValues } from "../../../../shared/new-hooks/templates-selects/useTNameSelect";
import { useTOrientationSelect, type OrientationSelectValues } from "../../../../shared/new-hooks/templates-selects/useTOrientationSelect";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";
import LoadingScreen from "../../../../shared/components/LoadingScreen";

export default function SelectsGroup() {
  const {currentMap} = useOpenMapPage();
  const {getTemplatesSelectValues} = useTNameSelect();
  const {getFormatsSelectValues} = useTFormatSelect();
  const {getOrientationsSelectValues} = useTOrientationSelect();

  const [templateSelectValues, setTemplateSelectValues] = useState<TemplatesSelectValues | null>(null);
  const [formatSelectValues, setFormatSelectValues] = useState<FormatsSelectValues | null>(null);
  const [orientationSelectValues, setOrientationSelectValues] = useState<OrientationSelectValues | null>(null);

  const {TemplatesOptions, DefaultTemplateOption, selectTemplateOption} = templateSelectValues ?? {};
  const {FormatsOptions, DefaultFormatOption, selectFormatOption} = formatSelectValues ?? {};
  const {OrientationsOptions, DefaultOrientationOption, selectOrientationOption} = orientationSelectValues ?? {};

  useEffect(() => {
    const handleLoad = async () => {
      const [templates, formats, orientations] = await Promise.all([
        getTemplatesSelectValues(),
        getFormatsSelectValues(),
        getOrientationsSelectValues()
      ]);
      setTemplateSelectValues(templates);
      setFormatSelectValues(formats);
      setOrientationSelectValues(orientations);
    }
    handleLoad();
  }, [currentMap]);

  if (!templateSelectValues && !formatSelectValues && !orientationSelectValues)
    return <LoadingScreen/>

  return(
    <>
      {templateSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Template"
          defaultOption={DefaultTemplateOption!}
          options={TemplatesOptions!}
          selectOption={selectTemplateOption!}
        />
      )}
      {formatSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Format"
          defaultOption={DefaultFormatOption!}
          options={FormatsOptions!}
          selectOption={selectFormatOption!}
        />
      )}
      {orientationSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Orientation"
          defaultOption={DefaultOrientationOption!}
          options={OrientationsOptions!}
          selectOption={selectOrientationOption!}
        />
      )}
    </>
  )
}