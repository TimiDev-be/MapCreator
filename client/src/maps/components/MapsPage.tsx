import "../styles/_mapsPage.scss";
import Line from "../../shared/components/Line";
import Header from "../../shared/components/Header";
import MapsList from "./MapsList";

export default function MapsPage() {
  return (
    <>
      <div className="maps page">
        <Header />
        <Line height={1} />
        <MapsList />
      </div>
    </>
  );
}
