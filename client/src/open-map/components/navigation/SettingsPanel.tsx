import "../../styles/_settingsPanel.scss";
import Line from "../../../shared/components/Line";
import { useMap } from "../../../shared/hooks/Map";
import { useMapSettings } from "../../../shared/hooks/MapSettings";
import ZoomGroup from "./settings-groups/ZoomGroup";
import AreaForPrintGroup from "./settings-groups/AreaForPrintGroup";
import AnchorPrintGroup from "./settings-groups/AnchorPrintGroup";
// import PrintSettingGroup from "./settings-groups/PrintSettingsGroup";

export default function SettingsPanel() {
  const { currentMap, deleteMap } = useMap();
  const {handleNameChange} = useMapSettings();
  const { id, name } = currentMap ?? {};

  return (
    <>
      <div className="nav panel settings">
        <p className="panel-name t-panel-name">Map settings</p>
        <Line height={1} />
        <div className="group name">
          <label htmlFor="name-input" className="t-panel-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name-input"
            className="panel-field t-panel-medium"
            defaultValue={name}
            onBlur={(e) => {
              if (e.target.value.trim().length == 0)
                return (e.target.value = name ?? "");
              handleNameChange(e);
            }}
          />
        </div>
        <ZoomGroup/>
        {/* <PrintSettingGroup/> */}
        <AnchorPrintGroup/>
        <AreaForPrintGroup/>
        <button
          type="button"
          className="delete-map-button t-panel-medium"
          onClick={() => deleteMap(id ?? "")}
        >
          Delete map
        </button>
      </div>
    </>
  );
}
