import { useCallback } from "react";
import type { LineProperties } from "../../../../../shared/types/LineProperties";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";

export default function LineSizesGroup() {
  const { getProperties, updateFeatureProperties, feature } = useFeaturePropertiesPanel();
  const properties = getProperties() as LineProperties | null;

  const handlePropertiesChange = useCallback(async (values: LineProperties) => {
    await updateFeatureProperties(values);
  }, [feature])

  return(
    <>
      <div className="group sizes">
        <div className="wrapper">
          <label htmlFor="range-width-input" className="t-panel-small">
            Width ({properties?.lineWidth ?? 0})
          </label>
          <input
            type="range"
            id="range-width-input"
            name="range-width"
            min="1"
            max="12"
            defaultValue={properties?.lineWidth ?? 1}
            onMouseUp={(e) => handlePropertiesChange({
              ...properties, 
              lineWidth: Number(e.currentTarget.value)
            } as LineProperties)}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="is-dashed-checkbox" className="t-panel-small">
            Dashed
          </label>
          <input
            type="checkbox"
            name="dashed"
            id="is-dashed-checkbox"
            className="panel-checkbox"
            checked={!!properties?.lineDash}
            onChange={(e) => handlePropertiesChange({
              ...properties, 
              lineDash: e.target.checked ? [3, 4] : undefined
            } as LineProperties)}
          />
        </div>
        {properties?.lineDash && (
          <div className="wrapper dash-gap">
            <div className="field-container dash">
              <label htmlFor="dash-input" className="t-panel-small">
                Dash
              </label>
              <input
                type="number"
                name="dash"
                id="dash-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={properties.lineDash[0] ?? 3}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  const lineDash = [
                    value,
                    properties.lineDash ? properties.lineDash[1] : 4
                  ]
                  handlePropertiesChange({...properties, lineDash} as LineProperties);
                }}
              />
            </div>
            <span className="field-bridge" />
            <div className="field-container gap">
              <label htmlFor="gap-input" className="t-panel-small">
                Gap
              </label>
              <input
                type="number"
                name="gap"
                id="gap-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={properties.lineDash[1] ?? 4}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  const lineDash = [
                    properties.lineDash ? properties.lineDash[0] : 3,
                    value,
                  ]
                  handlePropertiesChange({...properties, lineDash} as LineProperties);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}