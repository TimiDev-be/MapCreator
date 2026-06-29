import "../../../styles/_connectDrawingsPanel.scss";
import Line from "../../../../shared/components/Line";
import NextLogo from "../../../../assets/ooui_next-ltr.svg?react";
import { useState } from "react";
import ConnectedDrawingsList from "./ConnectedDrawingsList";
import UnconnectedDrawingsList from "./UnconnectedDrawingsList";

export default function ConnectDrawingsPanel() {
  const [drawingsListActive, setDrawingsListActive] = useState<boolean>(true);

  return (
    <>
      <div className="nav panel connect-drawings">
        <div className="text-content">
          <p className="title t-panel-name">Combine drawings from other maps</p>
          <p className="subtitle t-panel-medium">
            Select a map to add its drawings to the current one
            <strong>
              . Changes won't be saved — refreshing the page will discard them.
            </strong>
          </p>
        </div>
        <Line height={1} />
        <ConnectedDrawingsList />
        <div className="unconnected-content-container">
          <button
            type="button"
            className={`show-maps-to-connect-button t-panel-medium ${drawingsListActive ? "active" : ""}`}
            onClick={() => setDrawingsListActive((prev) => !prev)}
          >
            <NextLogo width={20} height={20} />
            {drawingsListActive
              ? "hide unconnected drawings list"
              : "show unconnected drawings list"}
          </button>
          {drawingsListActive && <UnconnectedDrawingsList/>}
        </div>
      </div>
    </>
  );
}
