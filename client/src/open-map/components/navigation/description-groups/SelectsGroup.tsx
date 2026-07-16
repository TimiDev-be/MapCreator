import CustomSelect from "../../../../shared/components/CustomSelect";
import { useMapDescription } from "../../../../shared/hooks/MapDescription";

/**
 * There is no need to use units in that version of app becasue while creating pdf sizes are from
 * size of template pages.
 * Maybe in the future it will be usefull for some cases.
 */
export default function SelectsGroup() {
  const { 
    getTemplatesSelectValues, 
    getFormatsSelectValues,
    getOrientationsSelectValues,
    // getUnitSelectValues
  } = useMapDescription();

  const TemplateSelectValues = getTemplatesSelectValues();
  const FormatSelectValues = getFormatsSelectValues();
  const OrientationSelectValues = getOrientationsSelectValues();
  // const UnitSelectValues = getUnitSelectValues();

  const {TemplatesOptions, DefaultTemplateOption, selectTemplateOption} = TemplateSelectValues ?? {};
  const {FormatsOptions, DefaultFormatOption, selectFormatOption} = FormatSelectValues ?? {};
  const {OrientationsOptions, DefaultOrientationOption, selectOrientationOption} = OrientationSelectValues ?? {};
  // const {UnitsOptions, DefaultUnitOption, selectUnitOption} = UnitSelectValues ?? {};

  return(
    <>
      {TemplateSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Template"
          defaultOption={DefaultTemplateOption!}
          options={TemplatesOptions!}
          selectOption={selectTemplateOption!}
        />
      )}
      {FormatSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Format"
          defaultOption={DefaultFormatOption!}
          options={FormatsOptions!}
          selectOption={selectFormatOption!}
        />
      )}
      {OrientationSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Orientation"
          defaultOption={DefaultOrientationOption!}
          options={OrientationsOptions!}
          selectOption={selectOrientationOption!}
        />
      )}
      {/* {UnitSelectValues && (
        <CustomSelect
          type="default"
          selectName="Choose Unit"
          defaultOption={DefaultUnitOption!}
          options={UnitsOptions!}
          selectOption={selectUnitOption!}
        />
      )} */}
    </>
  )
}