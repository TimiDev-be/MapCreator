import { useEffect, useState } from "react";
import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import type { LineProperties } from "../../../../../shared/types/LineProperties";
import { useLineFeature } from "../../../../../shared/hooks/LineFeature";

export default function LineSizesGroup() {
  const {feature} = useMapContainer();
  const {handleLineDashChange, handleWidthChange, toggleLineDash} = useLineFeature();
  const [stateLineDash, setStateLineDash] = useState<number[] | undefined>(undefined);
  const {lineWidth, lineDash} = feature?.properties ?? {} as LineProperties;

  useEffect(() => {
    const handleLineDash = () => setStateLineDash(lineDash);
    handleLineDash();
  }, [lineDash]);

  return(
    <>
      <div className="group sizes">
        <div className="wrapper">
          <label htmlFor="range-width-input" className="t-panel-small">
            Width ({lineWidth})
          </label>
          <input
            type="range"
            id="range-width-input"
            name="range-width"
            min="1"
            max="12"
            defaultValue={lineWidth}
            onMouseUp={handleWidthChange}
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
            checked={!!stateLineDash}
            onChange={(e) => {
              if (e.target.checked) {
                setStateLineDash([3, 4]);
              } else {
                setStateLineDash(undefined);
              }
              toggleLineDash(e);
            }}
          />
        </div>
        {lineDash && stateLineDash && (
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
                defaultValue={(lineDash && lineDash[0]) ?? 3}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  const LineDash: number[] = [value, stateLineDash[1]];
                  setStateLineDash(LineDash);
                  handleLineDashChange(LineDash);
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
                defaultValue={(lineDash && lineDash[1]) ?? 4}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  const LineDash: number[] = [stateLineDash[0], value];
                  setStateLineDash(LineDash);
                  handleLineDashChange(LineDash);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}