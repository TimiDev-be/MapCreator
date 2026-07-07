import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import { useMarkerFeature } from "../../../../../shared/hooks/MarkerFeature";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";

export default function MarkerContentGroup() {
  const {feature} = useMapContainer();
  const {toggleLabel, handleLabelChange} = useMarkerFeature();
  const {label} = feature?.properties ?? {} as MarkerProperties;

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
            defaultChecked={label ? true : false}
            onChange={toggleLabel}
          />
        </div>
        {label && (
          <div className="wrapper label">
            <label htmlFor="content-input" className="t-panel-small">
              Text Content
            </label>
            <textarea
              id="content-input"
              className="panel-field t-panel-small"
              defaultValue={label}
              onBlur={(e) => {
                const value = e.currentTarget.value;
                if (value.trim().length <= 0)
                  return (e.currentTarget.value = label);
                handleLabelChange(value);
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}