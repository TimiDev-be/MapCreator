import { useCallback } from "react";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";



export default function MarkerContentGroup() {
  const {getProperties, updateFeatureProperties, feature} = useFeaturePropertiesPanel();
  const properties = getProperties() as MarkerProperties | null;

  const handlePropertiesChange = useCallback(async (values: MarkerProperties) => {
    await updateFeatureProperties(values);
  }, [feature])

  return(
    <>
      <div className="group content">
        <div className="wrapper">
          <label htmlFor="is-label-checkbox" className="t-panel-small">
            Label
          </label>
          <input
            type="checkbox"
            name="label"
            id="is-label-checkbox"
            className="panel-checkbox"
            defaultChecked={properties?.label ? true : false}
            onChange={(e) => {
              let label : string | undefined = undefined;
              if (e.currentTarget.checked)
                label = properties?.label ?? "default label";
              handlePropertiesChange({...properties, label} as MarkerProperties)
            }}
          />
        </div>
        {properties?.label && (
          <div className="wrapper label">
            <label htmlFor="content-input" className="t-panel-small">
              Text Content
            </label>
            <textarea
              id="content-input"
              className="panel-field t-panel-small"
              defaultValue={properties.label}
              onBlur={(e) => {
                const value = e.currentTarget.value;
                if (value.trim().length <= 0)
                  return (e.currentTarget.value = properties.label ?? "default label");
                handlePropertiesChange({...properties, label: value})
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}