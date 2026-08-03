import "../../../styles/_group.scss";
import type { Group } from "../../../../shared/types/Group";
import { useState, useRef } from "react";
import { useGroup } from "../../../../shared/new-hooks/useGroup";
import FeatureComponent from "./Feature";
import FolderLogo from "../../../../assets/material-symbols_folder-outline.svg?react";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";

type Props = {
  group: Group;
};

export default function Group({ group }: Props) {
  const {currentGroup, setCurrentGroup} = useOpenMapPage();
  const {updateGroup, getGroupFeatures, deleteGroup, assignFeatureToGroup} = useGroup(group.id);
  const [editName, setEditName] = useState<boolean>(false);
  const NameInputRef = useRef<HTMLInputElement | null>(null);
  const { id, name } = group;

  const handleDoubleClick = () => {
    setEditName(true);
    setTimeout(() => NameInputRef.current?.focus(), 0);
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!NameInputRef.current) return;
    if (e.target.value.trim().length === 0) {
      NameInputRef.current.value = name;
      setEditName(false);
    } else {
      updateGroup(e.target.value);
    }
  };

  const handleOnFeatureDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const featureId = e.dataTransfer.getData("featureId");
    assignFeatureToGroup(featureId, id);   
  }

  return (
    <>
      <li
        className={`map-group-element ${currentGroup?.id === id ? "active" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnFeatureDrop}
      >
        <button
          type="button"
          className="delete-group-button"
          onClick={deleteGroup}
        >
          <CloseLogo width={16} height={16} />
        </button>
        <div
          className={`group-wrapper ${currentGroup?.id === id ? "active" : ""}`}
          onClick={() => setCurrentGroup(prev => prev && prev.id == group.id ? null : group)}
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
            onBlur={handleNameBlur}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <ul className={`features ${currentGroup?.id === id ? "active" : ""}`}>
          {[...getGroupFeatures()].map((f) => {
            return <FeatureComponent key={f.id} feature={f} />;
          })}
        </ul>
      </li>
    </>
  );
}
