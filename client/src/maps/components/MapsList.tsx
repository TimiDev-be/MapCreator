import "../styles/_mapsList.scss";
import MapsListElement from "./MapsListElement";
import QuickMenu from "./QuickMenu";
import { useMaps } from "../../hooks/Maps";

export default function MapsList() {
  const { maps } = useMaps();

  return (
    <>
      <section className="maps-list">
        <QuickMenu />
        <div className="maps-list-wrapper">
          {maps &&
            maps.map((map) => <MapsListElement key={map.id} map={map} />)}

          {maps && maps.length === 0 && (
            <div className="maps-list-empty t-maps-list-empty">
              No map has been created yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
