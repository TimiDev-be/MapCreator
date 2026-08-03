import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import type { LineProperties } from "../../../../shared/types/LineProperties";
import LineColorsGroup from "./line-groups/LineColorsGroup";
import LineSizesGroup from "./line-groups/LineSizesGroup";
import FeaturePanelGroupButton from "../FeaturePanelGroupButton";
import { useFeaturePropertiesPanel } from "../../../../shared/new-hooks/useFeaturePropertiesPanel";

export default function LineStringPanel() {
  const { getProperties, feature, closePanel } = useFeaturePropertiesPanel();
  const { name } = getProperties() ?? {} as LineProperties;

  return (
    <>
      <div className="feature-panel lineString" key={feature?.id ?? crypto.randomUUID()}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={closePanel}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <div className="feature-panel-wrapper">
          <p className="feature-name t-panel-medium">feature / {name}</p>
          <FeaturePanelGroupButton groupName="Colors">
            <LineColorsGroup/>
          </FeaturePanelGroupButton>
          <FeaturePanelGroupButton groupName="Sizes">
            <LineSizesGroup/>
          </FeaturePanelGroupButton>
        </div>
      </div>
    </>
  );
}
