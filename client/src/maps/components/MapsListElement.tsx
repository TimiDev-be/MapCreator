import "../styles/_mapsListElement.scss";
import { useRef, useEffect } from "react";
import type { StateMap } from "../../shared/types/StateMap";
import { TimeAgo } from "../../shared/utils/TimeAgo";
import { Link } from "react-router-dom";
import DotsLogo from "../../assets/bi_three-dots-vertical.svg?react";
import ClockLogo from "../../assets/mdi_clock-outline.svg?react";
import { useMapsListElement } from "../../shared/new-hooks/useMapsListElement";

type Props = {
  map: StateMap;
};

export default function MapsListElement({ map }: Props) {
  const {
    handleToggleMapChecked, 
    handleToggleSettings,
    deleteMap,
    settingsActive
  } = useMapsListElement(map.id);
  const CheckBoxRef = useRef<HTMLInputElement>(null);
  const { id, name, checked, updatedAt, createdAt } = map;

  const handleWrapperClick = () => {
    if (!CheckBoxRef.current) return;
    const newValue = !CheckBoxRef.current.checked;
    CheckBoxRef.current.checked = newValue;
    handleToggleMapChecked(newValue);
  };

  useEffect(() => {
    if (CheckBoxRef.current) CheckBoxRef.current.checked = checked;
  }, [checked]);

  return (
    <>
      <div
        className="maps-list-element"
        onMouseLeave={(e) => handleToggleSettings(e, false)}
      >
        <div className="top-block">
          <div className="wrapper" onClick={handleWrapperClick}>
            <div className="menu-container">
              <input
                type="checkbox"
                name="check-map"
                id="check-map-input"
                className="map-checkbox"
                ref={CheckBoxRef}
                defaultChecked={checked}
                onChange={handleToggleMapChecked}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                className={`open-map-menu-button ${settingsActive && "active"}`}
                onClick={handleToggleSettings}
              >
                <DotsLogo width={24} height={24} />
              </button>
            </div>
            <Link
              to={`open-map/${name}/${id}`}
              className="open-map-link t-map-element-list-medium"
              onClick={(e) => e.stopPropagation()}
            >
              open
            </Link>
          </div>
        </div>
        <div className="bottom-block">
          <p className="map-name t-map-element-list-big">
            {name.slice(0, 20)}
            {name.length > 20 && "..."}
          </p>
          <p className="map-last-update t-map-element-list-small">
            <ClockLogo width={24} height={24} />
            Edited {TimeAgo(updatedAt)}
          </p>
          <p className="map-last-created t-map-element-list-small">
            Created {TimeAgo(createdAt)}
          </p>
        </div>
        {settingsActive && (
          <div className="settings">
            <div className="map-settings-wrapper">
              <button
                type="button"
                className="remove-map-button t-map-element-list-medium"
                onClick={deleteMap}
              >
                delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
