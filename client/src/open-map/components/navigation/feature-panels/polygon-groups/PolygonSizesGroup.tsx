import { useCallback } from "react";
import type { PolygonProperties } from "../../../../../shared/types/PolygonProperties";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";

export default function PolygonSizesGroup() {
  const { getProperties, updateFeatureProperties, feature } = useFeaturePropertiesPanel();
  const properties = getProperties() as PolygonProperties | null;

  const handlePropertiesChange = useCallback(async (values: PolygonProperties) => {
    await updateFeatureProperties(values);
  }, [feature]);

  return(
    <>
      <div className="group sizes">
        <div className="wrapper">
          <label htmlFor="range-width-input" className="t-panel-small">
            Width ({properties?.lineWidth ?? 1})
          </label>
          <input
            type="range"
            id="range-width-input"
            name="range-width"
            min="1"
            max="12"
            defaultValue={properties?.lineWidth ?? 1}
            onMouseUp={(e) => handlePropertiesChange({...properties, lineWidth: Number(e.currentTarget.value)} as PolygonProperties)}
          />
        </div>
      </div>
    </>
  )
}