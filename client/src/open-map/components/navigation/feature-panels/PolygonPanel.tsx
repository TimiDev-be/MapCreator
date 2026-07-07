import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import type { PolygonProperties } from "../../../../shared/types/PolygonProperties";
import PolygonColorsGroup from "./polygon-groups/PolygonColorsGroup";
import PolygonSizesGroup from "./polygon-groups/PolygonSizesGroup";

export default function PolygonPanel() {
  const { feature, toggleFeaturePanel } = useMapContainer();
  const {name} = feature?.properties ?? {} as PolygonProperties;

  return (
    <>
      <div className="feature-panel polygon" key={feature?.id ?? crypto.randomUUID()}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <p className="feature-name t-panel-medium">feature / {name}</p>
        <PolygonColorsGroup/>
        <PolygonSizesGroup/>
      </div>
    </>
  );
}
