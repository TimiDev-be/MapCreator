import PaddingLeft from "../../../../../assets/boxicons_dock-left.svg?react";
import PaddingRight from "../../../../../assets/boxicons_dock-right.svg?react";
import PaddingTop from "../../../../../assets/boxicons_dock-top.svg?react";
import PaddingBottom from "../../../../../assets/boxicons_dock-bottom.svg?react";
import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";
import { useMarkerFeature } from "../../../../../shared/hooks/MarkerFeature";

export default function MarkerSizesGroup() {
  const {feature} = useMapContainer();
  const {handleFontSizeChange, handlePaddingChange} = useMarkerFeature();
  const {fontSize, padding} = feature?.properties ?? {} as MarkerProperties;

  return(
    <>
      <div className="group sizes">
        <div className="wrapper">
          <label htmlFor="range-width-input" className="t-panel-small">
            Content Size ({fontSize})
          </label>
          <input
            type="range"
            id="range-width-input"
            name="range-width"
            min="1"
            max="30"
            defaultValue={fontSize}
            onMouseUp={handleFontSizeChange}
          />
        </div>
        <p className="t-panel-small">Padding (em)</p>
        <div className="wrapper padding-left-right">
          <div className="field-container padding-left">
            <label
              htmlFor="padding-left-input"
              className="panel-label t-panel-small"
            >
              <PaddingLeft width={16} height={16} />
            </label>
            <input
              type="number"
              name="padding-left"
              id="padding-left-input"
              className="panel-field t-panel-small"
              min={0}
              defaultValue={padding[3]}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  padding[0],
                  padding[1],
                  padding[2],
                  value,
                ]);
              }}
            />
          </div>
          <span className="field-bridge" />
          <div className="field-container padding-right">
            <label
              htmlFor="padding-right-input"
              className="panel-label t-panel-small"
            >
              <PaddingRight width={16} height={16} />
            </label>
            <input
              type="number"
              name="padding-right"
              id="padding-right-input"
              className="panel-field t-panel-small"
              min={0}
              defaultValue={padding[1]}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  padding[0],
                  value,
                  padding[2],
                  padding[3],
                ]);
              }}
            />
          </div>
        </div>
        <div className="wrapper padding-top-bottom">
          <div className="field-container padding-top">
            <label
              htmlFor="padding-top-input"
              className="panel-label t-panel-small"
            >
              <PaddingTop width={16} height={16} />
            </label>
            <input
              type="number"
              name="padding-top"
              id="padding-top-input"
              className="panel-field t-panel-small"
              min={0}
              defaultValue={padding[0]}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  value,
                  padding[1],
                  padding[2],
                  padding[3],
                ]);
              }}
            />
          </div>
          <span className="field-bridge" />
          <div className="field-container padding-bottom">
            <label
              htmlFor="padding-bottom-input"
              className="panel-label t-panel-small"
            >
              <PaddingBottom width={16} height={16} />
            </label>
            <input
              type="number"
              name="padding-bottom"
              id="padding-bottom-input"
              className="panel-field t-panel-small"
              min={0}
              defaultValue={padding[2]}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  padding[0],
                  padding[1],
                  value,
                  padding[3],
                ]);
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}