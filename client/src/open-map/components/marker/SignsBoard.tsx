import "../../styles/_signsBoard.scss";
import NextLogo from "../../../assets/ooui_next-ltr.svg?react";
import type { MarkerProperties } from "../../../shared/types/MarkerProperties";
import { useFeaturePropertiesPanel } from "../../../shared/new-hooks/useFeaturePropertiesPanel";
import { useCallback } from "react";

export default function SignsBoard() {
  const {getProperties, updateFeatureProperties, feature} = useFeaturePropertiesPanel();
  const properties = getProperties() as MarkerProperties | null;

  const handlePropertiesChange = useCallback(async (value: "top" | "right" | "bottom" | "left") => {
    if (!properties) return;
    const {markerSigns} = properties;
    let values = [...markerSigns];

    if (markerSigns.includes(value))
      values = values.filter(ms => ms != value);
    else
      values = [...values, value];

    const newProperties : MarkerProperties = {
      ...getProperties() as MarkerProperties,
      markerSigns: values
    }
    await updateFeatureProperties(newProperties);
  }, [feature])

  return (
    <>
      <div className="signs-board">
        <span
          className={`left ${properties?.markerSigns.includes("left") ? "active" : ""}`}
          onClick={() => handlePropertiesChange("left")}
        >
          <NextLogo width={16} height={16} />
        </span>
        <span
          className={`top ${properties?.markerSigns.includes("top") ? "active" : ""}`}
          onClick={() => handlePropertiesChange("top")}
        >
          <NextLogo width={16} height={16} />
        </span>
        <span
          className={`right ${properties?.markerSigns.includes("right") ? "active" : ""}`}
          onClick={() => handlePropertiesChange("right")}
        >
          <NextLogo width={16} height={16} />
        </span>
        <span
          className={`bottom ${properties?.markerSigns.includes("bottom") ? "active" : ""}`}
          onClick={() => handlePropertiesChange("bottom")}
        >
          <NextLogo width={16} height={16} />
        </span>
      </div>
    </>
  );
}
