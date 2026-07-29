import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import type { PolygonProperties } from "../../../../shared/types/PolygonProperties";
import PolygonColorsGroup from "./polygon-groups/PolygonColorsGroup";
import PolygonSizesGroup from "./polygon-groups/PolygonSizesGroup";
import FeaturePanelGroupButton from "../FeaturePanelGroupButton";
import { useFeaturePropertiesPanel } from "../../../../shared/new-hooks/useFeaturePropertiesPanel";

export default function PolygonPanel() {
  const { getProperties, feature, closePanel } = useFeaturePropertiesPanel();
  const properties = getProperties() as PolygonProperties | null;
  return (
    <>
      <div className="feature-panel polygon" key={feature?.id ?? crypto.randomUUID()}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={closePanel}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <div className="feature-panel-wrapper">
          <p className="feature-name t-panel-medium">feature / {properties?.name ?? "default name"}</p>
          <FeaturePanelGroupButton groupName="Colors">
            <PolygonColorsGroup/>
          </FeaturePanelGroupButton>
          <FeaturePanelGroupButton groupName="Sizes">
            <PolygonSizesGroup/>
          </FeaturePanelGroupButton> 
        </div>
      </div>
    </>
  );
}
