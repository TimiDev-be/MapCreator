import "../../../styles/_drawingsList.scss";
import { useEffect } from "react";
import ConnectDrawingsElement from "./ConnectDrawingsElement";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";

export default function ConnectedDrawingsList() {
  const {currentMap, setConnectedDrawings, connectedDrawings} = useOpenMapPage();

  useEffect(() => {
    if (currentMap)
      setConnectedDrawings((prev) => [
        currentMap,
        ...prev.filter((m) => m.id !== currentMap.id),
      ]);
  }, [currentMap]);

  return (
    <>
      <div className="connected-drawings-list-container">
        <ul className="connected-drawings-list">
          {connectedDrawings.map((map, i) => (
            <ConnectDrawingsElement key={map.id} map={map} isCurrentMap={i == 0} isConnected={true}/>
          ))}
        </ul>
      </div>
    </>
  );
}
