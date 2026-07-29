import { useCallback } from "react";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";

export default function MarkerColorsGroup() {
  const { getProperties, updateFeatureProperties, feature } = useFeaturePropertiesPanel();
  const properties = getProperties() as MarkerProperties | null;

  const handlePropertiesChange = useCallback(async (values: MarkerProperties) => {
    await updateFeatureProperties(values);
  }, [feature]);

  return(
    <>
      <div className="group colors">
        <div className="wrapper content-color">
          <label htmlFor="feature-color-input" className="t-panel-small">
            Content Color
          </label>
          <input
            type="color"
            id="feature-color-input"
            name="feature-color"
            className="color-input"
            defaultValue={properties?.color ?? "#000000"}
            onBlur={(e) => handlePropertiesChange({...properties, color: e.target.value} as MarkerProperties)}
          />
        </div>
        <div className="wrapper background-color">
          <label
            htmlFor="feature-background-color-input"
            className="t-panel-small"
          >
            Background Color
          </label>
          <input
            type="color"
            id="feature-background-color-input"
            name="feature-background-color"
            className="color-input"
            defaultValue={properties?.backgroundColor ?? "#000000"}
            onBlur={(e) => handlePropertiesChange({...properties, backgroundColor: e.target.value} as MarkerProperties)}
          />
        </div>
        <div className="wrapper background-opacity">
          <label htmlFor="opacity-input" className="t-panel-small">
            Background Opacity
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
              handlePropertiesChange({
                ...properties,
                opacity: value
              } as MarkerProperties);
            }}
          />
        </div>
        <div className="wrapper rotate">
          <label htmlFor="rotate-input" className="t-panel-small">
            Rotate
          </label>
          <input
            type="number"
            id="rotate-input"
            name="rotate"
            className="panel-field t-panel-small"
            defaultValue={properties?.rotate ?? 0}
            onBlur={(e) => {
              const value = Number(e.currentTarget.value);
              handlePropertiesChange({
                ...properties,
                rotate: value,
              } as MarkerProperties)
            }}
          />
        </div>
      </div>
    </>
  )
}