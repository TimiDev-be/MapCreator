import "../../styles/_iconsList.scss";
import { MarkerIcons } from "./MarkerIcons";
import NullLogo from "../../../assets/mdi_null-off.svg?react";
import { useFeaturePropertiesPanel } from "../../../shared/new-hooks/useFeaturePropertiesPanel";
import type { MarkerProperties } from "../../../shared/types/MarkerProperties";
import { useCallback } from "react";

export default function IconsList() {
  const {getProperties, updateFeatureProperties, feature} = useFeaturePropertiesPanel();
  const properties = getProperties() as MarkerProperties | null;

  const handlePropertiesChange = useCallback(async (values: MarkerProperties) => {
    await updateFeatureProperties(values);
  }, [feature]);

  return (
    <>
      <div className="icons-list">
        {feature && Object.entries(MarkerIcons).map(([name, icon]) => {
          const Icon = icon ?? NullLogo;
          return (
            <button
              key={name}
              className={`icon-button ${properties?.markerIconClass === name ? "active" : ""}`}
              onClick={() => handlePropertiesChange({...properties, markerIconClass: name} as MarkerProperties)}
            >
              <Icon width={20} height={20} className={`icon ${name}`} />
            </button>
          );
        })}
      </div>
    </>
  );
}
