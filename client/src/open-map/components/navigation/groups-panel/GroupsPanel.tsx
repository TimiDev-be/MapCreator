import "../../../styles/_groupsPanel.scss";
import Line from "../../../../shared/components/Line";
import PlusLogo from "../../../../assets/ic_baseline-plus.svg?react";
import { useMap } from "../../../../shared/hooks/Map";
import Group from "./Group";
import FeatureComponent from "./Feature";
import { useGroup } from "../../../../shared/hooks/Group";

export default function GroupsPanel() {
  const { currentMap } = useMap();
  const { newGroup, assignFeatureToGroup } = useGroup();
  const { groups, features } = currentMap ?? {};

  return (
    <>
      <div className="nav panel groups">
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
            onDrop={(e) => {
              e.preventDefault();
              const featureId = e.dataTransfer.getData("featureId");
              assignFeatureToGroup(featureId, undefined);
            }}
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
    </>
  );
}
