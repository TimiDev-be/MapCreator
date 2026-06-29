import "../../../styles/_drawingsList.scss";
import { useEffect } from "react";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import ConnectDrawingsElement from "./ConnectDrawingsElement";
import { useMap } from "../../../../shared/hooks/Map";

export default function ConnectedDrawingsList() {
  const { currentMap } = useMap();
  const { connectedMaps, setConnectedMaps } = useMapContainer();

  useEffect(() => {
    if (currentMap)
      setConnectedMaps((prev) => [
        currentMap,
        ...prev.filter((m) => m.id !== currentMap.id),
      ]);
  }, [currentMap]);

  return (
    <>
      <div className="connected-drawings-list-container">
        <ul className="connected-drawings-list">
          {connectedMaps.map((map, i) => (
            <ConnectDrawingsElement key={map.id} map={map} isCurrentMap={i == 0} isConnected={true}/>
          ))}
        </ul>
      </div>
    </>
  );
}
