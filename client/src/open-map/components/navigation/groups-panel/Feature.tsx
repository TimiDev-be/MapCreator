import "../../../styles/_feature.scss";
import { useState, useRef } from "react";
import type { Feature } from "geojson";
import { useFeature } from "../../../../shared/hooks/Feature";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import LineLogo from "../../../../assets/uil_line-alt.svg?react";
import PolygonLogo from "../../../../assets/bx_shape-polygon.svg?react";
import MarkerLogo from "../../../../assets/mdi_map-marker-outline.svg?react";

type Props = {
  feature: Feature;
};

const IconMap: Record<string, React.ReactNode> = {
  Point: <MarkerLogo width={16} height={16} />,
  LineString: <LineLogo width={16} height={16} />,
  Polygon: <PolygonLogo width={16} height={16} />,
};

export default function FeatureComponent({ feature }: Props) {
  const { toggleFeaturePanel } = useMapContainer();
  const { updateFeature, deleteFeature } = useFeature();
  const [editName, setEditName] = useState<boolean>(false);
  const NameInputRef = useRef<HTMLInputElement | null>(null);
  const { name } = feature.properties ?? {};

  const handleDoubleClick = () => {
    setEditName(true);
    setTimeout(() => NameInputRef.current?.focus(), 0);
  };

  const handleBlur = (e: any) => {
    if (!NameInputRef.current) return;
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

  return (
    <>
      <li
        className="feature"
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData("featureId", feature.id.toString())
        }
        onClick={() => toggleFeaturePanel(feature)}
      >
        <button
          type="button"
          className="delete-feature-button"
          onClick={(e) => {
            e.stopPropagation();
            deleteFeature(feature.id.toString());
          }}
        >
          <CloseLogo width={16} height={16} />
        </button>
        <div className="feature-wrapper">
          {IconMap[feature.geometry.type] && (
            <div className="type-icon">{IconMap[feature.geometry.type]}</div>
          )}
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
