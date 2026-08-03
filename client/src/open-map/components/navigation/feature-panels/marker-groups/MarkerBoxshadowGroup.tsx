import { useCallback, useState } from "react";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";
import { useFeaturePropertiesPanel } from "../../../../../shared/new-hooks/useFeaturePropertiesPanel";

type Values = {
  x: number,
  y: number,
  blur: number,
  color: string,
  colorOpacity: number
}

export default function MarkerBoxshadowGroup() {
  const { getProperties, updateFeatureProperties, feature } = useFeaturePropertiesPanel();
  const {boxShadow} = getProperties() as MarkerProperties ?? {};

  const [boxShadowValues, setBoxShadowValues] = useState<Values>({
    x: boxShadow[0] ?? 0, 
    y: boxShadow[1] ?? 0, 
    blur: boxShadow[2] ?? 0, 
    color: boxShadow[3] ?? "#000000",
    colorOpacity: boxShadow[4] ?? 1
  });

  const handlePropertiesChange = useCallback(async (values: Values) => {
    const {x, y, blur, color, colorOpacity} = values;
    const newProps : MarkerProperties = {
      ...getProperties(),
      boxShadow: [x, y, blur, color, colorOpacity]
    } as MarkerProperties;
    await updateFeatureProperties(newProps);
    setBoxShadowValues(prev => ({...prev, ...values}));
  }, [feature]);

  return(
    <>
      <div className="linked-input-container box-shadow">
        <p className="about box-shadow t-panel-small">Box shadow (em)</p>
        <div className="linked-wrapper without-bridge">
          <div className="linked-group horizontal">
            <label htmlFor="horizontal-input" className="t-panel-small">x</label>
            <input 
              type="number"
              name="horizontal"
              id="horizontal-input"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.x}
              onBlur={(e) => {
                if (e.target.value.trim() == "") 
                  return e.target.value = boxShadowValues.x.toString();
                handlePropertiesChange({...boxShadowValues, x: Number(e.target.value)});
              }}
            />
          </div>
          <div className="linked-group vertical">
            <label htmlFor="vertical-input" className="t-panel-small">y</label>
            <input 
              type="number"
              name="vertical"
              id="vertical-input"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.y}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = boxShadowValues.y.toString();
                handlePropertiesChange({...boxShadowValues, y: Number(e.target.value)});
              }}
            />
          </div>
        </div>
        <div className="linked-wrapper without-bridge">
          <div className="linked-group blur">
            <label htmlFor="blur-input" className="t-panel-small">blur</label>
            <input 
              type="number"
              name="blur"
              id="blur-input"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.blur}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = boxShadowValues.blur.toString();
                handlePropertiesChange({...boxShadowValues, blur: Number(e.target.value)});
              }}
            />
          </div>
        </div>
        <div className="group">
          <div className="linked-wrapper without-bridge">
            <label htmlFor="feature-color-input" className="t-panel-small">
              Color 
            </label>
            <input
              type="color"
              id="feature-color-input"
              name="feature-color"
              className="color-input"
              defaultValue={boxShadowValues.color}
              onBlur={(e) => {
                handlePropertiesChange({...boxShadowValues, color: e.target.value});
              }}
            />
          </div>
          <div className="linked-wrapper without-bridge">
            <label htmlFor="feature-opacity-input" className="t-panel-small">
              Opacity
            </label>
            <input
              type="number"
              id="feature-opacity-input"
              name="feature-opacity"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.colorOpacity}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = boxShadowValues.colorOpacity.toString();
                handlePropertiesChange({...boxShadowValues, colorOpacity: Number(e.target.value)});
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}