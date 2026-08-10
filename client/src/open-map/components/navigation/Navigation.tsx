import "../../styles/_navigation.scss";
import { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import GroupsPanel from "./groups-panel/GroupsPanel";
import DescriptionPanel from "./DescriptionPanel";
import ConnectDrawingsPanel from "./connect-drawings-panel/ConnectDrawingsPanel";
import SettingsLogo from "../../../assets/lucide_settings-2.svg?react";
import GroupsLogo from "../../../assets/material-symbols_folder-outline.svg?react";
import DescriptionLogo from "../../../assets/fluent_text-description-24-filled.svg?react";
import ConnectionLogo from "../../../assets/icon-park-outline_merge.svg?react";
import LayersLogo from "../../../assets/lucide_layers.svg?react";
import LayersPanel from "./layers-panel/LayersPanel";

type Panel = "settings" | "layers" | "groups" | "description" | "connect-drawings";

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
            className={`layers nav-button ${activePanel === "layers" ? "active" : ""}`}
            onClick={() => togglePanel("layers")}
          >
            <LayersLogo width={32} height={32} />
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
            <DescriptionLogo width={32} height={32} />
          </button>
          <button
            type="button"
            className={`connect-drawings nav-button ${activePanel === "connect-drawings" ? "active" : ""}`}
            onClick={() => togglePanel("connect-drawings")}
          >
            <ConnectionLogo width={32} height={32} />
          </button>
        </div>
      </nav>
      {activePanel === "settings" && <SettingsPanel />}
      {activePanel === "layers" && <LayersPanel />}
      {activePanel === "groups" && <GroupsPanel />}
      {activePanel === "description" && <DescriptionPanel />}
      {activePanel === "connect-drawings" && <ConnectDrawingsPanel />}
    </>
  );
}
