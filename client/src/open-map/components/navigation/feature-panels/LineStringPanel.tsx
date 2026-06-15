import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import { useLineFeature } from "../../../../shared/hooks/LineFeature";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import type { LineProperties } from "../../../../shared/types/LineProperties";
import { useState, useEffect } from "react";

export default function LineStringPanel() {
  const { feature, toggleFeaturePanel } = useMapContainer();
  const { name, color, lineWidth, lineDash } =
    feature.properties as LineProperties;
  const {
    handleColorChange,
    handleWidthChange,
    handleLineDashChange,
    toggleLineDash,
  } = useLineFeature();
  const [stateLineDash, setStateLineDash] = useState<number[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const handleLineDash = () => setStateLineDash(lineDash);
    handleLineDash();
  }, [lineDash]);

  return (
    <>
      <div className="feature-panel lineString" key={feature.id}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <p className="feature-name t-panel-medium">feature / {name}</p>
        <div className="group color">
          <div className="wrapper">
            <label htmlFor="feature-color-input" className="t-panel-small">
              Color
            </label>
            <input
              type="color"
              id="feature-color-input"
              name="feature-color"
              className="color-input"
              defaultValue={color}
              onBlur={handleColorChange}
            />
          </div>
        </div>
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
      </div>
    </>
  );
}
