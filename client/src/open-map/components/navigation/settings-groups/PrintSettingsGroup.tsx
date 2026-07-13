import CustomSelect from "../../../../shared/components/CustomSelect";
import { useMap } from "../../../../shared/hooks/Map";
import { useMapSettings } from "../../../../shared/hooks/MapSettings";
import type { CustomSelectOption } from "../../../../shared/types/CustomSelectOption";
import type { MapPrintSettings } from "../../../../shared/types/MapPrintSettings";

const DPI : CustomSelectOption[] = [
  {id: crypto.randomUUID(), value: "72"},
  {id: crypto.randomUUID(), value: "96"},
  {id: crypto.randomUUID(), value: "100"},
  {id: crypto.randomUUID(), value: "200"},
  {id: crypto.randomUUID(), value: "300"},
  {id: crypto.randomUUID(), value: "400"},
  {id: crypto.randomUUID(), value: "500"},
  {id: crypto.randomUUID(), value: "600"},
  {id: crypto.randomUUID(), value: "700"},
  {id: crypto.randomUUID(), value: "800"},
  {id: crypto.randomUUID(), value: "900"},
  {id: crypto.randomUUID(), value: "1000"},
]

const UNITS : CustomSelectOption[] = [
  {id: crypto.randomUUID(), value: "mm"},
  {id: crypto.randomUUID(), value: "cm"},
  {id: crypto.randomUUID(), value: "m"},
]

export default function PrintSettingGroup() {
  const {currentMap} = useMap();
  const {handlePrintSettingsChange} = useMapSettings();
  if (!currentMap) return null;

  const {printSettings} = currentMap;

  const handleSelectDpiOption = (option: CustomSelectOption) => {
    handlePrintSettingsChange({
      ...printSettings,
      dpi: Number(option.value) as MapPrintSettings['dpi'] ?? 96
    })
  }

  const handleSelectUnitOption = (option: CustomSelectOption) => {
    handlePrintSettingsChange({
      ...printSettings,
      unit: option.value as MapPrintSettings['unit'] ?? "mm"
    })
  }

  return(
    <>
      <div className="group print-settings">
        <p className="about print-settings t-panel-medium">
          Print Settings (for map)
        </p>
        <CustomSelect 
          type={"field"} 
          selectName={"DPI"} 
          defaultOption={DPI.find(d => d.value == printSettings.dpi) ?? DPI[1]} 
          options={DPI} 
          selectOption={handleSelectDpiOption}/>
        <CustomSelect 
          type={"field"} 
          selectName={"UNIT"} 
          defaultOption={UNITS.find(u => u.value == printSettings.unit) ?? UNITS[0]} 
          options={UNITS} 
          selectOption={handleSelectUnitOption}/>
      </div>
    </>
  )
}