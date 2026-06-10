import "../../styles/_navigation.scss";
import { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import GroupsPanel from "./groups-panel/GroupsPanel";
import DescriptionPanel from "./DescriptionPanel";
import ExportPanel from "./ExportPanel";
import SettingsLogo from "../../../assets/lucide_settings-2.svg?react";
import GroupsLogo from "../../../assets/material-symbols_folder-outline.svg?react";
import Description from "../../../assets/fluent_text-description-24-filled.svg?react";
import ExportLogo from "../../../assets/lsicon_file-export-filled.svg?react";

type Panel = "settings" | "groups" | "description" | "export";

export default function Navigation() {
  const [activePanel, setActivePanel] = useState<Panel | null>("settings");

  const togglePanel = (panel: Panel) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  return (
    <>
      <nav className="open-map-nav">
        <div className="nav-buttons">
          <button
            type="button"
            className={`settings nav-button ${activePanel === "settings" ? "active" : ""}`}
            onClick={() => togglePanel("settings")}
          >
            <SettingsLogo width={32} height={32} />
          </button>
          <button
            type="button"
            className={`groups nav-button ${activePanel === "groups" ? "active" : ""}`}
            onClick={() => togglePanel("groups")}
          >
            <GroupsLogo width={32} height={32} />
          </button>
          <button
            type="button"
            className={`description nav-button ${activePanel === "description" ? "active" : ""}`}
            onClick={() => togglePanel("description")}
          >
            <Description width={32} height={32} />
          </button>
          <button
            type="button"
            className={`export nav-button ${activePanel === "export" ? "active" : ""}`}
            onClick={() => togglePanel("export")}
          >
            <ExportLogo width={32} height={32} />
          </button>
        </div>
        {activePanel === "settings" && <SettingsPanel />}
        {activePanel === "groups" && <GroupsPanel />}
        {activePanel === "description" && <DescriptionPanel />}
        {activePanel === "export" && <ExportPanel />}
      </nav>
    </>
  );
}
