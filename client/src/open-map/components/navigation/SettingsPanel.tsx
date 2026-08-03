import "../../styles/_settingsPanel.scss";
import Line from "../../../shared/components/Line";
import ZoomGroup from "./settings-groups/ZoomGroup";
import AreaForPrintGroup from "./settings-groups/AreaForPrintGroup";
import AnchorPrintGroup from "./settings-groups/AnchorPrintGroup";
import { useMapSettings, type SettingsPanelProperties } from "../../../shared/new-hooks/useMapSettings";
// import PrintSettingGroup from "./settings-groups/PrintSettingsGroup";

export default function SettingsPanel() {
  const {settings, updateSettings, deleteMap} = useMapSettings();
  const values = settings ?? {} as SettingsPanelProperties;

  const handleNameBlur = async (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length == 0)
      return (e.target.value = values.name ?? "");
    await updateSettings({
      ...values,
      name: e.target.value
    });
  }  

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
            defaultValue={values.name}
            onBlur={handleNameBlur}
          />
        </div>
        <ZoomGroup/>
        {/**
         * Settings for print can deliver render problems for too big maps
         * In the future propably will be create c# converter for creating maps and pdfs
         */}
        {/* <PrintSettingGroup/> */}
        <AnchorPrintGroup/>
        <AreaForPrintGroup/>
        <button
          type="button"
          className="delete-map-button t-panel-medium"
          onClick={deleteMap}
        >
          Delete map
        </button>
      </div>
    </>
  );
}
