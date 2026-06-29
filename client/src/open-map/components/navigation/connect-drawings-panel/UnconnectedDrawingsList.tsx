import "../../../styles/_drawingsList.scss";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import ConnectDrawingsElement from "./ConnectDrawingsElement";
import { useMaps } from "../../../../shared/hooks/Maps";

export default function UnconnectedDrawingsList() {
  const {maps} = useMaps();
  const { connectedMaps } = useMapContainer();

  return (
    <>
      <div className="unconnected-drawings-list-container">
        <ul className="unconnected-drawings-list">
          {maps.filter(m => !connectedMaps.find(cm => cm.id == m.id)).map((map) => (
            <ConnectDrawingsElement key={map.id} map={map} isCurrentMap={false} isConnected={false}/>
          ))}
        </ul>
      </div>
    </>
  );
}
