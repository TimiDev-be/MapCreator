import { useCallback } from "react";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";
import type { PolygonProperties } from "../../../../../shared/types/PolygonProperties";

export default function PolygonColorsGroup() {
  const { getProperties, updateFeatureProperties, feature } = useFeaturePropertiesPanel();
  const properties = getProperties() as PolygonProperties | null;

  const handlePropertiesChange = useCallback(async (values: PolygonProperties) => {
    await updateFeatureProperties(values);
  }, [feature])

  return(
    <>
      <div className="group color">
        <div className="wrapper">
          <label htmlFor="feature-color-input" className="t-panel-small">
            Background Color
          </label>
          <input
            type="color"
            id="feature-color-input"
            name="feature-color"
            className="color-input"
            defaultValue={properties?.color ?? "#ff0000"}
            onBlur={(e) => handlePropertiesChange({...properties, color: e.target.value} as PolygonProperties)}
          />
        </div>
        <div className="wrapper">
          <label
            htmlFor="feature-border-color-input"
            className="t-panel-small"
          >
            Border Color
          </label>
          <input
            type="color"
            id="feature-border-color-input"
            name="feature-border-color"
            className="color-input"
            defaultValue={properties?.borderColor ?? "#ff0000"}
            onBlur={(e) => handlePropertiesChange({...properties, borderColor: e.target.value} as PolygonProperties)}
          />
        </div>
        <div className="wrapper background-opacity">
          <label htmlFor="opacity-input" className="t-panel-small">
            Fill Opacity
          </label>
          <input
            type="number"
            id="opacity-input"
            name="opacity"
            className="panel-field t-panel-small"
            defaultValue={properties?.opacity ?? 1}
            onBlur={(e) => {
              let value = Number(e.currentTarget.value);
              if (value <= 0) {
                e.currentTarget.value = "0";
                value = 0;
              }
              if (value > 1) {
                e.currentTarget.value = "1";
                value = 1;
              }
              handlePropertiesChange({...properties, opacity: value} as PolygonProperties)
            }}
          />
        </div>
      </div>
    </>
  )
}