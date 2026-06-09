import "../styles/_openMapPage.scss";
import Header from "./header/Header";
import { useLocation } from "react-router-dom";

export default function OpenMapPage() {
  const { map } = useLocation().state;

  return (
    <>
      <div className="open-map page">
        <Header nameOfMap={map.name} />
      </div>
    </>
  );
}
