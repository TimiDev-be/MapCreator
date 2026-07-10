import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import type { LineProperties } from "../../../../shared/types/LineProperties";
import LineColorsGroup from "./line-groups/LineColorsGroup";
import LineSizesGroup from "./line-groups/LineSizesGroup";

export default function LineStringPanel() {
  const { feature, toggleFeaturePanel } = useMapContainer();
  const { name } = feature?.properties ?? {} as LineProperties;

  return (
    <>
      <div className="feature-panel lineString" key={feature?.id ?? crypto.randomUUID()}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <p className="feature-name t-panel-medium">feature / {name}</p>
        <LineColorsGroup/>
        <LineSizesGroup/>
      </div>
    </>
  );
}
