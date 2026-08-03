import "../../../styles/_groupsPanel.scss";
import Line from "../../../../shared/components/Line";
import PlusLogo from "../../../../assets/ic_baseline-plus.svg?react";
import Group from "./Group";
import FeatureComponent from "./Feature";
import MarkerPanel from "../feature-panels/MarkerPanel";
import LineStringPanel from "../feature-panels/LineStringPanel";
import PolygonPanel from "../feature-panels/PolygonPanel";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";
import { useGroup } from "../../../../shared/new-hooks/useGroup";

const FeaturePanels: Record<string, React.ReactNode> = {
  Point: <MarkerPanel />,
  LineString: <LineStringPanel />,
  Polygon: <PolygonPanel />,
};

export default function GroupsPanel() {
  const { currentMap, feature } = useOpenMapPage();
  const { newGroup, assignFeatureToGroup } = useGroup();
  const { groups, features } = currentMap ?? {};

  const handleOnFeatureDrop = async (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    const featureId = e.dataTransfer.getData("featureId");
    await assignFeatureToGroup(featureId, undefined);
  }

  return (
    <>
      <div className="nav panel groups">
        <div className="nav-panel-groups-wrapper">
          <p className="panel-name t-panel-name">Groups and features</p>
          <Line height={1} />
          <div className="group new-group">
            <p className="new-group t-panel-medium">Create a new group</p>
            <button
              type="button"
              className="create-new-group-button"
              onClick={newGroup}
            >
              <PlusLogo width={24} height={24} />
            </button>
          </div>
          <div className="groups-features-list-wrapper">
            <ul
              className="groups-features-list"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleOnFeatureDrop}
            >
              {groups && groups.map((g) => {
                return <Group key={g.id} group={g} />;
              })}
              {features && features
                .filter((f) => !f.properties?.groupId)
                .map((f) => {
                  return <FeatureComponent key={f.id} feature={f} />;
                })}
            </ul>
          </div>
        </div>
        {feature && FeaturePanels[feature.geometry.type]}
      </div>
    </>
  );
}
