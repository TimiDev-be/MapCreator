import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import type { MarkerProperties } from "../../../../shared/types/MarkerProperties";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import SignsBoard from "../../marker/SignsBoard";
import IconsList from "../../marker/IconsList";
import MarkerColorsGroup from "./marker-groups/MarkerColorsGroup";
import MarkerSizesGroup from "./marker-groups/MarkerSizesGroup";
import MarkerContentGroup from "./marker-groups/MarkerContentGroup";
import MarkerBoxshadowGroup from "./marker-groups/MarkerBoxshadowGroup";
import MarkerBorderGroup from "./marker-groups/MarkerBorderGroup";
import FeaturePanelGroupButton from "../FeaturePanelGroupButton";

export default function MarkerPanel() {
  const { feature, toggleFeaturePanel } = useMapContainer();
  const {name} = feature?.properties ?? {} as MarkerProperties;

  return (
    <>
      <div className="feature-panel marker" key={feature?.id ?? crypto.randomUUID()}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <div className="feature-panel-wrapper">
          <p className="feature-name t-panel-medium">feature / {name}</p>
          <FeaturePanelGroupButton groupName="Colors">
            <MarkerColorsGroup/>
          </FeaturePanelGroupButton>
          <FeaturePanelGroupButton groupName="Sizes">
            <MarkerSizesGroup/>
          </FeaturePanelGroupButton>
          <FeaturePanelGroupButton groupName="Border">
            <MarkerBorderGroup/>
          </FeaturePanelGroupButton>
          <FeaturePanelGroupButton groupName="Box Shadow">
            <MarkerBoxshadowGroup/>
          </FeaturePanelGroupButton>
          <FeaturePanelGroupButton groupName="Content">
            <MarkerContentGroup/>
            <div className="group signs">
              <p className="signs t-panel-small">Directions Signs</p>
              <SignsBoard />
            </div>
            <div className="group icons">
              <p className="icons t-panel-small">Icons</p>
              <IconsList />
            </div>
          </FeaturePanelGroupButton>
        </div>
      </div>
    </>
  );
}
