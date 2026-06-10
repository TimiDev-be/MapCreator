import "../../../styles/_feature.scss";
import { useState, useRef, useEffect } from "react";
import type { Feature, GeoJsonGeometryTypes } from "geojson";
import { useFeature } from "../../../../shared/hooks/Feature";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import LineLogo from "../../../../assets/uil_line-alt.svg?react";
import PolygonLogo from "../../../../assets/bx_shape-polygon.svg?react";
import MarkerLogo from "../../../../assets/mdi_map-marker-outline.svg?react";

type Props = {
  feature: Feature;
};

const FeatureTypeArray: {
  type: GeoJsonGeometryTypes;
  icon: React.ReactNode;
}[] = [
  { type: "Point", icon: <MarkerLogo width={16} height={16} /> },
  { type: "LineString", icon: <LineLogo width={16} height={16} /> },
  { type: "Polygon", icon: <PolygonLogo width={16} height={16} /> },
];

export default function FeatureComponent({ feature }: Props) {
  const { updateFeature, deleteFeature } = useFeature();
  const [editName, setEditName] = useState<boolean>(false);
  const [typeIcon, setTypeIcon] = useState<React.ReactNode | null>(null);
  const NameInputRef = useRef<HTMLInputElement | null>(null);
  const { name } = feature.properties;

  const handleDoubleClick = () => {
    setEditName(true);
    setTimeout(() => NameInputRef.current?.focus(), 0);
  };

  const handleBlur = (e) => {
    if (e.target.value.trim().length === 0) {
      NameInputRef.current.value = name;
      setEditName(false);
    } else {
      updateFeature({
        ...feature,
        properties: { ...feature.properties, name: e.target.value },
      });
      setEditName(false);
    }
  };

  useEffect(() => {
    const handleTypeIcon = () => {
      const typeIcon = FeatureTypeArray.find(
        (item) => item.type === feature.geometry.type,
      )?.icon;
      if (typeIcon) {
        setTypeIcon(typeIcon);
      } else {
        setTypeIcon(null);
      }
    };
    handleTypeIcon();
  }, [feature.geometry.type]);

  return (
    <>
      <li
        className="feature"
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData("featureId", feature.id.toString())
        }
      >
        <button
          type="button"
          className="delete-feature-button"
          onClick={() => deleteFeature(feature.id.toString())}
        >
          <CloseLogo width={16} height={16} />
        </button>
        <div className="feature-wrapper">
          {typeIcon && <div className="type-icon">{typeIcon}</div>}
          <input
            type="text"
            name="name"
            id={"feature-name-input-" + feature.id}
            className="name-field t-panel-small"
            readOnly={!editName}
            defaultValue={name}
            ref={NameInputRef}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </li>
    </>
  );
}
