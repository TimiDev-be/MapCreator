import "../../../styles/_group.scss";
import type { Group } from "../../../../shared/types/Group";
import type { Feature } from "geojson";
import { useState, useRef, useEffect } from "react";
import { useMap } from "../../../../shared/hooks/Map";
import { useGroup } from "../../../../shared/hooks/Group";
import FeatureComponent from "./Feature";
import FolderLogo from "../../../../assets/material-symbols_folder-outline.svg?react";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";

type Props = {
  group: Group;
};

export default function Group({ group }: Props) {
  const { currentMap } = useMap();
  const {
    updateGroupName,
    deleteGroup,
    currentGroup,
    toggleActive,
    assignFeatureToGroup,
  } = useGroup();
  const { id, name } = group;
  const [editName, setEditName] = useState<boolean>(false);
  const [features, setFeatures] = useState<Feature[]>(
    (currentMap && currentMap.features.filter((f) => f.properties?.groupId === id)) ?? [],
  );
  const NameInputRef = useRef<HTMLInputElement | null>(null);

  const handleDoubleClick = () => {
    setEditName(true);
    setTimeout(() => NameInputRef.current?.focus(), 0);
  };

  const handleBlur = (e : any) => {
    if (!NameInputRef.current) return;

    if (e.target.value.trim().length === 0) {
      NameInputRef.current.value = name;
      setEditName(false);
    } else {
      updateGroupName({ id, name: e.target.value });
    }
  };

  useEffect(() => {
    const handleMapUpdate = () => {
      if (!currentMap) return;
      setFeatures(
        currentMap.features.filter((f) => f.properties?.groupId === id),
      );
    };
    handleMapUpdate();
  }, [currentMap]);

  return (
    <>
      <li
        className={`map-group-element ${currentGroup?.id === id ? "active" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const featureId = e.dataTransfer.getData("featureId");
          assignFeatureToGroup(featureId, id);
        }}
      >
        <button
          type="button"
          className="delete-group-button"
          onClick={() => deleteGroup(id)}
        >
          <CloseLogo width={16} height={16} />
        </button>
        <div
          className={`group-wrapper ${currentGroup?.id === id ? "active" : ""}`}
          onClick={() => toggleActive(group)}
        >
          <FolderLogo width={20} height={20} />
          <input
            type="text"
            name="name"
            id={"group-name-input-" + id}
            className="name-field t-panel-small"
            readOnly={!editName}
            defaultValue={name}
            ref={NameInputRef}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <ul className={`features ${currentGroup?.id === id ? "active" : ""}`}>
          {features.map((f) => {
            return <FeatureComponent key={f.id} feature={f} />;
          })}
        </ul>
      </li>
    </>
  );
}
