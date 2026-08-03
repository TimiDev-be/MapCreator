import PaddingLeft from "../../../../../assets/boxicons_dock-left.svg?react";
import PaddingRight from "../../../../../assets/boxicons_dock-right.svg?react";
import PaddingTop from "../../../../../assets/boxicons_dock-top.svg?react";
import PaddingBottom from "../../../../../assets/boxicons_dock-bottom.svg?react";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";

export default function MarkerSizesGroup() {
  const { getProperties, updateFeatureProperties } = useFeaturePropertiesPanel();
  const properties = getProperties() as MarkerProperties | null;

  const handlePropertiesChange = async (values: MarkerProperties) => {
    await updateFeatureProperties(values);
  }

  const handlePaddingChange = async (padding: [number, number, number, number]) => {
    await handlePropertiesChange({...properties, padding} as MarkerProperties);
  }

  return(
    <>
      <div className="group sizes">
        <div className="wrapper">
          <label htmlFor="range-width-input" className="t-panel-small">
            Content Size ({properties?.fontSize ?? 16})
          </label>
          <input
            type="range"
            id="range-width-input"
            name="range-width"
            min="1"
            max="30"
            defaultValue={properties?.fontSize ?? 16}
            onMouseUp={(e) => handlePropertiesChange({...properties, fontSize: Number(e.currentTarget.value)} as MarkerProperties)}
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
              defaultValue={properties?.padding[3] ?? 1}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  properties?.padding[0] ?? 0,
                  properties?.padding[1] ?? 0,
                  properties?.padding[2] ?? 0,
                  value
                ])
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
              defaultValue={properties?.padding[1] ?? 1}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  properties?.padding[0] ?? 0,
                  value,
                  properties?.padding[2] ?? 0,
                  properties?.padding[3] ?? 0,
                ])
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
              defaultValue={properties?.padding[0] ?? 0.5}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  value,
                  properties?.padding[1] ?? 0,
                  properties?.padding[2] ?? 0,
                  properties?.padding[3] ?? 0,
                ])
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
              defaultValue={properties?.padding[2] ?? 0.5}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) value = 0;
                e.currentTarget.value = value.toString();
                handlePaddingChange([
                  properties?.padding[0] ?? 0,
                  properties?.padding[1] ?? 0,
                  value,
                  properties?.padding[3] ?? 0,
                ])
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}