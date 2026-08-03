import { useCallback } from "react";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";
import type { LineProperties } from "../../../../../shared/types/LineProperties";

export default function LineColorsGroup() {
  const { getProperties, updateFeatureProperties, feature } = useFeaturePropertiesPanel();
  const properties = getProperties() as LineProperties | null;

  const handlePropertiesChange = useCallback(async (values: LineProperties) => {
    await updateFeatureProperties(values);
  }, [feature])

  return(
    <>
      <div className="group color">
        <div className="wrapper">
          <label htmlFor="feature-color-input" className="t-panel-small">
            Line Color
          </label>
          <input
            type="color"
            id="feature-color-input"
            name="feature-color"
            className="color-input"
            defaultValue={properties?.color ?? "#000000"}
            onBlur={(e) => handlePropertiesChange({...properties ?? undefined, color: e.target.value} as LineProperties)}
          />
        </div>
      </div>
    </>
  )
}