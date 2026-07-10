import "../styles/_mapsPage.scss";
import Header from "../../shared/components/Header";
import MapsList from "./MapsList";

export default function MapsPage() {
  return (
    <>
      <div className="maps page">
        <Header />
        <MapsList />
      </div>
    </>
  );
}
