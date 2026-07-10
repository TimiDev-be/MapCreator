import "../styles/_mapsListElement.scss";
import { useRef, useState, useEffect } from "react";
import type { StateMap } from "../../shared/types/StateMap";
import { useMap } from "../../shared/hooks/Map";
import { TimeAgo } from "../../shared/utils/TimeAgo";
import { Link } from "react-router-dom";
import DotsLogo from "../../assets/bi_three-dots-vertical.svg?react";
import ClockLogo from "../../assets/mdi_clock-outline.svg?react";

type Props = {
  map: StateMap;
};

export default function MapsListElement({ map }: Props) {
  const { toggleCheckMap, deleteMap } = useMap();
  const [settingsActive, setSettingsActive] = useState<boolean>(false);
  const CheckBoxRef = useRef<HTMLInputElement>(null);
  const { id, name, checked, updatedAt, createdAt } = map;

  const handleSettingsActive = (e: React.MouseEvent, value?: boolean) => {
    e.stopPropagation();
    if (value != undefined) setSettingsActive(value);
    else setSettingsActive((prev) => !prev);
  };

  const handleWrapperClick = () => {
    if (!CheckBoxRef.current) return;
    const newValue = !CheckBoxRef.current.checked;
    CheckBoxRef.current.checked = newValue;
    toggleCheckMap(id, newValue);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleCheckMap(id, e.target.checked);
  };

  useEffect(() => {
    if (CheckBoxRef.current) CheckBoxRef.current.checked = checked;
  }, [checked]);

  return (
    <>
      <div
        className="maps-list-element"
        onMouseLeave={(e) => handleSettingsActive(e, false)}
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
                onChange={handleCheckboxChange}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                className={`open-map-menu-button ${settingsActive && "active"}`}
                onClick={handleSettingsActive}
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
                onClick={() => deleteMap(id)}
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
